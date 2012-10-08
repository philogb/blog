--- 
wordpress_id: 38
layout: post
title: Visualizing Linux package dependencies
categories: [JavaScript InfoVis Toolkit, Demo, Tutorial]
wordpress_url: /?p=38
---
I've been building a Linux package dependency visualizer with Python and the <a href="http://thejit.org">JavaScript Infovis Toolkit</a> that gathers all dependencies for a linux package and displays them in an interactive tree visualization.

So, let's say your query is <b>wine</b> and you want to see dependencies for that package. The visualization will display <b>wine</b> as the centered node, laying its dependencies on outer concentric circles like this:

<img style="border: 1px solid orange; padding: 3px; margin: 5px 13px 45px 0; float: left;" src="/blog/assets/static/img/rg1.png" alt="rg1" title="1.- Wine is centered as root for the visualization" />
<div style="clear:both"></div>

By clicking on <b>xbase-clients</b> you'll set this node as root:

<img style="border: 1px solid orange; padding: 3px; margin: 5px 13px 45px 0; float: left;" src="/blog/assets/static/img/rg2.png" alt="rg2" title="2.- Clicking in xbase-clients sets that node as root" />
<div style="clear:both"> </div>

Then, the visualization will query for <b>xbase-clients</b> dependencies, <em>morphing</em> its state into the new node's perspective:

<img style="border: 1px solid orange; padding: 3px; margin: 5px 13px 45px 0; float: left;" src="/blog/assets/static/img/rg3.png" alt="rg3" title="3.- The visualization queries for xbase-clients dependencies and morphs to the new data" />
<div style="clear:both"></div>

You can play with the example <a href="http://demos.thejit.org/example/rgraph/example1/">here</a>.

I'll explain how to build this in case you want your own at home.
I guess this is going to be also a nice tutorial on how to configure the <a href="http://thejit.org#rgraph">RGraph</a> visualization to run advanced examples, including the new <em>morphing</em> animations in version <a href="/blog/assets/jit.zip">1.0.7a</a>.

<h4>Server Side</h4>
Server side we need to build a service that can transform the <b>apt-rdepends</b> output for package dependencies into a <a href="/2008/04/27/feeding-json-tree-structures-to-the-jit/">JSON tree structure</a>.

The <b>apt-rdepends</b> is a linux tool (which you can install with <em>apt-get install apt-rdepends</em>) that displays a hierarchy of package dependencies for a given package. Here's an example when querying for <b>erlang</b>:

<img style="border: 1px solid orange; padding: 3px; margin: 5px 13px 45px 0; float: left;" src="/blog/assets/static/img/cmd1.png" alt="cmd1" title="erlang query" />
<div style="clear:both"></div>

You can either use <b>popen2</b> or <b>commands.getoutput</b> to fetch the output for a system call in Python, I'll do the latter.
The main function that makes the system call and returns the answer could be something like this:

{% highlight py %}
def get_dependency_tree(package=''):
    out = commands.getoutput("apt-rdepends " + package).split("\n")
    ans = []
    #if dependencies were found for this package.
    if len(out) > 3 and out[3].strip() == package:
        ans = out[3:]
    else:
        ans = [package]
    return make_tree(package=ans[0].strip(), source=ans, level=2)
{% endhighlight %}

The <b>make_tree</b> function will create the tree structure that will then be serialized into JSON to be processed client side.

We will first need a <b>make_tree_node</b> function that creates a tree node structure from a package's name:

{% highlight py %}
#returns a tree node
def make_tree_node(id, node_name):
    node_name = node_name.strip()
    return {
            'id': id,
            'name': node_name,
            'children': [],
            'data': []
    }
{% endhighlight %}

As you can see, this is the same tree node as the <a href="/2008/04/27/feeding-json-tree-structures-to-the-jit/">JSON tree structure</a> defined for the <a href="http://thejit.org">JIT</a>:
{% highlight js %}
var json = {
  "id": "aUniqueIdentifier",
  "name": "usually a nodes name",
  "data": [
      {key:"some key",       value: "some value"},
    {key:"some other key", value: "some other value"}
  ],
  children: [/* other nodes or empty */]
};
{% endhighlight %}

Our <b>make_tree</b> function will receive as formal parameters the root package, the response from the <b>apt-rdepends</b> call, an integer that will specify the max depth for the tree (in case we want to prune it to some level) and an id prefix that will be set for each node:

{% highlight py %}
def make_tree(package='', source=[], level=1, prefix=''):
    node = make_tree_node(package + '_' + prefix, package)
    if level > 0:
        deps = get_package_deps(package, source)
        [node['children'].append(make_tree(elem, source, level -1, package)) for elem in deps]
    return node
{% endhighlight %}

As you can see, <b>make_tree</b> recursively creates nodes and appends them to their parent <em>children</em> property.

Finally, I also made a <b>get_package_deps</b> function that retrieves all children for a given package, parsing <em>source</em>:
{% highlight py %}
def get_package_deps(package_name='', source=[]):
    ans, found_package_name = [], False
    #test if is a dependency line
    dependency = lambda package: package.strip().startswith('Depends:')
    for line in source:
        #package name line
        if not found_package_name and package_name == line.strip():
            found_package_name = True
        #it's a package dependency, add its name to the answer
        elif found_package_name and dependency(line):
            ans.append(line.split("Depends: ")[1].split("(")[0].strip())
        #end of dependency lines
        elif found_package_name and not dependency(line):
            return ans
    return ans

{% endhighlight %}

If you used <b>Django</b>, then you could expose your service in the <em>views.py</em> file like this:
{% highlight py %}
def apt_dependencies(request, mode, package):
    json = aptdependencies.get_dependency_tree(package)
    json_string = simplejson.dumps(json)
    return render_to_response('raw.html', { 'json' : json_string })
{% endhighlight %}

<h4>Client Side</h4>
All the <a href="http://thejit.org">JavaScript Infovis Toolkit</a> visualizations are customizable via <a href="/on-controllers">controller methods</a>.
If this is the first time you use this library, perhaps it would be better to start with the <a href="/rgraph-quick-tutorial/">RGraph quick tutorial</a> first.

First we define a simple <em>Log</em> object, that will write the current state of the graph to a label (like <em>loading...</em> or stuff like that).

I'll use <a href="http://mootools.net">Mootools</a>, but you can use whatever you want.

{% highlight js %}
var Log = {
  elem: false,
  getElem: function() {
    return this.elem? this.elem : this.elem = $('log');
  },

  write: function(text) {
    var elem = this.getElem();
    elem.set('html', text);
  }  
};
{% endhighlight %}

Then we can define an <em>init</em> function, that instanciates the RGraph object and returns it.
We will pass a controller to this object, that implements the <b>onBeforeCompute</b>, <b>onAfterCompute</b>, <b>onPlaceLabel</b> and <b>onCreateLabel</b> methods.
I'll also define some utility methods, like <b>requestGraph</b> and <b>preprocessTree</b>:

{% highlight js %}
function init() {
  //Set node radius to 3 pixels.
  Config.nodeRadius = 3;

  //Create a canvas object.
  var canvas= new Canvas('infovis', '#ccddee', '#772277');

  //Instanciate the RGraph
  var rgraph= new RGraph(canvas,  {
  //Here will be stored the
  //clicked node name and id
    nodeId: "",
    nodeName: "",

    //Refresh the clicked node name
  //and id values before computing
  //an animation.
  onBeforeCompute: function(node) {
      Log.write("centering " + node.name + "...");
    this.nodeId = node.id;
      this.nodeName = node.name;
    },
    
  //Add a controller to assign the node's name
  //and some extra events to the created label.  
    onCreateLabel: function(domElement, node) {
      var d = $(domElement);
      d.setOpacity(0.6).set('html', node.name).addEvents({
        'mouseenter': function() {
          d.setOpacity(1);
        },
        'mouseleave': function() {
          d.setOpacity(0.6);
        },
        'click': function() {
        if(Log.elem.innerHTML == "done") rgraph.onClick(d.id);
        }
      });
    },
    
  //Once the label is placed we slightly
  //change the positioning values in order
  //to center or hide the label
    onPlaceLabel: function(domElement, node) {
    var d = $(domElement);
    d.setStyle('display', 'none');
     if(node._depth &lt;= 1) {
      d.set('html', node.name).setStyles({
        'width': '',
        'height': '',
        'display':''        
      }).setStyle('left', (d.getStyle('left').toInt() 
        - domElement.offsetWidth / 2) + 'px');
    } 
  },
  
  //Once the node is centered we
  //can request for the new dependency
  //graph.
  onAfterCompute: function() {
    Log.write("done");
    this.requestGraph();
  },

  //We make our call to the service in order
  //to fetch the new dependency tree for
  //this package.
     requestGraph: function() {
      var that = this, id = this.nodeId, name = this.nodeName;
      Log.write("requesting info...");
      var jsonRequest = new Request.JSON({
        'url': '/service/apt-dependencies/tree/' 
          + encodeURIComponent(name) + '/',

        onSuccess: function(json) {
          Log.write("morphing...");
        //Once me received the data
        //we preprocess the ids of the nodes
        //received to match existing nodes
        //in the graph and perform a morphing
        //operation.
          that.preprocessTree(json);
        GraphOp.morph(rgraph, json, {
            'id': id,
            'type': 'fade',
            'duration':2000,
            hideLabels:true,
            onComplete: function() {
            Log.write('done');
          },
            onAfterCompute: $empty,
            onBeforeCompute: $empty
          });
        },

        onFailure: function() {
          Log.write("sorry, the request failed");
        }
      }).get();
    },

  //This method searches for nodes that already
  //existed in the visualization and sets the new node's
  //id to the previous one. That way, all existing nodes
  //that exist also in the new data won't be deleted.
   preprocessTree: function(json) {
      var ch = json.children;
      var getNode = function(nodeName) {
        for(var i=0; i&lt;ch.length; i++) {
          if(ch[i].name == nodeName) return ch[i];
        }
        return false;
      };
      json.id = rgraph.root;
    var root = rgraph.graph.getNode(rgraph.root);
      GraphUtil.eachAdjacency(root, function(elem) {
        var nodeTo = elem.nodeTo, jsonNode = getNode(nodeTo.name);
        if(jsonNode) jsonNode.id = nodeTo.id;
      });
    }
    
  });
  
  return rgraph;
}

{% endhighlight %}

I <b>did say</b> <em>advanced example</em>.
You can always go to a simpler example to begin <a href="/rgraph-quick-tutorial/">here</a>.

Finally we have to initialize the visualization when the page loads, so we'll attach an initialization function like this:

{% highlight js %}
window.addEvent('domready', function() {
  var rgraph = init();
  new Request.JSON({
      'url':'/service/apt-dependencies/tree/wine/',
      onSuccess: function(json) {
        //load wine dependency tree.
       rgraph.loadTreeFromJSON(json);
        //compute positions
        rgraph.compute();
        //make first plot
        rgraph.plot();
        Log.write("done");
        rgraph.controller.nodeName = name;
      },
      
      onFailure: function() {
        Log.write("failed!");
      }
  }).get();
{% endhighlight %}

<h4>HTML and CSS</h4>
These are the HTML and CSS files I used to make this example/tutorial.
The HTML:

{% highlight html %}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>
  
Linux package dependency visualizer

</title>
<link type="text/blog/css" href="/static/blog/css/style.css" rel="stylesheet" />
<script type="text/javascript" src="/static/js/mootools-1.2.js"></script>

<!--[if IE]>
<script language="javascript" type="text/javascript" src="/static/js/excanvas.js"></script>
<![endif]-->
<script language="javascript" type="text/javascript" src="/static/js/core/RGraph.js"></script>
<script language="javascript" type="text/javascript" src="/static/js/example/example-rgraph.js"></script>

</head>

<body onload="">

<canvas id="infovis" width="900" height="500"></canvas>
<div id="label_container"></div>

</body>
</html>
<div id="log"></div>
{% endhighlight %}
<b>Note:</b> You'll probably have to change the path to the CSS and JavaScript files.

and the CSS file:

{% highlight css %}
html,body {
  width:100%;
  height:100%;
  margin:0;padding:0;
  background-color:#333;
  text-align:center;
  font-size:0.94em;
  font-family:"Trebuchet MS",Verdana,sans-serif;
}

#infovis {
  width:900px;
  height:500px;
  background-color:#222;

}

.node {
  color: #fff;
  background-color:#222;
  font-weight:bold;
  padding:1px;
  cursor:pointer;
  font-size:0.8em;
}

.hidden {
  display:none;
}
{% endhighlight %}

<h4>Remarks</h4>
Although still in alpha, the <a href="http://thejit.org">JavaScript Infovis Toolkit</a> can be used to perform advanced animations, customizing your visualization via a controller and not messing with the code.
This example also shows that it can be used to do more advanced things that only plotting static animations, interacting with services and handling pretty well visualizations where the dataset changes over time.
You can download the library <a href="/blog/assets/jit.zip" target="_blank">here</a>, latest version is 1.0.7a.
You can also go to the <a href="http://thejit.org">main project page</a> to know more.

Hope it was useful.
Feel free to post any comment or questions.
Bye!
