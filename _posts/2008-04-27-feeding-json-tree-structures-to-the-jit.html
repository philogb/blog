--- 
wordpress_id: 7
layout: post
categories: [JavaScript InfoVis Toolkit]
title: Feeding JSON tree structures to the JIT
wordpress_url: http://blogngb.woot.com.ar/?p=7
---
The tree structure that feeds the spacetree, hypertree, treemap and rgraph visualizations is always the same.
Roughly speaking, the JSON tree structure consists of tree nodes, each having as properties:

<ul>
<li>
<b>id</b> a <b>unique</b> identifier for the node.
</li>
<li>
<b>name</b> a node's name.
</li>
<li>
<b>data</b> The data property contains a <em>dataset</em>. That is, an array of key-value objects defined by the user. Roughly speaking, this is where you can put some extra information about your node. You'll be able to access this information at different stages of the computation of the JIT visualizations by using a controller.
</li>
<li>
<b>children</b> An array of children nodes, or an empty array if the node is a leaf node.
</li>
</ul>

For example,

{% highlight js %}
var json = {
  "id": "aUniqueIdentifier",
  "name": "usually a nodes name",
  "data": [
      {key:"some key",       value: "some value"},
    {key:"some other key", value: "some other value"}
  ],
  children: [/* other nodes or empty */]
};
{% endhighlight %}

<h3>About datasets:</h3>
Sometimes some <em>dataset</em> objects are read by the JIT classes to perform proper layouts.
For example, the treemap class reads the first object's value for each node's <em>dataset</em> to perform calculations about the dimensions of the rectangles laid.
Also, if you enable the <em>Config.Color.allow</em> property, the treemap will add colors on the layout, and these colors will be based on your second <em>dataset</em> object value.
RGraphs and Hyperbolic Trees also read the first <em>dataset</em> object value in order to compute node diameters and angular widths, when setting <em>Config.allowVariableNodeDiameters = true</em>.

That's all for now. I recommend you to read the <a href="/?p=8">On controllers</a> section and then some <a href="/2008/05/07/st-quick-tutorial/">spacetree</a>, <a href="/2008/05/07/hypertree-quick-tutorial/">hypertree</a>, <a href="/2008/05/07/treemap-quick-tutorial/">treemap</a> or <a href="/2008/05/07/rgraph-quick-tutorial/">RGraph</a> tutorials.
