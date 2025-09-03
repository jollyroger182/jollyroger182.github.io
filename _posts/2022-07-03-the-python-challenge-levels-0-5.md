---
title: "The Python Challenge (Levels 0-5)"
excerpt: "The Python Challenge (http://www.pythonchallenge.com) is an interesting coding challenge. I remember trying it when I was just in about first grade and getting super, super frustrated because I can’t even get past the first few levels."
category: Programming
tags: [The Python Challenge, Python]
---

The Python Challenge (<http://www.pythonchallenge.com>) is an interesting coding challenge. I remember trying it when I was just in about first grade and getting super, super frustrated because I can’t even get past the first few levels.

Now, after learning more Python and (hopefully) being more experienced, let’s try again!

## Level #0

<http://www.pythonchallenge.com/pc/def/0.html>

Title: warming up

An image is seen on the page, and a hint:

> ![calc.jpg](/assets/images/posts/calc.jpg)
>
> Hint: try to change the URL address.

OK…

**Input:**
```python
2 ** 38
```
**Output:**
```python
274877906944
```

Seems easy enough.

## Level #1

<http://www.pythonchallenge.com/pc/def/274877906944.html>

Redirect to: <http://www.pythonchallenge.com/pc/def/map.html>

Title: What about making trans?

There is an image, a caption, and some text:

> ![map.jpg](/assets/images/posts/map.jpg)
>
> everybody thinks twice before solving this.
>
> g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr’q ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc spj.

This is slightly more interesting…

K -> M, O -> Q, E -> G? That is shifting 2 letters down the alphabet!

Meddling around a bit with methods of `str`, and looking at the page title, I came up with this solution:

**Input:**
```python
import string
c = string.ascii_lowercase
t = str.maketrans(c, c[2:]+c[:2])
s = "g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc spj."
s.translate(t)
```
**Output:**
```python
"i hope you didnt translate it by hand. thats what computers are for. doing it in by hand is inefficient and that's why this text is so long. using string.maketrans() is recommended. now apply on the url."
```

Sure… On the URL:

*By the way, `string.maketrans` was renamed `str.maketrans` in Python 3 (I believe?) and no longer requires you to `import string`!*

**Input:**
```python
'map'.translate(t)
```
**Output:**
```python
'ocr'
```

## Level #2
<http://www.pythonchallenge.com/pc/def/ocr.html>

Title: ocr

There is an image and a caption/hint:

> ![](/assets/images/posts/ocr.jpg)
>
> recognize the characters. maybe they are in the book, but MAYBE they are in the page source.

OCR stands for Optical Character Recognition, which is recognizing characters from an image. That’s what the URL is hinting at. However, the page told me to look at the page source…

… and here is what it looks like:

```html
<!--
find rare characters in the mess below:
-->

<!--
%%$@_$^__#[...]
-->
```

Wow. “Find rare characters in the mess below.” It really IS a mess, but not too much that a little Python cannot solve!

**Input:**
```python
import requests
r = requests.get('http://www.pythonchallenge.com/pc/def/ocr.html')
s = ''.join(r.text.splitlines()[37:-2])
l = ''
d = {}
for c in s:
    if c in d:
        d[c] += 1
    else:
        d[c] = 1
        l += c
l, d
```
**Output:**
```python
('%$@_^#)&!+]*}[({equality',
 {'%': 6104,
  '$': 6046,
  '@': 6157,
  '_': 6112,
  '^': 6030,
  '#': 6115,
  ')': 6186,
  '&': 6043,
  '!': 6079,
  '+': 6066,
  ']': 6152,
  '*': 6034,
  '}': 6105,
  '[': 6108,
  '(': 6154,
  '{': 6046,
  'e': 1,
  'q': 1,
  'u': 1,
  'a': 1,
  'l': 1,
  'i': 1,
  't': 1,
  'y': 1})
```

“equality”.

## Level #3

<http://www.pythonchallenge.com/pc/def/equality.html>

Title: re

There is an image and a caption:

> ![bodyguard.jpg](/assets/images/posts/bodyguard.jpg)
>
> One small letter, surrounded by EXACTLY three big bodyguards on each of its sides.

Looking at the page source:

```html
<html>
<head>
  <title>re</title>
  <link rel="stylesheet" type="text/css" href="../style.css">
</head>
[...]
</html>
<!--
kAewtloYgcFQaJNhHVGxXDiQmzjfcpYbzxlWrVcqsmUbCunkfxZWDZjUZMiGqhRRiUvGmYmvnJIHEmbT
MUKLECKdCthezSYBpIElRnZugFAxDRtQPpyeCBgBfaRVvvguRXLvkAdLOeCKxsDUvBBCwdpMMWmuELeG
ENihrpCLhujoBqPRDPvfzcwadMMMbkmkzCCzoTPfbRlzBqMblmxTxNniNoCufprWXxgHZpldkoLCrHJq
vYuyJFCZtqXLhWiYzOXeglkzhVJIWmeUySGuFVmLTCyMshQtvZpPwuIbOHNoBauwvuJYCmqznOBgByPw
TDQheAbsaMLjTmAOKmNsLziVMenFxQdATQIjItwtyCHyeMwQTNxbbLXWZnGmDqHhXnLHfEyvzxMhSXzd
BEBaxeaPgQPttvqRvxHPEOUtIsttPDeeuGFgmDkKQcEYjuSuiGROGfYpzkQgvcCDBKrcYwHFlvPzDMEk
MyuPxvGtgSvWgrybKOnbEGhqHUXHhnyjFwSfTfaiWtAOMBZEScsOSumwPssjCPlLbLsPIGffDLpZzMKz
jarrjufhgxdrzywWosrblPRasvRUpZLaUbtDHGZQtvZOvHeVSTBHpitDllUljVvWrwvhpnVzeWVYhMPs
kMVcdeHzFZxTWocGvaKhhcnozRSbWsIEhpeNfJaRjLwWCvKfTLhuVsJczIYFPCyrOJxOPkXhVuCqCUgE
luwLBCmqPwDvUPuBRrJZhfEXHXSBvljqJVVfEGRUWRSHPeKUJCpMpIsrVMuCmDTZPcAezRnyRTJkYyXk
oLEmjtaCsKmNOKNHygTixMKNaSifidWNbeZYYHCGMtgJiTSlzRMjzOAMuhmYwincvBydQMDPaZclRsYU
SeEnkclzGopkBozDQfXrQqHjRvlAQsijPCsrnUawvyskbTAnjctFftReVrIBFBKiLSFGmrLSrcnZKfOU
wnCGYaMNKNhadSGMXwBaefDrMXoNeJsUaSGlWgttAqovosuhyBWwqQLkVKnRseXaaPwrMtdWjGiVXPvd
[...]
-->
```

That’s… a lot of letters.

Looking at the title… `re`? As in, RegExp? Nice… I have a solution!

**Input:**
```python
import re
r = requests.get('http://www.pythonchallenge.com/pc/def/equality.html')
s = ''.join(r.text.splitlines()[21:-1])
''.join(re.findall(r'[^A-Z][A-Z]{3}([a-z])[A-Z]{3}[^A-Z]', s))
```
**Output:**
```
'linkedlist'
```

At <http://www.pythonchallenge.com/pc/def/linkedlist.html>:

> linkedlist.php

## Level #4

<http://www.pythonchallenge.com/pc/def/linkedlist.php>

Title: follow the chain

There is an image with a link on it:

> ![chainsaw.jpg](/assets/images/posts/chainsaw.jpg)

And the link points to <http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing=12345>…

> and the next nothing is 44827

<http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing=44827>:

> and the next nothing is 45439

<http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing=45439>:

> Your hands are getting tired and the next nothing is 94485

Got it. It’s a linked list.

**Input:**
```python
n = '12345'
while True:
    try:
        r = requests.get('http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing=%s' % n)
    except Exception as e:
        print('ERROR:', repr(e))
        break
    print(r.text, end=' ')
    n = r.text.rpartition(' ')[-1]
    print('nothing:', n)
    if not n.isdigit():
        print('nothing is not digit!')
        print(n)
        break
```
**Output:**
```
and the next nothing is 44827 nothing: 44827
and the next nothing is 45439 nothing: 45439
<font color=red>Your hands are getting tired </font>and the next nothing is 94485 nothing: 94485
and the next nothing is 72198 nothing: 72198
and the next nothing is 80992 nothing: 80992
and the next nothing is 8880 nothing: 8880
and the next nothing is 40961 nothing: 40961
and the next nothing is 58765 nothing: 58765
-- SNIP --
and the next nothing is 54249 nothing: 54249
and the next nothing is 29247 nothing: 29247
and the next nothing is 13115 nothing: 13115
and the next nothing is 23053 nothing: 23053
and the next nothing is 3875 nothing: 3875
and the next nothing is 16044 nothing: 16044
Yes. Divide by two and keep going. nothing: going.
nothing is not digit!
going.
```

Hey what? SERIOUSLY?! I did not actually expect that `not isdigit` will run…

I guess I underestimated the difficulty of the level… Let’s continue!

**Input:**
```python
n = 16044//2
while True:
    try:
        r = requests.get('http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing=%s' % n)
    except Exception as e:
        print('ERROR:', repr(e))
        break
    print(r.text, end=' ')
    n = r.text.rpartition(' ')[-1]
    print('nothing:', n)
    if not n.isdigit():
        print('nothing is not digit!')
        print(n)
        break
```
**Output:**
```
and the next nothing is 25357 nothing: 25357
and the next nothing is 89879 nothing: 89879
and the next nothing is 80119 nothing: 80119
and the next nothing is 50290 nothing: 50290
and the next nothing is 9297 nothing: 9297
and the next nothing is 30571 nothing: 30571
and the next nothing is 7414 nothing: 7414
-- SNIP --
and the next nothing is 40396 nothing: 40396
and the next nothing is 49574 nothing: 49574
and the next nothing is 82682 nothing: 82682
There maybe misleading numbers in the 
text. One example is 82683. Look only for the next nothing and the next nothing is 63579 nothing: 63579
and the next nothing is 37278 nothing: 37278
and the next nothing is 53548 nothing: 53548
and the next nothing is 66081 nothing: 66081
and the next nothing is 67753 nothing: 67753
-- SNIP --
and the next nothing is 75635 nothing: 75635
and the next nothing is 52899 nothing: 52899
and the next nothing is 66831 nothing: 66831
peak.html nothing: peak.html
nothing is not digit!
peak.html
```

OK… Finally. peak.html.

## Level #5

<http://www.pythonchallenge.com/pc/def/peak.html>

Title: peak hell

There is an image and a caption:

> ![peakhell.jpg](/assets/images/posts/peakhell.jpg)
>
> pronounce it

In the source:

> <peakhell src=”banner.p”/>

and

> peak hell sounds familiar ?

Peak hell… Peak hell… Peekell… `Pickle`? Is the banner.p pickled data?

**Input:**
```python
import pickle
r = requests.get('http://www.pythonchallenge.com/pc/def/banner.p')
d = pickle.loads(r.content)
type(d), len(d), d[0]
```
**Output:**
```
(list, 23, [(' ', 95)])
```

It sure is! But what is it?

`banner.p`… Reminds me of the `banner` program on *nix systems:

```bash
$ banner hello

 #    #  ######  #       #        ####
 #    #  #       #       #       #    #
 ######  #####   #       #       #    #
 #    #  #       #       #       #    #
 #    #  #       #       #       #    #
 #    #  ######  ######  ######   ####
```

Hash signs and spaces… Same as the data! So the data must be a banner…

The first item is the character, and the second item is the amount?

**Input:**
```python
for x in d:
    for v in x:
        print(v[0] * v[1], end='')
    print()
```
**Output:**
```bat
              #####                                                                      ##### 
               ####                                                                       #### 
               ####                                                                       #### 
               ####                                                                       #### 
               ####                                                                       #### 
               ####                                                                       #### 
               ####                                                                       #### 
               ####                                                                       #### 
      ###      ####   ###         ###       #####   ###    #####   ###          ###       #### 
   ###   ##    #### #######     ##  ###      #### #######   #### #######     ###  ###     #### 
  ###     ###  #####    ####   ###   ####    #####    ####  #####    ####   ###     ###   #### 
 ###           ####     ####   ###    ###    ####     ####  ####     ####  ###      ####  #### 
 ###           ####     ####          ###    ####     ####  ####     ####  ###       ###  #### 
####           ####     ####     ##   ###    ####     ####  ####     #### ####       ###  #### 
####           ####     ####   ##########    ####     ####  ####     #### ##############  #### 
####           ####     ####  ###    ####    ####     ####  ####     #### ####            #### 
####           ####     #### ####     ###    ####     ####  ####     #### ####            #### 
 ###           ####     #### ####     ###    ####     ####  ####     ####  ###            #### 
  ###      ##  ####     ####  ###    ####    ####     ####  ####     ####   ###      ##   #### 
   ###    ##   ####     ####   ###########   ####     ####  ####     ####    ###    ##    #### 
      ###     ######    #####    ##    #### ######    ###########    #####      ###      ######
                                                                                               
```

And I’m right! It’s a banner that says “channel”!

The Python Challenge is really fun… and challenging!

Are you ready to get challenged?

That’s it for today, more coming later!
