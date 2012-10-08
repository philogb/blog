--- 
wordpress_id: 1098
layout: post
title: Force Directed Layouts
categories: [JavaScript InfoVis Toolkit, Visualization]
wordpress_url: /?p=1098
---
I'm currently working on three new visualizations for the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a> that will be added in version 1.2. 

I started the development of these new visualizations a couple of weeks ago, and while trying to incorporate these new visualizations harmoniously into the Toolkit I've found myself considering new design and code abstractions I haven't thought about before. That's good for the Toolkit, and also good for my brain :)

One of the visualizations I'll be incorporating in the next major release is a Force-Directed visualization. I first want to thank <a href="http://www.marcuscobden.co.uk/">Marcus Cobden</a> for donating a lot of code related to this algorithm that you can find <a href="http://groups.google.com/group/javascript-information-visualization-toolkit/msg/05d16602f2449f3d">here</a>. 

My code is based in his donation and also in a nice overview of Force-Directed layout algorithms that I've found <a href="http://www.cs.brown.edu/~rt/gdhandbook/chapters/force-directed.pdf" target="_blank">here</a>.

<h4>So what are Force-Directed Layout Algorithms?</h4>
Force-Directed Layout algorithms are graph drawing algorithms based only on information contained within the structure of the graph itself rather than relying on contextual information. The most straightforward Force-Directed algorithm uses repulsive forces between nodes and attractive forces between adjacent nodes. This physical model produces some local <em>minima</em> in which the graph, well, gets to a stable configuration and is drawn in an aesthetically pleasing way.

The main algorithm consists on a main loop that simulates the system for some iterations and then plots the graph. The system will consist on repulsive forces between all graph nodes and attractive forces between adjacent nodes. The force models considered correspond to <a href="http://en.wikipedia.org/wiki/Hooke%27s_law">Hooke's law</a> and <a href="http://en.wikipedia.org/wiki/Coulomb%27s_law">Coulomb's law</a>. 

Here's an example with some JSON data I also use for other examples at the <a href="http://thejit.org/demos">demos page</a>:

<img src="/blog/assets/force-directed.png" alt="Force Directed Image" style="border: 1px solid cyan; margin: 5px 13px 5px 0pt; padding: 3px;" />

There are lots of refinements and different methods for making Force-Directed Layouts. Some are just based on the model I described before, others are based on what's called Graph Theoretic Distances: If for two adjacent nodes their ideal distance is set as <em>d</em>, then for nodes with shortest path distance of <em>n</em> their ideal layout distance should be <em>n * d</em>. Attractive and repulsive forces are used to make a graph system with random nodes positions get to a <em>local minima</em> based on these rules.

I implemented the first model I described. For each iteration the <em>computePositionStep</em> method is called to update all nodes positions based on attractive and repulsive forces. The formal parameters passed to the method are <em>property</em> which is an array of node properties which contain positions to be updated and <em>opt</em> which is an object containing layout options like generic repulsive and attractive force functions. <em>$C</em> creates a new <a href="http://thejit.org/docs/files/Complex-js.html">Complex Number</a>.

{% highlight js %}
  computePositionStep: function(property, opt) {
    var graph = this.graph, GUtil = Graph.Util;
    var min = Math.min, max = Math.max;
    var dpos = $C(0, 0);
    //calculate repulsive forces
    GUtil.eachNode(graph, function(v) {
      //initialize disp
      $each(property, function(p) {
        v.disp[p].x = 0; v.disp[p].y = 0;
      });
      GUtil.eachNode(graph, function(u) {
        if(u.id != v.id) {
          $each(property, function(p) {
            var vp = v.getPos(p), up = u.getPos(p);
            dpos.x = vp.x - up.x;
            dpos.y = vp.y - up.y;
            var norm = dpos.norm() || 1;
            v.disp[p].$add(dpos
                .$scale(opt.nodef(norm) / norm));
          });
        }
      });
    });
    //calculate attractive forces
    var T = !!graph.getNode(this.root).visited;
    GUtil.eachNode(graph, function(node) {
      GUtil.eachAdjacency(node, function(adj) {
        var nodeTo = adj.nodeTo;
        if(!!nodeTo.visited === T) {
          $each(property, function(p) {
            var vp = node.getPos(p), up = nodeTo.getPos(p);
            dpos.x = vp.x - up.x;
            dpos.y = vp.y - up.y;
            var norm = dpos.norm() || 1;
            node.disp[p].$add(dpos.$scale(-opt.edgef(norm) / norm));
            nodeTo.disp[p].$add(dpos.$scale(-1));
          });
        }
      });
      node.visited = !T;
    });
    //arrange positions to fit the canvas
    var t = opt.t, w2 = opt.width / 2, h2 = opt.height / 2;
    GUtil.eachNode(graph, function(u) {
      $each(property, function(p) {
        var disp = u.disp[p];
        var norm = disp.norm() || 1;
        var p = u.getPos(p);
        p.$add($C(disp.x * min(Math.abs(disp.x), t) / norm, 
            disp.y * min(Math.abs(disp.y), t) / norm));
        p.x = min(w2, max(-w2, p.x));
        p.y = min(h2, max(-h2, p.y));
      });
    });
  }
{% endhighlight %}

You can find more information about this algorithm in <a href="http://www.cs.brown.edu/~rt/gdhandbook/chapters/force-directed.pdf">this overview of Force-Directed algorithms</a>.
This method is called multiple times to provide a final layout, for example like this:
{% highlight js %}
      for(var i=0; i &lt; times; i++) {
        opt.t = opt.tstart * (1 - i/(times -1));
        this.computePositionStep(property, opt);
      }
{% endhighlight %}

Where <em>times</em> corresponds to the number of iterations of the simulation, and is generally <em>&gt; 50</em> and <em>t</em> can be thought as the global temperature of a system that gets cooler with each iteration.

<h4>Performance</h4>
Although there are a couple of methods to reduce the complexity of this algorithm, this implementation runs like <em>O(V^3)</em>, which can be considered as really bad performance.

This is not desirable for real-time interactive visualizations, in which everlasting computation algorithms can lead to blocking browser popups like <em>"This Script is Taking too long..."</em> or things like that.

One way you can avoid these popups is by making incremental computations. This can be done by splitting the main algorithm that has for example 100 iterations into smaller pieces of 20 iterations each. The main iteration loop could then be changed into something like this:

{% highlight js %}
  computePositions: function(property, opt, incremental) {
    var times = this.config.iterations, i = 0, that = this;
    if(incremental) {
      (function iter() {
        for(var total=incremental.iter, j=0; j&lt;total; j++) {
          opt.t = opt.tstart * (1 - i++/(times -1));
          that.computePositionStep(property, opt);
          if(i >= times) {
            incremental.onComplete();
            return;
          }
        }
        incremental.onStep(Math.round(i / (times -1) * 100));
        setTimeout(iter, 1);
      })();
    } else {
      for(; i < times; i++) {
        opt.t = opt.tstart * (1 - i/(times -1));
        this.computePositionStep(property, opt);
      }
    }
  }
{% endhighlight %}

This method could be called for example like this:
{% highlight js %}
    //compute positions incrementally and animate.
    fd.computePositions(property, opt, {
      iter: 20,
      onStep: function(perc) {
        Log.write(perc + '% loaded...');
      },
      onComplete: function() {
        Log.write('done');
       fd.animate(); 
      }
    });
{% endhighlight %}

And the main computation would be split into smaller parts calling on each step of the computation the <em>onStep</em> callback.

<h4>Graph Operations</h4>
For graph operations (Adding/Removing nodes and edges, Graph Sum and Graph Morphing) I make all iterations in the first layout and then only apply 20 iterations after some operation has been completed. Here's a video:

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/q8bY-1Lseh0&hl=en&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/q8bY-1Lseh0&hl=en&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>

<h4>When (*not*) to use Force-Directed Layouts</h4>

Force-Directed Layouts can be a good choice when you're drawing general graphs and you don't have domain specific (or any other topological) information about them.
Tree structures however are a special case of graphs: this means that tree structures have more constrains and therefore there's more contextual information for drawing a Tree than for drawing a general graph.
Also, Trees are easier to grasp for the human eye than "general graphs". There's that intrinsic notion of hierarchy that can be used to draw aesthetically pleasing graph layouts. Think about the "general graph" layouts that start with the drawing of a <a href="http://en.wikipedia.org/wiki/Spanning_tree">spanning tree</a> and then add the "extra edges" to complete the graph structure (for example <a href="http://thejit.org/Jit/Examples/RGraph/example3.html">here</a> and <a href="http://thejit.org/Jit/Examples/Hypertree/example3.html">here</a>). The Multitrees method I mentioned <a href="/2009/08/16/multitrees-part-1/">a couple of posts ago</a> was also developed to try to extract more contextual information about a graph and draw it based on a notion of partial hierarchy.

Because of this, in my opinion, it wouldn't be wise to plot Trees that have many nodes with this Force-Directed algorithm: this extra-information about trees isn't used in this layout. However, if you're planning on drawing general graphs and you don't have any other information about them, then this algorithm can detect interesting symmetries and make aesthetically pleasing drawings.

I'll keep you updated with the other visualizations I'm working on in the next posts.
