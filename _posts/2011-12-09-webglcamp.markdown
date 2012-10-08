--- 
layout: post
title: WebGL Camp #4 
categories: [WebGL, JavaScript]
---

I generally don't do write-ups of events I go to (now that I actually
check my blog I've never made one) but I had such a great time at [WebGL
Camp](http://www.webglcamp.com/wiki/index.php?title=Main_Page) 
today and learnt so many new things that I think that (especially
for the sake of my bad long term memory) I'll do a write-up about my
experience at WebGL Camp #4 at Mozilla HQs.

This is not going to be a chronological review but more like stuff I
learnt about state-of-the-art WebGL, and the incredible community
that we have here in the Bay Area around this technology.

On the things I learnt there's that WebGLCamp this year gathered people
that make great products and apps using WebGL; it also
gathers people who like to write great WebGL frameworks either for games, art or data
visualization and it also gathers people who define and participate directly on the
making of the actual WebGL API. All of these people are together in the same
place, discussing about these three things, and since this is a
small group of very knowledgeable people, the outcome of this event is
extremely valuable for the people there.

Just take a look at the [agenda](http://www.webglcamp.com/wiki/index.php?title=Agenda4). In one day you will see how a
[profitable business like My Robot Nation](http://www.myrobotnation.com/) uses WebGL as a core
component of their product, you will also find out the technical
aspects of [implementing MapsGL](http://www.chromeexperiments.com/detail/mapsgl/) in one
of the most visited applications on the Web; you will also hear about
how WebGL is an integral part for [modeling and simulation](http://www.scer.rpi.edu/cemsim/) in
medical training applications and finally how the Department of
Defense uses WebGL in their real time graphic simulation
applications. Oh and yes, [Autodesk](http://usa.autodesk.com/) also showcased their new WebGL
applications.

So much changed since last year at WebGL Camp. While WebGL was still "alpha" and people
built ideas on top of the thought that in the future it'll become
a solid and robust foundation, WebGL is now massively used in products/businesses that span to
any possible field you could imagine!

Another very interesting aspect on this is that not only cool ideas
around businesses show up, there's a lot of discussion on technical
stuff, on three different levels I would say: the standards body, the
framework API designer/developer group and finally the consumers of
these frameworks/APIs that create compelling demos, products and apps.

Just to name a few frameworks, [Paul Lewis](http://aerotwist.com/)
presented about [A3](http://aerotwist.com/a3/) and [Bartek Drozdz](http://www.everyday3d.com/) 
presented about [J3D](http://www.everyday3d.com/j3d/). Oh, and the
Department of Defense said they were using [GLGE](http://www.glge.org/) for their
applications. There was also a very interesting presentation of an Audio/Kinect/WebGL
mashup that used [CubicVR.js](http://www.cubicvr.org/).

[GLSLUnit](http://glslunit.appspot.com/) 
was also presented by Google devs and a very interesting idea of using
it to feature detect that a visitor to your site has an adecuate graphics
card to run your WebGL application was suggested.

Another very interesting idea from the J3D framework was to design a
special templating language that would render to proper glsl code to
reuse shaders properly. Although J3D's glsl language is pretty simple (only has a few
special annotations), I would love to see something more like the [Django
templates](https://docs.djangoproject.com/en/dev/ref/templates/builtins/?from=olddocs) 
in which inheritance, filters and include statements could be added
in an easy way to reuse shaders.

Also, I really enjoyed [Brandon Jones](http://blog.tojicode.com/) talk
on texture (up and down)loading performance.

But what about me? I presented about [PhiloGL](http://senchalabs.github.com/philogl/) last year at [Google HQ's for
WebGLCamp #3](http://www.youtube.com/watch?v=aWTVbS8ruzw), so this time it was all about meeting the people and not having 
any pressure on presenting anything :)

I also met today a couple of developers for [OLPC](http://one.laptop.org/) that have 
been using and contributing code back to [V8-GL](https://github.com/philogb/v8-gl) for OpenGL/WebGL integration in 
the OLPC project. Can you believe it? V8-GL helps OLPC devs!

![WebGL Camp image get involved](/blog/assets/webglcamp/1.png)

Finally there's also the people who will talk to you about the future of the
APIs you're using. People working on the standard, who will actually listen to your
experiences using the WebGL API and probably at the
next iteration of WebGL Camp they will present some standard improvement that will include
at least part of your ideas in it. And I'm not lying about this. You can
witness that in [the WebGLCamp #3 video](http://www.youtube.com/watch?v=aWTVbS8ruzw#t=19m40s) (right towards the end) I was
complaining about the fact that simple JSON was not enough as an
interprocess/worker format, that it would be nice to be able to move
[typed arrays](http://www.khronos.org/registry/typedarray/specs/latest/) from one place to the other. 
This change was being added as I spoke and this year happened the exact same thing again. I
talked two minutes to [Ken Russell](http://www.linkedin.com/profile/view?id=5648748) from Google about 
the [structured cloning algorithm](http://www.w3.org/TR/html5/common-dom-interfaces.html#safe-passing-of-structured-data) used for worker communication and
how typed arrays still had to be cloned from here to there and he told
me that [transferable objects](http://updates.html5rocks.com/2011/12/Transferable-Objects-Lightning-Fast) were 
just added to Chrome. Yay!

I really enjoyed this event and hope to see the community again for the
next WebGL Camp. I had a great time and I think that there aren't so
many ocasions in which you can gather a group of people like this 
that have so many different backgrounds and ideas on such different
topics related to WebGL like standards, products and frameworks.

A big props to [Mozilla](http://mozilla.org/) and Henrik Bennetsen from [Katalabs](http://www.katalabs.com/) for
organising the event! Until the next WebGL Camp!


![WebGL Camp image](/blog/assets/webglcamp/2.png)

