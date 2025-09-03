---
title: "Playing videos with a TI-84+ CE"
excerpt: "Yes, it’s weird: People were headed to the moon in 1969, and people are making video players for calculators in 2022…"
category: Programming
tags: [Creations, TI-84+ CE]
---

Yes, it’s weird: People were headed to the moon in 1969, and people are making video players for calculators in 2022…

A quick demo to start off with:

<video muted controls width="100%">
    <source src="/assets/images/posts/video_with_ti84_2.mp4" type="video/mp4">
</video>

This program is open-source on GitHub: <https://github.com/david-why/vplayer>

## Usage

1. Send `bin/VPLAYER.8xp` to your calculator using TI Connect CE or your favorite link software.
2. Convert a video file with `python3 mkvideo.py input.mp4 output.bin`. More parameters are documented in the program help; use `python3 mkvideo.py --help` to see that.
    - Currently supported formats (modes):
        - `0`: Fullscreen video, will lag when loading (the resolution is fixed at 320x240)
        - `1`: GRAPHX video, flexible resolution, find one that fits you (see below for my tests)
3. Format a USB drive with FAT format. ExFAT sometimes works but is not recommended.
4. Create a folder in the root directory named `VPLAYER` and place the converted binary file here.
5. Connect your USB drive to the calculator and run the program (`Asm(prgmVPLAYER`).
6. Select a video file and enjoy!

## Beginning

### — How did I get this idea?

This idea first came into my mind when I saw [this](https://www.cemetech.net/downloads/files/1449/x1449) on Cemetech. (If you don’t yet know what it is, try it out, it’s really fun!) I thought, if ONE video can get into this calculator, why can’t a fully functional video player be made?

I’ve been fiddling with the FATDRVCE pre-release of the CE C toolchain for a while now, so I connected the dots and said, “Hey, why don’t I make a video player that reads from a USB drive?”

And so I did.

## The Technical Process

### — How did I make it?

The first obstacle: Video codec.

I am too lazy to figure out the MP4 or whatever video format codec, so I set my hands on making one for the calculator.

It is a really simple uncompressed video format: 320×240 pixels (the resolution of the calculator), each pixel in RGB565 format taking 2 bytes.

To convert the videos, I wrote a Python script converting any video to this format (I called it Format0). It was pretty straightforward: It uses OpenCV2 to get the frames out of the video, resizes them with PIL, and writes the RGB565 data into the Format0 file.

With some inspection on the resulting binary file, I think it looks pretty good.

So I made a video player that reads the file directly to the VRAM, 320x240x2 bytes at a time.

I soon realized a HUGE problem: the USB read is not fast enough. There seems to be a line coming down from the top of the screen that represents how fast the file is loading.

<video muted controls width="100%">
    <source src="/assets/images/posts/video_with_ti84_3.mp4" type="video/mp4">
</video>

Not willing to study the whole USB protocol and write my own USB library, I decided to take another aproach: reduce the video size.

## Improving

### — How did I get rid of that stupid line?

The GRAPHX library is another one that I have used a lot. So I thought, “Hey, why don’t I take advantage of GRAPHX’s 256 color palette and reduce the video size by half?”

And I did.

In what I call Format1, I used a 160×120 resolution and the GRAPHX 256 color palette. It reduced the video size by a factor of 1/8. Sounds good to me.

In the Python conversion script, I used convimg to covnert PNG images to GRAPHX-formatted binary files. It worked out pretty well.

This results in the video shown at the beginning of the post.

However, the framerate is stuck at about 4: if it goes higher, the video starts to lag.

A quick inspection of the code revealed a problem: I used sleep functions instead of adjusting the sleep value based on the time took to load and display the frame. After correcting that, the framerate improved more, to about 8 FPS.

### — Exactly how high FPS can this thing get?

I wanted to answer this question but without making the video quality TOO unbearable. So I settled on the resolution of 80×60. Although the video quality is much worse, I successfully increased the FPS to 16. This is the result:

<video muted controls width="100%">
    <source src="/assets/images/posts/video_with_ti84_4.mp4" type="video/mp4">
</video>

I am satified by this result. I think it’s good enough.

## Conclusion

This is a really interesting program. Playing videos on a calculator? WOW. What a revolutionary technology. (reference to billwurtz?)

This whole project utilizes C++, the CE C Toolchain, the GRAPHX and FATDRVCE libraries, Python, OpenCV, and PIL. That’s a lot of things for a small project like this 😉

`prgmVPLAYER` is by no means perfect, there are still so many things to improve:

- Audio is currently not supported by the player. However I do not plan on adding this support because, heck, I don’t wanna fry my little chip to put a speaker inside.
- The quality is still pretty low; if an FPS of ~15 is needed, the maximum resolution you an use before it lags is about 80×60. This might be solved by using a better graphics library? I don’t know.

If you have any questions and/or suggestions, please leave me a comment below!
