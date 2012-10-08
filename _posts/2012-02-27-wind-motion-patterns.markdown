--- 
layout: post
title: Wind Motion Patterns 
categories: [WebGL, JavaScript, PhiloGL]
---

I've been working on [a WebGL data visualization of wind motion
patterns](http://www.senchalabs.org/philogl/PhiloGL/examples/winds/) 
for a 72 hour period in the United States.

![PhiloGL Wind Motion Patterns](/blog/assets/winds/1.png)

Gathering the data from the [National Weather Service](http://www.nws.noaa.gov/climate/) 
was pretty interesting, I didn't know USA had [so many
weather stations](http://weather.rap.ucar.edu/surface/stations.txt)! The
visualization shows wind direction encoded in line angles, wind speed encoded
in line lengths and disk radius, and temperature encoded in hue. All
this for about 1200 weather stations across the country.

You can switch between different visual markers from the top menu, also
play the wind motion for the 72 hours or select a specific time from the
timeline below the graphic.

![Markers](/blog/assets/winds/3.png)

One interesting thing I found with this visualization is what appeared
to be an outlier in the data, around mount Washington:

![Mount Washington](/blog/assets/winds/2.png)

The data is seems actually correct after I took a look at the [Wikipedia
article for Mount Washington](http://en.wikipedia.org/wiki/Mount_Washington_(New_Hampshire)):

*For 76 years, a weather observatory on the summit held the record for the highest wind gust directly measured at the Earth's surface, 231 mph (372 km/h) (or 103 m/s)*

With this example I also released a new version [of the
framework](http://senchalabs.org/philogl).
