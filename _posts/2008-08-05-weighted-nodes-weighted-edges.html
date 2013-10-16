--- 
wordpress_id: 20
layout: post
title: Weighted nodes, weighted edges
categories: [JavaScript InfoVis Toolkit]
wordpress_url: /?p=20
---
I've been doing some work on the <a href="http://thejit.org" target="_blank">JIT</a> lately, fixing some bugs and adding some new features.
Some important changes to mention are:

<ul>
<li>
A complete refactoring of the Spacetree. That code was not clear. I also binded the ST to the Animation object used by the Hypertree and RGraph. This allows it to have <em>easeIn</em> and <em>easeOut</em> transitions. I also updated the <a href="/blog/assets/jit-1.0a/doc/core/files/Spacetree-js.html">documentation for this class</a>. 
Main functionality is now packaged under the Tree Class, making a good distinction between generic code (say Tree.Util for example) and more specific code (like the Tree.Geometry object, or Tree.Label).
Here's the old <a href="/blog/assets/jit-1.0a/examples/spacetree.html">example</a> of an "infinite" spacetree, done with the "new code".  
</li>
<li>
Hypertree and RGraphs can now handle weighted nodes and edges in trees and graphs. The same goes for the Spacetree, although I have not tested that yet.

<b>Weighted nodes:</b>
This goes only for the RGraph and the Hypertree, since I don't see a clear representation of weighted nodes in the Spacetree, and the Treemap already represents weight either with size or color.
Weighted nodes are enabled when setting <em>Config.allowVariableNodeDiameters = <b>true</b></em>. 
Remember what a <em>dataset</em> is? A dataset is a reference to the property <em>data</em> of a JSON node representation. There you can store data by appending <em>{ key:'someKey', value:'someValue'}</em> objects to the <em>data</em> array property.
The value of the first object of the data property will be taken in account to calculate the nodes diameters. You will also want to specify two properties of the config object, the <em>nodeRangeDiameters</em> property:

{% highlight js %}
    //Property: nodeRangeDiameters
    //Diameters range. For variable node weights.
    nodeRangeDiameters: {
      min: 10,
      max: 35
    },
{% endhighlight %}

Which specifies the specific range of your nodes diameters. Nodes will range from 10px to 35px as default. The other property is the <em>nodeRangeValues</em>:

{% highlight js %}
    //Property: nodeRangeValues
    // The interval of the values of the first object of your dataSet.
    // A superset of the values can also be specified.
    nodeRangeValues: {
      min: 1,
      max: 35
    },
{% endhighlight %}

You'll need to specify range values for your first dataset object value. This is all the information we need to know in order to plot a RGraph or Hypertree with weighted nodes. Here's an <a href="/blog/assets/jit-1.0a/examples/hypertree2.html">example</a> of a K6 Hypergraph with variable node diameters (and weighted edges).

<b>A note on usability</b>
There's an extra property for the Hypertree Config object called <em>Config.transformNodes</em>. When applying a moebius transformation of the tree (that is, when the tree moves), tree nodes and edges change their proportion. This is not a good feature if you're planning to add weighted nodes in your Hypertree, since they will be deformed and thus the user won't be able to tell which node is bigger than which. You can set this property to false when using weighted nodes on your visualization.

<b>Weighted edges</b>
Two new methods have been included in the controller object, these are <em>onBeforePlotLine(adj);</em> and <em>onAfterPlotLine(adj);</em>. Both receive an <b>adjacency</b> object, which has the following structure:

{% highlight js %}
var adj = {
  nodeFrom: ""/* A node connected with this adjacence */,
  nodeTo: ""/* Other node connected with this adjacence */,
  data: { //An object storing your custom information.
    weight: w
  }
};{% endhighlight %}

Use the two controller methods to change the canvas <em>lineWidth</em> property or the stroke color (more information on that <a href="http://developer.mozilla.org/en/docs/Canvas_tutorial:Applying_styles_and_colors">here</a>). For example,

{% highlight js %}
/* some code... */

 var rgraph= new RGraph(canvas,  {
    //Use onBeforePlotLine and onAfterPlotLine controller
    //methods to adjust your canvas lineWidth
    //parameter in order to plot weighted edges on 
    //your graph. You can also change the color of the lines.
    onBeforePlotLine: function(adj) {
        lineW = canvas.getContext().lineWidth;
        canvas.getContext().lineWidth = adj.data.weight;
    },
    
    onAfterPlotLine: function(adj) {
        canvas.getContext().lineWidth = lineW;
    },
    

/* some other code*/
{% endhighlight %}

<b id="extended-graph-structure">Ok, but how do I store edge weights?</b>
The JSON Graph structure has been extended to the following form (notice that the old Graph structure is still accepted).

{% highlight js %}
var json = [
{
  "id": "aUniqueIdentifier",
  "name": "usually a nodes name",
  "data": [
      {key:"some key",       value: "some value"},
    {key:"some other key", value: "some other value"}
  ],
  "adjacencies": [
  {
    nodeTo:"aNodeId",
    data: {} //put whatever you want here  
  }
  //more objects like these...
  ]
} /* ... more nodes here ... */ ];

{% endhighlight %}

<b>JSON Tree structures</b>
For JSON Trees is simpler. If you have a Node A and B is a child of A, then store in Bs dataset a property concerning the weight of the edge A-B. These nodes will be stored in the <em>adj</em> object <em>onBeforePlotLine</em> and <em>onAfterPlotLine</em>. You can access them by doing <em>adj.nodeFrom</em> and <em>adj.nodeTo</em>.

Here's an <a href="/blog/assets/jit-1.0a/examples/rgraph2.html">example</a> of a K6 RGraph with weighted nodes and edges.
</li>
<li>
The last example also shows a new feature for the RGraph, <b>polar interpolation</b>. You will notice that node transitions are different from previous examples. You can change the interpolation by setting <em>Config.interpolation</em> to <em>'polar'</em> or <em>'linear'</em>. I'll make a more detailed explanation for polar interpolation in some other post. If you want to know more about the cool features of the paper inspiring the RGraph, you can see <a href="/2008/06/02/animated-exploration-of-graphs-with-radial-layout-video/">this post</a>.
</li>
<li> 
<b>API Changes</b>
These features introduced an api change that has already been updated in all tutorials, although I have not checked for errors yet (will do today and/or tomorrow). You should not set the <em>controller</em> property from the ST, RGraph, Treemaps and Hypertree instances. That is,  you can't do:

{% highlight js %}
var st = new ST(canvas);
st.controller = ; //the controller object
{% endhighlight %}

Instead, you should do:

{% highlight js %}
var st = new ST(canvas, controller);
{% endhighlight %}
</li>
<li>
I updated all examples packaged with the library, also adding the two K6 examples showed above. Code that depends on the Mootools library (that is, the example files and the Treemap visualization) has been updated to the final <b>1.2</b> version of the <b>Mootools</b> library. This library is shipped as an extra with the JIT.
</li>
</ul>
Special thanks to Rene Becker for pointing bugs and Daniel Herrero for suggesting cool performance improvements.
Remember that you can post any question, suggestion or comment on the <a href="http://groups.google.com/group/javascript-information-visualization-toolkit">JIT google group</a>.

<b><a href="/blog/assets/jit.zip" target="_blank">Get the library already!</a></b>
Bye!
