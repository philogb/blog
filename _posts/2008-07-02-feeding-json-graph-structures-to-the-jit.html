--- 
wordpress_id: 19
layout: post
title: Feeding JSON graph structures to the JIT
categories: [JavaScript InfoVis Toolkit]
wordpress_url: /?p=19
---
Version <a href="/blog/assets/jit.zip" target="_blank">1.0.3a</a> of the JIT allows you to load graph structures to the RGraph and Hypertree objects. I chose a different JSON structure for graphs, since JSON tree structures don't seem conceptually suitable for this task.
Hypertree and RGraph objects have a new method called <b>loadGraphFromJSON(json [,i])</b> that takes a graph structure (described below) and optionally an index to set a particular node as root for the visualization. Please refer to the <a href="/blog/assets/jit-1.0a/doc/core/files/RGraph-js.html#RGraph.loadGraphFromJSON" target="_blank">documentation for more information</a>.
<h4>The graph structure</h4>
The JSON graph structure is an array of nodes, each having as properties:
<ul>
<li><b>id</b> a <b>unique</b> identifier for the node.</li>
<li><b>name</b> a node's name.</li>
<li><b>data</b> The data property contains a <em>dataset</em>. That is, an array of key-value objects defined by the user. Roughly speaking, this is where you can put some extra information about your node. You'll be able to access this information at different stages of the computation of the JIT visualizations by using a controller.
</li>
<li><b>adjacencies</b> An array of strings each representing a nodes id.
</ul>

For example,

{% highlight js %}
var json = [
{
  "id": "aUniqueIdentifier",
  "name": "usually a nodes name",
  "data": [
      {key:"some key",       value: "some value"},
    {key:"some other key", value: "some other value"}
  ],
  "adjacencies": ["anotherUniqueIdentifier", "yetAnotherUniqueIdentifier" /* ... */]
} /* ... more nodes here ... */ ];
{% endhighlight %}

I did a small <a href="/blog/assets/jit-1.0a/examples/rgraph2.html" target="_blank">example</a> of a K6 rendered with a RGraph. The JSON graph structure used for this example is:

<div style="height:300px;overflow:scroll;">

{% highlight js %}var json= [
    {"id":"node0",
     "name":"node0 name",
     "data":[
        {"key":"some key",
         "value":"some value"},
        {"key":"some other key",
         "value":"some other value"}],
     "adjacencies":["node1","node2","node3","node4","node5"]},
    {"id":"node1",
     "name":"node1 name",
     "data":[
        {"key":"some key",
         "value":"some value"},
        {"key":"some other key",
         "value":"some other value"}],
     "adjacencies":["node0","node2","node3","node4","node5"]},
    {"id":"node2",
     "name":"node2 name",
     "data":[
        {"key":"some key",
         "value":"some value"},
        {"key":"some other key",
         "value":"some other value"}],
     "adjacencies":["node0","node1","node3","node4","node5"]},
    {"id":"node3",
     "name":"node3 name",
     "data":[
        {"key":"some key",
         "value":"some value"},
        {"key":"some other key",
         "value":"some other value"}],
     "adjacencies":["node0","node1","node2","node4","node5"]},
    {"id":"node4",
     "name":"node4 name",
     "data":[
        {"key":"some key",
         "value":"some value"},
        {"key":"some other key",
         "value":"some other value"}],
     "adjacencies":["node0","node1","node2","node3","node5"]},
    {"id":"node5",
     "name":"node5 name",
     "data":[
        {"key":"some key",
         "value":"some value"},
        {"key":"some other key",
         "value":"some other value"}],
     "adjacencies":["node0","node1","node2","node3","node4"]}];
{% endhighlight %}
</div>

You can post any question at the <a href="http://groups.google.com/group/javascript-information-visualization-toolkit">google group</a> for this project.
Enjoy!
