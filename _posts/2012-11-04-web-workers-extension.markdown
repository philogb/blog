---
layout: post
title: Crazy Idea for Web Worker Extension
categories: [JavaScript, Web Standards]
---

##Introduction

This article describes an extension to [Web Workers](http://www.whatwg.org/specs/web-apps/current-work/multipage/workers.html)
by enabling the use of a subset of the [Shading Language 1.0](www.khronos.org/files/opengles_shading_language.pdf) -- as defined by the
[WebGL](http://www.khronos.org/registry/webgl/specs/latest/) and [OpenGL ES](http://www.khronos.org/opengles/) specifications --
on a Web Worker.

The Shading Language is already present in web applications that use
WebGL or [CSS Shaders](https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html). Web Workers are
implemented and exposed by the major browsers Opera
Software, Google Chrome, Apple Safari and Mozilla
Firefox. The idea is to combine these two things to enable Web
Workers to execute Shading Language code.


##Motivation

This would enable (depending on the inner implementation) faster code
execution, but more important graphics programmers or developers in
need for more clever idioms for mathematics or computational geometry operations
could use this language to perform these operations easily. Much of the
Web today depends on graphics, as can be seen by the numerous languages
and APIs designed to render content on the screen (HTML/CSS, WebGL, 2D
Canvas and SVG) and although JavaScript is suitable for prototyping, it
doesn't provide features that are friendly to graphic developers
such as operator overloading, static typing, advanced built-int math and
geometry functions and matrix and vector classes.

##How it works

The main idea of the api extension would be to define an extra `option`
argument to the Web Worker constructor that would specify the type of
the file to be executed. By default the file type would be JavaScript:

{% highlight js %}
    var worker = new Worker('myworker.glsl', { type: 'glsl' });
{% endhighlight %}

Then the `worker` api would remain the same, with `onmessage` and
`postMessage` operations. If used with GLSL, the `postMessage` operation would be
restricted to send [transferable objects](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html#transferable-objects), in particular [ArrayBuffers or TypedArrays](http://www.khronos.org/registry/typedarray/specs/latest/). Continuing the
example we would have:

{% highlight js %}
    //create array of floats
    var floats = new Float32Array([1, 2, 3]);
    //send this data over transferable objects to the worker
    worker.postMessage(floats);
    //add a listener to get back the data
    worker.onmessage = function(e) {
        //print the resulting typed array
        console.log(e.data);
    };
{% endhighlight %}

The shader file would require a `main` function which can have an `in`
transferable object argument and `out` transferable object argument. For
example, we could have inside `myworker.glsl`:

    void main(in float numbersIn[3], out float numbersOut[3]) {
        numbersOut[0] = numbersIn[0] * numbersIn[0];
        numbersOut[1] = numbersIn[1] * numbersIn[1];
        numbersOut[2] = numbersIn[2] * numbersIn[2];
    }

Once `main` returns, the `out` parameter will be set as the `data`
property of the event object and sent in the `onmessage` callback.


##Implementation notes

I don't think that in this case GLSL would be run in the GPU (that would be crazy!), but I do think that
GLSL is a language that could be safely executed or safely transpiled into any language in the ANSI C family.
As opposed to the WebCL/OpenCL 1.0 language, GLSL does not have pointers and seems safer enough that it's
currently being used in CSS Shaders and WebGL.

