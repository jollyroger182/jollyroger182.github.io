---
title: "Contributor to CPython! Yay!"
excerpt: "Yeah, I’m now a contributor to CPython 🙂. I caught an extremely significant bug in CPython that affected the coding experience of each and every Python programmer. "
category: Programming
tag: Python
---

Yeah, I’m now a contributor to CPython 🙂.

I caught an extremely significant bug in CPython that affected the coding experience of each and every Python programmer. The bug was so obvious that I was so surprised that no one already found out!

Look:

![cpython.png](/assets/images/posts/cpython.png)

Look at [line 904 of the typing.py library](https://github.com/python/cpython/blob/75dda3b12d689d1e90ae198cd9509e529826557a/Lib/typing.py#L904). How is it possible that no one has spotted the mistake? `P.__name__ == 'T'` ?! Shouldn’t ALL Python programmers be so familiar with the typing `ParamSpec` class?

Enough sarcasm. Considering that [only ~11K Python files on GitHub contains “ParamsSpec”](https://github.com/search?q=paramspec+language%3APython+&type=code&l=Python), it’s no wonder why no one spotted this error. It’s not like anyone will use `ParamSpec.__name__` anyway…

Well, I only found this error when I was randomly scrolling through the typing.py module (don’t ask why). So I decided to [create a pull request](https://github.com/python/cpython/pull/100423) for CPython immediately because <s>I was bored</s> I care about the open source community, especially Python, my favorite (?) programming language.

Surprise! [A bot replied](https://github.com/python/cpython/pull/100423#issuecomment-1362309193) to my pull request and asked me to sign a Contributor License Agreement! That’s pretty cool.

And hey, guess what? [Guido! Approved! My! PR!](https://github.com/python/cpython/pull/100423#pullrequestreview-1227084304)

That’s pretty amazing. I feel honored. For anyone who doesn’t know, [Guido van Rossum](https://en.wikipedia.org/wiki/Guido_van_Rossum) is the creator of Python! He was the Benevolent Dictator For Life (BDFL, weird title?) of Python until he resigned in July 2018. Apparently he still participates and actively contributes to Python!

Now, my bugfix is out in Python 3.10 to 3.12. If you use the newest version, you can already see my patch in `typing.py` ! 😀
