--- 
wordpress_id: 543
layout: post
title: Sharp Variables
categories: [JavaScript]
wordpress_url: /?p=543
---
I was looking for some way to easily create, read, manipulate and print cyclic or recursive data structures in some programming languages, and got to the cool concept of <em>sharp variables</em>.

<h4>Manipulating Recursive Structures in Python</h4>
A straightforward way of defining a recursive structure is to first assign a base (non-recursive) structure to a variable, and then alter or extend that variable with a recursive expression. For example, in Python you can write:

{% highlight py %}
my_rec_var = [1, 2, 3]
my_rec_var.append(my_rec_var)
{% endhighlight %}

That code will create a recursive data structure: [1, 2, 3, [1, 2, 3, [...]]], 
or <em>a = [1, 2, 3, a]</em>.

Actually, Python's print function lets you print a representation of a recursive structure without recursing indefinitely:

{% highlight py %}
&gt;&gt;&gt; print my_rec_var
[1, 2, 3, [...]]
{% endhighlight %}

Python's <em>pickle</em> module lets you dump a recursive data structure into a file. You can also read that serialized structure from the file:

{% highlight py %}
import pickle

#dump it to file
output = open("out.pkl", "wb")
pickle.dump(my_rec_var, output)
{% endhighlight %} 

However, there's no <em>literal</em> way of creating, reading or modifying that structure:
{% highlight py %}
&gt;&gt;&gt; my_rec_var = [1, 2, 3, [...]]
 ERROR
{% endhighlight %}

<h4>Manipulating Recursive Structures in Lisp</h4>
For manipulating/printing recursive data structures in Common Lisp we first assign <em>T</em> to the global variable <em>*print-circle*</em>

{% highlight lisp %}
(setq *print-circle* T)
{% endhighlight %}

We can define a recursive structure just as we did with Python, by defining some base structure and then modifying the structure to be recursive:
{% highlight lisp %}
(defvar *my-rec-var* (list 1 2 3 _))
;Replace the underscore placeholder with a self-reference
(setf (fourth *my-rec-var*) *my-rec-var*)
{% endhighlight %}

The final structure is represented with sharp variables:

{% highlight lisp %}
&gt;&gt;&gt; (print *my-rec-var*)
#1=(1 2 3 #1#)
{% endhighlight %}

This is just as the "Mathematical" definition we gave above:
<em>a = [1, 2, 3, a]</em>.

What's interesting about this "serialization format" is that expressions involving sharp variables are <b>truly expressions</b>: these "objects" can be <em>read</em> and <em>manipulated</em> just like any other structure:

{% highlight lisp %}
&gt;&gt;&gt; (defvar *another-rec-var* &#145;#1=(1 2 3 #1#))
#1=(1 2 3 #1#)

&gt;&gt;&gt; (fourth &#145;#1=(1 2 3 #1#))
#1=(1 2 3 #1#)

&gt;&gt;&gt; (cons 5 &#145;#1=(1 2 3 #1#))
(5 . #1=(1 2 3 #1#))

{% endhighlight %}

Sharp variables seem like an excellent solution for creating, reading and manipulating cyclic data structures.

<h4>Sharp Variables in JavaScript</h4>
Mozilla's JavaScript implementation has <a href="https://developer.mozilla.org/en/Sharp_variables_in_JavaScript">Sharp Variables</a>. They've been introduced by Brendan Eich and they are inspired by Common Lisp's syntax.
Sharp Variables can be pretty useful in JavaScript, since most of the time we're manipulating object references and Firefox's <em>toSource()</em> method is pretty useful for debugging (among other things).

{% highlight js %}
var myArray = [1, 2, 3];
myArray.push(myArray);
myArray.toSource();
{% endhighlight %}

Try running that in your Firefox console, it should return <em>"#1=[1, 2, 3, #1#]"</em>.

Oh, and did I mention that you can also explicitly manipulate cyclic structures in JavaScript?

{% highlight js %}
//Assign a literal recursive data structure
var anotherArray = #1=[1, 2, 3, #1#];

console.log(anotherArray.toSource());
//"#1=[1, 2, 3, #1#]"

console.log(anotherArray[0]);
//1

console.log(anotherArray[3].toSource());
//"#1=[1, 2, 3, #1#]"
{% endhighlight %}

I was happy to find such an interesting Lisp feature in JavaScript.
