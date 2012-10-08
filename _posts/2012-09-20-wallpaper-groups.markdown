---
layout: post
title: Group Theory for Fun and Profit
categories: [WebGL, JavaScript, PhiloGL, Math]
---

![Wallpaper group example](/blog/assets/wallpaper/wallpaper.png)

Sometime earlier this year I started reading (for the third time) [Conway's book on
quaternions and octonions](http://www.amazon.com/Quaternions-Octonions-John-Horton-Conway/dp/1568811349).
I never finished reading this book the previous times because I would
get hooked with a specific topic mentioned there, do more research on
that and never actually finish the book itself.

So that happened to me this time also. I started reading on symmetry
groups, or [wallpaper groups](http://en.wikipedia.org/wiki/Wallpaper_groups).
Wallpaper groups are two dimensional repetitive patterns obtained by translations, rotations,
reflections and glide reflections. As shown in Conway's book, there are
17 different possible groups:

![Groups](/blog/assets/wallpaper/groups.png)

With the help of my collegue [Bei](http://zhangbei.github.com/) we
built a WebGL application that lets you create your own motifs and then
apply the transformations of these 17 symmetry groups on your drawing. [You can access
the app here!](http://www.senchalabs.org/philogl/PhiloGL/examples/groups/).

Here's a quick video that shows how to use it:

<iframe width="500" height="375" src="http://www.youtube.com/embed/uNbKqv2kO-Y?rel=0" frameborder="0" allowfullscreen="1">
</iframe>


