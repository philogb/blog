--- 
wordpress_id: 1476
layout: post
title: News from the JavaScript InfoVis Toolkit 2.0 World
categories: [JavaScript InfoVis Toolkit]
wordpress_url: /?p=1476
---
We're not that far. Not at all. I was actually going to write some completion percentage, but I think I'll just leave that as a mystery and surprise you when the time comes. But until then... some videos from the 2.0 world!

<h4>Animated TreeMaps</h4>
In order to show some of the new features I've been writing a simple example with TreeMap animations. TreeMap animations are integrated into the built-in classes of the Toolkit, but you can also create your own animations by altering either built-in Node/Edge params, or also canvas specific styles like shadows.

Here's a short video of an Animated TreeMap, it also has animations when switching layouts. I think it's better seen in fullscreen.

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/KaEvu5YRwLk&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/KaEvu5YRwLk&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>

<h4>Zooming and Panning</h4>
The new Event system allows many customizations, such as Dragging and Dropping nodes, (right)clicking native Canvas nodes, etc. This will be the subject of a longer post, since there is a lot of machinery involving Native Canvas, SVG and HTML events, event delegation, etc. I've also been working in making a modular Canvas class enabling canvas background extensions.

Some of these changes had some desirable effects, such as enabling Panning and Zooming in a generic way, across all visualizations, as can be seen in this video:

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/CpXpAiZT1n0&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/CpXpAiZT1n0&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>

<h4>A Force Directed Example</h4>
These features can be combined into useful and interesting examples. This Force Directed example uses the new Event system, zooming, panning and animations to make a complete graph editing tool. These are some of the graph interactions that can be made with the JavaScript InfoVis Toolkit (also better seen in fullscreen):

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/gSdlgRSEy_s&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/gSdlgRSEy_s&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>


I hope you liked it. I know I'm having a great time working in this project. 

I'll be back with more updates.
