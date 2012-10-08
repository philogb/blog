--- 
layout: post
title: Analyzing JavaScript Class Patterns Performance 
categories: [JavaScript]
---

For a while now I've been considering different JavaScript class patterns and their performance when initializing and calling methods 
from them. Depending on the use-case some class patterns can show considerable performance improvements over the typical pseudo-classical patterns. 
In some cases, the use of closures and private member initializers in function constructors, as opposed to [what's stated by the MDC](https://developer.mozilla.org/en/JavaScript/Guide/Closures#Performance_considerations), can also show performance 
improvements over classical approaches.

JavaScript class performance can be analyzed by altering two variables: the _JavaScript class_ can have public/private properties and/or  
public/private methods. On the other hand, _code performance_ can be measured on _class definition_, _class constructors_, 
or _instance methods_.

I'll just state the conclusion before making the analysis: there's not a unique class pattern that will make your code faster in all cases. Most of the time 
it just depends on your use-case. In most cases people try to delegate all computations at _class definition_, since this generally happens only once. When this is 
not possible there's a tradeoff between having computations in the _class constructor_ or performing these computations when a _method is called_.

The premise for this analysis is that the extra-computations can't be avoided, and their complexity can't be simplified. In some sense, they're just like a 
black box.

In the next section I'll show how you can use _closures_, _variable scope_ and a _class prototype_ to delegate computations at _class definition_, _class constructor_ 
or to just keep the computations when _calling a method_.

## Class.prototype 101

Any JavaScript object, (String, Object, RegExp, etc), generally has two type of properties: the *own* properties and the properties 
found in the *prototype chain*. Each object has a special property *proto* that actually points to another object (or is null). 

When we try to access a property in an object:

{% highlight js %}
var propertyValue = object.myProperty;
{% endhighlight %}

it will first try to see if it's an *own property*, something that can be checked by doing:

{% highlight js %}
Object.prototype.hasOwnProperty.call(object, 'myProperty');
{% endhighlight %}

and use that property if it exists. If it doesn't exist then it will try to find that property inside the object pointed by the *proto* property:

{% highlight js %}
object.__proto__.myProperty;
{% endhighlight %}

If the property isn't found in the object pointed by *proto* then it will try to find it recursively in the prototype chain 
(object.proto.proto, etc) until it gets to the top of it.

When we create a Class with a prototype:

{% highlight js %}
 function Person() {
    //constructor
 }

 Person.prototype.sayHi = function() {
    alert("hi");
 };

 var p = new Person();
 p.sayHi(); //"hi"
{% endhighlight %}

Internally JavaScript will assign to any Person instance *proto* property the Person.prototype object we defined above. 
This means that we actually define an object with methods only once, and any instance of Person will have a *proto* property pointing to those methods. 
Since all Person instances point to the same Person.prototype people usually say they share those methods, and so they're shared properties across instances.

{% highlight js %}
var p = new Person();
p.__proto__ === Person.prototype //true
p.sayHi === p.__proto__.sayHi //true
{% endhighlight %}

The convenience about this is that we don't have to execute an entire code that actually re-creates methods and assigns them to a newly created object in 
the function constructor. Since each time new Person is called the Person function is executed, it would be better to just define the methods in the prototype object 
for once and not execute code for augmenting an object with new methods each time we call Person.

Let's see how this could be used to increase the performance of certain class patterns.

## Public Properties

In the public properties class definition we just move all properties definitions from the _class constructor_ to the _prototype_ object. By moving these computations 
we can see that there are some interesting performance improvements on constructor calls.

The code preparations are:

{% highlight js %}
function ConstructorPublicProperties() {
  this.publicProperty1 = 1;
  this.publicProperty2 = 2;
  this.publicProperty3 = 3;
  this.publicProperty4 = 4;
  this.publicProperty5 = 5;
  this.publicProperty6 = 6;
  this.publicProperty7 = 7;
  this.publicProperty8 = 8;
  this.publicProperty9 = 9;
  this.publicProperty10 = (function() {
   var i = 100;
   while (i--);
   return 10;
  })();
}

function PrototypePublicProperties() {}
 
PrototypePublicProperties.prototype = {
  publicProperty1: 1,
  publicProperty2: 2,
  publicProperty3: 3,
  publicProperty4: 4,
  publicProperty5: 5,
  publicProperty6: 6,
  publicProperty7: 7,
  publicProperty8: 8,
  publicProperty9: 9,
  publicProperty10: (function() {
   var i = 100;
   while (i--);
   return 10;
  })()
};
{% endhighlight %}

The code we actually compare is:

{% highlight js %}
for (var i = 0; i < 1000; i++) {
 new ConstructorPublicProperties();
}
{% endhighlight %}

vs.

{% highlight js %}
for (var i = 0; i < 1000; i++) {
 new PrototypePublicProperties();
}
{% endhighlight %}

As you can see by the [test case that you can run yourself](http://jsperf.com/constructor-public-properties2/2) moving computations 
to the *prototype* object can lead to considerable performance improvements in class constructors.

## Public Methods

For public methods the case is just the same than with public properties. Moving all definitions and initializations to the *prototype* object 
leads to performance improvements in class constructors.

The preparation code for this is:

{% highlight js %}
function ConstructorPublicMethods() {
  this.publicMethod1 = function(n) {
   return 2 * n;
  };
 
  this.publicMethod2 = function(n) {
   return 3 * n;
  };
 }
 
 function PrototypePublicMethods() {}
 
 PrototypePublicMethods.prototype = {
  publicMethod1: function(n) {
   return 2 * n;
  },
 
  publicMethod2: function(n) {
   return 3 * n;
  }
 };
{% endhighlight %}

The [test](http://jsperf.com/constructor-public-methods) code is:

{% highlight js %}
for (var i = 0; i < 1000; i++) {
 new ConstructorPublicMethods();
}
{% endhighlight %}

vs.

{% highlight js %}
for (var i = 0; i < 1000; i++) {
 new PrototypePublicMethods();
}
{% endhighlight %}

As [you can see](http://jsperf.com/constructor-public-methods) constructors are also faster when public methods are defined inside the *prototype* object.

## Private Methods

Private methods can be defined in JavaScript by using the class constructor as encapsulation for other function definitions. This is a pattern I've seen done 
by Douglas Crockford and is used in many other places:

{% highlight js %}
function ConstructorPrivateMethods() {
  function privateMethod1(n) {
   return 2 * n;
  }
 
  function privateMethod2(n) {
   return 3 * n;
  }
 
  this.publicMethod1 = function(n) {
   return privateMethod1(privateMethod2(n));
  };
 }
{% endhighlight %}

If you're only defining private methods (and not private properties) you can also augment the prototype object with public methods and use encapsulation for 
defining private methods around the prototype object. I've seen this clever technique done by [WebReflection](http://twitter.com/webreflection) some time ago:

{% highlight js %}
function PrototypePrivateMethods() {}
 
 (function() {
 
  function privateMethod1(n) {
   return 2 * n;
  }
 
  function privateMethod2(n) {
   return 3 * n;
  }
 
  PrototypePrivateMethods.prototype = {
   publicMethod1: function(n) {
    return privateMethod1(privateMethod2(n));
   }
  };
 
 })();
{% endhighlight %}

The code tested is the same as in the previous sections:

{% highlight js %}
for (var i = 0; i < 1000; i++) {
 new ConstructorPrivateMethods();
}
{% endhighlight %}

vs.

{% highlight js %}
for (var i = 0; i < 1000; i++) {
 new PrototypePrivateMethods();
}
{% endhighlight %}

[As you can see for yourself](http://jsperf.com/constructor-private-methods) the prototype version has the fastest constructor. The performance improvements 
are considerable with this pattern which is interesting in use-cases such as when defining some helper functions to be used with a class.

## Private Properties

The examples above are kind of simple to analyze: moving the computations from the class constructor to the prototype object can lead to faster constructors, and 
more generally can increase performance since the code is computed once at the _class definition_ and not once per each _constructor call_.

With private properties there's a tradeoff. Since private properties are generally accessed and/or modified by public methods, defining a private property inside 
the _constructor_ forces the definition of the public method into the _class constructor_ too, decreasing the overall performance of the class constructor. Another 
interesting technique could be to just use an underscore prefix for private members:

{% highlight js %}
function ConstructorPrivateProperties() {
  var privateProperty1 = 1,
      privateProperty2 = 2,
      privateProperty3 = 3,
      privateProperty4 = 4,
      privateProperty5 = 5,
      privateProperty6 = 6,
      privateProperty7 = 7,
      privateProperty8 = 8,
      privateProperty9 = 9,
      privateProperty10 = 10;
 
  this.publicMethod1 = function() {
   return privateProperty1 
        + privateProperty2 
        + privateProperty3 
        + privateProperty4 
        + privateProperty5 
        + privateProperty6 
        + privateProperty7 
        + privateProperty8 
        + privateProperty9 
        + privateProperty10;
  };
 }
 
 function PrototypePrivateProperties() {}
 
 PrototypePrivateProperties.prototype = {
  _privateProperty1: 1,
  _privateProperty2: 2,
  _privateProperty3: 3,
  _privateProperty4: 4,
  _privateProperty5: 5,
  _privateProperty6: 6,
  _privateProperty7: 7,
  _privateProperty8: 8,
  _privateProperty9: 9,
  _privateProperty10: 10,
 
  publicMethod1: function() {
   return this._privateProperty1 
        + this._privateProperty2 
        + this._privateProperty3 
        + this._privateProperty4 
        + this._privateProperty5 
        + this._privateProperty6 
        + this._privateProperty7 
        + this._privateProperty8 
        + this._privateProperty9 
        + this._privateProperty10;
  }
 };
{% endhighlight %}

The [code we're testing is](http://jsperf.com/constructor-and-method-private-vars):

{% highlight js %}
for (var i = 0; i < 1000; i++) {
 new ConstructorPrivateProperties();
}
{% endhighlight %}

vs.

{% highlight js %}
for (var i = 0; i < 1000; i++) {
 new PrototypePrivateProperties();
}
{% endhighlight %}

[As you can see for yourself](http://jsperf.com/constructor-and-method-private-vars) using the prototype object yields faster constructors again. __But there's a catch__: 
the public method for the augmented prototype object class access _this.something_ instead of just accessing a local variable, which drops the overall method call performance 
considerably. [You can see this for yourself by testing this code:](http://jsperf.com/calling-public-methods-accessing-private-vars)

{% highlight js %}
var instance = new ConstructorPrivateProperties();

for (var i = 0; i < 1000; i++) {
 instance.publicMethod1();
}
{% endhighlight %}

vs.

{% highlight js %}
var instance = new PrototypePrivateProperties();

for (var i = 0; i < 1000; i++) {
 instance.publicMethod1();
}
{% endhighlight %}

The augmented prototype object version is the slowest. What's also interesting is that using private properties defined in the function constructor can increase 
the overall performance of the methods called in your class (if they access instance properties).

So are you targeting faster constructors, class definitions or methods? The fact is that any of these three stages can be optimized, but generally with a tradeoff.
