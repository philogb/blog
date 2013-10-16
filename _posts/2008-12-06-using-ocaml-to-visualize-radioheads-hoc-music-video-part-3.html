--- 
wordpress_id: 156
layout: post
title: Using OCaml to visualize Radiohead's HoC music video (part 3)
categories: [OCaml, Visualization, OpenGL]
wordpress_url: /?p=156
---
*Update 10/2009:* The project is currently hosted at <a href="http://github.com/philogb/hoc">GitHub</a>.

*Update 01/2009:* Created a new hoc3.zip file and some <a href="/blog/assets/hoc/doc/index.html">documentation</a>.

A while ago Radiohead <a href="http://code.google.com/creative/radiohead/#data-visualization" target="_blank">published</a> their <em>House of Cards</em> video data in form of CSV files. Each CSV file contains information about the 3D position of the points for each frame.

I wrote a couple of previous posts that covered  <a href="/2008/11/27/using-ocaml-to-visualize-radioheads-hoc-music-video-part-1/">how to render and save that data with OpenGL and OCaml</a> and also <a href="/2008/12/02/using-ocaml-to-visualize-radioheads-hoc-music-video-part-2/">how to customize camera movement in OpenGL</a>.

This post shows how to customize particle animations for Radiohead's House of Cards video.
A proof of concept for camera movement + particle animation is shown in this youtube video:

<object width="500" height="344" data="http://www.youtube.com/v/ZRqKIljnvd4&amp;hl=en&amp;fs=1&amp;rel=0&amp;color1=0x3a3a3a&amp;color2=0x999999" type="application/x-shockwave-flash"><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="http://www.youtube.com/v/ZRqKIljnvd4&amp;hl=en&amp;fs=1&amp;rel=0&amp;color1=0x3a3a3a&amp;color2=0x999999" /><param name="allowfullscreen" value="true" /></object>

If you want to generate the video, you have to download Radiohead's HoC music video data <a href="http://code.google.com/creative/radiohead/#data-visualization" target="_blank">here</a>. Also, you can download the source code for this project <a href="/blog/assets/hoc3.zip" target="_blank">here</a>.

This small project is organized in a way that is easy to add new features, camera animations and particle transformations in order to easily code new videos with different effects using the HoC data.

Radiohead's HoC data is a set of CSV files. Those files are rendered in OpenGL with OCaml and then saved in <em>bmp</em> or <em>jpeg</em> files to be merged into a video using <em>ffmpeg</em>. If you want to know more about this you should probably read <a href="/2008/11/27/using-ocaml-to-visualize-radioheads-hoc-music-video-part-1/">part 1</a> of this "trilogy".

The <em>Camera Model</em> class allows you to make custom camera movements that can be handled and defined in a <em>Timeline</em> object in the <em>main.ml</em> file. If you like to know more about this, you can read <a href="/2008/12/02/using-ocaml-to-visualize-radioheads-hoc-music-video-part-2/">part 2</a> of this "trilogy".

This last post shows how to customize particle interpolation and movement by using the <em>Particle Model</em> class, the <em>ParticleTrans</em> module and the <em>Timeline</em> object.
<h4>Particle Model</h4>
The <em>particle_model</em> class handles particle animations.
Somewhat like the camera class, <em>particle_model</em> stores the initial frame and the last frame along with some extra information about the timing of the animation.
The <em>particle_model</em> then performs an interpolation from the initial_frame to the last_frame, rendering the state of the transformation in the <em>draw</em> function.

A possible interface for the particle model could be something like this:
{% highlight ocaml %}class particle_model :
  object
    (* starting frame *)
    val mutable start_frame : VertexType.depth_vertex list
    (* ending frame *)
    val mutable last_frame : VertexType.depth_vertex list
    (* currently loaded frame *)
    val mutable loaded_frame : VertexType.depth_vertex list
    (* if setted to true, it will load a new frame for each
    step of the animation *)
    val mutable refresh_frames : bool
    (* same as the camera_model -check that post *)
    val mutable time : float
    val mutable total_frames : float
    val mutable transition : Transition.trans * Transition.ease
    (* extend start_frame or last_frame in order to
    have same number of points *)
    method balance : unit
    (* equivalent to the camera methods *)
    method step : unit
    method draw : float -&gt; unit
    (* set the type of the animation you want
    to perform *)
    method set_animation :
      float -&gt;
      bool * bool *
      (ParticleTrans.transformation * float *
       (Transition.trans * Transition.ease)) -&gt;
      unit
  end{% endhighlight %}
Particle animations have a special type, that ressembles the camera model transition type.
This type is defined as follows:
{% highlight ocaml %}type animation_op =
    ParticleTrans.transformation * float *
    (Transition.trans * Transition.ease){% endhighlight %}
Just to make a comparison, the camera model transition type is:
{% highlight ocaml %}
type camera_op_list = (camera_op list) * float * (trans * ease){% endhighlight %}
This type can be divided into three main parts:

<ul>
  <li> The <em>float</em> value is the total number of frames the animation will use.</li>
  <li> The (trans \* ease) value allows you to customize different type of transitions, from <em>Linear, None</em> to <em>Quad, EaseInOut</em>. More information about this is in the <em>camera_model</em> post.</li>
  <li> <em>ParticleTrans.transformation</em> is a function that applies a transformation to a frame. You can define custom functions in that module and then apply them to the visualization.
I only defined a couple of functions, but you can define any other animation you like. You just have to define a function that receives a frame as input and returns a frame as output.
The interface for ParticleTrans is:

{% highlight ocaml %}type transformation =
  | Idle
  | Project of float * float * float
  | Random

val idle : 'a -&gt; 'a

val project :
  transformation -&gt;
  VertexType.depth_vertex list -&gt;
  VertexType.depth_vertex list

val random : VertexType.depth_vertex list -&gt;
  VertexType.depth_vertex list

val get_trans :
  transformation -&gt;
  VertexType.depth_vertex list -&gt;
  VertexType.depth_vertex list{% endhighlight %}
</li>
</ul>

<h4>Putting it all together</h4>
The timeline object (described in the <a href="/2008/12/02/using-ocaml-to-visualize-radioheads-hoc-music-video-part-2/">previous post</a>) holds information about the camera and particle transformations beeing applied at each stage of the animation.
This class-less object is defined in the main.ml file and looks like this:

{% highlight ocaml %}let timeline =
  object (self)
    val mutable frame = 0.
    val camera_timeline = [
    (* operations defined in the
    camera model post *)
    ]

    val particle_timeline = [
      (* frame number,  (invert, refresh frames, instruction) *)
      (1., (true, true, (Random, 120., (Elastic, EaseOut))));
      (420., (false, false, (Random, 50., (Quad, EaseOut))));
      (471., (false, true, (Idle, 80., (Quad, EaseIn))))
      ]

    method get_frame = frame

    method tick =
      frame &lt;- frame +. 1.;
      self#update_camera;
      self#update_animation

    method update_camera =
      try
        let camera_anim = List.assoc frame camera_timeline in
          cam#set_animations camera_anim;
        with
          | Not_found -&gt; ()

    method update_animation =
      try
        let anim = List.assoc frame particle_timeline in
          part#set_animation frame anim;
      with
          | Not_found -&gt; ()
end{% endhighlight %}

The <em>particle_timeline</em> and <em>camera_timeline</em> variables hold the transformations to be performed at different stages of the animation.

<h4>Download and Use</h4>
You can download the project <a href="/blog/assets/hoc3.zip" target="_blank">here</a>.
You can compile the project by typing:

{% highlight ocaml %}ocamlc -g str.cma -I +camlimages ci_core.cma ci_jpeg.cma ci_bmp.cma
-I +lablGL lablglut.cma lablgl.cma interpolate.ml transition.ml camera.ml
 loader.ml particleTrans.ml particle.ml main.ml -o main{% endhighlight %}

Any comment about the Video or the OpenGL/OCaml implementation is very welcome!
