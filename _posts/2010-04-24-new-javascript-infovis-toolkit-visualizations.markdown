--- 
wordpress_id: 1437
layout: post
title: New JavaScript InfoVis Toolkit Visualizations
categories: [JavaScript InfoVis Toolkit, Visualization]
wordpress_url: /?p=1437
---
Today I'd like to announce the addition of three new components in the next version of the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a>: Area Charts, Bar Charts and Pie Charts. I hope these components will be widely used among the JIT user community.

All components support a simpler JSON format that I'll describe later in this post. These components are easy-to-use, yet very powerful: they support live data updates and multi valued data as we will see next.

<h4>Area Charts</h4>
The Area Chart is a useful component to track the evolution of a bunch of categories at the same time. In addition, the aggregation of the values of all these categories is also presented in a meaningful way. This component supports live updates (as you'll see in the first seconds of the video), filtering/restoring categories, tooltips and a legend. As usual this is all JavaScript:

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/NcpFzSkIJOM&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/NcpFzSkIJOM&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>

The visualization is instanciated this way:

{% highlight js %}
var areaChart = new $jit.AreaChart({
    //id of the container
    injectInto: 'infovis',
    //set animations
    animate: true,
    //visualization 'padding'
    offset: 5,
    //labels 'margin'
    labelOffset:10,
    //show aggregated values
    showAggregates:true,
    //show labels
    showLabels:true,
    //use gradients for rendering
    type:'stacked:gradient',
    //label styling
    Label: {
      size: 13,
      family: 'Arial',
      color: 'white'
    },
    //enable tips
    Tips: {
      enable: true,
      onShow: function(tip, elem) {
         tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
      }
    },
    //add leftclick handler
    filterOnClick: true,
    //add rightclick handler
    restoreOnRightClick:true
});
{% endhighlight %}

Additionally this visualization allows programmatic category filtering, JSON updating, selecting you own colors, etc.

<h4>Bar Charts</h4>
Bar Charts are similar to Area Charts, but they support additional styling and positioning. You can use vertical or horizontal Bar Charts. Here's an example:

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/wkVBQvZ1LsM&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/wkVBQvZ1LsM&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>

This object is created the same way you create an AreaChart:
{% highlight js %}
var barChart = new $jit.BarChart({
    injectInto: 'infovis',
    animate: true,
    //set orientation vertical or horizontal
    orientation: 'horizontal',
    //bar separation
    barsOffset: 20,
    offset:10,
    labelOffset:5,
    type:'stacked:gradient',
    showAggregates:true,
    showLabels:true,
    Label: {
      size: 13,
      family: 'Arial',
      color: 'white'
    },
    Tips: {
      'enable': true,
      'onShow': function(tip, elem) {
         tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
      }
    }
});
{% endhighlight %}

<h4>Pie Charts / Rose Diagrams</h4>
Finally there's the Pie Chart. But this is no regular Pie Chart. It can support simple data as well as more complex data. You can add multiple categories to this Pie Chart, combining them into something more like a Stacked Rose Diagram. They also support live updates as you'll see in the first seconds of the video:

<object width="500" height="385"><param name="movie" value="http://www.youtube.com/v/0bmWXM3j7Rs&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/0bmWXM3j7Rs&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="385"></embed></object>

<h4 id="json-data-format">JSON Data Format</h4>
The JSON data format for these visualizations had to depict something like a contingency table, and so I decided to adopt something like this:

{% highlight js %}
var json = {
    //category labels
    'label': ['label A', 'label B', 'label C', 'label D'],
    //each "stack" is described here
    'values': [
    {
      'label': 'date A',
      'values': [20, 40, 15, 5]
    }, 
    {
      'label': 'date B',
      'values': [30, 10, 45, 10]
    }, 
    {
      'label': 'date E',
      'values': [38, 20, 35, 17]
    }, 
    {
      'label': 'date F',
      'values': [58, 10, 35, 32]
    }, 
    {
      'label': 'date D',
      'values': [55, 60, 34, 38]
    }, 
    {
      'label': 'date C',
      'values': [26, 40, 25, 40]
    }]
};
{% endhighlight %}

I hope you find these visualizations useful, and if you can't wait for the next version to come out to use these charts you can always build the project from <a href="http://github.com/philogb/jit">GitHub</a>. Here's a <a href="http://wiki.github.com/philogb/jit/getting-started">wiki</a> with some instructions on how to make your own build of the library while you're waiting for an official release. If you ever find bugs please use the <a href="http://github.com/philogb/jit/issues">issue tracker at GitHub</a>. If you need help or have any questions you can always go to the <a href="http://groups.google.com/group/javascript-information-visualization-toolkit/">Google Group</a>. Well, this got long enough. 

Hope you enjoyed it!
