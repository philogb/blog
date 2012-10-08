--- 
wordpress_id: 458
layout: post
title: Generic Functions and JavaScript
categories: [JavaScript]
wordpress_url: /?p=458
---
In my last post I mentioned <a href="/2009/01/27/why-not-operator-overloading-in-javascript/">Operator Overloading</a>, and why I think it would be interesting to see this as a proposal for the ECMAScript 4 specification (the new JavaScript specification).
I've been following the <a href="http://www.ecmascript.org/">ECMA discussion list</a> and the <a href="http://wiki.ecmascript.org/doku.php?id=">ES 4 wiki</a>, and I was surprised to see that <a href="https://mail.mozilla.org/pipermail/es-discuss/2009-January/008535.html">I feel the same way as some people in the ECMA group</a> do about operator overloading.
The <a href="http://wiki.ecmascript.org/doku.php?id=proposals:operators">Operator Overloading proposal</a> has been made a couple of times before, but it was <a href="http://wiki.ecmascript.org/doku.php?id=discussion:operators">disregarded</a> as beeing <em>too weak</em> to be considered.

However, this proposal has been superseeded by some other (very interesting) proposal: <em>generic functions</em> (a.k.a multimethods).

<h4>What are generic functions?</h4>
The first time I discovered generic functions was while playing with Common Lisp's Object System (<a href="http://en.wikipedia.org/wiki/CLOS">CLOS</a>).
In fact, early Lisp systems worked as Smalltalk did, by implementing a <em>send</em> function:
{% highlight js %}

(send object :foo)

{% endhighlight %}

instead of just doing:

{% highlight js %}

(foo object)

{% endhighlight %}

They finally came with the solution of creating <em>generic functions</em> that could be implemented by <em>methods</em>. This design is far more expressive that the classic OO design, implemented in languages such as Java.
Since this design is far from classical OO ones, explaining by example turns out to be quite difficult: the <a href="http://en.wikipedia.org/wiki/Multiple_dispatch#Java">wikipedia examples</a> aren't very enlightening (see the  <a href="http://en.wikipedia.org/wiki/Talk:Multiple_dispatch">article's discussions</a>).

So here I go.

Java has function overloading: that means that several methods with the same name can be defined in the same class, provided that the type (or number of arguments) defined in each method is not the same.

So, for example, lets define a Java class <em>Person</em> with two <em>eat</em> methods:

{% highlight java %}
  class Person {
    public void eat (Food f) { println ("eating food"); }
    public void eat(Pasta p) { println ("eating pasta"); }
  }
{% endhighlight %}
(Pasta extends Food)

We have succesfully overloaded the <em>eat</em> method. However, the overloading happens at compile time, and there's no dynamic dispatch. So, for example this code:

{% highlight java %}
  Food food = new Pasta();
  somePerson.eat(food);
{% endhighlight %}

Will answer "eating food", which isn't exactly what we want.

Now lets consider this code:

{% highlight java %}
class John extends Person {
    public void eat(Food f) { println ("mmm...."); }
    public void eat(Pasta p) { println ("Yummy!"); }
  }

  Person me = new John();
  Food pasta   = new Pasta();
  me.eat(pasta);
{% endhighlight %}

This code will answer "mmm...". But there's one important thing: we've called a method from John's class, instead of some <em>eat</em> method from <em>Person</em>.

This had to be decided at run time, since <em>me</em> is of type <em>Person</em>, but we assigned a <em>John</em> to it...

Now lets define, in pseudo-code, an abstraction of these <em>eat</em> methods, that could be thought as decoupled from the John and Person classes. For example, we could re-write <em>John</em> and <em>Person</em> <em>eat</em> methods as four independent functions:

{% highlight js %}
public void function eat(John john, Food f) { ... }
public void function eat(John john, Pasta p) { ... }

public void function eat(Person person, Food f) { ... }
public void function eat(Person person, Pasta p) { ... }
{% endhighlight %}

What we know about these methods is that Java checks its first argument type at <em>runtime</em>, but all other arguments are checked at <em>compile-time</em>.
So, as far as dynamic dispatch concerns, Java has <em>single dispatch</em>, and <em>function overloading</em> only refers to compile-time checked types, which in general doesn't yield the expected result. (This problem beeing solved by the visitor pattern in most cases).

A <em>generic function</em> can be seen as a <em>family of functions</em> that provide <em>multiple dispatch</em>, that means that all arguments of the function are checked at runtime (on invocation). Not only the <em>first argument</em>, but <em>all</em>.
Compared to Java, this approach would, in most cases, yield the expected answers without having to implement some patterns like the <a href="http://en.wikipedia.org/wiki/Visitor_pattern">visitor pattern</a>.

The four methods defined above could be redefined in <a href="http://en.wikipedia.org/wiki/CLOS">CLOS</a> as:

{% highlight js %}
(defmethod eat ((john John) (f Food)) ... )
(defmethod eat ((john John) (p Pasta)) ... )

(defmethod eat ((person Person) (f Food)) ... )
(defmethod eat ((person Person) (p Pasta)) ... )
{% endhighlight %}

<h4>Generic Functions in JavaScript</h4>
The <a href="http://wiki.ecmascript.org/doku.php?id=proposals:generic_functions">Generic Functions</a> JavaScript proposal aims to solve all weaknesses existing in the <em>Operator Overloading</em> proposal, but it also provides a more generic way of defining and manipulating functions. 
Operator Overloading should be seen as a particular case of what can be done with generic functions in JavaScript.

In JavaScript, a generic function could be defined as:
{% highlight js %}

generic function f(x, y);

{% endhighlight %}

Since a <em>generic function</em> defines a family of functions, there's no function body in it.
A generic function can also be defined with type annotations:
{% highlight js %}

generic function f(x: Numeric, y: Object): MyClass;

{% endhighlight %}

A method is then defined over an existing generic function, using specializers:
{% highlight js %}

 generic function f(x:int, y:boolean): string {
      if (y)
          return string(x);
      else
          return "37";
  }

{% endhighlight %}

Eventually, built-in generic functions could be defined for common operators, providing a way of overloading operators:

{% highlight js %}

generic function +(a:Complex, b:Complex) {
   return new Complex(a.x + b.x, a.y + b.y);
}

{% endhighlight %}

For a JavaScript canvas developer, this would be wonderful, since we mess with <em>Complex</em>, <em>Polar</em>, <em>Matrix</em> classes all the time, and a simple interpolation expression of two complex numbers could be transformed from this:

{% highlight js %}
(to.$add(from.scale(-1))).$scale(delta).$add(from)
{% endhighlight %}

into this:

{% highlight js %}

from + (to - from) * delta

{% endhighlight %}
