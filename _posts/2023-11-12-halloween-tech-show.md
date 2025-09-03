---
title: "‘alloween Tech Show"
excerpt: "I decided on a technology theme. I wanted to make some kind of gadget that looks cool, and I wanted to wear it on my head (for no reason). "
category: School
tag: Creations
---

> Hi readers! Before today’s content: sorry I haven’t been updating my blog very often in the past few months… I’ve been kind of busy. I’ll try to make up for that!

Halloween is a time for dressing up. But this year, I was tired of buying a costume online, wearing it for one day, and stowing it away in the cupboard never to be used again. I thought, why not be creative and DIY something out of what I have?

I decided on a technology theme. I wanted to make some kind of gadget that looks cool, and I wanted to wear it on my head (for no reason). I took inventory of what I had that i can potentially use:

- An ESP32 board with a 128×64 display (programmable via C or Micropython)
- Two micro:bit v1 boards
- Two Raspberry Pi’s
- A breadboard and a bunch of cables

Initially I wanted to play with the RPis. I toyed with the idea of attaching an extension board with a display and going from there, since it can connect to the internet. However, I realized that I don’t have anything I wanted to do with it, so I let it go.

The ESP32 was nice: it had Wi-Fi and Bluetooth, but it was a pain to code. On Halloween Eve, when I realized I had to make something for my costume, I had no time to program that thing anymore. Also, our school recently started restricting Wi-Fi access by whitelisting MAC addresses, so that can’t really connect to the internet anyway.

So this means I’m left with the micro:bits. I played with them a long time ago, and I’m surprised they still work! The touchpads were a little rusty, but the board powered up with no problems. Then I thought, what will I make with them?

I opened Makecode and looked around the blocks available. There wasn’t much, but I remembered that there’s a “radio” function that allowed micro:bits to talk to each other. An idea started forming in my head…

## Half an hour later

Bam! Here’s my finished code.

![halloween_2023_1.png](/assets/images/posts/halloween_2023_1.png)

Basically, one of the micro:bits is the receiver and the other is the sender. You press “A” repeatedly on the sender to choose an emoji, and press “B” to send it to the other side. Pretty simple, huh? There’s a bit of nuance regarding how to 1) remove the delay of displaying icons and 2) clearing the screen after a few seconds, but I think it’s pretty clear from the screenshot what I did.

And this can’t work without the proper “hardware”! Here’s what I tinkered:

![halloween_2023_2.png](/assets/images/posts/halloween_2023_2.png)

I just needed to wear the cap, hide the other micro:bit in my pocket, and voila! My hat can change its display by magic! There wasn’t even a battery case outside: it’s hidden inside one of the cuts on the cap!

I’m really proud of this thing, especially when it took me only 30 minutes to make. I had lots of fun the next day on Halloween!
