--- 
wordpress_id: 1530
layout: post
title: Doctor Who villains from 1963 to 2010 visualized
categories: [JavaScript InfoVis Toolkit, Demo, Visualization]
wordpress_url: /?p=1530
---
While browsing the internet I got to the <a href="http://www.guardian.co.uk/news/datablog">Guardian's Datablog</a>, a blog that gathers interesting information and datasets to explore and make visualizations. Latest post was about <a href="http://www.guardian.co.uk/news/datablog/2010/jul/16/doctor-who-villains-list">Every Doctor Who villain since 1963</a>. There's information about each villain's first and last year of appearance, their motivation/evil plan, the name of the actors who played the role of Doctor Who while that villain was making an appearance, the title of the stories where that villain was in, etc.

I created a "dynamic" TreeMap visualization with that data. Here's a short screencast I made explaining the TreeMap functionalities (I have a horrible english accent... I know). You can also play with the demo <a href="http://demos.thejit.org/doctorwho/">here</a>.

<object width="500" height="400"><param name="movie" value="http://www.youtube.com/v/vAGk9gIzzEM&amp;hl=en_US&amp;fs=1?rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/vAGk9gIzzEM&amp;hl=en_US&amp;fs=1?rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="400"></embed></object>

<h4>The Code</h4>
For this example I used a special build of the Toolkit which is currently hosted at <a href="http://github.com/philogb/jit">GitHub</a>. The TreeMap example code looks just like the <a href="http://thejit.org/demos/">TreeMap demos code</a> but I also added an <em>onBeforeCompute</em> callback that checks for the <em>Doctor Actor Name</em> and <em>Villain Motivation</em> filters to fade nodes respectively:

{% highlight js %}
onBeforeCompute: function() {
  tm.graph.eachNode(function(n) {
    var prev = false;
    if(n.data.motivations) {
      prev = true;
      if(motivation != 'All' 
        && n.data.motivations.indexOf(motivation) == -1) {
        n.setData('alpha', 0, 'end');
        n.ignore = true;
      } else {
        n.setData('alpha', 1, 'end');
        delete n.ignore;
      }
    }
    if(n.data.doctorActorNames) {
      if(doctorName != 'All' 
        && n.data.doctorActorNames.indexOf(doctorName) == -1) {
        n.setData('alpha', 0, 'end');
        n.ignore = true;
      } else if(!prev) {
        n.setData('alpha', 1, 'end');
        delete n.ignore;
      }
    }
  });
},
{% endhighlight %}

The anchor click callbacks set the current selected value to the <em>doctorName</em> and <em>motivation</em> variables and also perform an animation by fading nodes and repositioning the remaining visible nodes:

{% highlight js %}
anchors.addEvent('click', function(e) {
  doctorName = this.innerHTML;
  tm.compute('end');
  tm.fx.animate({
    modes: {
      position: 'linear',
      'node-property': ['alpha', 'width', 'height']
    },
    duration: 1000,
    fps: 50,
    transition: $jit.Trans.Quart.easeInOut
  });
});
{% endhighlight %}

The <em>tm.compute('end');</em> call will trigger the <em>onBeforeCompute</em> callback that will set correct alpha values for the nodes. Then we perform an animation of node positions and node alpha, width and height properties.

I hope you have fun with the <a href="http://demos.thejit.org/doctorwho/">demo</a>!
