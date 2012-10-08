--- 
wordpress_id: 10
layout: post
title: Treemap quick tutorial
categories: [JavaScript InfoVis Toolkit, Visualization, Tutorial]
wordpress_url: http://blogngb.woot.com.ar/?p=10
---
<em>This tutorial requires you to have read <a href="/?p=7">Feeding JSON tree structures to the JIT</a> and <a href="/?p=8">on controllers</a> first</em>.

Hi, this is going to be a quick tutorial on how to set the treemap up and running.

**Note:** You could change all calls to <em>TM.Squarified</em> to <em>TM.SliceAndDice</em> or <em>TM.Strip</em> and it should also work.

We are going to work with this tree JSON structure:

<div style="height:300px;overflow:scroll;">

{% highlight js %}var json = {"id":"node02",
 "name":"0.2",
 "data":[
    {"key":"key1",
     "value":195},
    {"key":"key2",
     "value":5}],
 "children":[
    {"id":"node13",
     "name":"1.3",
     "data":[
        {"key":"key1",
         "value":23},
        {"key":"key2",
         "value":8}],
     "children":[
        {"id":"node24",
         "name":"2.4",
         "data":[
            {"key":"key1",
             "value":6},
            {"key":"key2",
             "value":-75}],
         "children":[]},
        {"id":"node25",
         "name":"2.5",
         "data":[
            {"key":"key1",
             "value":9},
            {"key":"key2",
             "value":-48}],
         "children":[]},
        {"id":"node26",
         "name":"2.6",
         "data":[
            {"key":"key1",
             "value":1},
            {"key":"key2",
             "value":-1}],
         "children":[]},
        {"id":"node27",
         "name":"2.7",
         "data":[
            {"key":"key1",
             "value":7},
            {"key":"key2",
             "value":25}],
         "children":[]}]},
    {"id":"node18",
     "name":"1.8",
     "data":[
        {"key":"key1",
         "value":17},
        {"key":"key2",
         "value":28}],
     "children":[
        {"id":"node29",
         "name":"2.9",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":-28}],
         "children":[]},
        {"id":"node210",
         "name":"2.10",
         "data":[
            {"key":"key1",
             "value":9},
            {"key":"key2",
             "value":-83}],
         "children":[]}]},
    {"id":"node111",
     "name":"1.11",
     "data":[
        {"key":"key1",
         "value":25},
        {"key":"key2",
         "value":-82}],
     "children":[
        {"id":"node212",
         "name":"2.12",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":-27}],
         "children":[]},
        {"id":"node213",
         "name":"2.13",
         "data":[
            {"key":"key1",
             "value":3},
            {"key":"key2",
             "value":-80}],
         "children":[]},
        {"id":"node214",
         "name":"2.14",
         "data":[
            {"key":"key1",
             "value":7},
            {"key":"key2",
             "value":-73}],
         "children":[]},
        {"id":"node215",
         "name":"2.15",
         "data":[
            {"key":"key1",
             "value":7},
            {"key":"key2",
             "value":26}],
         "children":[]}]},
    {"id":"node116",
     "name":"1.16",
     "data":[
        {"key":"key1",
         "value":17},
        {"key":"key2",
         "value":91}],
     "children":[
        {"id":"node217",
         "name":"2.17",
         "data":[
            {"key":"key1",
             "value":7},
            {"key":"key2",
             "value":48}],
         "children":[]},
        {"id":"node218",
         "name":"2.18",
         "data":[
            {"key":"key1",
             "value":10},
            {"key":"key2",
             "value":-86}],
         "children":[]}]},
    {"id":"node119",
     "name":"1.19",
     "data":[
        {"key":"key1",
         "value":52},
        {"key":"key2",
         "value":-77}],
     "children":[
        {"id":"node220",
         "name":"2.20",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":64}],
         "children":[]},
        {"id":"node221",
         "name":"2.21",
         "data":[
            {"key":"key1",
             "value":5},
            {"key":"key2",
             "value":84}],
         "children":[]},
        {"id":"node222",
         "name":"2.22",
         "data":[
            {"key":"key1",
             "value":6},
            {"key":"key2",
             "value":81}],
         "children":[]},
        {"id":"node223",
         "name":"2.23",
         "data":[
            {"key":"key1",
             "value":1},
            {"key":"key2",
             "value":25}],
         "children":[]},
        {"id":"node224",
         "name":"2.24",
         "data":[
            {"key":"key1",
             "value":4},
            {"key":"key2",
             "value":18}],
         "children":[]},
        {"id":"node225",
         "name":"2.25",
         "data":[
            {"key":"key1",
             "value":10},
            {"key":"key2",
             "value":37}],
         "children":[]},
        {"id":"node226",
         "name":"2.26",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":83}],
         "children":[]},
        {"id":"node227",
         "name":"2.27",
         "data":[
            {"key":"key1",
             "value":10},
            {"key":"key2",
             "value":-62}],
         "children":[]}]},
    {"id":"node128",
     "name":"1.28",
     "data":[
        {"key":"key1",
         "value":37},
        {"key":"key2",
         "value":-40}],
     "children":[
        {"id":"node229",
         "name":"2.29",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":-67}],
         "children":[]},
        {"id":"node230",
         "name":"2.30",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":46}],
         "children":[]},
        {"id":"node231",
         "name":"2.31",
         "data":[
            {"key":"key1",
             "value":4},
            {"key":"key2",
             "value":-99}],
         "children":[]},
        {"id":"node232",
         "name":"2.32",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":-38}],
         "children":[]},
        {"id":"node233",
         "name":"2.33",
         "data":[
            {"key":"key1",
             "value":1},
            {"key":"key2",
             "value":-3}],
         "children":[]},
        {"id":"node234",
         "name":"2.34",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":82}],
         "children":[]}]},
    {"id":"node135",
     "name":"1.35",
     "data":[
        {"key":"key1",
         "value":24},
        {"key":"key2",
         "value":63}],
     "children":[
        {"id":"node236",
         "name":"2.36",
         "data":[
            {"key":"key1",
             "value":10},
            {"key":"key2",
             "value":8}],
         "children":[]},
        {"id":"node237",
         "name":"2.37",
         "data":[
            {"key":"key1",
             "value":8},
            {"key":"key2",
             "value":63}],
         "children":[]},
        {"id":"node238",
         "name":"2.38",
         "data":[
            {"key":"key1",
             "value":6},
            {"key":"key2",
             "value":46}],
         "children":[]}]}]};{% endhighlight %}
</div>
<strong>Note:</strong> remember that the Treemap takes the first <em>dataset</em> object value to calculate the rectangles dimensions. That means that the values you setted on the first <em>dataset</em> object for all nodes must be <em>coherent</em>. <em>Coherent</em> means that, for example, if node <em>A</em> has nodes <em>B</em> and <em>C</em> as children, <em>B</em> having 3 as its first <em>dataset</em> object value and <em>C</em> having 2 as its first <em>dataset</em> value, then <em>A</em> must have 5 as its first <em>dataset</em> object value.

Put this HTML in your page:

{% highlight html %}<html>
  <head>

  <link type="text/blog/css" rel="stylesheet" href="/static/blog/css/example-treemap.css" />

  <script type="text/javascript" src="/static/js/mootools-1.2.js"></script>
  <script type="text/javascript" src="/static/js/treemap/Treemap.js" ></script>
  <script type="text/javascript" src="/static/js/example/example-treemap.js" ></script>

  </head>

  <body onload="init();">

<div id="infovis" />

  </body>
</html>{% endhighlight %}
<strong>Note:</strong> You'll probably have to change the paths to the css and javascript files.
<strong>Note2:</strong> This is the only visualization that requires Mootools 1.2+ to run. I use version 1.2 which comes packaged with the library (in the <em>extras</em> folder). You can also download it from <a href="http://mootools.net">here</a>.

Now, create a treemap-example.css and put this code in it:

<div style="height:300px;overflow:scroll;">

{% highlight css %}html, body {
  width:100%;
  height:100%;
  background-color:#222;
  text-align:center;
  overflow:hidden;
  font-size:10px;
  font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;
}

#infovis {
  position:relative;
  width:900px;
  height:500px;
  margin:auto;
  background-color:#1D1D20;
}

#infovis div {
  position:absolute;
  overflow:hidden;
}

#infovis .content {
  background-color:#333;
  border:0px solid #111;
}

#infovis .head {
  height:12px;
  color:white;
  background-color:#444;
}

#infovis .head.in-path {
  background-color:#655;
}

#infovis .body {
  background-color:black;
}

#infovis .leaf {
  color:white;
  background-color:#111;
  display:table-cell;
  vertical-align:middle;
}

#infovis .over-leaf {
  border:1px solid #9FD4FF;
}

#infovis .over-content {
  background-color: #9FD4FF;
}

#infovis .over-head { /* ...boy i'm funny */
  background-color:#A4D9FF;
  color:black;
}

/*TOOLTIPS*/
.tool-tip {
  color: #fff;
  width: 139px;
  z-index: 13000;
  background-color: black;
}

.tip-title {
  font-weight: bold;
  font-size: 11px;
  margin: 0;
  color: #9FD4FF;
  padding: 8px 8px 4px;
  background-color: black;
}

.tip-text {
  font-size: 11px;
  padding: 4px 8px 8px;
  background-color: black;
}{% endhighlight %}
</div>
<strong>Note:</strong> I won't explain all CSS classes, they are pretty much self explainable. However, you <strong>must</strong> put a <em>position:relative;</em> in the infovis container (the visualization container), just as specified on the CSS stylesheet.

Finally, create an example-treemap.js file and put this code in it:

{% highlight js %}function init() {
  var json = //json data specified above...
  var tm = new TM.Squarified();
  tm.loadFromJSON(json);

}{% endhighlight %}
You should see a treemap up and running.
<h4>Some notes:</h4>
<ul>
  <li> It's mandatory to put the <em>width</em> and <em>height</em> <em>style</em> properties on the main div container, just as specified on the CSS stylesheet.</li>
  <li> You could change the main container id by setting the <em>rootId</em> property to whatever id you like in the controller object passed to the TM constructor.</li>
</ul>
<h4>Customizing the Treemap</h4>
Let's add some colors!
In order to add colors you must know three things:
<ul>
  <li> Colors are calculated by taking the second <em>dataset</em> object value. You must also know the range of this value. In this example the second value ranges between [-100, 100]. You can change these values by setting the <em>Color.minValue</em> and <em>Color.maxValue</em> parameters for the treemap controller.</li>
  <li> You can also choose the color range for your visualization, this is done by setting the <em>Color.minColorValue</em> and <em>Color.maxColorValue</em> parameters. These properties take an array of 3 integers each describing an RGB value.</li>
  <li> Finally, to enable treemap coloring you must set the property <em>Color.allow</em> to <em>true</em>.</li>
</ul>
So the <em>init</em> javascript function would now look like:

{% highlight js %}function init() {
  var json = //..json data
  var tm = new TM.Squarified({
    //main container id.
    rootId: 'infovis',
    //orientation
    orientation: "v",
        
     Color: {
        //Allow coloring
        allow: true,
        //Set min value and max value for 
        //the second *dataset* object values.
        //Default's to -100 and 100.
        minValue: -100,
        maxValue: 100,
        //Set color range. Default's to reddish and 
        //greenish. It takes an array of three
        //integers as R, G and B values.
        maxColorValue: [0, 255, 50],
        minColorValue: [255, 0, 50]
     }
  });
  tm.loadFromJSON(json);
}{% endhighlight %}
You should see a colored treemap now.

Finally, let's put nice tooltips! We'll do this by using the Tip Mootools class.
First, we'll define an onAfterCompute controller method to query for all nodes that will be displaying information (like <em>.head</em> and <em>.leaf</em> nodes) and assign the information to be displayed. To know more about this please check the docs for the <a href="http://mootools.net/docs/Plugins/Tips#Tips:Storage">Tips Mootools plug in </a>
I also define some extra methods that convert the <em>dataset</em> to HTML.
I also allow tooltips by setting <em>tips</em> to true.

So the JavaScript file should now look like this:

{% highlight js %}function init() {
  var json = //...same json data as before...

  var tm = new TM.Squarified({
    //main container id.
    rootId: 'infovis',
    //orientation
    orientation: "v",
    //Allow tips for treemap
     tips: true,
        
     Color: {
        //Allow coloring
        allow: true,
        //Set min value and max value for 
        //the second *dataset* object values.
        //Default's to -100 and 100.
        minValue: -100,
        maxValue: 100,
        //Set color range. Default's to reddish and 
        //greenish. It takes an array of three
        //integers as R, G and B values.
        maxColorValue: [0, 255, 50],
        minColorValue: [255, 0, 50]
    },

    onAfterCompute: function() {
      var that = this, parent;
      $$('#infovis .leaf', '#infovis .head').each(function(elem, i) {
        //get the JSON tree node element having the same id
        //as the dom element queried and makeTip.
        if(p = elem.getParent()) {
          var sTree = TreeUtil.getSubtree(tm.tree, p.id);
          if(sTree) that.makeTip(elem, sTree); 
        }
      });
    },
//Tooltip content is setted by setting the *title* of the element to be *tooltiped*.
//Read the mootools docs for further understanding.
    makeTip: function(elem, json) {
      var title = json.name;
      var html = this.makeHTMLFromData(json.data);
      elem.store('tip:title', title).store('tip:text', html);
    },
//Take each dataset object key and value and make an HTML from it.
    makeHTMLFromData: function(data) {
      var html = '';
      for(var i=0; i&lt;data.length; i++) {
        html += data[i].key + ': ' + data[i].value + '&lt;br /&gt;';
      }
      return html;
    }
  });

  tm.loadFromJSON(json);
}{% endhighlight %}
You should see some tooltips now!

Remember that you have more controller methods to customize your visualization just as you want! Hope it was helpful.
