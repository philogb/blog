--- 
wordpress_id: 1077
layout: post
title: HTML, SVG or Canvas Labels?
categories: [JavaScript InfoVis Toolkit, Visualization, JavaScript]
wordpress_url: /?p=1077
---
As you might know, the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a> uses the HTML5 Canvas element for plotting and animating graphs. This is all very nice, Canvas performance compared to other techniques for plotting these things (SVG for example) is by far superior. But of course, there are drawbacks.

Canvas better performance is due to the fact that there are no tracked elements: the Canvas is simply an image and you're drawing there just like you'd be drawing something in <em>paint</em>. One big problem is that there's no native possibility to add events to what's drawn in Canvas, like a plotted node, edge or label.

As opposed to Canvas, SVG has a DOM/XML like spec: you have all these tags (<b>&lt;g&gt; &lt;text&gt; &lt;rect&gt;</b>) and each of them is just like a DOM element: you can add click event handlers, individual styling with CSS, etc. 
Having to keep track of all these elements and handling a DOM-tree makes the performance of SVG not suitable for visualizing (and animating) medium to large datasets on the web.

<h4>Using HTML labels</h4>
Just like SVG, HTML is a DOM/XML-like spec, where you can add event handlers to each element. Also, every web developer knows HTML so exposing HTML labels through user-defined controller methods in the library seemed to me like a good choice. For controller methods like <em>onCreateLabel</em> or <em>onPlaceLabel</em> an HTML element is passed and the user can style or add event-handlers to it.

For example, here's a fragment of the code used in the <a href="http://thejit.org/Jit/Examples/RGraph/example1.html">RGraph demo</a>. You can see the rest of the code <a href="http://thejit.org/Jit/Examples/RGraph/example1.code.html">here</a>:

{% highlight js %}
        //Add the name of the node in the correponding label
        //and a click handler to move the graph.
        //This method is called once, on label creation.
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.onclick = function(){
                rgraph.onClick(node.id);
            };
        },
        //Change some label dom properties.
        //This method is called each time a label is plotted.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';

            if (node._depth <= 1) {
                style.fontSize = "0.8em";
                style.color = "#ccc";
            
            } else if(node._depth == 2){
                style.fontSize = "0.7em";
                style.color = "#494949";
            
            } else {
                style.display = 'none';
            }

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
{% endhighlight %}

In my opinion this is a good approach, good points are:
<ol>
<li>I'm using well known HTML elements.</li>
<li>Dealing with DOM elements let's you add event handlers, individual styling and things like that.</li>
</ol>

Weak points are:

<ol>
<li>
I'm using a DOM tree, which means that if labels are plotted at all times I'm exhaustively updating the DOM and this might lead to performance problems.
</li>
<li>
HTML is good for structuring pages, but for example you might want to apply transformations to HTML elements (like rotating labels, etc), and these aren't supported by all browsers yet.
So one of the problems that might arise is, for example, the fact that in radial layouts labels might be occluded:
<img src="/blog/assets/occlude.png" title="occluded labels" alt="occluded labels" style="border: 1px solid cyan; margin: 7px auto; padding: 1px;" />
</li>
</ol>

<h4> Using SVG labels</h4>
So I began exploring other possibilities to create labels. For this I abstracted the Label interface I had and split it into:

<ul>
<li>Graph.Label.Native <em>(for native canvas labels)</em></li>
<li>Graph.Label.DOM<em>(abstract class for dom elements)</em></li>
<li>Graph.Label.HTML<em>(extends the DOM interface with HTML specific stuff)</em></li>
<li>Graph.Label.SVG<em>(extends the DOM interface with SVG specific stuff)</em></li>
</ul>

I also modified the <em>Canvas</em> class so you can specify the type of labels you want to use, <em>labels:'HTML'</em>, <em>labels:'SVG'</em> or <em>labels:'Native'</em>. Default's <em>HTML</em>.

The same RGraph example code now would look like this:

{% highlight js %}
        //Add the name of the node in the correponding label
        //and a click handler to move the graph.
        //This method is called once, on label creation.
        onCreateLabel: function(domElement, node){
            domElement.firstChild
              .appendChild(document
                .createTextNode(node.name));
            domElement.onclick = function(){
                rgraph.onClick(node.id, {
                  hideLabels: false
                });
            };
        },
        //Change some label dom properties.
        //This method is called each time a label is plotted.
        onPlaceLabel: function(domElement, node){
            var bb = domElement.getBBox();
            if(bb) {
              //center the label
              var x = domElement.getAttribute('x');
              var y = domElement.getAttribute('y');
              //get polar coordinates
              var p = node.pos.getp(true);
              //get angle in degrees
              var pi = Math.PI;
              var cond = (p.theta > pi/2 && p.theta < 3* pi /2);
              if(cond) {
                domElement.setAttribute('x', x - bb.width );
                domElement.setAttribute('y', y - bb.height );
              } else if(node.id == rgraph.root) {
                domElement.setAttribute('x', x - bb.width/2); 
              }
              
              var thetap =  cond? p.theta + pi : p.theta;
                domElement.setAttribute('transform', 'rotate('
                + thetap * 360 / (2 * pi) + ' ' + x + ' ' + y + ')');
            }
{% endhighlight %}

This code does a little bit more than just plotting the label, it rotates the labels so they're not occluded:

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/d4moBOf-Fvs&hl=en&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/d4moBOf-Fvs&hl=en&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>

Good points of this approach are:
<ul>
<li>Just like with any other DOM element, you can add event handlers.</li>
<li>You can apply transformations to labels.</li>
</ul>

Weak points:
<ul>
<li>Performance, for the same reasons as HTML.</li>
<li>IE does not support SVG.</li>
</ul>

Bonus good point: Google is making work SVG in IE with some open source library that works apparently the same as the <a href="http://excanvas.sourceforge.net/">ExCanvas</a> library. Here's the <a href="http://code.google.com/p/svgweb/">Open Source project</a> that will be presented <a href="http://ajaxian.com/archives/svg-open-2009-svg-coming-of-age">here</a>.

That's like the main reason why I've been considering a different approach for labels ;)

<h4>Native Canvas labels</h4>

Native Canvas labels make use of the HTML5 Canvas text API to plot labels.
Since the labels are just <em>painted</em> in the Canvas there's no DOM tree to update, and performance is good. 
The Canvas text API has <em>fillText</em>, <em>strokeText</em> and <em>measureText</em> as methods. You can read more about the Canvas Text API <a href="https://developer.mozilla.org/en/Drawing_text_using_a_canvas">here</a>.

This is the code I added to the <em>Graph.Label.Native</em> class:

{% highlight js %}
Graph.Label.Native = new Class({

    plotLabel: function(canvas, node, controller) {
        var ctx = canvas.getCtx();
        var coord = node.pos.getc(true);
        ctx.fillText(node.name, coord.x, coord.y);
    },

    hideLabel: $empty
});
{% endhighlight %}

A very good point about this approach is <em>performance</em>. Also, the code is simpler. You don't have to keep a labelContainer and update DOM labels each time you're making an animation.

Weak points are:
<ul>
<li>Opera does not support this feature.</li>
<li>You can't <em>natively</em> add event handlers to labels. I think I've seen someone do something similar for text in processing, but I'm not sure there's a good way of doing this without keeping track of the position of each label and perform a check each time a click is triggered in the canvas element.</li>
<li>I should change the way I define controller methods, in order to be able to pass a custom <em>label object</em> with x, y, theta, rho, width, height properties that could be modified on the fly, and then translate these changes into <em>translate</em> and <em>rotate</em> native canvas calls to be able to plot the text the way the user wants it. This seems just to damn complicated.... But I'll consider it.</li>
</ul>

Anyway, these are the methods I've found to plot labels into graphs. 

Which one do you think is the best? 
Do you know about any other approaches I could take to solve this problem?



