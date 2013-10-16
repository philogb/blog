--- 
wordpress_id: 719
layout: post
title: More about the JavaScript InfoVis Toolkit 1.1
categories: [JavaScript InfoVis Toolkit]
wordpress_url: /?p=719
---
I've been putting a lot of effort in the upcoming version of the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a> lately, and I though it would be a good idea to show some of the new features I came up with.

The new version isn't finished yet, but I've come pretty far and wanted to make a sort of checkpoint for the things I've done, the things I'll be doing and the things I'm thinking about doing.

So what have I been working on?

<ul>
<li><b>A new project page</b> design.</li>
<li><b>A complete documentation</b>. I made an API documentation that is also mixed with some narrative documentation for each Class, so you can learn how the visualizations are implemented and how to use them.
</li>
<li><b>Packaging</b> All visualizations will be packaged in the same file, and you'll be able to make your own build based on what you're going to use (Treemaps, Hypertrees, RGraphs, Spacetrees or any combination of those). This is a cool aspect of making modular code.
The other good thing about modular code is that the size of the full package will drop in ~30% compared to version 1.0.8a</li>

<li><b>Examples</b> I've been coding some new visualization examples that will be packaged with the library. Some of them are very similar to the ones found in 1.0.8a, but adapted for version 1.1. Other examples show some of the new features of the library, and others try to expose some features of version 1.0.8a that were not properly documented.</li>
</ul>

<h4>Library features</h4>
I've been building this library with four things in mind:

<ul>
<li>
<b>Extensibility</b> The library has multiple access points where it can be extended in different ways. For example, all main Classes are mutable objects, so you can extend or implement any method of any class in-place, like for example re-implement the nodes coloring method in the Squarified treemap:

{% highlight js %}
   //TM.Strip, TM.SliceAndDice also work  
   TM.Squarified.implement({  
     'setColor': function(json) {  
       return json.data.$color;  
     }  
   });  
{% endhighlight %}

...or adding new node/edge plotting methods in the Hypertree, ST or RGraph:

{% highlight js %}
Hypertree.Plot.NodeTypes.implement({
  'my-node-rendering-method': function(node, canvas) {
    //implement node rendering here
  }
});
{% endhighlight %}

etc.
</li>
<li>
<b>Customization</b> The library provides many ways for customizing the visualizations. There are controller methods that determine the behavior of the visualization, and configuration parameters like node and edge types, color and dimensions. Node shapes can be <em>square</em>, <em>rectangle</em>, <em>circle</em>, <em>ellipse</em>, etc. and edge shapes: <em>line</em>, <em>hyperline</em> and <em>arrow</em>. I also added transition effects like <em>Quart</em>, <em>Bounce</em>, <em>Elastic</em>, <em>Back</em>, etc. for the animations.
</li>
<li>
<b>Modularity</b> As explained above, the code has been divided into modules, providing a way for making custom builds of the library. Modularity also takes care of namespacing: I only add Classes that are meant to be accessed by the user and I don't pollute the window object with unnecessary global objects.
</li>
<li>
<b>Composition</b> A major improvement in this version is that all visualizations can co-exist in the same namespace. That means that multiple instances of different visualizations can be used and composed to make new visualizations. I haven't explored this feature of the library yet, but this would mean that for example I can make a Treemap that has Hypertrees rendered as leaves, or a Spacetree that has Treemaps as nodes, or... well, any other combination of things.
</li>
</ul>

<h4>Examples</h4>
As you might know, I don't have the most suited computer for making screencasts, so sorry if you see some performance problems.

This is a short video I made of a RGraph example.

The main idea behind this example is <b>Customization</b>. 
That can be seen for example in the different <em>node types</em>, <em>edge types</em> and <em>colors</em> used, as well as in the <em>Elastic transition effect</em> for the animation.

This is just an example to expose as much features as I can in one visualization, so don't take this as a "useful" visualization example please.

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/W44BoFoO_vk&hl=en&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/W44BoFoO_vk&hl=en&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>
<br /><br />

Here is another short video: it illustrates how Graph Operations can be made with the Hypertree visualization.

You'll see 4 consecutive operations:
<ol>
<li><b>Removing a subtree</b> The bottom right subtree will be removed with an animation.</li>
<li><b>Removing edges</b> Edges from the top left subtree will be removed with an animation.</li>
<li><b>Adding a graph</b> A graph will be added with an animation</li>
<li><b>Morphing</b> The graph will transform into another graph -with an animation</li>
</ol>
<br /><br />
<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/p7jUTBWlz0Q&hl=en&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/p7jUTBWlz0Q&hl=en&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>

Enjoy.
