--- 
wordpress_id: 891
layout: post
title: The JavaScript InfoVis Toolkit 1.1 is Out!
categories: [JavaScript InfoVis Toolkit, Version]
wordpress_url: /?p=891
---
After several months of hard work I can finally announce version 1.1 of the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a>.

<h4>What's the JavaScript InfoVis Toolkit?</h4>
The <a href="http://thejit.org">JavaScript InfoVis Toolkit</a> provides tools for creating Interactive Data Visualizations for the Web.

<h4>What's new in this version?</h4>
<ul>
<li>A new <a href="http://thejit.org">project page</a> where you can access all things related to this library: <a href="http://thejit.org/docs/files/Core-js.html">documentation</a>, <a href="http://thejit.org">demos</a>, tutorials, <a href="http://blog.thejit.org">this blog</a>, etc.</li>
<li>A complete <a href="http://thejit.org/docs/files/Core-js.html">API documentation</a> generated with Natural Docs, with some Narrative Documentation and Syntax Highlighted Code Examples.</li>
<li>A <a href="http://thejit.org/demos">Demos</a> page where you can find some interactive library examples and you can browse through the examples code.</li>
<li>The <a href="http://thejit.org">JavaScript InfoVis Toolkit</a> is now hosted at <a href="http://github.com/philogb/jit/tree/master">GitHub</a>, so you can fork it and do whatever you like with it. You can also report bugs with the new <a href="http://github.com/philogb/jit/issues">issue tracker.</a></li>
</ul>

<b>Code-Related</b>
<ul>
<li>The library has been split into <a href="http://github.com/philogb/jit/tree/85ffb5383a3d1adf675e62d139011f96a1793999/Source"><b>modules</b></a> for code reuse.</li>
<li>All visualizations are packaged in the same file. You can create multiple instances of any visualization. Moreover, you can <b>combine</b> and <b>compose</b> visualizations. If you want to know more take a look at the <em>Advanced</em> <a href="http://thejit.org/demos">Demos</a>.</li>
<li>
This Toolkit is <b>library agnostic</b>. This means that you can combine this toolkit with your favorite DOM/Events/Ajax framework such as Prototype, MooTools, ExtJS, YUI, JQuery, etc.
</li>
<li>
You can <b>extend</b> this library in many ways by adding or overriding class methods. The JavaScript InfoVis Toolkit has a robust (and private) class system, heavily inspired by MooTools', that allows you to implement new methods in the same class without having to define any new Class extension. By creating mutable classes you can add new custom Node and Edge rendering functions pretty easily.
</li>
<li>
<b>Custom</b> visualizations are created by adding or changing Node/Edge colors, shapes, rendering functions, etc. You can also implement many controller methods that are triggered at different stages of the animation, like <em>onBefore/AfterPlotLine</em>, <em>onBefore/AfterCompute</em>, <em>onBefore/AfterPlotNode</em>, <em>request</em>, etc. 
You can also add new Animation transitions like <em>Elastic</em> or <em>Back</em> with <em>easeIn/Out</em> transitions.
If you want to know more about these features please take a look at the <a href="http://thejit.org/demos">Demos</a> code.
</li>
</ul>

As you can see, this new version has been built with four concepts/goals in mind: Modularity, Customization, Composition and Extensibility. I already explained some of these things in the <a href="/2009/05/21/more-about-the-javascript-infovis-toolkit-11/">previous post</a>.

Hope you enjoy it.
