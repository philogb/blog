--- 
wordpress_id: 1033
layout: post
title: Back to Basics
categories: [JavaScript]
wordpress_url: /?p=1033
---
Most of us JavaScript developers can't work without using a JavaScript Library/Framework today. JavaScript is a very nice language, but it requires for you to write a lot of code before you can implement some interesting animation, drag and drop feature, or Ajax request/polling.
This is in part due to the fact that every line of code we write must be browser compatible, and that adds lots of "ifs" to our code.
So I guess it's understandable to think that choosing a framework that can abstract these kind of things for us is good. By using a framework we can concentrate on other kind of problems, more like high-level-usability-pattern problems.

Some frameworks stick with JavaScript as their main language (like <a href="http://mootools.net">MooTools</a> or <a href="http://jquery.com">JQuery</a>). Other frameworks simply let you type another kind of language that then gets compiled into JavaScript. I guess that having a language with built-in classical inheritance syntax and a nice IDE to support it are good reasons to develop these kind of libraries that translate some code into another.

Frameworks are undeniably good, <em>but</em> most of the things I learn about the JavaScript programming language were learn while hacking some pure JavaScript code.
When hacking pure JavaScript code you find yourself hacking common language idioms that are usually abstracted by frameworks. And it's nice to understand how these things work. When you get how a specific JavaScript pattern/idiom works you get to understand lots of things about the language itself.

Most of the people don't do this today. You can see posts about <em>call</em> and <em>apply</em>, closures and private members patterns very often in Reddit and Ajaxian, and each time that post appears lots of other people upmod it. So that means that most of the people today probably use the <em>bind</em> Function method without really knowing what it does.

The worst part is that JavaScript is a very beginner-friendly language, a good start for people not having a computer sicence related background, but at the same time there are lots of things about the language itself that are advanced features (object mutability, booleans as defaults, functions as first class citizen, prototypal inheritance) and most of the users are never aware of these features, most of the time due to the abstraction of the frameworks they're using.

<h4>An Example</h4>

This is a very simple example (and interesting interview question also).
If you're dealing with the dom when hacking JavaScript then you might often use the <em>hasClass</em> and <em>removeClass</em> methods from JQuery, MooTools, or whatever.

So, how would you write them?

{% highlight js %}
function hasClass(domElement, className) {
 //code here...
}

function removeClass(domElement, className) {
//code here...
}
{% endhighlight %}


Please, if you're reading this, take five minutes of your time and write these functions out before reading the answers. Believe me, it's worth the effort. I mean, how much time can it take?

<h4 id="the-answers">The Answers</h4>
The answer is quite simple, also, you can go and check the answer in the MooTools or JQuery source code.
So for the <em>hasClass</em> function the answer is this:

{% highlight js %}
function hasClass(domElement, className) {
  return (' ' + domElement.className + ' ')
        .indexOf(' ' + className + ' ') >= 0;
}
{% endhighlight %}

Basically we add one space at the beginning and end of each string, and see if the className property of the domElement contains the className string provided.
Why adding those spaces? Well, if we don't add spaces then we could have problems with names containing the given className. 

Also, the code is concise and most of the work is done by the built-in <em>indexOf</em> method, which is good for performance.

Did you get that answer well? Good! How about your removeClass function? 

The answer is this:

{% highlight js %}
function removeClass(domElement, className) {
 domElement.className = domElement.className
      .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1');
}
{% endhighlight %}

I think this RegExp is better explained with an example. Lets say that:

{% highlight js %}
var className = 'myclassname';
domElement.className = 'myclassname yeah';

removeClass(domElement, className);
{% endhighlight %}

Then the RegExp will be 

{% highlight js %}
'(^|\\s)myclassname(?:\\s|$)'
{% endhighlight %}

Lets make it simpler first:

{% highlight js %}
'(^|\\s)myclassname(\\s|$)'
{% endhighlight %}

Ok, so that's simple enough.
So this regexp means that either we're at the beginning of the string (<b>^</b>) and searching for our className having a space at the end (<b>'^myclassname\\s'</b>) or simply ending with that className (<b>'^myclassname$'</b>) or we're looking for our className string having a space at the beginning and end (<b>'\\smyclassname\\s'</b>) or we're at the end of the string looking for our className having (or not) a space at the beginning of the string (<b>'\\smyclassname$' or '^myclassname$'</b>). 

This regexp is equivalent to (if we had <em>startsWith</em> and <em>endsWith</em> methods):

{% highlight js %}
domElement.className == className //means '^className$'
|| domElement.className
          .startsWith(className + ' ') //means '^className\\s'
|| domElement.className
          .endsWith(' ' + className) //means '\\sclassName$'
{% endhighlight %}

Ok, so once the RegExp matches it's replaced by '$1', which means the first capturing group, in this case the <b>(^|\\s)</b> group.

So back to our example, the domElement.className was: <b>'myclassname yeah'</b> so the RegExp that matches is <b>^myclassname\\s</b> and the capturing group is <b>^</b>, so the returned string is 'yeah', just as espected.

What <b>(?: ...)</b> does is not to make a capturing group from the parenthesis match. I think this is good for performance f you're not using that group in the string replacement:

<em> Non-Capturing Parentheses are of the form `(?:&lt;regex>)' and facilitate grouping only and do not incur the overhead of normal capturing parentheses. They should not be counted when determining numbers for capturing parentheses which are used with backreferences and substitutions. Because of the limit on the number of capturing parentheses allowed in a regex, it is advisable to use non-capturing parentheses when possible. </em>

<h4>Conclusion</h4>
These methods could have probably been written differently if disk space and performance weren't such an important issue in JavaScript, but with those constraints even the most trivial methods like <em>hasClass</em> and <em>removeClass</em> can be  interesting to read.
So this is my recommendation: try to understand how things you normally use are implemented. There are lots of interesting JavaScript libraries that make excellent code that's performant and save disk space (:P) so check them out, you might learn about lots of things, even the most simple functions can have interesting concepts.
