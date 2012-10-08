---
layout: post
title: Line integral convolutions
categories: [Visualization, PhiloGL]
---

**TL;DR**: *I implemented a nice technique to animate fluids in WebGL with
floating point textures [that you can try here](http://philogb.github.com/LIC/fluid.html). The technique is
based on a very interesting paper that I describe below.*


When I was a kid my physics teacher showed us this amazing
experiment where he would put a magnetic dipole inside of a box with
some sort of "iron sand" and one could see the sand taking the
shape of the vector field:

![streamline magnetic field](/blog/assets/lic/magnet.png)

which I always thought was similar to the curves in the sand that one
may find in a Japanese garden:

![streamline japanese garden](/blog/assets/lic/japanese-garden.jpg)


There's an interesting technique in which a vector field can be
rendered to look just like the above pictures. This technique is called
line integral convolution. I've been working on this and implemented a couple
of papers related to this technique in JavaScript, 2D Canvas and WebGL.

## LICs in the CPU

The first implementation I worked on is from the paper [Imaging Vector Fields Using Line Integral Convolution](http://www8.cs.umu.se/kurser/TDBD13/VT00/extra/p263-cabral.pdf)
by *Brian Cabral* and *Leith (Casey) Leedom*. This technique takes a
vector field and a white noise image, and convolves them in order to
get something very similar to the images above. For example, here's a
rendering of a (-y, x) field with this technique.

![rendering LIC on the CPU](/blog/assets/lic/FastLIC.png)

One drawback is that the algorithm's complexity is relative to the
number of pixels in the image, since for a given subset of those pixels
a line integral convolution has to be calculated on the streamline where
this pixel is included.

![streamline](/blog/assets/lic/stream1.png)

While the rendering shows the streamlines of the vector field, it
doesn't really show the direction of the vectors themselves. I worked on
another technique based on the paper [Animating Flowfields: Rendering of Oriented Line Integral Convolution](http://graphics.cs.ucdavis.edu/~lfeng/sig/tensor/papers/Animating%20Flow%20Fields%20Rendering%20of%20Oriented%20Line%20Integral%20Convolution.pdf) that uses a filter to create
oriented line integral convolutions. This is combined with other type of
textures (not white noise) and creates something like this:

![rendering OLIC on the CPU](/blog/assets/lic/OLIC.png)

Both techniques use the CPU and due to their complexity they are pretty slow to render.
You can find my 2D Canvas implementations [here](http://philogb.github.com/LIC/lic.html) and [here](http://philogb.github.com/LIC/olic.html).

While IMO these techniques don't make much sense on the CPU (a few
particles and a blend operation would suffice to create the OLIC effect), there are
really interesting variations of these techniques that can be used on
the GPU and allow for many more interesting effects and animations.


## LICs on the GPU

While looking for more techniques to render LICs I came across this mind
blowing paper called [Lagrangian-Eulerian Advection of Noise and Dye Textures
for Unsteady Flow Visualization](http://www.cs.ucdavis.edu/~ma/ECS276/readings/Jobard_TVCG02.pdf).

Instead of calculating for each pixel the line integral convolution,
this technique takes the background image (white noise image) and
advects it with some control points. This advected image is then blended
with the original image to create a third image that has a very similar
result to the techniques mentioned above.

There are many considerations to take into account when implementing
LICs via texture advection like coordinate and noise initialization,
coordinate integration, noise advection, edge treatment, noise
injection, coordinate reinitialization, noise blending, post-processing,
etc. but the algorithm is performed in the GPU and thus is much much
faster than the previous ones. I created a small example of an animated
rendering of the same vector field with PhiloGL [that you can find
here](http://philogb.github.com/LIC/vortex.html). The demo uses WebGL and floating point textures. I add a video
below in case your browser doesn't support this:

<iframe width="480" height="360" src="http://www.youtube.com/embed/hx2mzR6cf5s?rel=0" frameborder="0" allowfullscreen="true">
</iframe>

Another good thing is that I was finally able to simulate the magnetic
field experiment I mentioned at the beginning of this article. [You can
find the example here](http://philogb.github.com/LIC/dipole.html). I also add the video in case your browser
doesn't support the features:

<iframe width="480" height="360" src="http://www.youtube.com/embed/gNkoerEpods?rel=0" frameborder="0" allowfullscreen="true">
</iframe>


## Fluid simulation

The paper also describes a technique to do dye texture advection. This
is pretty neat to simulate fluids. I created a cool demo showing this.
[You can find the demo here](http://philogb.github.com/LIC/fluid.html). I also add a video of the demo below:

<iframe width="420" height="315" src="http://www.youtube.com/embed/v83CrHQHK70?rel=0" frameborder="0" allowfullscreen="true">
</iframe>


All three papers have been implemented in 2D Canvas and WebGL and [you
can find the code here](http://github.com/philogb/LIC/). These techniques are pretty neat to render and
animate vector fields. I hope you find them useful!

