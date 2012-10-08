--- 
wordpress_id: 1401
layout: post
title: JavaScript Animations
categories: [JavaScript]
wordpress_url: /?p=1401
---
JavaScript animations are a key aspect of dynamic Web Sites and Application development. Moreover, most JavaScript Frameworks or Libraries provide APIs for dealing with at least three main things:

<ul>
<li>Advanced DOM manipulation</li>
<li>Ajax</li>
<li>Animations</li>
</ul>

When developing Web Sites most JavaScript effects involve rendered DOM Elements, but sometimes JavaScript animations are used in other contexts, like when using the Canvas. In the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a> the main target of my animations are Graphs, and in the next version also Nodes and Edges as separate entities.

Today I'd like to describe how to create a generic animation class that can be used or extended for any purpose. I'll try to be minimalistic and to present only the needed code for making animations. Then you might find useful to add some code to perform specific animation tasks targeting for example specific style properties of a DOM Element.

<h4>Defining an Animation Class</h4>
Before creating an Animation class we might want to consider what to expose as options to the user. The options I thought of are:
<ul>
<li>The duration of the animation (in milliseconds)</li>
<li>The frames per second of the animation</li>
</ul>

Additionally we'd like to add a couple of controllers, one when a step of the animation is executed and one when the animation has completed:
{% highlight js %}
var options = {
  duration: 1000,
  fps: 40,
  onStep: function(delta) {},
  onComplete: function() {}
};
{% endhighlight %}

<em>delta</em> gives us an idea of the <em>progress</em> of the animation. When the animation starts delta will be equal to zero. When the animation ends it'll be equal to one.

We will also need a <em>start</em> method to trigger the animation and a <em>step</em> method that will compute <em>delta</em> at each step.

Now that we defined our options we can start thinking about our implementation.

<h4>Implementing the Animation class</h4>
Our Animation class will be a class constructor that sets all the options and properties that we defined before and a prototype with the methods <em>start</em> and <em>step</em>. The class could be used like this:

{% highlight js %}
var fx = new Effect({
  duration: 1000,
  fps: 40,
  onStep: function(delta) {
    /* do stuff */
  },
  onComplete: function() {
    alert('done!');
  }
});
//start the animation
fx.start();
{% endhighlight %}

Here's the code I came up with, inspired by the <a href="http://mootools.net">MooTools</a> Framework:

{% highlight js %}
//define the class constructor
function Effect(opt) {
  this.opt = {
    duration: opt.duration || 1000,
    fps: opt.fps || 40,
    onStep: opt.onStep || function(){},
    onComplete: opt.onComplete || function(){}
  };
}

Effect.prototype = {
  //define how the animation starts
  start: function() {
    //return if we're currently performing an animation
    if(this.timer) return;
    //trigger the animation
    var that = this, fps = this.opt.fps;
    this.time = +new Date;
    this.timer = setInterval(function() { that.step(); }, 
                             Math.round(1000/fps));
  },
  //triggered at each interval step
  step: function() {
    var currentTime = +new Date, time = this.time, opt = this.opt;
   //check if the time interval already exceeds the duration 
   if(currentTime < time + opt.duration) {
     //if not, calculate our animation progress
      var delta = (currentTime - time) / opt.duration;
      opt.onStep(delta);
    } else {
      //we already exceeded the duration, stop the effect
      //and call the onComplete callback
      this.timer = clearInterval(this.timer);
      opt.onStep(1);
      opt.onComplete();
    }
  }
};
{% endhighlight %}

One very common operation to do with delta is to change the interval [0, 1] of delta to our desired <em>from</em> and <em>to</em> values that we want to compute for our element. A clever thing to do would be to declare this method as a class method for Effect. We'll call it compute:

{% highlight js %}
Effect.compute = function(from, to, delta) {
  return from + (to - from) * delta;
};
{% endhighlight %}

Now If we wanted for example to animate an element's width style from <em>0</em> to <em>10px</em> we could do:

{% highlight js %}
var elem = document.getElementById("myElementId"),
    style = elem.style;
var fx = new Effect({
  duration: 500,
  onStep: function(delta) {
    style.width = Effect.compute(0, 10, delta) + 'px';
  }
});
fx.start();
{% endhighlight %}

<h4>Extending the Effect class</h4>
The animation code defined above could be extended in different ways. For example, this class could be slightly modified to accept a DOM element in its constructor and modify style properties of that element when performing an animation. The code could look like this:

{% highlight js %}
var elem = document.getElementById("myElementId");
var fx = new Effect({
  element: elem,
  duration: 1000
});
fx.start({
  'width': [0, 20, 'px'],
  'height': [0, 5, 'em']
});
{% endhighlight %}

The code would now look more or less like this:

{% highlight js %}
//define the class constructor
function Effect(opt) {
  this.opt = {
    element: opt.element,
    duration: opt.duration || 1000,
    fps: opt.fps || 40,
    onComplete: opt.onComplete || function(){}
  };
}

Effect.prototype = {
  //props contains a hash with style properties
  start: function(props) {
    if(this.timer) return;
    var that = this, fps = this.opt.fps;
    this.time = +new Date;
    this.timer = setInterval(function() { that.step(props); }, 
                             Math.round(1000/fps));
  },
  //triggered at each interval step
  step: function(props) {
     var currentTime = +new Date, time = this.time, opt = this.opt;
     if(currentTime < time + opt.duration) {
      var delta = (currentTime - time) / opt.duration;
     //set the element style properties
     this.setProps(opt.element, props, delta);
    } else {
      this.timer = clearInterval(this.timer);
      this.setProps(opt.element, props, 1);
      opt.onComplete();
    }
  },
  //set style properties. Properties must be
  //in camelcase format.
  setProps: function(elem, props, delta) {
    var style = elem.style;
    for(var prop in props) {
      var values = props[prop];
      style[prop] = Effect.compute(values[0], values[1], delta)
        + (values[2] || '');
    }
  }
};
{% endhighlight %}

Other extensions might involve normalizing style keywords, adding effect transitions, adding <em>pause</em> <em>resume</em> methods, and/or using more OO JS idioms when coding these classes.

I hope you got to know a little bit more about animation internals and please if you have any advice on this code, which as I told before is just for demonstration, I'll be pleased to hear you!
