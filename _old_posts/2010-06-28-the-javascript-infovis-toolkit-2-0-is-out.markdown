--- 
wordpress_id: 1492
layout: post
title: The JavaScript InfoVis Toolkit 2.0 is out!
categories: [JavaScript InfoVis Toolkit, Version]
wordpress_url: /?p=1492
---
After more than a year of hard work I'm proud to announce the release of the <a target="_blank" href="http://thejit.org">JavaScript InfoVis Toolkit 2.0</a>!

<h4>What's the JavaScript InfoVis Toolkit?</h4>
The <a target="_blank" href="http://thejit.org">JavaScript InfoVis Toolkit</a> provides web standard based tools to create interactive data visualizations for the Web.

<h4>What's new in this version?</h4>
This version introduces radical new features, an API redesign and new visualizations. If you don't want to read the whole article and just want to play with the examples you can go to <a href="http://thejit.org/demos/" target="_blank">the demos page</a>.

<h4>New Visualizations</h4>
With this version of the Toolkit the number of available visualizations has doubled. Some of the new visualizations are the AreaChart, BarChart and PieChart, which were described in more detail in <a href="/2010/04/24/new-javascript-infovis-toolkit-visualizations/">this article</a>. I've also added Sunburst and Force-Directed visualizations. I wrote about these visualizations before <a href="/2009/10/05/sunburst-visualization/">here</a> and <a href="/2009/09/30/force-directed-layouts/">here</a>. I also want to thank <a href="http://quux.com.ar" target="_blank">Pablo Flouret</a>, who contributed most of the code for the Icicle visualization, also a new addition to the toolkit.

You can play now with these visualizations at the <a href="http://thejit.org/demos/">demos page</a>!

<h4>Features common to all visualizations</h4>
I've also enhanced all visualizations with new configuration options that enable new features. These features are:

<ul>
<li><em>Panning</em> and <em>zooming</em> across all visualizations.</li>
<li>A new <em>event system</em> that enables you to attach events to DOM elements or to native canvas nodes and also add support for <em>touch events</em>, <em>drag and drop</em>, etc.</li>
<li><em>Complex animations</em> have the ability to animate <b>any style property</b> of a node, edge or label. There is also support for animating canvas specific properties like shadowBlur, shadowColor, fillStyle, etc.</li>
</ul>

<h4>A new TreeMap visualization</h4>
The underlying rendering functions in the TreeMap visualization have changed. While in prior versions of the Toolkit the TreeMap was DOM-based, this new version renders the TreeMap entirely in Canvas. This enables you to add custom nodes of any shape or nature you like (can be images, circles, polygons) and also to take advantage of the new animation engine of the toolkit to add smooth transitions for the drill-down. These new things can be tested at the TreeMap section in the <a target="_bank" href="http://thejit.org/demos/">demos page</a>.

<h4>API Redesign</h4>
The old API was too low level. Before creating any visualization you had to manually create a Canvas widget and pass it as parameter to the visualization class. Also, many other parameters like width and height of the canvas were required. For Background canvases the API had a couple of flaws, and it wasn't clear how to use it either. Many of these things have been solved with the new API design. The Canvas class became an inner class implicitly created when making a new visualization. Width and height of the canvas are set to the container's <em>offsetWidth</em> and <em>offsetHeight</em> if they're not provided, and background canvases are easier to attach to the visualization.
Most of all, there is now a single global object in the library: <b>$jit</b>. This declares the namespace for the library and makes sure you won't have conflicts with <em>any other JavaScript library</em>.

<h4>A new Website</h4>
Last but not least, I worked on a <a href="http://thejit.org/">website redesign</a>, taking advantage of the new HTML5/CSS3 features supported by major browsers. There's also a detailed <a href="http://thejit.org/docs/">documentation page</a> to get you started.

<h4>It's alpha</h4>
Finally I'd like to say that this is an <em>alpha</em> version. There are lots of known bugs and <b>I'm counting on you</b> to <a href="http://github.com/philogb/jit">report bugs, send fixes, and collaborate in any aspect of the toolkit</a>.

<h4>Thanks</h4>
To <a href="http://quux.com.ar">Pablo Flouret</a> for contributing code to the toolkit, and to my wife, <a href="http://sourberries.tumblr.com/">Luz Caballero</a> for making me happy.

Now go get the <a href="http://thejit.org/">Toolkit</a>!
