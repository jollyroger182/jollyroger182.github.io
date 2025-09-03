---
title: "Calling Rust code from Python with ctypes"
excerpt: "As I was learning, I came across an idea: what if I get to call Rust code from Python? Then I can take advantage of Rust’s speed in Python."
category: Programming
tags: [Creations, Python, Rust]
---

## Background

Recently I’ve been learning [Rust](https://www.rust-lang.org/), which is a programming language that aims to be as fast as C but absolutely memory-safe. It feels like a mix of the best features from many languages, including Python ([format!](https://doc.rust-lang.org/std/macro.format.html) vs. [f-strings](https://docs.python.org/3/tutorial/inputoutput.html#tut-f-strings)), Java ([iter](https://doc.rust-lang.org/std/iter/index.html) vs. [stream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)), C (speed), C++ (references), and JavaScript (mutability?). And as I was learning, I came across an idea: what if I get to call Rust code from Python? Then I can take advantage of Rust’s speed in Python.

A quick Google search reviewed a framework [PyO3](https://pyo3.rs/). From the docs:

> [Rust](https://www.rust-lang.org/) bindings for [Python](https://www.python.org/), including tools for creating native Python extension modules. Running and interacting with Python code from a Rust binary is also supported.

This sounds very cool! However, I didn’t want to use it because I thought it would be quite cumbersome. (As I was writing this post, I read more of the docs and it’s not actually as bad as I thought, but that doesn’t matter anymore I guess.) So, I set out to create my own method of calling into Rust code from Python: PyO2!

**EDIT:** I forgot to mention this when I wrote the post, but the libraries are published on [crates.io](https://crates.io/crates/pyo2) and [PyPI](https://pypi.org/project/pyo2/). You can play with them as you like!

## Usage

From the Rust side, the code is as simple as:

```rust
use pyo2::{PyStr, PyVec};

#[no_mangle]
pub extern "C" fn test(name: &PyStr, numbers: &mut PyVec<i64>) {
    println!("Hello, {}!", unsafe { name.as_str_unchecked() });
    println!("Sum of numbers: {}", numbers.iter().cloned().sum::<i64>());
    numbers[0] = 6;
}
```

And from the Python side:

```python
from pyo2 import RustDLL

dll = RustDLL('./libmylib.so')

s = 'World'
lst = [1, 2, 3, 4, 5]
dll.test(s, lst)
print(lst)
```

Output:

```
Hello, World!
Sum of numbers: 15
[6, 2, 3, 4, 5]
```

Pretty cool, huh?

## How it works

**tl;dr:** Python data types are converted in Python code, to either a primitive type (i64, f64) or a PyVec.

A slightly longer description:

The Python side handles most of the logic of converting things to (and from) data types defined in Rust. In the pyo2 crate in Rust, I defined the PyVec struct like so:

```rust
#[repr(C)]
pub struct PyVec<T> {
    ptr: *mut T,
    len: u32,
}
```

Basically, there’s a pointer and a length. Nothing special, nothing advanced. The `#[repr(C)]` makes sure rustc doesn’t mess with my field order. Then, the crate has a bunch of impls to make dealing with PyVecs a little easier. `PyStr` is just an alias to `PyVec<u8>`.

Then, from the Python side, any list-like data type (str, list, bytes, etc.) are converted to such a PyVec through the ctypes builtin library. For bytes, it does not do any special handling; the underlying data buffer is sent directly to Rust. For other data types, a large-enough buffer will be created, the data copied over (recursively, so lists of lists are supported as `&PyVec<&PyVec<i64>>` for example), and a new PyVec is created with this buffer as the ptr.

After the Rust code runs, if a list was passed in, the Python code will go through each item in the buffer and assign the new value to the original list. This means that the changes made in Rust propagates back into Python.

## Conclusion

Please don’t use this library in your production code or anything serious. This library is only written as a proof-of-concept, and much of the code is extremely unoptimized. If you want an actual way to integrate Rust with Python, please use PyO3 that I mentioned at the beginning of this article!
