--- 
wordpress_id: 15
layout: post
title: Further work on JIT
categories: [JavaScript InfoVis Toolkit]
wordpress_url: /?p=15
---
I'm very happy with this first JavaScript Infovis Toolkit release, and I'm already working on fixing some known bugs and adding features for the next release of this library.
For the next step I'll be focusing on fixing bugs, refactoring code, adding some features and improving the documentation.
Some of the things you'll find in my TODO list are:
<ul>
<li>For RGraphs:
<ul>
<li style="text-decoration:line-through;">Add polar interpolation in animations.</li>
<li style="text-decoration:line-through;">Mantain Child ordering during transitions.</li>
<li style="text-decoration:line-through;">Change node diameters based on the first dataset object value.</li>
<li style="text-decoration:line-through;">Graph support (trees with cycles...)</li>
</ul>
</li>
<li>For the ST:
<ul>
<li style="text-decoration:line-through;">Code refactoring.</li>
<li style="text-decoration:line-through;">Performance improvements (bind with the Animation object).</li>
<li style="text-decoration:line-through;">Support for IE.</li>
</ul>
</li>
<li>For Hypertrees:
<ul>
<li style="text-decoration:line-through;">Bug fix (node diameters, multilevel display).</li>
<li style="text-decoration:line-through;">Graph support, (although it might be supporting Graph structures already).</li>
</ul>
</li>
<li>Treemaps
<ul>
<li style="text-decoration:line-through;">Bug fix (mostly on computing rectangles dimensions).</li>
</ul>
</li>
</ul>
Before adding some radical features (binding visualizations with real time mutable data, etc.) I really want to have a strong API, and in order to do that, I must do some research on my own. <br />
Don't forget you have some quick <a href="/?p=12">tutorials</a> <a href="/?p=11">on</a> <a href="/?p=10">the</a> <a href="/?p=9">visualizations</a>. Also, the <a href="/blog/assets/jit-1.0a/doc/core/files/Hypertree-js.html" target="_blank">Hypertree</a>, <a href="/blog/assets/jit-1.0a/doc/core/files/Spacetree-js.html" target="_blank">ST</a>, <a href="/blog/assets/jit-1.0a/doc/core/files/RGraph-js.html" target="_blank">RGraph</a> and <a href="/blog/assets/jit-1.0a/doc/core/files/Treemap-js.html" target="_blank">Treemap</a> have some object references. Finally, there's a Google Group about the JIT <a href="http://groups.google.com/group/javascript-information-visualization-toolkit" target="_blank">here</a>.
