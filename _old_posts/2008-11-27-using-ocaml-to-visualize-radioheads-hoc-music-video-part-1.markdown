--- 
wordpress_id: 49
layout: post
title: Using OCaml to visualize Radiohead's HoC music video (part 1)
categories: [OCaml, Visualization, OpenGL]
wordpress_url: /?p=49
---
So I was looking for some excuse to learn OCaml + OpenGL, and I run into Radiohead's House of Cards video dataset hosted at <a href="http://code.google.com/p/radiohead/downloads/list" target="_blank">google code</a>.
The dataset is made of many CSV files, one for each frame of the HoC video.
The data is also shipped with an application that uses <a href="http://processing.org/" target="_blank">Processing</a> to create an image for each frame of the video.

I decided to do the same program in OCaml + OpenGL: for each CSV file, the program loads it, renders it in OpenGL, and then saves that rendered data into a jpg (or bmp) image.

You can merge the generated image frames with the sample mp3 provided at google code, by using <b>ffmpeg</b>: 

{% highlight ocaml %}
ffmpeg -f image2 -r 30 -i ./img%d.jpg -sameq -i 1.mp3 ./out.mpeg -pass 2
{% endhighlight %}

Anyway, the result is quite interesting, and it gives us a good ground to build better visualizations:

(This youtube video quality is pretty lame, I'd recommend you to right click <a href="/blog/assets/static/img/hoc.mpeg">here</a> and <em>save link as...</em>).

<object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/4M4578jg8rI&hl=en&fs=1&rel=0&color1=0x3a3a3a&color2=0x999999"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/4M4578jg8rI&hl=en&fs=1&rel=0&color1=0x3a3a3a&color2=0x999999" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>
<div style="clear:both"></div>

This post is going to be about the making of this simple application.
Further posts on this "project" will cover advanced camera movement and particle transformations.

<h4>The Code</h4>
This app was made in one single file, but it contains two important parts:

A <em>data</em> object containing information about the location of the CSV and generated image files, along with some methods to load CSV files and save OpenGL rendered pictures into image files (bmp and jpeg formats).
This object uses <a href="http://pauillac.inria.fr/camlimages/" target="_blank">camlimages</a> for saving images in different formats, and the OpenGL/GLUT bindings provided by <a href="http://wwwfun.kurims.kyoto-u.ac.jp/soft/lsl/lablgl.html" target="_blank">lablGL</a>.

{% highlight ocaml %}
(* Loads csv frames and saves the rendered OpenGL image *)
let data =
  object (self)
    val path_to_file = "path_to_folder_containing_csv_files"
    val path_to_image_file = "path_to_folder_that_will_contain_imgs"
    val mutable current_frame = 1
    val total_frames = 2101
    val time_interval = 33
    
    method get_time_interval =   time_interval
    
    method load_file filename =
      let channel = open_in (path_to_file ^ filename) in
      let ans = ref [] in
        try 
          while true do
            let line = input_line channel in
            let sp = split (regexp ",") 
                        (sub line 0 (pred (length line))) in
            match List.map float_of_string sp with
              | [ x; y; z; d ] -> 
                ans := DVertex (x, y, z, d) :: !ans
              | _ -> raise (Invalid_argument "not a depth vertex")
          done;
          !ans
        with End_of_file | Invalid_argument _ -> 
                 close_in_noerr channel; !ans
    
    method save_image =
        let img_rgb = new OImages.rgb24 600 400 in
        let pixels = GlPix.read 
          ~x:0 ~y:0 
          ~width:600 ~height:400 
          ~format:`rgb ~kind:`ubyte
        in
        let praw = GlPix.to_raw pixels in
        let raw = Raw.gets ~pos:0 ~len:(Raw.byte_size praw) praw in
        let w = GlPix.width pixels in
        let h = GlPix.height pixels in
        for i = 0 to pred (w * h) do
          let color_rgb = { r = raw.(i * 3 + 2); 
                                  g = raw.(i * 3 + 1); 
                                  b = raw.(i * 3 + 0) } 
          in
            img_rgb#set (i mod w) (i / w) color_rgb;
        done;
        img_rgb#save (path_to_image_file ^ "img" ^ (string_of_int current_frame) ^ ".jpg")
                              None []
    
    method next_frame =
      current_frame <- (current_frame + 1) mod total_frames;
      if current_frame = 0 then
        current_frame <- total_frames;
      self#load_file ((string_of_int current_frame) ^ ".csv")
end
{% endhighlight %}

This object is included in the <em>main.ml</em> file, which is the main entry point for the OpenGL application.
This file defines functions for initializing and binding events to the main openGL app. You'll find this code familiar if you know some OpenGL.

{% highlight ocaml %}
open Str
open String
open Color
open VertexType

(* Initializes openGL scene components*)
let init width height =
    GlDraw.shade_model `smooth;
    GlClear.color (0.0, 0.0, 0.0);
    GlClear.depth 1.0;
    GlClear.clear [`color; `depth];
    Gl.enable `depth_test;
    GlFunc.depth_func `lequal;
    GlMisc.hint `perspective_correction `nicest

(*  Draws the image*)
let draw () =
  GlClear.clear [`color; `depth];
  GlMat.load_identity ();
  GlMat.translate3 (-150.0, -150.0, -400.0);
  GlDraw.begins `points;
  List.iter (fun (DVertex (x, y, z, d)) ->
    let color = d /. 255. in
      GlDraw.color (color, color, color);
      GlDraw.vertex ~x:x ~y:y ~z:z ()) data#next_frame;
  GlDraw.ends ();
  Glut.swapBuffers ();
  data#save_image

(* Handle window resize *)
let reshape_cb ~w ~h =
  let 
    ratio = (float_of_int w) /. (float_of_int h) 
  in
    GlDraw.viewport 0 0 w h;
    GlMat.mode `projection;
    GlMat.load_identity ();
    GluMat.perspective 45.0 ratio (0.1, 1300.0);
    GlMat.mode `modelview;
    GlMat.load_identity ()

(* Handle keyboard events *)
let keyboard_cb ~key ~x ~y =
  match key with
    | 27 (* ESC *) -> exit 0
    | _ -> ()

(* A timer function setted to draw a new frame each time_interval ms *)
let rec timer value =
  Glut.postRedisplay ();
  Glut.timerFunc ~ms:data#get_time_interval 
                 ~cb:(fun ~value:x -> (timer x))
                 ~value:value

(*  Main program function*)
let main () =
  let 
    width = 640 and
    height = 480
  in
    ignore (Glut.init Sys.argv);
    Glut.initDisplayMode ~alpha:true ~depth:true ~double_buffer:true ();
    Glut.initWindowSize width height;
    ignore (Glut.createWindow "Radiohead HoC");
    Glut.displayFunc draw;
    Glut.keyboardFunc keyboard_cb;
    Glut.reshapeFunc reshape_cb;
    Glut.timerFunc ~ms:data#get_time_interval 
                   ~cb:(fun ~value:x -> (timer x)) 
                   ~value:1;
    init width height;
    Glut.mainLoop ()

let _ = main ()
{% endhighlight %}

You can download the source <a href="/blog/assets/hoc1.zip" target="_blank">here</a>.
You can compile the files with the bytecode compiler:

{% highlight ocaml %}
ocamlc -g str.cma -I +camlimages ci_core.cma ci_bmp.cma ci_jpeg.cma 
-I +lablGL lablglut.cma lablgl.cma main.ml -o main
{% endhighlight %}.

Just remember that you have to install OCaml + lablGL + camlimages to be able to use this.

Any comment about the code will be well appreciated, since I'm an OCaml beginner :) .
