--- 
wordpress_id: 1651
layout: post
title: JavaScript InfoVis Toolkit + WebGL
categories: [JavaScript InfoVis Toolkit, WebGL, OpenGL]
wordpress_url: /?p=1651
---
This is just a quick post to tell you that I started <a href="http://github.com/philogb/jit">adding WebGL support</a> to the <a href="http://thejit.org/">JavaScript InfoVis Toolkit</a>. Things are quite stable in the repo and if you have a WebGL enabled browser you can start playing around with some Force-Directed 3D demos in the project. I also made a short video of it:

<object width="500" height="400"><param name="movie" value="http://www.youtube.com/v/3qo6EqwWmS0?fs=1&amp;hl=en_US&amp;rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/3qo6EqwWmS0?fs=1&amp;hl=en_US&amp;rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="400"></embed></object> 

WebGL support is important because:

<ul>
<li>
Just like with 2D Canvas, this is something that will be implemented by major browsers in the next couple of years.
</li>
<li>
It's the right way to do 3D, since 2D Canvas is very inefficient and generally is where the bottleneck of 3D rendering happens.
</li>
<li>
If possible, WebGL can use the <a href="http://en.wikipedia.org/wiki/Graphics_processing_unit">GPU</a> to render graphics. That means that there's a way to radically scale the number of nodes being rendered by the visualizations. We can take advantage of this even for 2D visualizations, since they also can be rendered through WebGL.
</li>
</ul>

I will continue working on integrating WebGL into the JavaScript InfoVis Toolkit by:
<ul>
<li>
Adding WebGL rendering support to 2D visualizations.
</li>
<li>
Adapting the Event module to handle mouse/touch events on 3D visualizations.
</li>
<li>
Adapting the Navigation module to handle 3D navigation. 
</li>
</ul>

I'm aware that Chromium has been working on adding <a href="http://blog.chromium.org/2010/09/unleashing-gpu-acceleration-on-web.html">GPU support for 2D Canvas rendering</a>, something that could be thought as the backend for what I'd be implementing in the front-end, but don't get confused, this is quite different for a couple of reasons: I don't like to depend on browser vendors if I can provide a feature that can target more users, and besides 2D Canvas remains a 2D drawing API, as opposed to WebGL that is more open to doing 2D and 3D and much more flexible in many other aspects (think shaders!).

I will try to find the time to do this, considering that I'm still organizing lots of things to move to California.

But there it is, an interesting roadmap, and a good amount of code pushed to start dashing items on the list.
