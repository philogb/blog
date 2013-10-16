--- 
wordpress_id: 1332
layout: post
title: Voronoi Tessellation
categories: [JavaScript, Visualization]
wordpress_url: /?p=1332
---
This is going to be the first of a couple of posts related to Voronoi Tessellations, Centroidal Voronoi Tessellations and Voronoi TreeMaps. In this post I'll explain what a Voronoi Tessellation is, what can it be used for, and also I'll describe an interesting algorithm for creating a Voronoi Tessellation given a set of points (or sites as I'll call them from now on).

<h4>What is a Voronoi Tessellation?</h4>

<img src="/blog/assets/voronoitessellation.png" style="border: 1px solid cyan; padding: 3px; margin: 5px 13px 5px 0pt; float: left;" />

Given a set <em>P := {p1, ..., pn}</em> of sites, a Voronoi Tessellation is a subdivision of the space into <em>n cells</em>, one for each site in <em>P</em>, with the property that a point <em>q</em> lies in the cell corresponding to a site <em>pi</em> iff <em>d(pi, q) &lt; d(pj, q)</em> for <em>i</em> distinct from <em>j</em>. The segments in a Voronoi Tessellation correspond to all points in the plane equidistant to the two nearest sites.
Voronoi Tessellations have <a href="http://en.wikipedia.org/wiki/Voronoi_diagram#Applications">applications</a> in computer science, chemistry, etc. but I'm most interested in Voronoi Diagrams for constructing Voronoi TreeMaps (more on that in later posts).

<h4>How do I create a Voronoi Tessellation?</h4>

One algorithm for creating Voronoi Tessellations was discovered by <a href="http://ect.bell-labs.com/who/sjf/">Steven Fortune</a> in 1986. 

This algorithm is described as a plane sweep algorithm. Fortune's Algorithm maintains both a <em>sweep line</em> (in red) and a <em>beach line</em> (in black) which move through the plane as the algorithm progresses. 

<img src="/blog/assets/Fortunes-algorithm.gif" style="border: 1px solid cyan; padding: 3px; margin-left:100px;" />

The structures used in this algorithm are an EventQueue, EdgeList and a binary Tree that tracks the state of the beach line.

The EventQueue stores two distinct type of events that are related to changes in the beach line. These events happen when:
<ul>
<li>A site <em>s</em> crosses the sweep line: in this case a new parabola with minimum at <em>s</em> is added to the beach line. A Voronoi Edge is born.</li>
<li>A circle that touches three sites staying behind the sweep line is found and is tangent to the sweep line (see image below). A Voronoi Vertex is found.</li>
</ul>
 
<img src="/blog/assets/fort2.png" style="border: 1px solid cyan; padding: 3px; margin: 7px auto; clear:both;" />

At each of these stages the EdgeList is updated until the algorithm is completed.

<h4>Implementations</h4>
I haven't found any interesting implementation of this algorithm in JavaScript. Actually, I didn't find a working implementation of this algorithm in JavaScript. There's <a href="http://www.raymondhill.net/voronoi/voronoi.php">this version</a> of a JavaScript applet for making Voronoi Tessellations, but it doesn't seem to work right (the corners of the image generally hold two or more sites in the same cell). Also, the code was based in a C# implementation and <a href="http://www.raymondhill.net/voronoi/voronoi.js">isn't very pretty</a>. Then there's <a href="http://jtauber.com/blog/2008/11/27/voronoi_canvas_tutorial_part_i/">this blog</a> that mentions the algorithm but there's no visible implementation, just a JQuery demo that animates parabolas when a mouse crosses a site, but no Voronoi Diagram.

So I made my own implementation, which I tried to make as similar as possible to the original C implementation from Steven Fortune. If you click on the image you can <a href="/blog/assets/voronoijs/voronoi.html">see it in action</a>. Just refresh the page for new Voronoi Tessellations of random positioned sites.

<a href="/blog/assets/voronoijs/voronoi.html" style="text-decoration:none;">
<img src="/blog/assets/voronoiimpl.png" style="border: 1px solid cyan; padding: 3px; margin: 7px auto; clear:both;" />
</a> 

Any comments or advices about how to make this implementation better are welcomed!
