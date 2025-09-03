---
title: "Python `asyncio` terminal-based frontend"
excerpt: "Reading from `stdin` in an `asyncio` event loop is so hard."
category: Programming
tag: Python
---

## Introduction

Who would've thought that it's so hard to read input from the terminal with Python's [`asyncio`](https://docs.python.org/3/library/asyncio.html) library, which was literally designed for asynchronous I/O? I certainly didn't. But here we are.

As we know, Python provides an `input(prompt)` function that synchronously reads a line from stdin. However, how can we do the same thing in async?

Recently I was working on a project where I wanted to create a command line REPL-ish interface. I wanted the user to use Ctrl+C to cancel the current command and type a new one, kind of like a shell:

```sh
# hlep^C
# help
Supported commands:
- ...
# 
```

However, this took me literally hours to figure out.

## Solution 1: `loop.run_in_executor`

The first and perhaps most obvious solution is to use `run_in_executor` to run `input` in a separate thread. Perhaps something like this:

```py
import asyncio

async def main():
    loop = asyncio.get_running_loop()
    while True:
        try:
            line = await loop.run_in_executor(None, input, '# ')
        except KeyboardInterrupt:
            print('You pressed ^C')
            continue
        print(f'{line}')

asyncio.run(main())
```

However, when I ran this, we have some problems.

```text
# help
help
# ^C^CTraceback (most recent call last):
  ...
  File ".../test.py", line 7, in main
    line = await loop.run_in_executor(None, input, '# ')
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
asyncio.exceptions.CancelledError

During handling of the above exception, another exception occurred:

...

KeyboardInterrupt

During handling of the above exception, another exception occurred:

...

KeyboardInterrupt
^CException ignored on threading shutdown:
Traceback (most recent call last):
  ...
KeyboardInterrupt: 
```

In the above example, I pressed Ctrl+C three times.

1. The first time did nothing.
2. The second time triggered the `CancelledError` and the first two `KeyboardInterrupt`s.
3. The third time triggered the last `KeyboardInterrupt` and caused the program to exit.

It is obvious that my `KeyboardInterrupt` handler was not called. But why?

My guess is that the Ctrl+C was caught by `asyncio.run`, which cancelled the main task. However, since you can't kill a coroutine, `main()` is still hanging, waiting on the `input`. The second Ctrl+C probably triggered some sort of emergency shutdown sequence, which displayed the `CancelledError` and the `KeyboardInterrupt` re-raised by `asyncio`.

Alright. How can we solve this?

## Solution 2: `asyncio.StreamReader`

A Google search tells me that `asyncio` has a `StreamReader` class used to read streams, so I thought I would try that. After all, an `async`-native approach would be better than the thread-based one, right?

```py
import asyncio
import sys

async def ainput(prompt: str):
    print(prompt, end='', flush=True)
    loop = asyncio.get_running_loop()
    reader = asyncio.StreamReader()
    protocol = asyncio.StreamReaderProtocol(reader)
    await loop.connect_read_pipe(lambda: protocol, sys.stdin)
    line = await reader.readline()
    return line.rstrip(b'\n').decode()

async def main():
    while True:
        try:
            line = await ainput('# ')
        except KeyboardInterrupt:
            print('You pressed ^C')
            continue
        print(f'{line}')

asyncio.run(main())
```

The answer is... kind of, but not really.

```text
# help
help
# ^CTraceback (most recent call last):
  ...
  File ".../test.py", line 17, in main
    line = await ainput('# ')
  File ".../test.py", line 10, in ainput
    line = await reader.readline()
  ...
asyncio.exceptions.CancelledError

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File ".../test.py", line 23, in <module>
    asyncio.run(main())
  File ".../lib/python3.13/asyncio/runners.py", line 194, in run
    return runner.run(main)
  File ".../lib/python3.13/asyncio/runners.py", line 123, in run
    raise KeyboardInterrupt()
KeyboardInterrupt
```

Alright. At least I only pressed Ctrl+C once here.

I don't like the fact that when `asyncio` caught my Ctrl+C, it cancelled my main task. I don't want that. Can I uncancel tasks?

## Solution 3: Uncancel task

Let's try this then.

```py
import asyncio
import sys

async def ainput(prompt: str):
    ...  # same as last snippet

async def main():
    loop = asyncio.get_running_loop()
    while True:
        try:
            line = await ainput('# ')
        except asyncio.CancelledError:
            asyncio.current_task().uncancel()
            print('You pressed ^C')
            continue
        print(f'{line}')

asyncio.run(main())
```

The results of this is very interesting.

```text
# help 
help
# ^CYou pressed ^C
# ^CYou pressed ^C
# ^CTraceback (most recent call last):
  ...
  File ".../lib/python3.13/asyncio/base_events.py", line 1989, in _run_once
    event_list = self._selector.select(timeout)
Traceback (most recent call last):
Task was destroyed but it is pending!
task: <Task pending name='Task-1' coro=<main() done, defined at .../test.py:13> wait_for=<Future pending cb=[Task.task_wakeup()]> cb=[gather.<locals>._done_callback() at .../lib/python3.13/asyncio/tasks.py:820]>
```

(The length of the traceback actually varies based on the text I type into the program, but I won't really talk about that.)

So, it seems that the `uncancel` method worked! ... for 2 times. The third time, it seems like something happened, and the program crashed.

According to the [`asyncio` docs about `CancelledError` and `uncancel`](https://docs.python.org/3/library/asyncio-task.html#task-cancellation), this is not really a good thing to do.

## Solution 4: Oh wait...

This is when I actually went to look at `asyncio`'s documentation... and realized that there is an [`add_signal_handler` method](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.loop.add_signal_handler).

After I learned that, I did the following few things:

1. Cry. Just kidding, but I was pretty angry at myself for not finding this out earlier.
2. Split out the slow, "blocking" `await reader.readline()` to a separate async task.
3. Use `add_signal_handler` to register a `SIGINT` handler that cancels the task.
4. In the main coroutine, catch the `CancelledError` and continue.

Here's the code:

```py
import asyncio
import signal
import sys

read_task: asyncio.Task[bytes] | None = None

async def ainput(prompt: str):
    global read_task
    print(prompt, end='', flush=True)
    loop = asyncio.get_running_loop()
    reader = asyncio.StreamReader()
    protocol = asyncio.StreamReaderProtocol(reader)
    await loop.connect_read_pipe(lambda: protocol, sys.stdin)
    read_task = asyncio.create_task(reader.readline())
    try:
        line = await read_task
        return line.rstrip(b'\n').decode()
    finally:
        read_task = None

async def main():
    loop = asyncio.get_running_loop()
    loop.add_signal_handler(signal.SIGINT, lambda: read_task and read_task.cancel())
    while True:
        try:
            line = await ainput('# ')
        except asyncio.CancelledError:
            print('You pressed ^C')
            continue
        if line == 'quit':  # so that I can actually quit the program
            break
        print(f'{line}')

asyncio.run(main())
```

And here's the output:

```text
# help
help
# abc
abc
# ^CYou pressed ^C
# def
def
# gh^CYou pressed ^C
# ijk
ijk
# quit
```

And that, folks, is how you do a looped input in asyncio without blocking the event loop.

## Epilogue

In the documentation I linked above, the authors mentioned that catching `CancelledError` and not re-raising it can result in an invalid state. So I came up with another solution, using another `Future` object to pass the data back to my `main` coroutine, instead of awaiting the task that may be cancelled. This is my final code:

```py
import asyncio
import signal
import sys

read_task: asyncio.Task[None] | None = None

async def _readline_task(reader: asyncio.StreamReader, fut: asyncio.Future):
    try:
        fut.set_result(await reader.readline())
    finally:
        if not fut.done():
            fut.set_result(None)

async def ainput(prompt: str):
    global read_task
    print(prompt, end='', flush=True)
    loop = asyncio.get_running_loop()
    reader = asyncio.StreamReader()
    protocol = asyncio.StreamReaderProtocol(reader)
    await loop.connect_read_pipe(lambda: protocol, sys.stdin)
    fut: asyncio.Future[bytes | None] = loop.create_future()
    read_task = asyncio.create_task(_readline_task(reader, fut))
    try:
        line = await fut
    finally:
        read_task = None
    if line is None:
        raise KeyboardInterrupt()
    return line.rstrip(b'\n').decode()

async def main():
    loop = asyncio.get_running_loop()
    loop.add_signal_handler(signal.SIGINT, lambda: read_task and read_task.cancel())
    while True:
        try:
            line = await ainput('# ')
        except KeyboardInterrupt:
            print('You pressed ^C')
            continue
        if line == 'quit':
            break
        print(f'{line}')

asyncio.run(main())
```

## Edits

- 2025-03-22: Use `loop.create_future()` instead of `asyncio.Future`.
