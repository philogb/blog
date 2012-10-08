--- 
wordpress_id: 639
layout: post
title: Taking a look at Groovy
categories: [Groovy]
wordpress_url: /?p=639
---
While at work last week I decided to make a small program in the <a href="http://groovy.codehaus.org/">Groovy</a> programming language. I needed to build a small file processing program that used some Java libraries built at work, but I didn't want to code five or six Java classes to do so. Since performance wasn't a big concern, I decided to take a look at some JVM based languages.

There are lots of programming languages targetting the JVM, so why Groovy?

<h4>Why Groovy?</h4>

Groovy is a highly dynamic language, that takes things from Python, Ruby and Smalltalk. Since these are programming languages I used before and I'm quite comfortable with, Groovy seemed like a good match.

Also, Groovy is very easy to learn, having an almost-zero learning curve. Since I had to do this in a couple of days, I didn't want to spend a lot of time learning a programming language's syntax and semantics. I know how to use Python and I know how to use Ruby/Smalltalk, I just want to do the same things in the JVM.

Another very interesting thing (that doesn't concern the language itself, but it's quite helpful) is that Groovy, along with OCaml and Perl, has a 100% completness score at <a href="http://pleac.sourceforge.net/">PLEAC</a>. That means that you can find complete examples of: Strings, Numbers, Arrays, Hashes, Dates and Times, Pattern Matching, File Access, File Contents, Directories, Subroutines, References and Records, Packages, Libraries and Modules, Classes and Objects, Database Access, User Interfaces and a lot more <a href="http://pleac.sourceforge.net/pleac_groovy/index.html">here</a>.

<h4> Features I like about the language</h4>

Some of the features I used and liked about Groovy:

<b>List and Hash literals</b>
As opposed to Java, Groovy provides List and Hash literals:

{% highlight groovy %}
//Create an empty List
emptyList = []
//Create an empty Hash
emptyHash = [:]
//Create a List
somePeople = ["John", "Jack", "Sarah"]
//Create a Hash
ext = [
  Ruby: 'rb',
  Python: 'py',
  C: 'c',
  Groovy: 'groovy'
]
{% endhighlight %}


<b>List and Hash traversing and manipulation</b>

In terms of List and Hash manipulation, Groovy offers the same expressiveness as Python and Smalltalk:

{% highlight groovy %}
//Create a List
somePeople = ["John", "Jack", "Sarah"]

//Copy first two List elements
copy = somePeople[0..1] //["John", "Jack"]

//Grab last list element
lastElem = somePeople[-1] //"Sarah"


//Closures are first class values in Groovy, their syntax is {}.
//For unary lambdas an implicit 'it' variable is created

//Any element starting with capital letters?
somePeople.any { it[0] in 'A'..'Z' } //true

//We can also use regex a la Perl
somePeople.any { it =~ /[A-Z].*/ } //true

//Print names with new lines
somePeople.each { println it }

//Create a Hash
ext = [
  Ruby: 'rb',
  Python: 'py',
  C: 'c',
  Groovy: 'groovy'
]

//print an element
println ext.'Ruby' //rb
println ext['Ruby']//rb

//iterate through a hash elements
ext.each { key, value -> println key + ': ' + value } 
//will print Ruby: rb, etc
{% endhighlight %}

<b>Defining functions</b>
Functions are defined like this:

{% highlight groovy %}
//Define a square function
def square(val) {
 val * val
}

//Or assign a closure to a square variable:
square = { it * it }
{% endhighlight %}

Simple.

<b>Java classes extensions</b>
One of the things I find really nice about Groovy, is that it extends Java SE with useful functions.
You can find the extensions <a href="http://groovy.codehaus.org/groovy-jdk/">here</a>.

Java File class extensions are pretty cool:

{% highlight groovy %}
//Print dir file names
new File("/some/dir/").eachFile { println it.name }

//Print file text content
println new File("/some/file.txt").getText()

//Print file content with line numbers
new File("otherfile.txt").eachLine { it, line -&gt; println line + ": " + it }
{% endhighlight %}

<b>Other libraries</b>

At work I had to deal with XML data, and found a very interesting and high level XML manipulation library called <a href="http://groovy.codehaus.org/api/groovy/util/XmlSlurper.html">XmlSlurper</a>:
{% highlight groovy %}
xml = &#145;&#145;&#145;
&lt;root&gt;
&lt;artist name="Pearl Jam"&gt;
  &lt;album&gt;Ten&lt;/album&gt;
  &lt;album&gt;Vs.&lt;/album&gt;
  &lt;album&gt;Vitalogy&lt;/album&gt;
  &lt;album&gt;Riot Act&lt;/album&gt;
&lt;/artist&gt;
&lt;artist name="Soundgarden"&gt;
  &lt;album&gt;Down on the Upside&lt;/album&gt;
  &lt;album&gt;Superunknown&lt;/album&gt;
&lt;/artist&gt;
&lt;/root&gt;
&#145;&#145;&#145;
root = new XmlSlurper().parseText(xml)
root.artist.each { 
  println it.@name.text() + ': ' + 
        it.album.collect({ it.text() }).join(', ') 
}
//Will print
//Pearl Jam: Ten, Vs., Vitalogy, Riot Act
//Soundgarden: Down on the Upside, Superunknown
{% endhighlight %}

<h4>Conclusion</h4>
Groovy is a versatile scripting language built on top of the JVM.
It provides useful features taken from Ruby, Python and Smalltalk, with full access to all Java libraries.
It also extends Java classes with useful methods and iterators.
If you aren't that worried about <a href="http://shootout.alioth.debian.org/u32q/benchmark.php?test=all&lang=all&box=1">performance</a> (still runs faster than Ruby, Python 3 and Perl), I'd recommend you to take a look at <a href="http://pleac.sourceforge.net/pleac_groovy/index.html">it</a>.
Hope this was helpful enough to get a feeling of the language.
