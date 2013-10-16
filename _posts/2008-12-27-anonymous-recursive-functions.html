--- 
wordpress_id: 204
layout: post
title: Anonymous Recursive Functions
categories: [JavaScript]
wordpress_url: /?p=204
---
I learned this "trick" some time ago, while reading the source code for the <a href="http://mootools.net" target="_blank">MooTools</a> JavaScript framework (version 1.1, I think).

I used this "trick" not so long ago, when developing the <a href="/blog/assets/jit-1.0a/examples/spacetree.html">Spacetree</a> visualization for the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a> library.

When clicking a node, the <a href="/blog/assets/jit-1.0a/examples/spacetree.html">Spacetree</a> visualization unselects all tree nodes and then selects the nodes in between the root node and the selected node. This can be implemented as a recursive function, since we have to iterate through the clicked node and its ancestors to set those nodes as selected.

I defined an anonymous recursive function that receives a node and a special value as formal parameters, and sets the <em>selected</em> property from  this node and its ancestors to the specified value: 
{% highlight js %}
  (function(node, val) {
      if(node == null) return;
      node.selected = val;
      return arguments.callee(node.parent, val);
  })
{% endhighlight %}

*arguments.callee* holds a reference to the defined function. 
You can check that by copying this code:

{% highlight js %}
  (function(text) {
    alert(arguments.callee);
    alert(text);
  })("some text");
{% endhighlight %}

and running it in your Firefox console.

Unfortunately, our anonymous recursive function needs to be called more than once, since we first need to unselect previous selected nodes, and then to select the nodes in between the clicked node and the root node.
Similar to the "<b>return this</b>" trick to chain method calls, we can add "<b>return arguments.callee</b>" to chain function calls.
{% highlight js %}
  (function(node, val) {
      if(node == null) return arguments.callee;
      node.selected = val;
      return arguments.callee(node.parent, val);
  })
{% endhighlight %}

This way, we can call our function multiple times. I'll first pass the previous clicked node in order to unselect the previous selected path, and then I'll pass the new clicked node in order to select our new path:
{% highlight js %}
  (function(node, val) {
      if(node == null) return arguments.callee;
      node.selected = val;
      return arguments.callee(node.parent, val);
  })(nodePrev, false)(nodeNew, true);
{% endhighlight %}

What's more interesting though, it's trying to do the same thing in another language, like Lisp or OCaml. 
Who knows, <a href="http://www.t3x.org/sketchy/vol1/sl21.html" target="_blank">you might sumble upon the Y combinator</a>.
