---
title: "TI-84+ CE: The seq( command"
excerpt: "The seq( command is very useful when you want to automatically fill in a sequence of anything."
categories: Programming
tags: [Commands, TI-84+ CE]
---

The `seq(` command is very useful when you want to automatically fill in a sequence of anything.

## Description

The following text is from the TI-Basic developer site [here](http://tibasicdev.wikidot.com/seq-list).

> The `seq(` command is very powerful, as it is (almost) the only command that can create a whole list as output. This means that you will need make use of it almost every time that you use lists. The `seq(` command creates a list by evaluating a formula with one variable taking on a range of several values.
>
> It is similar in this to the `For(` command, but unlike `For(`, instead of running a block of commands, it only evaluates a formula. Like the `For(` command, there is an optional “step” that you can use to get every 3rd, every 5th, etc. value in the range.
>
> TI-Basic Developer: The seq( Command, <http://tibasicdev.wikidot.com/seq-list>

## Command Synopsis

This command can be found in the LIST menu (`[2nd]->[stat]`), OPS submenu (`[RIGHT]`). It has the following syntax:

![Caption: seq(expression, variable, begin, end[, increment])](/assets/images/posts/ti84_seq_1.png)

In which:

- `expression` is the expression that is evaluated and put into the resulting list
- `variable` is the variable that iterates over `begin` to `end`
- `begin` is the first value to assign to `variable`
- `end` is the ending value for the iteration
- The optional `increment` is how much the value in `variable` changes each time

If you are confused right now, don’t worry: the examples below will explain it better!

## Examples

The calculator has a `seq(` command wizard, which is very helpful. It looks like this:

![Caption: The seq( command wizard.](/assets/images/posts/ti84_seq_2.png)

If you want to simply create a list that contains {1,2,3,...,10}, you can do this:

![Caption: seq(X,X,1,10,1)](/assets/images/posts/ti84_seq_3.png)

This command will put the integers starting at 1 and ending at 10 into the list.

![Caption: Result of seq(X,X,1,10,1).](/assets/images/posts/ti84_seq_4.png)

If you want to generate a list that contains {0,0.1,0.2,0.3,...,1} instead, the following command will work:

![Caption: seq(X,X,0,1,0.1)](/assets/images/posts/ti84_seq_5.png)

This command will put values from 0 to 1, each time adding 0.1, into the list.

![Caption: Result of seq(X,X,0,1,0.1).](/assets/images/posts/ti84_seq_6.png)

Congratulations, you just learned the basic usage of the `seq(` command!

## Advanced Usage

The `seq(` command can have a lot more advanced uses! The `expression` can be much more complex to generate other kinds of lists. For example, if we want to generate a list that contains the squares of every integer from 1 to 10, the following command can be used:

![Caption: seq(X²,X,1,10,1)](/assets/images/posts/ti84_seq_7.png)

This command will evaluate X² for each X from 1 to 10 and put the value into a list.

![Caption: Result of seq(X²,X,1,10,1).](/assets/images/posts/ti84_seq_8.png)

Also, as shown in [this post](../../math/how-to-find-the-equation-of-a-sinusoid/), `seq(` can be used with the Y-vars (equations) to find the regression (simple equation). To do this, we need to put X values (for example, 0-4, increment 0.1) into a list and Y values in another list.

First, we type an equation in Y₁:

![Caption: I used the same equation as the other post, but other equations work too.](/assets/images/posts/ti84_seq_9.png)

Next, we generate the X values and put them into L₁:

![ti84_seq_10.png](/assets/images/posts/ti84_seq_10.png)

![Caption: Generate X list.](/assets/images/posts/ti84_seq_11.png)

Then, we evaluate Y₁(X) for each X and save the values into L₂:

![ti84_seq_12.png](/assets/images/posts/ti84_seq_12.png)

![Caption: Generate Y list.](/assets/images/posts/ti84_seq_13.png)

Finally, we can use a regression function (in this case, `SinReg`) to find the equation:

![ti84_seq_14.png](/assets/images/posts/ti84_seq_14.png)

![ti84_seq_15.png](/assets/images/posts/ti84_seq_15.png)

![Caption: Using SinReg to find the equation.](/assets/images/posts/ti84_seq_16.png)

## Conclusion

Now you have learned the usage of the `seq(` command. If you have any other creative uses that I didn’t talk about, feel free to comment below!
