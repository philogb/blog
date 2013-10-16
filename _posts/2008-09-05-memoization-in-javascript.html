--- 
wordpress_id: 27
layout: post
title: Memoization in JavaScript
categories: [JavaScript]
wordpress_url: /?p=27
---
While reading Jason Hickey's <em>Introduction to Objectve Caml</em> I ran into some <em>memoization</em> examples that I found pretty interesting, and I wondered how memoization could be used/implemented in JavaScript.

<b>What is memoization?</b>
Memoization is a technique that uses side-effects to improve -at runtime- the performance of a function without altering its behavior. Roughly speaking, you can do <em>memoization</em> by storing function values that were returned in previous calls, and returning these values in further calls to the function instead of actually calling the function.

<b>Where can I use memoization?</b>
Not all functions can be memoized. In particular, <em>pure</em> functions can be memoized.
A function is said to be <em>pure</em> when it behaves in a predictable way, in the sense that for each <em>x</em>, the function will always return the same associated <em>y</em> value (i.e a single-valued map).

An example of a function that can be memoized is:
{% highlight js %}
function square(x) {
     return x * x;
}
{% endhighlight %}

An example of a function that <em>can't</em> be memoized could be:
{% highlight js %}
var index = 1;
function not_mem(x) {
     index = index + 1;
     return x + index;
}
{% endhighlight %}

By introducing <em>side-effects</em> we alter the inner state of the function, having different return values for the same input. In this particular case, one could say that <em>not_mem(0) != not_mem(0)</em> is always true!

<b>A somewhat generic way to do memoization</b>
In OCaml we can define a higher order function <em>memo</em> that takes a function <b>f</b> as parameter and returns a memoized function that is perhaps faster than the input function.

{% highlight ocaml %}
   let memo f =
      let table = ref [] in
      let rec find_or_apply entries x =
         match entries with
            (x', y) :: _ when x' = x -> y
          | _ :: entries -> find_or_apply entries x
          | [] ->
             let y = f x in
             table := (x, y) :: !table;
             y
      in
      (fun x -> find_or_apply !table x)
{% endhighlight %}

We can see that the <em>memo</em> function has a <em>table</em> structure where it stores the <em>f</em> function results as <em>(x, y)</em> pairs. For each call to the memoized <em>f</em> function, <em>memo</em> will search in the <em>table</em> structure for an <em>(x, y)</em> pair that matches in <em>x</em> the input value. If found, it will return the associated <em>y</em> value:

{% highlight ocaml %}
         match entries with
            (x', y) :: _ when x' = x -> y
{% endhighlight %}

If not found, it will partially apply <em>x</em> to the original <em>f</em> function, and store the result in <em>table</em> as an <em>(x, y)</em> pair, to be used on further calls. It will finally return the computed value just as the orginial <em>f</em> function would have done:

{% highlight ocaml %}
             let y = f x in
             table := (x, y) :: !table;
             y
{% endhighlight %}

A simple timing shows the performance improvements on further calls for the memoized fibonacci <em>memo_fib</em> function:

{% highlight ocaml %}
#  time memo_fib 40;;
Elapsed time: 14.581937 seconds
- : int = 102334155
# time memo_fib 40;;
Elapsed time: 0.000009 seconds
- : int = 102334155
{% endhighlight %}


<b>Achieving the same thing in JavaScript</b>
For unary functions a simple definition of memo could be:

{% highlight js %}
function memo(f) {
  return function (x) {
      f.memo = f.memo || {};
      return (x in f.memo)? f.memo[x] : f.memo[x] = f(x); 
  }; 
}
{% endhighlight %}

A couple of differences to notice for this version and the OCaml version are:

<ul>
<li>
I'm not using a list of <em>(x, y)</em> pairs. Instead, I'm using a hashtable (or object) <em>{}</em>. This way, response time for the memoized function will not be proportional to the <em>f</em> function domain (as opposed to the OCaml <em>memo</em> function implementation).
</li>
<li>
I'm not using a local <em>table</em> variable to store previous calls. Instead, I'm using a property of the <em>f</em> function, <em>f.memo</em>.
</li>
<li>
In this particular case, the JS <em>memo</em> function behaves like the OCaml <em>memo</em> function for unary functions, since <em>let y = f x</em> for unary functions will evaluate <em>f</em> as opposed to currying the function. However, for (n > 1)-ary functions the OCaml version will return a curried function when called with less formal parameters than "expected".
</li>
</ul>

Lets do some profiling. For this I'll be using the <em>console.time</em> and <em>console.timeEnd</em> firebug methods:

{% highlight js %}
function memo(f) {
  return function (x) {
      f.memo = f.memo || {};
      return (x in f.memo)? f.memo[x] : f.memo[x] = f(x); 
  }; 
}

function fib(x) {
    if(x < 2) return 1; else return fib(x-1) + fib(x-2);
}

var memo_fib = memo(fib);
//first call
console.time("first call");
console.log(memo_fib(30));
console.timeEnd("first call");

//console will output:
//first call: 17264ms
//1346269

//second call (memoized)
console.time("memoized call");
console.log(memo_fib(30));
console.timeEnd("memoized call");

//console will output:
//memoized call: 4ms
//1346269
{% endhighlight %}

<b>Beyond unary functions memoization in JavaScript</b>
The Ocaml and JavaScript versions of <em>memo</em> lack support for (n>1)-ary functions.
If the OCaml <em>memo</em> function is applied to a binary function, it will only memoize the first partial application for this function.

Lets define a function sum_fib and memo_sum_fib:

{% highlight ocaml %}
# let sum_fib a b = (fib a) + (fib b);;
<em>val sum_fib : int -> int -> int = &lt;fun></em>
# let memo_sum_fib = memo sum_fib;;
<em>val memo_sum_fib : int -> int -> int = &lt;fun></em>
{% endhighlight %}

Timing the memoized function might lead to some unexpected results:

{% highlight ocaml %}
# time memo_sum_fib 30 40;;
Elapsed time: 18.753172 seconds
- : int = 166926410
# time memo_sum_fib 30 40;;
Elapsed time: 18.753172 seconds
- : int = 166926410
{% endhighlight %}

This problem happens because the memoization happens at the first partial application level. That means that the <em>table</em> structure will hold (int, int -> int) elements, as opposed of a mapping from a pair of formal parameters to the returned value: (int * int, int).

In JavaScript we have a bigger problem. Since partial application is not a "natural" feature of the language and the memo function is not designed to handle n-ary functions, this will lead to an error or unexpected results. At least the OCaml version returned the expected values :P. 

In JavaScript we can solve this problem by using the <em>arguments</em> object as the key to our <em>f.memo</em> hashtable. Our new <em>memo</em> function would now look like this:
{% highlight js %}
function memo(f) {
  return function () {
      var args = Array.prototype.slice.call(arguments);
      f.memo = f.memo || {};
      return (args in f.memo)? f.memo[args] : 
                     f.memo[args] = f.apply(this, args); 
  }; 
}
{% endhighlight %}

Not only this function supports n-ary functions to be memoized, but also it performs a correct memoization, in the sense that it will store all formal parameters in <em>f.memo</em>, as the key to the value returned by this function. 

Lets do some profiling!

{% highlight js %}
function memo(f) {
  return function () {
      var args = Array.prototype.slice.call(arguments);
      f.memo = f.memo || {};
      return (args in f.memo)? f.memo[args] :
                     f.memo[args] = f.apply(this, args);
  };
}

function fib(x) {
    if(x < 2) return 1; else return fib(x-1) + fib(x-2);
}

function sum_fib(a, b) {
    return fib(a) + fib(b);
}

var memo_sum_fib = memo(sum_fib);
console.time("first call");
console.log(memo_sum_fib(20, 30));
console.timeEnd("first call");

//console will output:
//first call: 17165ms
//1357215

console.time("memoized call");
console.log(memo_sum_fib(20, 30));
console.timeEnd("memoized call");

//console will output:
//memoized call: 5ms
//1357215
{% endhighlight %}

Finally, a nice trick you can do is to call the memoized function the same a the function passed in as a formal parameter. Repeating the last example will show a lot of improvements!

{% highlight js %}
function memo(f) {
  return function (x) {
      f.memo = f.memo || {};
      return (x in f.memo)? f.memo[x] : f.memo[x] = f(x);
  };
}

function fib(x) {
    if(x < 2) return 1; else return fib(x-1) + fib(x-2);
}

var fib = memo(fib);
//first call
console.time("first call");
console.log(fib(30));
console.timeEnd("first call");

//console will output:
//first call: 7ms
//1346269

//second call (memoized)
console.time("memoized call");
console.log(fib(30));
console.timeEnd("memoized call");

//console will output:
//memoized call: 5ms
//1346269
{% endhighlight %}


Any critique or comment will be well appreciated.
Bye!.
