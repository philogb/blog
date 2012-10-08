--- 
wordpress_id: 26
layout: post
title: Pattern matching in OCaml (and JavaScript?)
categories: [OCaml, JavaScript]
wordpress_url: /?p=26
---
I've been trying to learn OCaml lately. 
I want to try information visualization for the "dektop" (as opposed to the web), and although I know C++ or Java would be recommended languages for this kind of thing (they have lots of libraries and pretty large communities regarding visualization in general -think about games, OpenGL, etc), I wouldn't feel very comfortable doing geometric computation in C++ or Java.
Although geometric computation often handles objects, there's also the "functional side" of it that doesn't seem to be fulfilled by C++ or Java. Ocaml felt like the right mix in of programming paradigms to do this kind of thing, so I began to read <em>Introduction to Objective Caml</em> by <em>Jason Hickey</em>.

One of the chapters I really enjoyed about this book is <em>Basic pattern maching</em>. I was pretty amazed about the predominance of pattern matching in OCaml. Pattern matching can be applied to (almost) any OCaml primitive type (string, Boolean, char...), it also applies to a variety of syntactic structures (like assignment, function definition, etc) and finally there's a lot of "syntactic sugar" going on in pattern matching. 

The basic syntax for doing pattern matching in Ocaml is:
{% highlight ocaml %}
match expression with
 | pattern1 -> expression1
 | pattern2 -> expression2
 .
 .
 .
  | patternN  -> expressionN

{% endhighlight %}

This way you could define a fibonacci <em>fib</em> function like this:
{% highlight ocaml %}
let rec fib i =
   match i with
      0 -> 0
    | 1 -> 1
    | j -> fib (j - 2) + fib (j - 1);;
{% endhighlight %}

Since it's quite common to define functions with <em>match</em> expressions as their body, Ocaml reserved a special keyword <em>function</em> that defines a function with a single argument treated as pattern match. For example the <em>fib</em> function could be re-defined like this:
{% highlight ocaml %}
  let rec fib = function
     0 -> 0
   | 1 -> 1
   | i -> fib (i - 1) + fib (i - 2);;
{% endhighlight %}
The pattern match argument is now implicit in the function definition. That's quite minimalistic.
There's also the <em>as</em> keyword used to bind a match to a variable. For example:
{% highlight ocaml %}
let rec fib = function
   (0 | 1) as i -> i
 | i -> fib (i - 1) + fib (i - 2);;
{% endhighlight %}
The <em>when</em> keyword evaluates a condition after the pattern match. The <em>fib</em> function could now look like this:
{% highlight ocaml %}
let rec fib = function
   i when i < 2 -> i
 | i -> fib (i - 1) + fib (i - 2);;
{% endhighlight %}

Pattern matching can also be applied to other Ocaml primitive types, like strings, chars, Booleans. Let's take an example of the function <em>is_uppercase</em>:
{% highlight ocaml %}
  let is_uppercase = function
   'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
 | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P'
 | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X'
 | 'Y' | 'Z' ->
    true
 | c ->
    false;;
{% endhighlight %}
But that's not minimalistic. It would be if we used <b>pattern ranges</b> to specify the list of letters like this:
{% highlight ocaml %}
let is_uppercase = function
   'A' .. 'Z' -> true
 | c -> false;;
{% endhighlight %}
The <em>c1..c2</em> notation specifies the letters range.
The <em>c</em> pattern variable acts here like a <em>wildcard</em> to match all non-uppercase symbols. Since this is another commonly occurring structure, Ocaml reserves the <em>_</em> symbol to match anything:
{% highlight ocaml %}
 let is_uppercase = function
    'A' .. 'Z' -> true
  | _ -> false;;
{% endhighlight %}

<b>Pattern matching everywhere</b>
What's really interesting about pattern matching in Ocaml, is that not only pattern matching can be applied to (<em>almost</em>) any primitive type, but that pattern matching constructions are also allowed in a variety of places:

{% highlight ocaml %}
let    pattern = expression

let    identifier pattern . . . pattern =  expression

fun    pattern -> expression
{% endhighlight %}

So, for example, if we define a tuple like this:

{% highlight ocaml %}
let p = 1, "Hello";;
{% endhighlight %}
We could access its components using pattern matching:

{% highlight ocaml %}
let x, y = p;;
{% endhighlight %}

Another example with lists could be:

{% highlight ocaml %}
let aList = [1; 2; 3];;
let hd :: tl = aList in
  Printf.printf "%d" hd;;
{% endhighlight %}

The latter code will print "1".

<b>What <em>can't</em> be done...</b>
We can't do pattern matching with one type in Ocaml, and that's <em>functions</em>:

{% highlight ocaml %}
  match (fun i -> i + 1) with
     (fun i -> i + 1) -> true;;
      ^^^
Syntax error
{% endhighlight %}

<b>What about JavaScript?</b>
Unfortunately JavaScript doesn't have pattern matching. The closest thing to pattern matching that JavaScript has is, well, the Regexp object. In some sense that can be regarded as string pattern matching.
The funniest thing about that fact, is that "string pattern matching" can be used as "function pattern matching" in JavaScript.

JavaScript functions have a method called <em>toSource</em>, that returns a string of the source code of the function. For example:

{% highlight js %}
(function (formalParam1, formalParam2) 
     { return formalParam1; }).toSource();
{% endhighlight %}
should return (at least in Firefox) the String:

{% highlight js %}
"(function (formalParam1, formalParam2) {return formalParam1;})"
{% endhighlight %}
However, applying this method to the native <b>Function</b> class returns the following:

{% highlight js %}
"function Function() {[native code]}"
{% endhighlight %} 

You can find function pattern matching examples in JavaScript when browsing the "Class" object implementations for any JS framework. Most frameworks that provide a "Class" object to wrap prototypal inheritance in something more OO have to check all methods for calls on "super" in order to effectively call the superclass method. However, we first have to verify that the browser supports a <em>toSource</em> method that actually returns a string of the entire function body. That check is done with simple function pattern matching:

{% highlight js %}
  /xyz/.test(function(){xyz;});
{% endhighlight %}

This code will return true if the "xyz" pattern is found in the anonymous function. If true, then we can "search" for <em>super</em> calls in all body functions in order to replace them with the proper superclass method call. A nice example of simple JavaScript inheritance implementation can be seen in <a href="http://ejohn.org/blog/simple-javascript-inheritance/" target="_blank">John Resig's post</a>

Although I know this is still a regexp match, It can also be seen as comparing a function's body to a given pattern and thus I believe it can be called function pattern matching.
