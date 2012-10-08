--- 
wordpress_id: 1322
layout: post
title: DOM vs. Canvas TreeMaps
categories: [JavaScript InfoVis Toolkit, Visualization, JavaScript]
wordpress_url: /?p=1322
---
As you <a href="http://github.com/philogb">may have seen</a> I'm back from vacations and trying to organize a little bit the code for the next version of the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a>, which is not there yet; although I did push the new visualizations over to GitHub so you can play with them :)

I also created a new project at GitHub that's called <a href="http://github.com/philogb/dom-treemap#readme">DOMTreeMap</a>. DOMTreeMap is a robust, library agnostic, JavaScript/HTML/CSS TreeMap library that allows you to easily create Squarified, Strip and SliceAndDice TreeMap layouts by using JSON input data. The only global object created by this library is <b>TM</b> and it consists on four main sub-objects/classes:

<ul>
<li><b>TM.Util</b> contains useful JSON Tree manipulation methods.</li>
<li><b>TM.Squarified</b> creates Squarified TreeMap tilings.</li>
<li><b>TM.Strip</b> creates Strip like tilings.</li>
<li><b>TM.SliceAndDice</b> creates Slice and Dice TreeMap tilings.</li>
</ul>

Each tiling algorithm has its pros and cons. The main criteria for determining if a tiling algorithm is good is to check for the aspect ratio of nodes, check if the result is ordered or not and check for stability (i.e whether the nodes maintain their relative positions when the TreeMap is being navigated).

Here's a picture describing these points for the Strip, Squarified and SliceAndDice tiling algorithms:

<img align="center" style="border: 1px solid orange; margin: 5px auto; padding: 3px; width: 500px;" src="/blog/assets/static/img/tilingalgos.png" />

As you may have noticed, <b>DOMTreeMap</b> is a standalone version of the <a href="http://thejit.org">JIT</a> TreeMap component. 

So why do this, then?

Well, I decided that for the next version of the library TreeMaps are going to be Canvas based. I'm already adapting the TreeMap tiling algorithms to render on Canvas and also plugging the rest of the TreeMap visualizations to an abstract Graph class that is also used by all other visualizations so I can use a lot of library code related to Tree Operations, Tree Animations, etc.
Also, not all TreeMap visualizations render nodes as rectangles. Some TreeMap implementations are based on <a href="http://en.wikipedia.org/wiki/Voronoi_tessellation">Voronoi Tessellations</a> for example:

<img align="center" style="border: 1px solid orange; margin: 5px auto; padding: 3px;" src="/blog/assets/static/img/voronoi1.jpg" />

So in order to maintain a more "abstract" notion of TreeMaps I think that having Canvas based TreeMaps would be a good idea. Anyway, now I'm working on adapting the code to be able to render TreeMaps on canvas, I must say that performance-wise things are looking promising:

<img align="center" style="border: 1px solid orange; margin: 5px auto; padding: 3px;" src="/blog/assets/static/img/sq1.png" />

You are welcome to participate on the <a href="http://github.com/philogb/dom-treemap#readme">DOMTreeMap</a> project which will grow as a standalone solution for drawing TreeMaps solely based on HTML, CSS and JavaScript.

Don't forget that if you want to know more about this project or the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a> you can <a href="http://twitter.com/philogb">follow me on Twitter</a> or <a href="http://github.com/philogb">GitHub</a>!
