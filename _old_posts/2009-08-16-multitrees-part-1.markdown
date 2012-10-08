--- 
wordpress_id: 1009
layout: post
title: MultiTrees (Part 1)
categories: [JavaScript InfoVis Toolkit, Visualization]
wordpress_url: /?p=1009
---
I found this CHI 94' visualization paper on <a href="http://www.si.umich.edu/~furnas/Papers/MultiTrees.pdf" target="_blank">MultiTrees</a> in the internet and I've been trying to see what type of applications and ideas I could "borrow" for the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a>.

<h4>What are MultiTrees?</h4>
A MultiTree is a type of directed acyclic graph (DAG) where each node has a tree both as parent structure and as descendants.

For example, a MultiTree can be created by overlapping different tree structures on a set of nodes, as shown in the picture below:

<img src="/blog/assets/multitree.png" style="border: 1px solid cyan; margin: 7px auto; padding: 1px;" />

As you can see MultiTrees can have cycles if they're not directed.

<h4>Laying and Navigating MultiTrees</h4>
What's interesting about this structure is that if we take two nodes <em>x</em> and <em>y</em> such that <em>x &lt;= y</em> and the path connecting them, then we can form a topological tree by adding all descendants and ancestors of each node belonging to that path in the new graph.

<img src="/blog/assets/multitree2.png" style="border: 1px solid cyan; margin: 7px auto; padding: 1px;" />

<h4>Implementation</h4>
I recently pushed support for a small subset of MultiTrees: those where <em>x = y</em>.
This is just a centered node and its tree of descendants and ancestors.

The tree navigation is the same as the SpaceTree:

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/FMI-M7wXFLo&hl=en&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/FMI-M7wXFLo&hl=en&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>

<br />
<br />
<br />

I also implemented a way of changing the current focused node, so that when the clicked node is centered a <em>centrifugal</em> view from that node is adopted.
This way the current selected node is set as root of the visualization.
Hopefully you'll understand the difference between this navigation and the previous one.

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/6BxJDfJ3w2o&hl=en&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/6BxJDfJ3w2o&hl=en&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>

Anyway, as soon as I get this feature fully functional I'll make another post explaining how to use this stuff in the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a>.
