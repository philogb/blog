--- 
wordpress_id: 1218
layout: post
title: ECMA Harmony and the Future of JavaScript
categories: [JavaScript]
wordpress_url: /?p=1218
---
I like to see language implementors (or creators in this case) talk about the design challenges or choices they're facing with in the next version of their languages. 

In this video <a href="http://en.wikipedia.org/wiki/Brendan_Eich">Brendan Eich</a>, the creator of JavaScript, talks about the <em>ES 3.1/4/5</em> thingy and also explains what features will be added to JavaScript in some near future (at least for the ECMA standard).

I'll add a couple of comments about the JS features I liked below the video.

<div><object width="500" height="324"><param name="movie" value="http://d.yimg.com/m/up/ypp/default/player.swf"></param><param name="flashVars" value="vid=16429147&"></param><param name="allowfullscreen" value="true"></param><param name="wmode" value="transparent"></param><embed width="500" height="324" allowFullScreen="true" src="http://d.yimg.com/m/up/ypp/default/player.swf" type="application/x-shockwave-flash" flashvars="vid=16429147&"></embed></object></div>

<h4>New stuff I liked about the language</h4>

Most of the things I liked about the new features of the language are related to Meta-Programming. These new features describe new behaviors in object properties, like <em>getters</em> and <em>setters</em>, but they are also related to object and property mutability, configuration, visibility, etc.

<b>Getters and Setters</b>

Getters and Setters were implemented by B.E. more than nine years ago at mozilla, but a new syntax is introduced in the standard by adding a static function to the <em>Object</em> class.

{% highlight js %}
Object.defineProperty(obj, "length", {
  get: function() {
    return this.computeLength();
  },
  set: function(value) {
    this.changeLength(value);
  }
});
{% endhighlight %}

In this example the <em>defineProperty</em> static method of the <em>Object</em> class adds the <em>length</em> property to the <em>obj</em> object. The <em>get</em> and <em>set</em> methods will be called when accessing or modifying the <em>length</em> property. 
<em>Object.getOwnPropertyDescriptor</em> retrieves the property descriptor of the defined property.

<b>Defining Methods and Richer Property Descriptors</b>
The <em>Object.defineProperty</em> method can also be used to define instance methods:

{% highlight js %}
Object.defineProperty(Array.prototype, "inject", {
  value: function(memo, iterator, context) {
    iterator = iterator.bind(context);
    this.each(function(value, index) {
      memo = iterator(memo, value, index);
    });
    return memo;
  },

  configurable: false,
  enumerable: false,
  writable: false
});
{% endhighlight %}

The method does something similar as <em>inject_into</em> or <em>reduce</em> methods do in other languages:

{% highlight js %}
[ 1, 2, 3 ].inject(0, function(a, b) { return a+b; }); //6
{% endhighlight %}

If <em>configurable=true</em>, the property will be enabled for deletion or to be changed in other ways.

You can set a property to be non-enumerable by setting <em>enumerable=false</em>, and it won't be detected in a <em>for in</em> loop (or in any other <em>"prop" in obj</em> expression). This means that for example we could augment <em>Object.prototype</em> with methods without having to iterate through them in a <em>for in</em> loop.

The <em>writable</em> property if setted to <em>false</em> won't allow you to change the value of that property.


<b>Object.create</b>

Still no support is added for classical inheritance patterns (which makes me happy I must confess). 
Instead, the differential inheritance pattern gets a function that had (somewhat) been implemented by frameworks like <a href="http://code.google.com/closure/">Closure</a>, <a href="http://mootools.net">MooTools</a> and others with the <a href="http://code.google.com/closure/library/docs/introduction.html#oop">inherits</a> and <a href="http://mootools.net/docs/core/Core/Core#merge">$merge</a> functions.
<em>Object.create</em> can be used for implementing prototypical inheritance: you can create a new class <em>A</em> that inherits from <em>B</em> by cloning an object and augmenting it with a <em>Properties</em> object. For example:

{% highlight js %}
var Person = function() {};
Person.prototype.eat = function() {
  alert("eating");
};
//Ninja extends Person
var Ninja = function() {};
Ninja.prototype = Object.create(Person.prototype, {
  doKungFu: function() {
    alert("wootoo");
  }
});

var n = new Ninja();
n.eat(); //eating
n.doKungFu(); //wootoo
{% endhighlight %}

However, don't forget to instantiate the superclass in your subclass constructor:

{% highlight js %}
var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype.distanceToOrigin = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
//Complex extends Point
var Complex = function(x, y) {
  Point.call(this, x, y); //call the superclass
};

Complex.prototype = Object.create(Point.prototype, {
  add: function(complex) {
    this.x += complex.x;
    this.y += complex.y;
  }
});

{% endhighlight %}

<b>Object.preventExtensions, Object.seal, Object.freeze</b>

Mutability is nice but sometimes we need to make our objects immutable for design reasons, for security reasons. These methods change the mutability level of an object.

<ul>
<li><em>Object.preventExtensions</em> prevents an object from extending (i.e adding new properties to it). Still the properties it has can be deleted and their value can be changed.</li>
<li><em>Object.seal</em> does everything <em>Object.preventExtensions</em> does and also sets <em>configurable=false</em> for its properties, so they can't be deleted. The Object properties can be changed though.</li>
<li><em>Object.freeze</em> makes the object completely immutable. <em>Object.freeze</em> does the same <em>Object.preventExtensions</em> and <em>Object.seal</em> do but also sets <em>writable=false</em> for all object properties.</li>
</ul>


I hope this was useful to you. There are a lot more interesting language features to come, so you can read the ECMA <a href="http://www.ecmascript.org/">draft</a> if you're interested in knowing more about this new version.
