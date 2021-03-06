--- 
wordpress_id: 274
layout: post
title: A new Canvas Element
categories: [JavaScript, JavaScript InfoVis Toolkit]
wordpress_url: /?p=274
---
A couple of days ago I released version <a href="http://thejit.org">1.0.8a</a> of the JavaScript InfoVis Toolkit, that introduces some API changes and nice features.
This version focus mainly on two things:

<ul>
   <li>A more stable and usable Canvas class.</li>
   <li>Finishing last features included in the Spacetree, Treemap and RGraph InfoVis papers.</li>
</ul>

I'm quite happy with this version of the library, since it implements all lasting features in my <a href="/2008/05/20/further-work-on-jit-10a/">TODO list</a>.
This doesn't mean much for the library, since I'm still having lots of ideas for next releases, but at least I finished something I put up to and that makes me happy :) .

<h4 id="canvas">Canvas</h4>
I implemented a new <a href="/blog/assets/jit-1.0a/doc/core/files/Canvas-js.html">Canvas</a> class, focusing on performance and usability. 

The Canvas class is more like a Canvas Widget, since it creates a cross-browser canvas tag and a label div container, wrapped in a main div element.
This way, labels are relative to the canvas element and not absolute positioned, like they were on previous versions. I'd like to thank the people in <a href="http://groups.google.com/group/javascript-information-visualization-toolkit/browse_thread/thread/e2ccfc56b51e3610">this thread</a> for providing nice ideas for implementing the Canvas class.

This canvas class makes also the Spacetree visualization cross browser, working perfectly well in IE6+.

Prior to version 1.0.8a, you had to put a canvas tag and a div label container in your html to create a new visualization. From version 1.0.8a this is no longer needed: you just have to include a visualization div container, like this:

{% highlight html %}
<div id="infovis"></div>
{% endhighlight %}

A simple canvas instantiation could be something like this:

{% highlight js %}
      //Create a new canvas instance.
      var canvas = new Canvas('mycanvas', {
         //Where to inject canvas. Any HTML container will do.
         'injectInto':'infovis',
         //Set width and height, default's to 200.
         'width': 900,
         'height': 500,
        //Set canvas styles.
        'styles': {
            'fillStyle': '#ccb',
            'strokeStyle': '#ccb'
        }   
      });
{% endhighlight %} 

The first parameter in the canvas constructor is the id of the canvas widget.
This id will be the main wrapper div id, and it will serve as prefix for the ids of the other DOM elements created.
The second parameter is a canvas configuration object. Some of the object's properties are:

<ul>
<li>
<b>injectInto</b>: The id of the div where you want to inject the canvas widget
</li>
<li>
<b>width, height</b>: Width and height of the canvas widget. Default's to 200
</li>
<li>
<b>styles</b>: an object containing specific canvas styles. If you want to know more about canvas styles you can read <a href="https://developer.mozilla.org/en/Canvas_tutorial/Applying_styles_and_colors">this</a> article.
</li>
</ul>

The html generated by this call will be appended in the div container (#infovis) previously defined:

{% highlight html %}
<div id="infovis">
  <div id="mycanvas" style="position:relative;">
    <canvas id="mycanvas-canvas" width=900 height=500 
    style="position:absolute; top:0; left:0; width:900px; height:500px;" />
    <div id="mycanvas-label" 
    style="overflow:visible; position:absolute; top:0; left:0; width:900px; height:0px">
    </div>
  </div>
</div>
{% endhighlight %}

Notice how the Canvas id is used as the id of the main div container and also as prefix for the actual canvas element and the div label container element.
If we were using the Spacetree in IE, we could use an extra backgroundColor parameter as IE hack, since excanvas <a href="http://groups.google.com/group/google-excanvas/browse_thread/thread/3844be27fc3f525f">does not support clipping paths</a>, which are used by the Spacetree visualization:

{% highlight js %}
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
{% endhighlight %}

We can define also a background Canvas.
Take for example the RGraph example, in which <a href="/blog/assets/jit-1.0a/examples/rgraph.html">we plot concentric circles as background for the visualization</a>.
Prior to version 1.0.8a, the background was rendered at each frame, since at each frame of an animation the canvas is fully cleared to plot the graph's next position. This wasn't very good for performance.

Defining a background canvas was the sanest choice. That way the background is rendered only once:

{% highlight js %}
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
{% endhighlight %}

The background canvas created will have <em>mycanvas-bkcanvas</em> as id.
For more information about the canvas class you can check its <a href="/blog/assets/jit-1.0a/doc/core/files/Canvas-js.html">object reference</a>, the examples provided with the <a href="/blog/assets/jit.zip" target="_blank">library</a> and the updated quick tutorials which you can find in the <a href="http://thejit.org/#documentation">documentation</a>.

<h4>Treemap</h4>
I implemented the <em>Strip</em> layout for the Treemap, in addition to the <em>Squarified</em> and <em>Slice and Dice</em> layout algorithms provided in previous versions of the library.
I updated the <a href="/blog/assets/jit-1.0a/examples/treemap.html">treemap example</a> to impement different tiling algorithms. Use the dropdown box at the left of the screen to change the current layout.

Why another tiling algorithm?
Well, as the <a href="http://en.wikipedia.org/wiki/Treemap#The_tiling_algorithm">Wikipedia explains</a>:
<em>To create a treemap, one must define a tiling algorithm, that is, a way to divide a rectangle into sub-rectangles of specified areas. Ideally, a treemap algorithm would create rectangles of aspect ratio close to one; would preserve some sense of the ordering of input data; and would change only slowly when the underlying data changes slowly. Unfortunately, these properties have an inverse relationship.</em>

The Strip tiling algorithm provides a good compromise between order, stability and aspect ratio values.
More precisely, the three techniques implemented in the <a href="http://thejit.org">JIT</a> can be classified as follows:
<ul>
<li><b>Slice and Dice</b>: Ordered, very high aspect ratios, stable</li>
<li><b>Squarified</b>: Unordered, lowest aspect ratios, medium stability</li>
<li><b>Strip</b>: Ordered, medium aspect ratios, medium stability</li>
</ul>

So the Strip algorithm is a good complement to the tiling algorithms provided.


<h4>Spacetree</h4>

I implemented two new layouts for the Spacetree, <em>bottom</em> and <em>right</em> layouts.
You can change the Spacetree layouts by using the dropdown box at the left of the <a href="/blog/assets/jit-1.0a/examples/spacetree.html">visualization</a>.

The bottom layout could be pretty useful for making family trees or things like that :).
Anyway, another good thing of the Spacetree is that it works for IE6+ now (thanks to the new Canvas implementation).
Some cleanup regarding the plotting algorithms and how labels were created was done, please check the <a href="/2008/05/07/st-quick-tutorial/">ST quick tutorial</a> to understand exactly what changed.

<h4>RGraph</h4>
I implemented the <em>second animation constraint</em> mentioned in the <a href="http://bailando.sims.berkeley.edu/papers/infovis01.htm">RGraph</a> paper: <b>child ordering</b>.
This constraint decreases edge crossing during animations, making animations more intuitive and graspable by the viewer.
The child ordering constraint consists in mantaining child ordering for the parent of the clicked node, that way we can decrease the edge crossing cases during animations:

<img style="border: 1px solid magenta; padding: 3px; margin: 5px 13px 5px 0; float: left;" src="/blog/assets/scons.png" />

<div style="clear:both"></div>

I didn't make a <a href="/blog/assets/jit-1.0a/examples/rgraph.html">new example</a> for this, but you should see the difference when comparing it with the examples packaged in <a href="/blog/assets/jit-1.0.7a.zip" target="_blank">previous versions of the library</a>.

<h4>Hypertree</h4>
I did some Cleanup of the Hypertree code, and stripped off the Mouse class and the <em>prepareCanvasEvents</em> method.
Those kind of things can be easily implemented with DOM/AJAX frameworks like Mootools or JQuery.
The hypertree example packaged with the library shows a possible workaround for <em>prepareCanvasEvents</em>:

{% highlight js %}
  //optional: set an "onclick" event handler on the canvas tag to animate the tree.
  var mycanvas = $('mycanvas');
  var size = canvas.getSize();
  mycanvas.addEvent('click', function(e) {
    var pos = mycanvas.getPosition();
    var s = Math.min(size.width, size.height) / 2;
    ht.move({
      'x':  (e.page.x - pos.x - size.width  / 2) / s,
      'y':  (e.page.y - pos.y - size.height / 2) / s
    });
  });
{% endhighlight %}

Anyway, that's all for now. Please feel free to file bugs if you spot one.
Remember also that the <a href="http://thejit.org">main project page</a> has links to documentation, google groups, browser support, updated examples and some other things :)
