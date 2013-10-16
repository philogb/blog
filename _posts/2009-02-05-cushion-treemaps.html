--- 
wordpress_id: 488
layout: post
title: Cushion Treemaps
categories: [JavaScript InfoVis Toolkit, Visualization]
wordpress_url: /?p=488
---
Remember <a href="/javascript-information-visualization-toolkit-jit/#treemaps">Treemaps</a>?

There was a thread at the <a href="http://groups.google.com/group/javascript-information-visualization-toolkit">Google Group</a> for the <a href="http://thejit.org">JIT</a> asking for <a href="http://groups.google.com/group/javascript-information-visualization-toolkit/browse_thread/thread/d49c81489f951a38">Gradients in Treemaps</a>.

Actually they're called <em>cushion treemaps</em>, and they have been created by Ph.Ds Jarke J. van Wijk  and Huub van de Wetering. Cushion Treemaps have been used in successful applications like <a href="http://en.wikipedia.org/wiki/SequoiaView">SequoiaView</a> and companies like <a href="http://magnaview.nl/">MagnaView</a> are building very interesting visualizations with cushion treemaps.

<a href="http://www.win.tue.nl/~vanwijk/ctm.pdf">The paper</a> is quite interesting: cushion treemaps were created by using shading to show a tree's structure:

<em>"How can we use shading to show the tree structure? The human visual system is trained to interpret variations in shade as illuminated surfaces [6]. Hence, we can answer the question by constructing a surface which shape encodes the tree structure."</em>

Shadowing is created by adding <em>bumps</em> to rectangles.
 
In the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a>, this can be done by overriding the <a href="/blog/assets/jit-1.0a/doc/core/files/Treemap-js.html#Config.leafBox">leafBox</a> method of the Treemap class. This method renders a leaf node (nodes which are generally colored in the Treemap). 
By adding an image of a radial gradient inside that div we can emulate cushion treemaps.

Instead of creating a new class that extends <em>TM</em> and overrides that method, we can take advantage of JavaScript's <em>object mutability</em> feature and re-implement the method <em>in the same class</em>.

{% highlight js %}

    TM.Squarified.implement({
       leafBox: function(json, coord) { 
        var config = this.config; 
        var backgroundColor = config.Color.allow && this.setColor(json), 
        offst = config.offset, 
        width = coord.width - offst, 
        height = coord.height - offst; 
        var c = { 
         'top': (offst / 2) + "px", 
         'height':height + "px", 
         'width': width + "px", 
         'left': (offst / 2) + "px" 
        }; 
        if(backgroundColor) c['background-color'] = backgroundColor; 
       //Add an image to our leaf node to create a cushion treemap.
        var img = "&lt;img src='gradient.png' style='position:absolute; z-index:2; top:0; left:0; width:" + c.width + "; height:"+ c.height +"'; /&gt;"; 

        return "&lt;div class='leaf' style=" + this.toStyle(c) + "&gt;" + img + json.name + "&lt;/div&gt;"; 
       } 
    });

{% endhighlight %}
 
And that's it, now we have Squarified Cushion Treemaps. I must say that I love cushion treemaps, they look a lot more cool than simple treemaps.

<a href="/blog/assets/cushion/treemap.html">I made a small POC where you can enable/disable the cushion feature, among other interesting things</a>:

<a class="linknone" href="/blog/assets/cushion/treemap.html"><img style="border: 1px solid cyan; padding: 3px; margin: 5px 13px 10px 0; float: left;" src="/blog/assets/static/img/cushion.png" alt="cushion treemap" /></a>
