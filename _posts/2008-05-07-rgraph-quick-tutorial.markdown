--- 
wordpress_id: 12
layout: post
title: RGraph quick tutorial
categories: [JavaScript InfoVis Toolkit, Visualization, Tutorial]
wordpress_url: http://blogngb.woot.com.ar/?p=12
---
<em>This tutorial requires you to have read <a href="/?p=7">Feeding JSON tree structures to the JIT</a> and <a href="/?p=8">on controllers</a> first</em>.

**Note:** I'll be using Mootools for this tutorial. However, this visualization can be used without the Mootools library. You can find a Mootools build in the <em>extras folder</em> of the library.

Hi, this is going to be a quick tutorial on how to set the RGraph up and running.

We are going to work with this tree JSON structure:

<div style="height:300px;overflow:scroll;">

{% highlight js %}var json = {"id":"node02",
 "name":"0.2",
 "data":[
    {"key":"key1",
     "value":8},
    {"key":"key2",
     "value":-88}],
 "children":[
    {"id":"node13",
     "name":"1.3",
     "data":[
        {"key":"key1",
         "value":8},
        {"key":"key2",
         "value":74}],
     "children":[
        {"id":"node24",
         "name":"2.4",
         "data":[
            {"key":"key1",
             "value":10},
            {"key":"key2",
             "value":55}],
         "children":[]},
        {"id":"node25",
         "name":"2.5",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":67}],
         "children":[]},
        {"id":"node26",
         "name":"2.6",
         "data":[
            {"key":"key1",
             "value":5},
            {"key":"key2",
             "value":-50}],
         "children":[]},
        {"id":"node27",
         "name":"2.7",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":10}],
         "children":[]},
        {"id":"node28",
         "name":"2.8",
         "data":[
            {"key":"key1",
             "value":2},
            {"key":"key2",
             "value":-69}],
         "children":[]},
        {"id":"node29",
         "name":"2.9",
         "data":[
            {"key":"key1",
             "value":3},
            {"key":"key2",
             "value":98}],
         "children":[]},
        {"id":"node210",
         "name":"2.10",
         "data":[
            {"key":"key1",
             "value":6},
            {"key":"key2",
             "value":12}],
         "children":[]},
        {"id":"node211",
         "name":"2.11",
         "data":[
            {"key":"key1",
             "value":2},
            {"key":"key2",
             "value":-95}],
         "children":[]}]},
    {"id":"node112",
     "name":"1.12",
     "data":[
        {"key":"key1",
         "value":1},
        {"key":"key2",
         "value":96}],
     "children":[
        {"id":"node213",
         "name":"2.13",
         "data":[
            {"key":"key1",
             "value":6},
            {"key":"key2",
             "value":-58}],
         "children":[]},
        {"id":"node214",
         "name":"2.14",
         "data":[
            {"key":"key1",
             "value":9},
            {"key":"key2",
             "value":-42}],
         "children":[]},
        {"id":"node215",
         "name":"2.15",
         "data":[
            {"key":"key1",
             "value":10},
            {"key":"key2",
             "value":92}],
         "children":[]},
        {"id":"node216",
         "name":"2.16",
         "data":[
            {"key":"key1",
             "value":7},
            {"key":"key2",
             "value":-15}],
         "children":[]},
        {"id":"node217",
         "name":"2.17",
         "data":[
            {"key":"key1",
             "value":3},
            {"key":"key2",
             "value":29}],
         "children":[]},
        {"id":"node218",
         "name":"2.18",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":-59}],
         "children":[]},
        {"id":"node219",
         "name":"2.19",
         "data":[
            {"key":"key1",
             "value":3},
            {"key":"key2",
             "value":21}],
         "children":[]},
        {"id":"node220",
         "name":"2.20",
         "data":[
            {"key":"key1",
             "value":2},
            {"key":"key2",
             "value":78}],
         "children":[]}]},
    {"id":"node121",
     "name":"1.21",
     "data":[
        {"key":"key1",
         "value":3},
        {"key":"key2",
         "value":53}],
     "children":[
        {"id":"node222",
         "name":"2.22",
         "data":[
            {"key":"key1",
             "value":5},
            {"key":"key2",
             "value":10}],
         "children":[]},
        {"id":"node223",
         "name":"2.23",
         "data":[
            {"key":"key1",
             "value":10},
            {"key":"key2",
             "value":21}],
         "children":[]},
        {"id":"node224",
         "name":"2.24",
         "data":[
            {"key":"key1",
             "value":6},
            {"key":"key2",
             "value":-32}],
         "children":[]},
        {"id":"node225",
         "name":"2.25",
         "data":[
            {"key":"key1",
             "value":5},
            {"key":"key2",
             "value":-42}],
         "children":[]},
        {"id":"node226",
         "name":"2.26",
         "data":[
            {"key":"key1",
             "value":2},
            {"key":"key2",
             "value":75}],
         "children":[]},
        {"id":"node227",
         "name":"2.27",
         "data":[
            {"key":"key1",
             "value":1},
            {"key":"key2",
             "value":-74}],
         "children":[]},
        {"id":"node228",
         "name":"2.28",
         "data":[
            {"key":"key1",
             "value":2},
            {"key":"key2",
             "value":52}],
         "children":[]},
        {"id":"node229",
         "name":"2.29",
         "data":[
            {"key":"key1",
             "value":10},
            {"key":"key2",
             "value":-49}],
         "children":[]}]},
    {"id":"node130",
     "name":"1.30",
     "data":[
        {"key":"key1",
         "value":9},
        {"key":"key2",
         "value":-29}],
     "children":[
        {"id":"node231",
         "name":"2.31",
         "data":[
            {"key":"key1",
             "value":6},
            {"key":"key2",
             "value":-23}],
         "children":[]},
        {"id":"node232",
         "name":"2.32",
         "data":[
            {"key":"key1",
             "value":10},
            {"key":"key2",
             "value":19}],
         "children":[]},
        {"id":"node233",
         "name":"2.33",
         "data":[
            {"key":"key1",
             "value":1},
            {"key":"key2",
             "value":92}],
         "children":[]}]},
    {"id":"node134",
     "name":"1.34",
     "data":[
        {"key":"key1",
         "value":9},
        {"key":"key2",
         "value":71}],
     "children":[
        {"id":"node235",
         "name":"2.35",
         "data":[
            {"key":"key1",
             "value":5},
            {"key":"key2",
             "value":-65}],
         "children":[]}]},
    {"id":"node136",
     "name":"1.36",
     "data":[
        {"key":"key1",
         "value":3},
        {"key":"key2",
         "value":-11}],
     "children":[
        {"id":"node237",
         "name":"2.37",
         "data":[
            {"key":"key1",
             "value":6},
            {"key":"key2",
             "value":-85}],
         "children":[]},
        {"id":"node238",
         "name":"2.38",
         "data":[
            {"key":"key1",
             "value":3},
            {"key":"key2",
             "value":-13}],
         "children":[]},
        {"id":"node239",
         "name":"2.39",
         "data":[
            {"key":"key1",
             "value":1},
            {"key":"key2",
             "value":80}],
         "children":[]},
        {"id":"node240",
         "name":"2.40",
         "data":[
            {"key":"key1",
             "value":10},
            {"key":"key2",
             "value":-69}],
         "children":[]}]},
    {"id":"node141",
     "name":"1.41",
     "data":[
        {"key":"key1",
         "value":10},
        {"key":"key2",
         "value":-4}],
     "children":[
        {"id":"node242",
         "name":"2.42",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":-27}],
         "children":[]},
        {"id":"node243",
         "name":"2.43",
         "data":[
            {"key":"key1",
             "value":9},
            {"key":"key2",
             "value":-44}],
         "children":[]},
        {"id":"node244",
         "name":"2.44",
         "data":[
            {"key":"key1",
             "value":9},
            {"key":"key2",
             "value":24}],
         "children":[]},
        {"id":"node245",
         "name":"2.45",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":-66}],
         "children":[]}]}]};{% endhighlight %}
</div>
Put this HTML in your page:

{% highlight html %}<html>
  <head>

  <link type="text/blog/css" rel="stylesheet" href="/static/blog/css/example-rgraph.css" />

  <!--[if IE]>
    <script type="text/javascript" src="/static/js/excanvas.js"></script>
  <![endif]-->
  <script type="text/javascript" src="/static/js/mootools-1.2.js" ></script>
  <script type="text/javascript" src="/static/js/rgraph/RGraph.js" ></script>
  <script type="text/javascript" src="/static/js/example/example-rgraph.js" ></script>

  </head>
  <body onload="init();">

         <div id="infovis"></div>

  </body>
</html>{% endhighlight %}
<strong>Note:</strong> You'll probably have to change the paths to the css and javascript files.

Now, create a rgraph-example.css and put this code in it:

{% highlight css %}html,body {
  width:100%;
  height:100%;
  overflow:hidden;
  margin:0;padding:0;
  background-color:#333;
  text-align:center;
}

#infovis {
  width:900px;
  height:500px;
  background-color:#222;
}

.node {
  color: white;
  background-color:transparent;
  cursor:pointer;
  font-weight:bold;
  opacity:0.9;
  border:1px solid red;
}

.node:hover {
  cursor:pointer;
  color: #222;
  background-color:white;
  font-weight:bold;
  opacity:1;
}{% endhighlight %}
Finally, create an example-rgraph.js file and put this code in it:

{% highlight js %}function init() {
  //Set node interpolation to linear (can also be 'polar')
  Config.interpolation = "linear";
  //Set distance for concentric circles
  Config.levelDistance = 100;
  
  var json= //data defined previously

  //Create a new canvas instance.
  var canvas = new Canvas('mycanvas', {
    //Where to inject the canvas. Any div container will do.
    'injectInto':'infovis',
    //width and height for canvas. Default's to 200.
    'width': 900,
    'height':500,
    //Canvas styles
    'styles': {
        'fillStyle': '#ccddee',
        'strokeStyle': '#772277'
    },
    //Add a background canvas for plotting
    //concentric circles.
    'backgroundCanvas': {
        //Add Canvas styles for the bck canvas.
      'styles': {
            'fillStyle': '#444',
            'strokeStyle': '#444'
        },
        //Add the initialization and plotting functions.
        'impl': {
            'init': $empty,
            'plot': function(canvas, ctx) {
                var times = 6, d = Config.levelDistance;
                var pi2 = Math.PI*2;
                for(var i=1; i<=times; i++) {
                    ctx.beginPath();
                    ctx.arc(0, 0, i * d, 0, pi2, true);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }   
 });

  var rgraph= new RGraph(canvas,  {
    //Add a controller to make the tree move on click.  
    onCreateLabel: function(domElement, node) {
      var d = $(domElement);
      d.addEvents({
        'click': function() {
          rgraph.onClick(d.id);
        }
      });
    }      
   });
      
    //load tree from tree data.
    rgraph.loadTreeFromJSON(json);
    //compute positions
    rgraph.compute();
    //make first plot
    rgraph.plot();

}{% endhighlight %}

You should see a RGraph up and running. Click on the labels and the tree should move.
<h4>Some notes:</h4>
<ul>
  <li> If you want to know more about how the Canvas class is implemented and what other canvas customizations can be done please check <a href="/2009/01/12/a-new-canvas-element/">this post</a> and the <a href="/blog/assets/jit-1.0a/doc/core/files/Canvas-js.html">canvas object reference</a>. To know more about what canvas styles can be configured please check <a href="https://developer.mozilla.org/en/Canvas_tutorial/Applying_styles_and_colors">this post</a>.</li>
  <li> By assigning <em>false</em> to the <em>backgroundCanvas</em> property you can strip off the concentric circles. The backgroundCanvas functions and styles can also be customized to plot whatever background you like.</li>
</ul>
<h4>Customizing the Graph</h4>
Let's add some labels!

First, strip off the <em>border: 1px solid red;</em> line from the <em>.node</em> class in your CSS file.
It should look like this:

{% highlight css %}.node {
  color: white;
  background-color:transparent;
  cursor:pointer;
  font-weight:bold;
  opacity:0.9;
}{% endhighlight %}
Now we are going to add a javascript controller in order to put the name of the nodes into the labels. Since we only need to do this once, we'll use the <em>onCreateLabel</em> method. If you don't know what I'm talking about you should probably read the on controllers post first.

So the JavaScript file should look like this now:

{% highlight js %}function init() {
  //Set node interpolation to linear (can also be 'polar')
  Config.interpolation = "linear";
  //Set distance for concentric circles
  Config.levelDistance = 100;
  
  var json= //data defined previously

  //Create a new canvas instance.
  var canvas = new Canvas('mycanvas', {
    //Where to inject the canvas. Any div container will do.
    'injectInto':'infovis',
    //width and height for canvas. Default's to 200.
    'width': 900,
    'height':500,
    //Canvas styles
    'styles': {
        'fillStyle': '#ccddee',
        'strokeStyle': '#772277'
    },
    //Add a background canvas for plotting
    //concentric circles.
    'backgroundCanvas': {
        //Add Canvas styles for the bck canvas.
      'styles': {
            'fillStyle': '#444',
            'strokeStyle': '#444'
        },
        //Add the initialization and plotting functions.
        'impl': {
            'init': $empty,
            'plot': function(canvas, ctx) {
                var times = 6, d = Config.levelDistance;
                var pi2 = Math.PI*2;
                for(var i=1; i<=times; i++) {
                    ctx.beginPath();
                    ctx.arc(0, 0, i * d, 0, pi2, true);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }   
 });

  var rgraph= new RGraph(canvas,  {
    //Add a controller to make the tree move on click.  
    onCreateLabel: function(domElement, node) {
      var d = $(domElement);
      d.set('html', node.name).addEvents({
        'click': function() {
          rgraph.onClick(d.id);
        }
      });
    }      
   });
      
    //load tree from tree data.
    rgraph.loadTreeFromJSON(json);
    //compute positions
    rgraph.compute();
    //make first plot
    rgraph.plot();
}{% endhighlight %}

You should see some labels now.
The thing is that... well, they are not centered. So we'll just add an onPlaceLabel method to the controller in order to do that, since the onPlaceLabel method is called after labels have been placed.

So the js code should now look like:

{% highlight js %}function init() {
  //Set node interpolation to linear (can also be 'polar')
  Config.interpolation = "linear";
  //Set distance for concentric circles
  Config.levelDistance = 100;
  
  var json= //data defined previously

  //Create a new canvas instance.
  var canvas = new Canvas('mycanvas', {
    //Where to inject the canvas. Any div container will do.
    'injectInto':'infovis',
    //width and height for canvas. Default's to 200.
    'width': 900,
    'height':500,
    //Canvas styles
    'styles': {
        'fillStyle': '#ccddee',
        'strokeStyle': '#772277'
    },
    //Add a background canvas for plotting
    //concentric circles.
    'backgroundCanvas': {
        //Add Canvas styles for the bck canvas.
      'styles': {
            'fillStyle': '#444',
            'strokeStyle': '#444'
        },
        //Add the initialization and plotting functions.
        'impl': {
            'init': $empty,
            'plot': function(canvas, ctx) {
                var times = 6, d = Config.levelDistance;
                var pi2 = Math.PI*2;
                for(var i=1; i<=times; i++) {
                    ctx.beginPath();
                    ctx.arc(0, 0, i * d, 0, pi2, true);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }   
 });

  var rgraph= new RGraph(canvas,  {
    //Add a controller to make the tree move on click.  
    onCreateLabel: function(domElement, node) {
      var d = $(domElement);
      d.set('html', node.name).addEvents({
        'click': function() {
          rgraph.onClick(d.id);
        }
      });
    },

  //Take off previous width and height styles and
  //add half of the *actual* label width to the left position
  // That will center your label (do the math man). 
    onPlaceLabel: function(domElement, node) {
      domElement.innerHTML = '';
      domElement.innerHTML = node.name;
      var left = parseInt(domElement.style.left);
      domElement.style.width = '';
      domElement.style.height = '';
      var w = domElement.offsetWidth;
      domElement.style.left = (left - w /2) + 'px';
    }
      
   });
      
    //load tree from tree data.
    rgraph.loadTreeFromJSON(json);
    //compute positions
    rgraph.compute();
    //make first plot
    rgraph.plot();
}{% endhighlight %}

You should see some centered labels now!

Labels already have the <em>onclick</em> event handler to move the graph. You set that <em>onCreateLabel</em>.

Remember there are lots of other controller methods!

Remember also that you can change the animation time and the frames per second in the animation with <em>Config.animationTime</em> and <em>Config.fps</em>.
Hope it was helpful.
