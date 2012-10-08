--- 
wordpress_id: 1155
layout: post
title: Sunburst Visualization
categories: [JavaScript InfoVis Toolkit, Visualization]
wordpress_url: /?p=1155
---
In a <a href="/2009/09/30/force-directed-layouts/">previous post</a> I showed the ForceDirected visualization I'm working on for version 1.2 of the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a>, today I'd like to talk about another visualization I've been working on, the <a href="http://www.cc.gatech.edu/gvu/ii/sunburst/">Sunburst Visualization</a>.

<h4>What's the Sunburst Visualization?</h4>

I guess an example could help here:

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/iFiGpXbYRdU&hl=en&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/iFiGpXbYRdU&hl=en&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>

A Sunburst visualization is a radial space-filling visualization technique for displaying tree like structures. There are other space-filling visualization methods that use other visual encodings for describing hierarchies. For example, the Treemap is a space-filling visualization that uses "containment" to show "parent-child" relationships.

There are a couple of subtle changes that can improve the way the information is communicated by this visualization.

<ul style="margin-bottom:20px;">
<li>
The "classic" Sunburst visualization uses horizontal labels for node names. One problem with this is that as I mentioned in a <a href="/2009/08/30/html-svg-or-canvas-labels/">previous post</a> labels can be occluded. One solution for this is to rotate labels in a way that they're not occluded.
</li>
<li>
A simple yet important thing to do when rotating labels is to rotate the labels in a way that they're always facing <em>up</em>.
<div style="text-align:center">In this example some labels are upside-down:</div>
<img align="center" src="/blog/assets/labels-updown.png" style="width: 231px; border: 1px solid magenta; margin: 5px auto 5px auto; padding: 3px;" />
<div style="clear:both"></div>
<div style="text-align:center">A simple check could make labels more readable:</div>
<img align="center" src="/blog/assets/rotated-labels.png" style="width: 313px; border: 1px solid magenta; margin: 5px auto 5px auto; padding: 3px;" />
<div style="clear:both"></div>
</li>
<li>
Another interesting thing that can be used with the <a href="https://developer.mozilla.org/en/Drawing_text_using_a_canvas#section_4">Canvas Text API</a> is the <em>maxWidth</em> parameter. This is an optional parameter that can be used to try to force the text to fit some width. I use this parameter when plotting the Sunburst visualization:
<br />
<img align="center" src="/blog/assets/font-fitting.png" style="width: 270px; border: 1px solid magenta; margin: 5px auto 5px auto; padding: 3px;" />

</li>
</ul>

<h4>Node Styling and Behavior</h4>
The visualization also implements events for hovering and clicking nodes. You can also provide any number of styles to be smoothly updated when hovering and clicking nodes. There's also <em>onClick</em> and <em>onHover</em> callbacks that are called when a node is clicked or hovered respectively.
For example, this is the configuration I used in the previous example:

{% highlight js %}
        NodeStyles: {
          attachToDOM: false,
          attachToCanvas: true,
          stylesHover: {
            'color': '#d33'
          },
          stylesClick: {
            'color': '#3dd'
          },
          onClick: function(node) {
            //build right column relations list
            buildRightColumnRelationsList(node);
            
            //hide tip
            sb.tips.tip.style.display = 'none';
            
            //rotate
            sb.rotate(node, 'animate', {
              'duration': 1500,
              'transition': Trans.Quart.easeInOut
            });
          }
        },
{% endhighlight %}

You can also add tool-tips as I did in the example. The configuration I used was:

{% highlight js %}
        Tips: {
          allow: true,
          attachToDOM: false,
          attachToCanvas: true,
          onShow: function(tip, node, elem) {
            tip.innerHTML = node.name;
          }
        },
{% endhighlight %}

Node styling and tool-tips can be attached to DOM elements (like HTML or SVG labels) or they can also be attached to the Canvas. The latter method uses an internal MouseEventManager to calculate the position of the mouse event and determine which node of the graph is being hovered or clicked.

<h4>Collapsing and Expanding Subtrees</h4>
I've been also implementing animations for collpasing/expanding subtrees:

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/ck3Mm9THtlY&hl=en&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/ck3Mm9THtlY&hl=en&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>

The collapsing process reduces the angle span occupied by a parent node and sets its children alpha value to zero. There's also a visual mark set for collapsed nodes.

<img align="center" src="/blog/assets/node-collapse3.png" style="border: 1px solid magenta; margin: 5px auto 5px auto; padding: 3px;" />

I hope you like this visualization. There's still much work to do, mostly regarding browser compatibility. I'll keep you up to date with the progress of this visualization and the next visualization I'll be implementing in the next post :)

