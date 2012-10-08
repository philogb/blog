--- 
wordpress_id: 109
layout: post
title: Using OCaml to visualize Radiohead's HoC music video (part 2)
categories: [OCaml, Visualization, OpenGL]
wordpress_url: /?p=109
---
This post is about performing advanced camera movement in OpenGL.
We'll use the same Radiohead's HoC dataset we used in the <a href="/2008/11/27/using-ocaml-to-visualize-radioheads-hoc-music-video-part-1/">previous post</a>.

Once again, the quality of the youtube video is pretty lame. You can right click <a href="/blog/assets/static/img/hoc2.mpg">here</a> and <em>save link as...</em> to download a high quality version of the video (~100MB).
I <b>strongly recommend</b> you to see the high quality video :)

<object width="500" height="344"><param name="movie" value="http://www.youtube.com/v/UEJqrmEWV-Q&hl=en&fs=1&rel=0&color1=0x3a3a3a&color2=0x999999"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/UEJqrmEWV-Q&hl=en&fs=1&rel=0&color1=0x3a3a3a&color2=0x999999" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="344"></embed></object>

<h4>Camera Instructions</h4>
Camera movement is made of Translations and/or Rotations.
We want to provide our camera model with instructions of the type:
<ul>
<li><b>[ Translate <em>from</em> <em>to</em> ]</b></li>
<li><b>[ Rotate <em>from</em> <em>to</em> <em>rotation_axis</em> ]</b></li>
<li><b>[ Translate ...; Rotate ... ]</b></li>
</ul>
As the last example shows, multiple transformations can be done at the same time (translations and rotations).

The definition for a transformation type is:
{% highlight ocaml %}
type camera_op = 
  | Translate of Gl.point3 * Gl.point3  
  | Rotate of float * float * Gl.vect3
{% endhighlight %}

A camera instruction is a list of these operations (<em>camera_op</em>) and a number specifying the number of frames this transformation should take (i.e the duration of the transformation).

So, for example, this instruction:
<b>( [ Translate( (100., 100., 100.), (0., 0., 0.) ) ], 300. )</b>
translates the camera from (100, 100, 100) to (0, 0, 0) in 300 frames, that is in 10 seconds (at 30 frames per second).

Translation is done by simple interpolation. The interpolation formula for translating from <b>A</b> to <b>B</b> is something like this:
<b>A + (B - A) * delta</b> with <b>delta</b> in (0, 1).

<h4>Transitions</h4>
It would be nice if camera movement, besides being linear, could also perform other advanced transitions, like the ones used in <a href="http://docs111.mootools.net/Effects/Fx-Transitions.js#Fx.Transitions.linear">Fx.Transitions</a> by Mootools.
Some of these transitions are: Quadratic, EaseIn, EaseOut, EaseInOut, Back, Sine, etc...

These effects are achieved by applying functions to the <b>delta</b> value, changing the way it increases or descreases its value.
A possible interface for a Transition module is:

{% highlight ocaml %}
type trans = Linear | Quart
type ease = None | EaseOut | EaseIn | EaseInOut

val linear : 'a -> 'a
val quart : float -> float

val ease_in : ('a -> 'b) -> 'a -> 'b
val ease_out : (float -> float) -> float -> float
val ease_in_out : (float -> float) -> float -> float

val get_transition : trans -> float -> float
val get_ease : ease -> (float -> float) -> float -> float

val get_animation : trans -> ease -> float -> float
{% endhighlight %}

By using <b>Transition.get_animation Quad EaseInOut delta</b> we can change the timing of our animation from this:

<img src="/blog/assets/static/img/Linear.png" style="margin-left:30px;" />

into this:

<img src="/blog/assets/static/img/Quad.png" style="margin-left:30px;" />

Our camera instructions are then defined as:

{% highlight ocaml %}

type camera_op_list = (camera_op list) * float * (trans * ease)

{% endhighlight %}
For example:
<b>( [ Translate( (100., 100., 100.), (0., 0., 0.) ) ], 300. (Quad, EaseOut))</b>

<h4>The Camera Model</h4>
A possible interface for the camera model is:

{% highlight ocaml %}
class camera_model :
  object
    val mutable animations : camera_op list
    val mutable time : float
    val mutable total_frames : float
    val mutable transition : Transition.trans * Transition.ease

    method get_time : float
    method step : unit
    method draw : unit
    method translate : Gl.point3 -> Gl.point3 -> float -> unit
    method rotate : float -> float -> Gl.vect3 -> float -> unit
    method set_animations :
      camera_op list * float * (trans * ease) -> unit
  end
{% endhighlight %}

The camera_model instance variables contain the destructured <em>camera_op_list</em> type elements: <em>animations</em>, <em>total_frames</em> and <em>transition</em>.
We also provide individual methods for handling translations and rotations. These methods simply compute a delta value, apply the interpolation and then call <em>GlMat.translate3</em> or <em>GlMat.rotate3</em>.

The 40 line implementation looks like this:

{% highlight ocaml %}
class camera_model =
 object (self)
  val mutable total_frames = 0.
  val mutable time = 0.
  val mutable transition = (Linear, None)
  val mutable animations = []
  
  method get_time = time
  
  method set_animations ans =
    let (x, y, z) = ans in
      animations <- x;
      total_frames <- y;
      transition <- z;
      time <- 0.
  
  method step =
    if time < total_frames then
      time <- time +. 1.

  method translate start last delta =
    let (trans, ease) = transition in
    let delta_val = Transition.get_animation trans ease delta in 
    let (x, y, z) = start in
    let (x', y', z') = last in
    let DVertex(a, b, c, d) = Interpolate.cartesian 
                                (DVertex(x, y, z, 0.)) 
                                (DVertex(x', y', z', 0.)) 
                                delta_val
    in
      GlMat.translate3 (a, b, c)
  
  method rotate start last vec delta =
    let (trans, ease) = transition in
    let delta_val = Transition.get_animation trans ease delta in
    let ang = Interpolate.cartesian_float start last delta_val in
    GlMat.rotate3 ang vec 
    

    method draw =
      let delta = time /. total_frames in
        List.iter (fun anim ->
          match anim with
            | Translate(start, last) -> 
               self#translate start last delta
            | Rotate(start, last, vec) -> 
               self#rotate start last vec delta ) animations
end
{% endhighlight %} 

<h4>Timeline</h4>
Now that we have our camera model, we need a "timeline" object that can pass intructions to the camera at different stages of the animation.
We define a class-less object <em>timeline</em> that holds a list of camera transformations to be executed at a specific frame of the animation:

{% highlight ocaml %}
let timeline = 
  object (self)
    val mutable frame = 0.
    (* Starting frame number, camera_instructions *)
    val camera_timeline = [
      (1.,   (* camera_instructions *));
      (310., (* camera_instructions *));
      (631., (* camera_instructions *) ]
      
    method get_frame = frame
    
    method tick =
      frame <- frame +. 1.;
      self#update_camera;
    
    method update_camera =
      try
        let camera_anim = List.assoc frame camera_timeline in
          cam#set_animations camera_anim;
        with
          | Not_found -> ()
end
{% endhighlight %}

<h4>Download and Use</h4>
This is all I've done to handle camera movement.
I'm not an advanced OpenGL/OCaml developer, so any comment/suggestion about my understanding of OCaml/OpenGL is very welcome.
You can download the source <a href="/blog/assets/hoc2.zip" target="_blank">here</a>.
You can compile the source with:
{% highlight ocaml %}
ocamlc -g str.cma -I +camlimages ci_core.cma ci_jpeg.cma ci_bmp.cma 
-I +lablGL lablglut.cma lablgl.cma interpolate.ml transition.ml 
camera.ml loader.ml main.ml -o main
{% endhighlight %}

Last part of this "trilogy" will be about particle transformations in OpenGL.
Hope you enjoyed it!
