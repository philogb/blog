--- 
wordpress_id: 358
layout: post
title: Why not Operator Overloading in JavaScript?
categories: [JavaScript]
wordpress_url: /?p=358
---
<b>Disclaimer:</b> <em>Some of this post arguments are inspired by the great talk by Guy Steele: <a href="http://video.google.com/videoplay?docid=-8860158196198824415&ei=DAZ-SbyhA5jY2gLZjuinBQ&q=growing+a+language" target="_blank">Growing a Language</a></em>.

So I was checking out the new JavaScript spec. (ECMAScript 4) lately, and I was very surprised (and disappointed) to see that <em>Operator Overloading</em> wasn't even accepted as a proposal for ECMAScript 4.
I've noticed last year that the proposal was denied by all browser vendors, as you can see in the <a href="http://spreadsheets.google.com/pub?key=pFIHldY_CkszsFxMkQOReAQ&gid=2">ECMAScript 4 progress</a> spreadsheet created by John Resig, under the name of "Operator Overloading".

This is heartbreaking for me... let me explain you why.


<h4>Why Operator Overloading (in general)?</h4>

Operator Overloading is a special case of polymorphism, in which operators like <em>+, /, *, ...</em> can be overloaded by the user.
This is very useful in languages where the user can define special types (or classes), since it allows the developer to use notation that is closer to the target domain, and allows user types to look like types built into the language.

What Guy Steele said about Operator Overloading is that: 

<em>"If we grow the language in these few ways, then we will not need to grow it in a hundred other ways; the users can take on the rest of the task."</em>

To see why, think about these structures:

<ul>
<li>2D, 3D Vectors</li>
<li>Matrices</li>
<li>Intervals</li>
<li>Complex Numbers</li>
<li>Polar Coordinates</li>
<li>Rational Numbers</li>
</ul>

One thing all these structures have in common is that their <em>sum</em> and <em>product</em> operations have a different <em>definition</em> than the one we give to integers.

There's also an interesting fact about these structures: a lot of people use them, but a lot of people don't. 
For example, Matrices might be used by OpenGL/Direct3D developers, but it's not very common to use this structure for manipulating the DOM or building AJAX applications.

However, each of these structures <em>must</em> be considered in <em>any programming language</em>. 
Adding them all into some standard library might be too much. However, sooner or later, some developer will want to use them.
 
Here's the <em>dilemma</em> as exposed by Guy Steele:
"<em>I might say <b>yes</b> to <b>each one</b> of these, but it is clear that I must say <b>no</b> to <b>all</b> of them!</em>".

Operator Overloading solves this problem by giving the user the power to overload built-in operations and turn a non-domain specific language into a perfect tool for a developer's specific needs.

By using Operator Overloading a developer can define operations on any custom type and its use will blend perfectly well into the language.

Wouldn't be just beatifull if <em>a</em> and <em>b</em> beeing <em>Complex Numbers</em>, we could do this:

{% highlight js %}
a + b * c
{% endhighlight %}

instead of this? :

{% highlight js %}
add (a, multiply (b,c))
{% endhighlight %}

Ok, so now that I made my point about the power of operator overloading, let me explain you why I think this should be more carefully considered by the new JavaScript spec.

<h4>Why Operator Overloading in JavaScript?</h4> 
To see why we should take seriously Operator Overloading in JavaScript, we first have to take a look at what happened to JavaScript in the last few years.

Only one thing happened to JavaScript in the last few years, <em>AJAX</em>.

The XMLHTTPRequest concept was first created by Microsoft, and wasn't part of the web standards. They first used it in the year 2000, but a couple of years later Mozilla, Safari and Opera were also implementing it.
The standards covered that topic a lot of time after it was already implemented in all major browsers, and AJAX was already in the wild.

One strong aspect of JavaScript that was pretty important and that, IMHO, made the adoption of the "AJAX paradigm" a lot easier, is that JavaScript was already compliant with the "event-driven" programming paradigm, and the use of the XMLHTTPRequest object didn't add anything new to this paradigm.
Just as callbacks were added to respond to DOM Element's events, callbacks were used to handle server side answers. Although AJAX changed the way web applications were created, it did that by mantaining the event-driven programming paradigm.

Oh, another thing happened to JavaScript in the last couple of years, <b>Canvas</b>. 

<b>Canvas</b> is following the same trend the <em>XMLHTTPRequest</em> object followed. It has been adopted by most browsers (Opera, Gecko, Webkit) and despite Internet Explorer's efforts to not adopt this new feature, <a href="http://excanvas.sourceforge.net/">libraries already exist</a> to make Canvas compatible with IE (to a certain point).
A couple of nice libraries that used Canvas were released last year: John Resig published <a href="http://ejohn.org/blog/processingjs/">Processing JS</a>. Some other libraries that make use of canvas were also released, one of them is the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a> (my library! :) ).
The number of Canvas related stories really grew at <a href="http://ajaxian.com">Ajaxian</a>, and there were also new breakthroughs by <a href="http://my.opera.com/timjoh/blog/2007/11/13/taking-the-canvas-to-another-dimension">Opera</a> and <a href="http://ajaxian.com/archives/firefox-canvas-3d-extension-available">Firefox</a> on the implementation of Canvas 3D.

There is one caveat to this Canvas thing though, it doesn't use extensively the event-driven paradigm. Since all these Canvas implementations are related to <a href="http://en.wikipedia.org/wiki/Cairo_(graphics)">Cairo</a> and also take things from <a href="http://en.wikipedia.org/wiki/Opengl">OpenGL</a> and <a href="http://en.wikipedia.org/wiki/Direct3d">Direct3D</a> (this is notably the case for the Canvas' 3D API), IMO these concepts are more related to a functional programming paradigm than anything else.
I mean, 2D/3D graphics are all about geometrical operations. And geometrical operations are mathematical functions. These concepts might be harder to grasp than the ""AJAX paradigm"", and that's why the adoption curve <a href="http://www.google.com/trends?q=javascript+xmlhttprequest%2C+javascript+canvas">won't be as high as the AJAX one, but there's no doubt that Canvas developers are a niche</a>. 

And do you know which objects/types/classes are related to geometrical computation, Canvas, Canvas 3D, Cairo, OpenGL and Direct3D?

<ul>
<li>2D, 3D Vectors</li>
<li>Matrices</li>
<li>Intervals</li>
<li>Complex Numbers</li>
<li>Polar Coordinates</li>
</ul>

That's exactly what I mean. The next logical step to bring a easier use for Canvas related programming should be operator overloading. This is the one feature that will be extensively used by JavaScript Canvas developers, since they have to deal with points, 2D and 3D coordinates all day.

For a last example, consider an interpolation function between two complex numbers
{% highlight js %}
(to.$add(from.scale(-1))).$scale(delta).$add(from)
{% endhighlight %}

The same thing with operator overloading would be:
{% highlight js %}
from + (to - from) * delta
{% endhighlight %}

You would make a developer's life happier.
