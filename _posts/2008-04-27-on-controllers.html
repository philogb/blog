--- 
wordpress_id: 8
layout: post
title: On controllers
categories: [JavaScript InfoVis Toolkit]
wordpress_url: http://blogngb.woot.com.ar/?p=8
---
Controllers are a straightforward way to customize the JavaScript infovis toolkit (JIT) visualizations.
 A controller is a JavaScript object that "implements" an interface. The interface methods will then be called at different stages of the visualization, allowing you to, for example, place labels and add event handlers to them, performing actions before and after the animation, making ajax - calls to load data dynamically to the tree, etc.

The controller interface is defined as:
 
 {% highlight js %}
 var ControllerInterface = {
 
       onCreateLabel: function (domElement, node) {},

       onPlaceLabel: function (domElement, node) {},

       onBeforePlotLine: function(adj) {},

       onAfterPlotLine: function(adj) {},

       onBeforeCompute: function (node) {},

       onAfterCompute: function () {}

       request: function(nodeId, level, onComplete) {},

 };
 {% endhighlight %}

where:

<ul>
 <li>
 <b>onCreateLabel(domElement, node)</b> is a method that receives the label dom element as first parameter, and the homologue JSON tree node as second parameter. This method will only be called on label creation. Note that a JSON tree node is a node from the input tree you provided to the visualization. If you don't know what kind of JSON tree format is used to feed the visualizations, you should take a look at my other post first, <a href="/?p=7">feeding JSON tree structures to the JIT</a>. This method proves useful when adding events to the labels used by the JIT.
 </li>
<li>
<b>onPlaceLabel(domElement, node)</b> is a method that receives the label dom element as first parameter and the homologue JSON tree node as second parameter. This method is called each time a label has been placed on the visualization, and thus it allows you to update the labels properties, such as size or position. Note that <em>onPlaceLabel</em> will be triggered after updating positions to the labels. That means that, for example, the <em>left</em> and <em>top</em> css properties are allready updated to match the nodes positions.
</li>
<li>
<b>onBeforePlotLine(adj)</b> is called right before plotting an edge. It provides an <a href="/blog/assets/jit-1.0a/doc/core/files/Hypertree-js.html#Graph.Adjacence">adjacence object</a> <em>adj</em>. This object contains two important properties, <em>adj.nodeFrom</em> and <em>adj.nodeTo</em> which contain the <a href="/blog/assets/jit-1.0a/doc/core/files/Hypertree-js.html#Graph.Node">graph nodes</a> connected by this edge. You can also assign extra information in an adjacency object, by using the <b>data</b> property. This can be done when assigning weighted graph JSON structures to the visualizations. To know more about weighted nodes and edges please check <a href="/2008/08/05/weighted-nodes-weighted-edges/">this post</a>. 
</li>
<li>
<b>onAfterPlotLine(adj)</b> behaves exactly like <em>onBeforePlotLine</em> except that this method is called right after plotting the <b>adj</b> edge. This method can be useful to restore a lineWidth state you've previously changed <em>onBeforePlotLine</em>.
</li>
<li>
<b>onBeforeCompute(node)</b> is a method called right before performing all computation and animations to the JIT visualization. In the case of treemaps this method will be called after entering or exiting a tree level. In the case of Hyperbolic trees, RGraphs and Spacetrees, this method will be triggered right before perfoming an animation.
For Treemap visualizations, the <em>node</em> parameter corresponds to the root node of the subtree which will be laid out.
For the Spacetree, Hypertree and RGraph visualizations, the <em>node</em> parameter corresponds to the actual node being clicked or centered on the canvas.
</li>
<li>
<b>onAfterCompute()</b> is a method triggered right after all animations or computations for the JIT visualizations ended.
</li>
<li>
<b>request(nodeId, level, onComplete)</b> is a method only used by the Treemap and Spacetree visualizations. You can use this method to "bufferize" information, so that not all the JSON tree structure is loaded at once. The <em>nodeId</em> parameter is the node actually being requested, the <em>level</em> parameter is the level of the subtree being requested, and the onComplete handler is a function you <b>must</b> call after performing your request. A common structure for the <em>request</em> method could be

 {% highlight js %}
  request: function(nodeId, level, onComplete) {
    var data; 
                //make a request call to fill the data object and on complete do:
    onComplete(nodeId, data);
  },
{% endhighlight %}

</li>
</ul>

Note that you should not declare any of these methods on your controller object if you are not going to use them.
Note also that is not mandatory to provide a controller object to the main classes.
You can find some example uses for the controller object at the spacetree, hypertree, treemap and rgraph tutorials.
Be sure to know what JSON structure feeds the JIT visualizations before you read the tutorials.
Hope it was helpful.
