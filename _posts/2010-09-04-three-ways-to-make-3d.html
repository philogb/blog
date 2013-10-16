--- 
wordpress_id: 1580
layout: post
title: Three ways to make 3D
categories: [OpenGL, WebGL, JavaScript, Scala, Processing, SPDE]
wordpress_url: /?p=1580
---
Last week I got the chance to put my hands on some technologies I've been interested for some time now. I've created a basic 3D example of some fractals, and implemented it in <a href="https://developer.mozilla.org/en/Canvas_tutorial">2D Canvas</a>, <a href="http://en.wikipedia.org/wiki/WebGL">WebGL</a> and <a href="http://technically.us/spde/About">SPDE</a> (<a href="http://www.scala-lang.org/">Scala</a> + <a href="http://processing.org/">Processing</a>). 

The main goal of these experiments was to warm up a little bit in 3D, to learn WebGL, Scala and Processing. I had previous experience with 3D and OpenGL while developing <a href="http://github.com/philogb/v8-gl#readme">V8-GL, an OpenGL ES port to V8</a>, and also while developing the <a href="/2008/12/06/using-ocaml-to-visualize-radioheads-hoc-music-video-part-3/">House of Cards visualization in OCaml</a>. But these were other times. Now <a href="http://flyingfrogblog.blogspot.com/2010/08/rise-and-fall-of-ocaml.html">OCaml is dead</a>, and there's a <a href="http://www.khronos.org/webgl/">V8-GL port in the browser, which is called WebGL</a>. I'm kind of proud to have chosen things that became sort of mainstream later on though: functional programming for graphics and hardware accelerated graphics with JavaScript :) .

<h4>2D Canvas</h4> 
The 2D Canvas API has a limited capability for 3D graphics. In order to make 3D with it you can use some high level 3D engine like <a href="http://deanm.github.com/pre3d/">pre3d</a> or <a href="http://github.com/mrdoob/three.js">three.js</a> which provide classes to do mathy stuff in 3D and then use tricks like <a href="http://en.wikipedia.org/wiki/Pinhole_camera">the pinhole camera model</a> to project them on 2D. What's interesting about three.js is that it also provides SVG and WebGL renderers. These are awesome tools to make 3D, but since my example was more in the spirit of the <a href="http://js1k.com/demos">JS1k demos</a> I decided to start from scratch. The only thing I used was the <a href="http://github.com/mrdoob/three.js/blob/master/src/core/Vector3.js">Vector3</a> and <a href="http://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js">Matrix4</a> classes from three.js.

The result is quite interesting although it's CPU intensive. You can <a target="_blank" href="/blog/assets/exp/exp-canvas/index.html">try it here</a> if you have a 2D canvas enabled browser.

<table align="center" style="width:100%;">
<tr>
<td>
<img src="http://i4.ytimg.com/vi/37t8o4MSME8/1.jpg" />
</td>
<td>
<img src="http://i4.ytimg.com/vi/37t8o4MSME8/2.jpg" />
</td>
<td>
<img src="http://i4.ytimg.com/vi/37t8o4MSME8/3.jpg" />
</td>
</tr>
</table>

To make this example I created a Shape object, that would create a list of particles placed in some particular shape:

{% highlight js %}
var Shape = {
  Sphere: function(objs, opts) {
    var s = opts.s || 200,
      atan2 = Math.atan2,
      cos = Math.cos,
      acos = Math.acos,
      sin = Math.sin,
      sqrt = Math.sqrt;
    
    for(var i=0, l=objs.length; i&lt;l; i++) {
      var obj = objs[i],
        pos = obj.pos,
        x = pos.x,
        y = pos.y,
        z = pos.z,
        r = x * x + y * y + z * z,
        theta = acos(z / sqrt(r)),
        phi = atan2(y, (x || 1));

      if(!obj.sphere) {
        obj.sphere = new THREE.Vector4();
      }
      var pos = obj.pos, sphere = obj.sphere;
      pos.x = sphere.x = s * sin(theta) * cos(phi);
      pos.y = sphere.y = s * sin(theta) * sin(phi);
      pos.z = sphere.z = s * cos(theta);
    }
  }
     //...other shapes here...
};
{% endhighlight %}

I also created a tween object from scratch, which would provide transition equations (linear, Elastic, Bounce) for the particles movement. There are many tweeners around, but since I'm a big fan of <a href="http://mootools.net/">MooTools</a> and the way they use object mutability and functions as objects to create their tweener I implemented something in that spirit. The transition object code provides an object with methods (Trans.Elastic(<em>delta</em>), Trans.Bounce(<em>delta</em>)) and "submethods" as properties of these methods (Trans.Elastic.easeOut(<em>delta</em>), Trans.Bounce.easeInOut(<em>delta</em>)). That's the approach I like and I don't think it's that easy to emulate in other languages... Will Scala be up to the task? 

Here's some code for that transitions object:

{% highlight js %}
//transitions object. can be used like
//Trans.linear, or Trans.Elastic.easeOut, etc.
var Trans = {
  linear: function(p){
    return p;
  }
};

(function(){

  //add easing equations as methods
  //of the transition object/function
  //i.e add easeIn/Out to the Elastic/Sine objects
  var makeTrans = function(transition, params){
    var trans = {
      easeIn: function(pos){
        return transition(pos, params);
      },
      easeOut: function(pos){
        return 1 - transition(1 - pos, params);
      },
      easeInOut: function(pos){
        return (pos <= 0.5)? transition(2 * pos, params) / 2 
          : (2 - transition(2 * (1 - pos), params)) / 2;
      }
    };
  for(var p in trans) {
    transition[p] = trans[p];
  }
  return transition;
  };

  //transition equations
  var transitions = {

    Sine: function(p){
      return 1 - Math.sin((1 - p) * Math.PI / 2);
    },

    Elastic: function(p, x){
      return Math.pow(2, 10 * --p)
          * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
    }
    //...other transitions here...
  };
  
 //enhance the Trans object with new transitons
  for(var p in transitions) {
  Trans[p] = makeTrans(transitions[p]);
  }

})();

{% endhighlight %}

Finally the main.js file contains <em>init</em>, <em>loop</em> and <em>nextShape</em> functions. The <em>init</em> function will call the Shape object methods, pre-calculating the particles positions, and will set an array with the shapes to iterate on. Loop will render each point to the canvas, by using the <em>x</em> and <em>y</em> coordinates of the particle. The <em>z</em> coordinate will determine the alpha color and radius of the particle. Once a fixed number of loops are triggered nextShape will be called to make the transition to the next shape.

While this is a simple approach, 3D in the 2D canvas environment is quite limited, and very CPU intensive.

<h4>WebGL</h4>
Since most of the code used in the previous example was dealing with 3D objects and then projected into 2D space, this code can also be used when working with WebGL. Getting started with WebGL is much harder than with 2D Canvas though. First, there's all that setup of creating a program, compiling the shaders (which of course is GLSL code and not JavaScript itself), linking them into the program, initializing buffers, etc. Moreover, since there's not a fixed pipeline all that push/pop matrix stack has to be hand-coded now, which makes it quite difficult to create things without a framework. However, since this is a very simple example I used exactly the same things here than in the previous example. <a target="_blank" href="/blog/assets/exp/exp-webgl/index.html">Here's the live example that you can see in a WebGL enabled browser</a> (click <a href="http://learningwebgl.com/blog/?p=11">here</a> to get a WebGL enabled browser). Or you can check the video I made of the demo below (click <a href="http://www.youtube.com/watch?v=qVt-R7KaULA">here</a> if you can't see the video):

<object width="500" height="400"><param name="movie" value="http://www.youtube.com/v/qVt-R7KaULA?fs=1&amp;hl=en_US&amp;rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/qVt-R7KaULA?fs=1&amp;hl=en_US&amp;rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="400"></embed></object>

The rendering part is quite different though. You need to set all the vertex information into a buffer and send that data into the shaders. The shaders will get the data in attributes (which is per vertex information) or uniforms (data which will remain the same for all vertices). For example, all particles are colored the same, but each particle has a different position, so the code would look like this:

{% highlight js %}
    //draw scene
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 500.0);
    loadIdentity();
    mvTranslate([0.0, 0.0, -150.0]);
    mvRotateX(rx);
    mvRotateY(ry);
    for(var i=0, l=parts.length, vertices=[]; i&lt;l; i++) {
        var p = parts[i].pos;
        vertices.push(p.x, p.y, p.z);
    }
    //create and store and bind vertex data
    gl.bindBuffer(gl.ARRAY_BUFFER, ballsPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
                           ballsPositionBuffer.itemSize, 
                           gl.FLOAT, false, 0, 0);
    //set model view and perspective matrix
    setMatrixUniforms();
    //set color and object scaling
    gl.uniform1f(shaderProgram.scaleUniform, s);
    gl.uniform3f(shaderProgram.colorUniform, r, g, b);
    //draw
    gl.drawArrays(gl.POINTS, 0, ballsPositionBuffer.numItems);
{% endhighlight %}

While it can be a little bit difficult to dive into WebGL from scratch, this is definitely the way to go if you want to make some serious 3D stuff in the browser. Plus, once you get some base code right, things become quite simple :) . 
Chrome/Safari and Firefox have pretty mature implementations of WebGL, and just like it happened with 2D canvas, I bet this will be eventually implemented in other browsers as well.

<h4>SPDE = Scala + Processing</h4>
Since OCaml is dead and I really liked some features of it such as type inference, destructuring, pattern matching, object literals, operator overloading and more, I looked for some replacement and considered Scala as an interesting alternative. I'm still learning Scala, and while being more OO and less functional than OCaml, there's still room for pattern matching with <a href="http://www.scala-lang.org/node/107">case classes</a>, syntactic sugar for singletons (or object literals), and other goodies such as <a href="http://www.scala-lang.org/node/126">traits</a>, operator overloading, etc. <b>Plus, it targets the JVM</b>.
<a href="http://technically.us/spde/About">SPDE</a> is the "port" of the Processing Development Environment to the Scala programming language. It basically provides a nice workflow to create and run projects, providing the <a href="http://processing.org/reference/">set of drawing methods</a> that already exist in Processing. The SPDE project is <a href="http://github.com/n8han/spde">hosted at Github</a> as well as the <a href="http://github.com/n8han/spde-examples">SPDE Examples</a>.

The structure of the code I ported is quite similar to the WebGL example code, but more high-level in the sense that there are lots of drawing primitives and useful functions within the Processing environment. I really enjoyed hacking this thing with Scala. Here's <a href="http://github.com/philogb/spde-examples/blob/master/FractalParticles/FractalParticles.spde">the source code for the example</a>. You can also watch a video of the visualization below (click <a href="http://www.youtube.com/watch?v=Fl-V7GRAJJ4">here</a> if you can't watch the video):

<object width="500" height="400"><param name="movie" value="http://www.youtube.com/v/Fl-V7GRAJJ4?fs=1&amp;hl=en_US&amp;rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/Fl-V7GRAJJ4?fs=1&amp;hl=en_US&amp;rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="500" height="400"></embed></object>

Remember the code for the tweener I described before? Some really nice feature in Scala is that you can extend the class <b>Function</b> which provides mappings from one type to another. In Scala functions are also treated as classes and the "elegant" code done for creating transitions in JavaScript can be "ported" to Scala in that same way:

{% highlight python %}
abstract class Transitions extends Function[Float, Float] {
 private def easeInVar(x: Float, i: Float = 1.0): Float = apply(i * x);
 private def easeOutVar(x: Float, i: Float = 1.0): Float = i - apply(i * (1 - x));

 def easeIn(x: Float) = easeInVar(x);
 def easeOut(x: Float) = easeOutVar(x);
 def easeInOut(x: Float): Float = (if (x &lt;= 0.5) easeInVar(x, 2) else easeOutVar(x, 2)) /2
}

object Transitions {
 private val pi = Pi;
 
 def linear(x: Float) = x;
 
 object Sine extends Transitions {
  override def apply(x: Float): Float = 1 - sin((1 - x) * pi / 2)
 }
 
 object Back extends Transitions {
  override def apply(p: Float): Float = {
   val x = 1.618;
   pow(p, 2) * ((x + 1) * p - x);
  }
 }
       //...other objects here...
}
{% endhighlight %}

So now transitions can be passed as parameters just like with JavaScript:

{% highlight scala %}
Transitions.linear _;
Transitions.Elastic.easeOut _;
{% endhighlight %}

This is due to the fact that there's some syntactic sugar for the apply method for a Function instance:

{% highlight scala %}
Transitions.Elastic.apply(0.5); //is the same as...
Transitions.Elastic(0.5);

Transitions.Elastic.easeOut.apply(0.5); //is the same as...
Transitions.Elastic.easeOut(0.5);
{% endhighlight %}

<h4>Conclusion</h4>
There are many approaches to do graphics and I only used three of them. For 2D Canvas rendering in 3D there are some libraries worth taking at look at: <a href="http://github.com/mrdoob/three.js">three.js</a> and <a href="http://deanm.github.com/pre3d/">pre3d</a>. If you'd like to learn WebGL (highly recommended) I recommend the webgl lessons page found <a href="http://learningwebgl.com/blog/?page_id=1217">here</a>. Finally, <a href="http://technically.us/spde/About">SPDE</a> is a great way to learn Scala and Processing at the same time. It's definitely worth taking a look at it.
