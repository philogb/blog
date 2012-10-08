--- 
layout: post
title: PhiloGL
categories: [PhiloGL, Visualization]
---

For some time now I've been working on a new project built around WebGL that today I'm very proud to release: [PhiloGL](http://senchalabs.github.com/philogl/).  

[PhiloGL](http://senchalabs.github.com/philogl/) is a WebGL Framework for advanced Data Visualization, Creative Coding and Game Development.

[PhiloGL](http://senchalabs.github.com/philogl/) uses cutting edge technology and JavaScript idioms and good practices to deliver elegantly 
coded WebGL applications that are focused on performance. [PhiloGL](http://senchalabs.github.com/philogl/) also provides a rich module system 
covering Program and Shader management, IO, XHR, JSONP, Web Worker management, Effects and Tweening, and much more.

[PhiloGL](http://senchalabs.github.com/philogl/) is Open Source Software, licensed under the MIT license and owned by the [SenchaLabs](http://senchalabs.org/) foundation.

[PhiloGL](http://senchalabs.github.com/philogl/) has a complete [API documentation](http://senchalabs.github.com/philogl/docs.html) with a detailed description 
of all the modules and class methods. Another very cool thing is that all [Learning WebGL lessons](http://learningwebgl.com/blog/?page_id=1217) have 
been ported into [PhiloGL](http://senchalabs.github.com/philogl/) code so that you can easily 
learn [PhiloGL](http://senchalabs.github.com/philogl/), WebGL or both at the same time. 
You can find a list of the ported Learning WebGL lessons [here](http://senchalabs.github.com/philogl/lessons.html).

In order to show how [PhiloGL](http://senchalabs.github.com/philogl/) applications are made I created three featured projects that deal with Data Visualization 
in different aspects. In order to see these examples you'll need the latest [Google Chrome](http://google.com/chrome/) and/or 
[Firefox 4](http://www.mozilla.com/en-US/firefox/beta/). If you don't have a WebGL capable browser then you'll see a video showcasing the application.

## Visualizing Temperature Anomalies

*Access the example [here](http://senchalabs.github.com/philogl/PhiloGL/examples/temperatureAnomalies/).*

![Temperature Anomalies](http://senchalabs.github.com/philogl/img/marquee/tanomalies.png)

[NASA]() collects year by year data about temperature changes around the globe. This information has been collected since 1880 and tracks temperature anomalies (changes) 
in different points of the earth as a 2D heatmap. By loading these images into textures and then mapping them into a 3D histogram we are able to track the temperature 
changes around the globe interactively. Smooth animations between date ranges enable us to spot the overall differences in temperature across the years. Can you guess 
what the temperature changes will be for the next decade? Access the example [here](http://senchalabs.github.com/philogl/PhiloGL/examples/temperatureAnomalies/).

## Real time 3D color Histogram Analysis

*Access the example [here](http://senchalabs.github.com/philogl/PhiloGL/examples/histogram/).*

![3D color Histogram Analysis](http://senchalabs.github.com/philogl/img/marquee/histogram.png)

Color decomposition on [RGB](http://en.wikipedia.org/wiki/RGB_color_model#Geometric_representation) or [other color schemes](http://en.wikipedia.org/wiki/HSL_and_HSV) takes a 
3D form. In order to show the color decomposition of an image each dot on a 3D color histogram is assigned a different diameter. The following example renders fine grain 
and precise color decomposition schemes of each frame of a video in real time. Notice how color varies on each take, and feel free to change the color scheme or pause the 
video to have a closer look at the color decomposition. You can interact with the visualization by using drag and drop and zooming in/out with your mouse wheel. 
Access the example [here](http://senchalabs.github.com/philogl/PhiloGL/examples/histogram/).

## Explore 3D Parametric Surfaces

*Access the example [here](http://senchalabs.github.com/philogl/PhiloGL/examples/explorer/).*

![3D Parametric Surfaces](http://senchalabs.github.com/philogl/img/marquee/explorer.png)

Exploring 3D surfaces is a fun way to learn about geometry, physical phenomena or even terrain modeling. Parametric surfaces are surfaces that also change their shape 
with an extra variable: *time*. Explore 3D surfaces by using drag and drop and the mouse wheel to zoom in/out. You can enable the *t* parameter (by clicking on the 
checkbox) and hit play to see it move. There are three predefined surfaces for you to explore or modify. 
Access the example [here](http://senchalabs.github.com/philogl/PhiloGL/examples/explorer/).

## Go get it!

I hope these examples show what you can do with the framework and interest you enough to explore the code. 
I've had a lot of fun building and using [PhiloGL](http://senchalabs.github.com/philogl/) and I can't wait to see what you're capable of doing with it, [you can download it here](http://senchalabs.github.com/philogl/)!

