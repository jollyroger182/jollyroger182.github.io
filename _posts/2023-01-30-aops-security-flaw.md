---
title: "Art of Problem Solving security flaw!"
excerpt: "An email I sent to Art of Problem Solving(AoPS). It details a security flaw in AoPS’s online classrooms, which allowed impersonating anyone in the classroom."
category: Programming
---

> In the AoPS classroom (https://artofproblemsolving.com/classroom/room/XXX), when a user joins a room, the server fires a “room-joined” event to the client. The event data contains all the users, but the user session id is also sent.
> 
> ![aops_flaw_1.png](/assets/images/posts/aops_flaw_1.png)
> 
> This session id is, in fact, the same as the session id stored in the “aopssid” cookie.
> 
> ![aops_flaw_2.png](/assets/images/posts/aops_flaw_2.png)
> 
> Then, if a malicious user simply replaces their session id cookie, they might be able to impersonate another AoPS user. Please verify this problem, and if it exists, it is a big security flaw, and please fix it.
> 

The above is an email I sent to Art of Problem Solving (AoPS, <https://artofproblemsolving.com>). It details a security flaw in AoPS’s online classrooms, which allowed impersonating anyone in the classroom.

AoPS classrooms are special. There is no video-/audio-based classroom; all classes are done in a chat room, where teachers and students send text messages to teach and learn. Classrooms use the [Socket.IO](https://socket.io/) protocol to transmit data between the server and the client, including chat messages, user leaving/joining events, etc. Sounds nice, right?

Now, as I said above in the email, when the user joins a chatroom (classroom), the server sends a signal to the client with initial data about the classroom, such as chat history, current users, etc. That’s still fine. However, included in the user data is a session ID!

The fact that a user’s session ID is sent to all users is absurd. It’s almost like the server is sending the password of the user to everyone! Just to make sure that this session ID is the authorization method, I checked my cookies. Sure enough, the cookie “aopssid” stores the exact same string as the session ID broadcasted to all users!

Realizing what I found out, I immediately contacted AoPS Technical Support, describing the bug (I guess?). They fixed it soon afterward, but all I got was a template reply saying that my concerns were forwarded to the responsible department 🙁 But that’s fine, I know that I am the reason why it got fixed. 🙂
