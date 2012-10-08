--- 
wordpress_id: 37
layout: post
title: Graph Operations
categories: [JavaScript InfoVis Toolkit]
wordpress_url: /?p=37
---
I've been working on the <a href="http://thejit.org/">JavaScript Infovis Toolkit</a> lately, fixing bugs, working on performance improvements and adding a new feature for Spacetrees, Hyperbolic Trees and RGraphs that I've found very interesting.

<h4>Mutable data</h4>
The <a href="http://thejit.org">JavaScript Infovis Toolkit</a> is a JS Information Visualization library that includes <a href="/blog/assets/jit-1.0a/examples/rgraph.html">radial layout of trees with animations</a>, <a href="/blog/assets/jit-1.0a/examples/treemap.html">Treemaps</a>, <a href="/blog/assets/jit-1.0a/examples/hypertree.html">Hyperbolic Trees</a> and <a href="/blog/assets/jit-1.0a/examples/spacetree.html">Spacetrees</a>.

Not so long ago I worked on adapting these tree layouts to support graph layouts as well, also including weighted nodes and edges, as you can see in <a href="/blog/assets/jit-1.0a/examples/rgraph2.html">this example</a>.

However, one of the most challenging features I wanted to add to these visualizations was the possibility of dealing with mutable data. This way visualizations would also be useful to show how data changes over time, and updates to this data would be translated into smooth animations from one state of the graph to another.

The user could also interact at a deeper level with the visualizations, not only exploring the data, but also <em>altering</em> it, making updates to the information and seeing the results in real time.


<h4>The GraphOp object</h4>

The first thing that came into my mind when thinking on adding support for mutable data was prototyping the <b>addSubtree</b> and <b>removeSubtree</b> methods.
These operations seem suitable for the <a href="/blog/assets/jit-1.0a/examples/spacetree.html">Spacetree</a>, (and have been <a href="/blog/assets/jit-1.0a/doc/core/files/Spacetree-js.html#ST.addSubtree">implemented</a> for this visualization), but what about applying transformations to graphs?
Since the <a href="http://thejit.org">JIT</a> adds support for graphs and trees in the <a href="/blog/assets/jit-1.0a/examples/rgraph2.html">RGraph</a> and <a href="/blog/assets/jit-1.0a/examples/hypertree2.html">Hyperbolic Tree</a> visualizations, both use cases should be well covered: adding and deleting subtrees as well as adding/deleting nodes, edges, and performing more general binary graph operations, such as <a href="http://mathworld.wolfram.com/GraphSum.html">graph sum</a> and the one which I'm most proud of, <em>morphing</em>.

So this <a href="/blog/assets/jit.zip" target="_blank">new release</a> of the library comes with the <a href="/blog/assets/jit-1.0a/doc/core/files/Spacetree-js.html#Tree.Util.addSubtree">addSubtree</a> and <a href="/blog/assets/jit-1.0a/doc/core/files/Spacetree-js.html#ST.removeSubtree">removeSubtree</a> methods for the Spacetree, and also with the <a href="/blog/assets/jit-1.0a/doc/core/files/RGraph-js.html#GraphOp">GraphOp</a> object for the Hypertree and RGraph visualizations, which includes unary and binary operations such as:
<ul>
<li>
<b>removeNode</b> Multiple nodes can be removed from the visualization. You can choose up to four different animations for doing that.
</li>
<li>
<b>removeEdge</b> Multiple edges can be removed from the visualization. Supports many animations also.
</li>
<li>
<b>sum</b> Performs a sum of two graphs, morphing the result with sequential or concurrent animations of movement and fading.
</li>
<li>
<b>morph</b> A very useful operation in which you specify the resulting graph, and the visualization morphs the current graph state into that one.
</li>
</ul>


<h4>Examples</h4>
I chose to make two <em>real life</em> examples. With <em>real life</em> I mean small apps that not only show the potential of these graph operations, but can also be actually useful to explore.



<b>1.- Linux module dependency visualizer</b>
It uses the RGraph visualization with the morphing operation to show dependencies between different modules you might find with the <em>apt-get</em> tool.
When clicking on a node you'll set this node as root. <em>Then</em> the graph will perform a <b>second animation</b>, updating the dependencies for the new centered module. 
Many details about the package are also provided under the <b>Details</b> toggler. You can also go to previous visited modules by using the <b>History</b> toggler.

These examples load data dynamically, so please be patient when loading the data.

<a class="linknone" href="http://demos.thejit.org/example/rgraph/example1/"><img style="border: 1px solid orange; padding: 3px; margin: 5px 13px 45px 0; float: left;" src="/blog/assets/rgraph.png" alt="rgraph" /></a>
<div style="clear:both;"></div>
<b>2.- Visualizing relations between artists and bands dinamically</b>
Just as the old demos I made an app that relates bands and artists by common performances on bands, discs, songs, etc.
Clicking on a label will set the node as root. <em>Then</em> a <b>second animation</b> will take place, morphing the tree into the new node's perspective.

Just as the previous example, you can find some information about the artists in the <b>Details</b> toggler. You can also browse previous visited nodes by clicking in the <b>History</b> toggler.

<a class="linknone" href="http://demos.thejit.org/example/hypertree/example1/"><img style="border: 1px solid orange; padding: 3px; margin: 5px 13px 35px 0; float: left;" src="/blog/assets/hypertree.png" alt="hypertree" /></a>


All tutorials and posts have been updated for this new <a href="/blog/assets/jit.zip" target="_blank">release</a>. You can find more information in the <a href="http://thejit.org">project page</a> and in the <a href="http://groups.google.com/group/javascript-information-visualization-toolkit">google group</a>.

Although this library is still in alpha, some companies and products are already using it, such as <a href="http://www.opencrx.org/opencrx/2.1/new.htm">OpenCRX</a> and <a href="http://www.platform.com/">Platform Computing</a>.

I'll be writing a more technical overview of these features in further posts. 

Hope you liked it :)
