--- 
wordpress_id: 11
layout: post
title: ST quick tutorial
categories: [JavaScript InfoVis Toolkit, Visualization, Tutorial]
wordpress_url: http://blogngb.woot.com.ar/?p=11
---
<em>This tutorial requires you to have read <a href="/?p=7">Feeding JSON tree structures to the JIT</a> and <a href="/?p=8">on controllers</a> first</em>.

**Note:** I'll be using Mootools for this tutorial. However, this visualization can be used without the Mootools library. You can find a Mootools build in the <em>extras folder</em> of the library.

Hi, this is going to be a quick tutorial on how to set the ST up and running.

We are going to work with this tree JSON structure:

<div style="height:300px;overflow:scroll;">

{% highlight js %}var json = {"id":"node02",
 "name":"0.2",
 "data":[
    {"key":"key1",
     "value":2},
    {"key":"key2",
     "value":-86}],
 "children":[
    {"id":"node13",
     "name":"1.3",
     "data":[
        {"key":"key1",
         "value":7},
        {"key":"key2",
         "value":73}],
     "children":[
        {"id":"node24",
         "name":"2.4",
         "data":[
            {"key":"key1",
             "value":2},
            {"key":"key2",
             "value":-49}],
         "children":[
            {"id":"node35",
             "name":"3.5",
             "data":[
                {"key":"key1",
                 "value":8},
                {"key":"key2",
                 "value":-10}],
             "children":[
                {"id":"node46",
                 "name":"4.6",
                 "data":[
                    {"key":"key1",
                     "value":10},
                    {"key":"key2",
                     "value":74}],
                 "children":[]},
                {"id":"node47",
                 "name":"4.7",
                 "data":[
                    {"key":"key1",
                     "value":3},
                    {"key":"key2",
                     "value":-37}],
                 "children":[]}]},
            {"id":"node38",
             "name":"3.8",
             "data":[
                {"key":"key1",
                 "value":8},
                {"key":"key2",
                 "value":88}],
             "children":[
                {"id":"node49",
                 "name":"4.9",
                 "data":[
                    {"key":"key1",
                     "value":2},
                    {"key":"key2",
                     "value":-67}],
                 "children":[]},
                {"id":"node410",
                 "name":"4.10",
                 "data":[
                    {"key":"key1",
                     "value":10},
                    {"key":"key2",
                     "value":38}],
                 "children":[]},
                {"id":"node411",
                 "name":"4.11",
                 "data":[
                    {"key":"key1",
                     "value":5},
                    {"key":"key2",
                     "value":-77}],
                 "children":[]}]}]},
        {"id":"node212",
         "name":"2.12",
         "data":[
            {"key":"key1",
             "value":3},
            {"key":"key2",
             "value":-99}],
         "children":[
            {"id":"node313",
             "name":"3.13",
             "data":[
                {"key":"key1",
                 "value":9},
                {"key":"key2",
                 "value":48}],
             "children":[
                {"id":"node414",
                 "name":"4.14",
                 "data":[
                    {"key":"key1",
                     "value":8},
                    {"key":"key2",
                     "value":-19}],
                 "children":[]},
                {"id":"node415",
                 "name":"4.15",
                 "data":[
                    {"key":"key1",
                     "value":10},
                    {"key":"key2",
                     "value":61}],
                 "children":[]},
                {"id":"node416",
                 "name":"4.16",
                 "data":[
                    {"key":"key1",
                     "value":2},
                    {"key":"key2",
                     "value":83}],
                 "children":[]}]},
            {"id":"node317",
             "name":"3.17",
             "data":[
                {"key":"key1",
                 "value":4},
                {"key":"key2",
                 "value":-18}],
             "children":[
                {"id":"node418",
                 "name":"4.18",
                 "data":[
                    {"key":"key1",
                     "value":9},
                    {"key":"key2",
                     "value":-58}],
                 "children":[]},
                {"id":"node419",
                 "name":"4.19",
                 "data":[
                    {"key":"key1",
                     "value":6},
                    {"key":"key2",
                     "value":-35}],
                 "children":[]},
                {"id":"node420",
                 "name":"4.20",
                 "data":[
                    {"key":"key1",
                     "value":1},
                    {"key":"key2",
                     "value":84}],
                 "children":[]},
                {"id":"node421",
                 "name":"4.21",
                 "data":[
                    {"key":"key1",
                     "value":1},
                    {"key":"key2",
                     "value":19}],
                 "children":[]}]}]},
        {"id":"node222",
         "name":"2.22",
         "data":[
            {"key":"key1",
             "value":7},
            {"key":"key2",
             "value":-3}],
         "children":[
            {"id":"node323",
             "name":"3.23",
             "data":[
                {"key":"key1",
                 "value":9},
                {"key":"key2",
                 "value":-53}],
             "children":[
                {"id":"node424",
                 "name":"4.24",
                 "data":[
                    {"key":"key1",
                     "value":4},
                    {"key":"key2",
                     "value":63}],
                 "children":[]},
                {"id":"node425",
                 "name":"4.25",
                 "data":[
                    {"key":"key1",
                     "value":8},
                    {"key":"key2",
                     "value":38}],
                 "children":[]},
                {"id":"node426",
                 "name":"4.26",
                 "data":[
                    {"key":"key1",
                     "value":5},
                    {"key":"key2",
                     "value":84}],
                 "children":[]}]}]}]},
    {"id":"node127",
     "name":"1.27",
     "data":[
        {"key":"key1",
         "value":4},
        {"key":"key2",
         "value":34}],
     "children":[
        {"id":"node228",
         "name":"2.28",
         "data":[
            {"key":"key1",
             "value":6},
            {"key":"key2",
             "value":-8}],
         "children":[
            {"id":"node329",
             "name":"3.29",
             "data":[
                {"key":"key1",
                 "value":4},
                {"key":"key2",
                 "value":-48}],
             "children":[
                {"id":"node430",
                 "name":"4.30",
                 "data":[
                    {"key":"key1",
                     "value":3},
                    {"key":"key2",
                     "value":-64}],
                 "children":[]},
                {"id":"node431",
                 "name":"4.31",
                 "data":[
                    {"key":"key1",
                     "value":6},
                    {"key":"key2",
                     "value":-79}],
                 "children":[]},
                {"id":"node432",
                 "name":"4.32",
                 "data":[
                    {"key":"key1",
                     "value":2},
                    {"key":"key2",
                     "value":18}],
                 "children":[]}]},
            {"id":"node333",
             "name":"3.33",
             "data":[
                {"key":"key1",
                 "value":1},
                {"key":"key2",
                 "value":96}],
             "children":[
                {"id":"node434",
                 "name":"4.34",
                 "data":[
                    {"key":"key1",
                     "value":4},
                    {"key":"key2",
                     "value":32}],
                 "children":[]},
                {"id":"node435",
                 "name":"4.35",
                 "data":[
                    {"key":"key1",
                     "value":3},
                    {"key":"key2",
                     "value":-52}],
                 "children":[]}]},
            {"id":"node336",
             "name":"3.36",
             "data":[
                {"key":"key1",
                 "value":6},
                {"key":"key2",
                 "value":81}],
             "children":[
                {"id":"node437",
                 "name":"4.37",
                 "data":[
                    {"key":"key1",
                     "value":4},
                    {"key":"key2",
                     "value":-51}],
                 "children":[]},
                {"id":"node438",
                 "name":"4.38",
                 "data":[
                    {"key":"key1",
                     "value":9},
                    {"key":"key2",
                     "value":14}],
                 "children":[]},
                {"id":"node439",
                 "name":"4.39",
                 "data":[
                    {"key":"key1",
                     "value":8},
                    {"key":"key2",
                     "value":18}],
                 "children":[]},
                {"id":"node440",
                 "name":"4.40",
                 "data":[
                    {"key":"key1",
                     "value":7},
                    {"key":"key2",
                     "value":-3}],
                 "children":[]}]},
            {"id":"node341",
             "name":"3.41",
             "data":[
                {"key":"key1",
                 "value":9},
                {"key":"key2",
                 "value":-56}],
             "children":[
                {"id":"node442",
                 "name":"4.42",
                 "data":[
                    {"key":"key1",
                     "value":10},
                    {"key":"key2",
                     "value":56}],
                 "children":[]},
                {"id":"node443",
                 "name":"4.43",
                 "data":[
                    {"key":"key1",
                     "value":6},
                    {"key":"key2",
                     "value":-90}],
                 "children":[]},
                {"id":"node444",
                 "name":"4.44",
                 "data":[
                    {"key":"key1",
                     "value":10},
                    {"key":"key2",
                     "value":-64}],
                 "children":[]},
                {"id":"node445",
                 "name":"4.45",
                 "data":[
                    {"key":"key1",
                     "value":7},
                    {"key":"key2",
                     "value":-82}],
                 "children":[]}]}]},
        {"id":"node246",
         "name":"2.46",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":-16}],
         "children":[
            {"id":"node347",
             "name":"3.47",
             "data":[
                {"key":"key1",
                 "value":8},
                {"key":"key2",
                 "value":-41}],
             "children":[
                {"id":"node448",
                 "name":"4.48",
                 "data":[
                    {"key":"key1",
                     "value":7},
                    {"key":"key2",
                     "value":17}],
                 "children":[]},
                {"id":"node449",
                 "name":"4.49",
                 "data":[
                    {"key":"key1",
                     "value":7},
                    {"key":"key2",
                     "value":24}],
                 "children":[]},
                {"id":"node450",
                 "name":"4.50",
                 "data":[
                    {"key":"key1",
                     "value":6},
                    {"key":"key2",
                     "value":-11}],
                 "children":[]},
                {"id":"node451",
                 "name":"4.51",
                 "data":[
                    {"key":"key1",
                     "value":1},
                    {"key":"key2",
                     "value":-77}],
                 "children":[]}]},
            {"id":"node352",
             "name":"3.52",
             "data":[
                {"key":"key1",
                 "value":8},
                {"key":"key2",
                 "value":20}],
             "children":[
                {"id":"node453",
                 "name":"4.53",
                 "data":[
                    {"key":"key1",
                     "value":5},
                    {"key":"key2",
                     "value":20}],
                 "children":[]},
                {"id":"node454",
                 "name":"4.54",
                 "data":[
                    {"key":"key1",
                     "value":6},
                    {"key":"key2",
                     "value":77}],
                 "children":[]},
                {"id":"node455",
                 "name":"4.55",
                 "data":[
                    {"key":"key1",
                     "value":2},
                    {"key":"key2",
                     "value":52}],
                 "children":[]},
                {"id":"node456",
                 "name":"4.56",
                 "data":[
                    {"key":"key1",
                     "value":3},
                    {"key":"key2",
                     "value":41}],
                 "children":[]}]},
            {"id":"node357",
             "name":"3.57",
             "data":[
                {"key":"key1",
                 "value":2},
                {"key":"key2",
                 "value":-17}],
             "children":[
                {"id":"node458",
                 "name":"4.58",
                 "data":[
                    {"key":"key1",
                     "value":2},
                    {"key":"key2",
                     "value":4}],
                 "children":[]}]},
            {"id":"node359",
             "name":"3.59",
             "data":[
                {"key":"key1",
                 "value":10},
                {"key":"key2",
                 "value":-79}],
             "children":[
                {"id":"node460",
                 "name":"4.60",
                 "data":[
                    {"key":"key1",
                     "value":10},
                    {"key":"key2",
                     "value":-55}],
                 "children":[]},
                {"id":"node461",
                 "name":"4.61",
                 "data":[
                    {"key":"key1",
                     "value":4},
                    {"key":"key2",
                     "value":92}],
                 "children":[]},
                {"id":"node462",
                 "name":"4.62",
                 "data":[
                    {"key":"key1",
                     "value":10},
                    {"key":"key2",
                     "value":-40}],
                 "children":[]},
                {"id":"node463",
                 "name":"4.63",
                 "data":[
                    {"key":"key1",
                     "value":4},
                    {"key":"key2",
                     "value":57}],
                 "children":[]}]}]},
        {"id":"node264",
         "name":"2.64",
         "data":[
            {"key":"key1",
             "value":3},
            {"key":"key2",
             "value":91}],
         "children":[
            {"id":"node365",
             "name":"3.65",
             "data":[
                {"key":"key1",
                 "value":5},
                {"key":"key2",
                 "value":-51}],
             "children":[
                {"id":"node466",
                 "name":"4.66",
                 "data":[
                    {"key":"key1",
                     "value":6},
                    {"key":"key2",
                     "value":50}],
                 "children":[]},
                {"id":"node467",
                 "name":"4.67",
                 "data":[
                    {"key":"key1",
                     "value":2},
                    {"key":"key2",
                     "value":16}],
                 "children":[]}]},
            {"id":"node368",
             "name":"3.68",
             "data":[
                {"key":"key1",
                 "value":9},
                {"key":"key2",
                 "value":50}],
             "children":[
                {"id":"node469",
                 "name":"4.69",
                 "data":[
                    {"key":"key1",
                     "value":10},
                    {"key":"key2",
                     "value":-22}],
                 "children":[]},
                {"id":"node470",
                 "name":"4.70",
                 "data":[
                    {"key":"key1",
                     "value":5},
                    {"key":"key2",
                     "value":-71}],
                 "children":[]}]}]},
        {"id":"node271",
         "name":"2.71",
         "data":[
            {"key":"key1",
             "value":3},
            {"key":"key2",
             "value":-40}],
         "children":[
            {"id":"node372",
             "name":"3.72",
             "data":[
                {"key":"key1",
                 "value":7},
                {"key":"key2",
                 "value":-7}],
             "children":[
                {"id":"node473",
                 "name":"4.73",
                 "data":[
                    {"key":"key1",
                     "value":8},
                    {"key":"key2",
                     "value":-35}],
                 "children":[]},
                {"id":"node474",
                 "name":"4.74",
                 "data":[
                    {"key":"key1",
                     "value":8},
                    {"key":"key2",
                     "value":92}],
                 "children":[]},
                {"id":"node475",
                 "name":"4.75",
                 "data":[
                    {"key":"key1",
                     "value":2},
                    {"key":"key2",
                     "value":64}],
                 "children":[]},
                {"id":"node476",
                 "name":"4.76",
                 "data":[
                    {"key":"key1",
                     "value":7},
                    {"key":"key2",
                     "value":-95}],
                 "children":[]}]},
            {"id":"node377",
             "name":"3.77",
             "data":[
                {"key":"key1",
                 "value":3},
                {"key":"key2",
                 "value":-46}],
             "children":[
                {"id":"node478",
                 "name":"4.78",
                 "data":[
                    {"key":"key1",
                     "value":6},
                    {"key":"key2",
                     "value":56}],
                 "children":[]},
                {"id":"node479",
                 "name":"4.79",
                 "data":[
                    {"key":"key1",
                     "value":2},
                    {"key":"key2",
                     "value":-40}],
                 "children":[]},
                {"id":"node480",
                 "name":"4.80",
                 "data":[
                    {"key":"key1",
                     "value":2},
                    {"key":"key2",
                     "value":-88}],
                 "children":[]}]},
            {"id":"node381",
             "name":"3.81",
             "data":[
                {"key":"key1",
                 "value":6},
                {"key":"key2",
                 "value":-81}],
             "children":[
                {"id":"node482",
                 "name":"4.82",
                 "data":[
                    {"key":"key1",
                     "value":7},
                    {"key":"key2",
                     "value":-14}],
                 "children":[]}]},
            {"id":"node383",
             "name":"3.83",
             "data":[
                {"key":"key1",
                 "value":4},
                {"key":"key2",
                 "value":32}],
             "children":[
                {"id":"node484",
                 "name":"4.84",
                 "data":[
                    {"key":"key1",
                     "value":6},
                    {"key":"key2",
                     "value":36}],
                 "children":[]},
                {"id":"node485",
                 "name":"4.85",
                 "data":[
                    {"key":"key1",
                     "value":9},
                    {"key":"key2",
                     "value":96}],
                 "children":[]},
                {"id":"node486",
                 "name":"4.86",
                 "data":[
                    {"key":"key1",
                     "value":10},
                    {"key":"key2",
                     "value":13}],
                 "children":[]},
                {"id":"node487",
                 "name":"4.87",
                 "data":[
                    {"key":"key1",
                     "value":4},
                    {"key":"key2",
                     "value":96}],
                 "children":[]}]}]}]}]};{% endhighlight %}
</div>
Put this HTML in your page:

{% highlight html %}<html>
  <head>

  <link type="text/blog/css" rel="stylesheet" href="/static/blog/css/example-spacetree.css" />
<!--[if IE]>  
<script type="text/javascript" src="/static/js/excanvas.js"></script>  
<![endif]--> 
  <script type="text/javascript" src="/static/js/mootools-1.2.js" ></script>
  <script type="text/javascript" src="/static/js/spacetree/Spacetree.js" ></script>
  <script type="text/javascript" src="/static/js/example/example-spacetree.js" ></script>

  </head>
  <body onload="init();">

<div id="infovis" />

  </body>
</html>{% endhighlight %}
<strong>Note:</strong> You'll probably have to change the paths to the css and javascript files.

Now, create a spacetree-example.css and put this code in it:

{% highlight css %}html, body {
  width:100%;
  height:100%;
  background-color:#444;
  text-align:center;
  overflow:hidden;
  font-size:9px;
  font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;
  margin:0;padding:0;
}

#infovis {
  background-color:#222;
  position:relative;
  width:900px;
  height:500px;
}

a, a:link, a:visited {
  color:#343439;
}

.node {
  background-color:transparent;
  font-weight:bold;
  overflow:hidden;
  text-decoration:none;
  position:absolute;
  text-align:center;
  padding:4px 1px 1px 1px;
}

.node:hover {
  color:#393434;
}

.hidden{
  display:none;
}{% endhighlight %}

Finally, create an example-spacetree.js file and put this code in it:

{% highlight js %}function init() {
    var json= //data defined previously
      //Create a new canvas instance.
      var canvas = new Canvas('mycanvas', {
         //Where to inject canvas. Any HTML container will do.
         'injectInto':'infovis',
         //Set width and height, default's to 200.
         'width': 900,
         'height': 500,
         //Set a background color in case the browser
         //does not support clearing a specific area.
        'backgroundColor': '#222',
        //Set canvas styles.
        'styles': {
            'fillStyle': '#ccb',
            'strokeStyle': '#ccb'
        }   
      });
    //Create a new ST instance
    var st= new ST(canvas);
    //load json data
    st.loadFromJSON(json);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    Tree.Geometry.translate(st.tree, new Complex(-200, 0), "startPos");
    //Emulate a click on the root node.
    st.onClick(st.tree.id);
}{% endhighlight %}

You should see a spacetree up and running (don't worry if you can't interact with it, we'll add click event handlers on the labels below).
<h4>Some notes:</h4>
<ul>
  <li> I f you want to know more about the DOM structure created by the Canvas object and about the options for the controller of this class you can see <a href="/2009/01/12/a-new-canvas-element/">this post</a> and <a href="/blog/assets/jit-1.0a/doc/core/files/Canvas-js.html">the object reference</a></li>
  <li> You can define how many levels to expand by setting <em>Config.levelsToShow</em>. However, if the expanded subtree height is greater than the canvas height, the spacetree might not show all levels. Unfortunately, this doesn't happen when the width of the subtree expanded is greater than the canvas width (divided by two).</li>
</ul>

<h4>Adding event handlers to the Spacetree</h4>
Let's add an onclick event to the labels for triggering the Spacetree animation.

This is done by implementing an <em>onCreateLabel</em> controller method and passing it to the Spacetree constructor.
We can also configure a different linewith and color for the nodes and edges that belong to the path between the root node and the clicked node.
This is done by implementing the <em>onBeforePlotNode</em>, <em>onAfterPlotNode</em>, <em>onBeforePlotLine</em> and <em>onAfterPlotLine</em> controller methods in order to change the fillStyle and strokeStyle canvas properties. To know more about these canvas properties check <a href="https://developer.mozilla.org/en/Canvas_tutorial/Applying_styles_and_colors">this post</a>.

The code would now be:

{% highlight js %}function init() {
    var json= //data defined previously

    //Containers for fillStyle, strokeStyle and lineWith canvas properties.
    var fStyle, sStyle, lineWidth;
     //Create a new canvas instance.
      var canvas = new Canvas('mycanvas', {
         //Where to inject canvas. Any HTML container will do.
         'injectInto':'infovis',
         //Set width and height, default's to 200.
         'width': 900,
         'height': 500,
         //Set a background color in case the browser
         //does not support clearing a specific area.
        'backgroundColor': '#222',
        //Set canvas styles.
        'styles': {
            'fillStyle': '#ccb',
            'strokeStyle': '#ccb'
        }   
      });
    //Create a new ST instance
    var st= new ST(canvas, {
    //Add an event handler to the node when creating it.
        onCreateLabel: function(label, node) {
            var d = $(label);
            label.id = node.id;
            d.setStyle('cursor', 'pointer')
              .set('html', node.name)
                .addEvent('click', function() {
                st.onClick(d.id);
            });
        },
        //Set color as selected if the node is selected.
        onBeforePlotNode: function(node) {
            var ctx = canvas.getCtx();
            fStyle = ctx.fillStyle;
            sStyle = ctx.strokeStyle;
            if(node.selected) {
                ctx.fillStyle = "#ff7";
                ctx.strokeStyle = "#eed";
            }
        },
        //Restore color.       
        onAfterPlotNode: function(node) {
            var ctx = canvas.getCtx();
            ctx.fillStyle = fStyle;
            ctx.stroleStyle = sStyle;
        },
        //Set color as selected if the edge belongs to the path.
        onBeforePlotLine: function(adj) {
            var ctx = canvas.getCtx();
            lineWidth = ctx.lineWidth;
            sStyle = ctx.strokeStyle;
            if(adj.nodeFrom.selected && adj.nodeTo.selected) {
                ctx.strokeStyle = "#eed";
                ctx.lineWidth = 3;
            }
        },
        //Restore color and line width
        onAfterPlotLine: function(adj) {
            var ctx = canvas.getCtx();
            ctx.lineWidth = lineWidth;
            ctx.stroleStyle = sStyle;
        }

    });
    //load json data
    st.loadFromJSON(json);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    Tree.Geometry.translate(st.tree, new Complex(-200, 0), "startPos");
    //Emulate a click on the root node.
    st.onClick(st.tree.id);
}{% endhighlight %}


<h4>Customizing the Spacetree</h4>
The default layout for the spacetree is "left". That means that the root node always lies at the left of the visualization. You can set the tree layout to "top", "right" and "bottom" though.

For doing this we are going to add a dropdown in the html page:

{% highlight html %}<select id="switch">
          <option>left</option>
          <option>top</option>
          <option>right</option>
          <option>bottom</option>
        </select>
{% endhighlight %}

Now lets add the <em>change</em> event handler at the bottom of the JS file.

{% highlight js %}  
//Add input handler to switch spacetree orientation.
  var select = $('switch').addEvent('change', function() {
    var index = select.selectedIndex;
    var or = select.options[index].text;
    select.disabled = true;
    st.switchPosition(or, {
    onComplete: function() {
      select.disabled = false;
    }
    });
  });
{% endhighlight %}

Now if you change the value of the dropdown you should be able to switch the Spacetree orientation. Hows that!

Remember that you can also add controlers to the spacetree!. Take a look at the on controllers section and some examples with the hypertree.

Hope it was helpful!
