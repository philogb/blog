var Log = {
	elem: $('log'),
	write: function(text) {
		if(!this.elem) this.elem = $('log');
		this.elem.set('html', text);
	}
};

function init() {
	//computes page layout (not a library function, used to adjust some css thingys on the page)
	Infovis.initLayout();
    //Get width and height properties from the main container.
      var infovis = $('infovis');
      var w = infovis.offsetWidth, h = infovis.offsetHeight;
      var fStyle, sStyle, lineWidth;
	  //Create random generated tree.
	  var json= Feeder.makeTree();
      //Create a new canvas instance.
      var canvas = new Canvas('mycanvas', {
        //Where to inject canvas. Any HTML container will do.
		'injectInto':'infovis',
        //Set width and height, default's to 200.
		'width':w,
        'height':h,
		//Set a background color in case the browser
		//does not support clearing a specific area.
        'backgroundColor': '#222',
        'styles': {
            'fillStyle': '#ccb',
            'strokeStyle': '#ccb'
        }   
      });
	  //Create a new ST instance
	  var st= new ST(canvas, {
		onBeforeCompute: function(node) {
				Log.write("loading " + node.name);
		},
		
		onAfterCompute: function() {
			Log.write("done");
		},
			
		request: function(nodeId, level, onComplete) {
			Feeder.request(nodeId, level, onComplete);
		},
		//Add an event handler to the node when creating it.
        onCreateLabel: function(label, node) {
            var d = $(label);
            label.id = node.id;
            d.setStyle('cursor', 'pointer').set('html', node.name)
			 .addEvent('click', function() {
                st.onClick(d.id);
            });
        },
        //Set color as selected if the node is selected.
        onBeforePlotNode: function(node) {
            var ctx = canvas.getCtx();
            fStyle = ctx.fillStyle;
            sStyle = ctx.strokeStyle;
            if(node.selected) {
                ctx.fillStyle = "#ff7";
                ctx.strokeStyle = "#eed";
            }
        },
        //Restore color.       
        onAfterPlotNode: function(node) {
            var ctx = canvas.getCtx();
            ctx.fillStyle = fStyle;
            ctx.stroleStyle = sStyle;
        },
        //Set color as selected if the edge belongs to the path.
        onBeforePlotLine: function(adj) {
            var ctx = canvas.getCtx();
            lineWidth = ctx.lineWidth;
            sStyle = ctx.strokeStyle;
            if(adj.nodeFrom.selected && adj.nodeTo.selected) {
                ctx.strokeStyle = "#eed";
                ctx.lineWidth = 3;
            }
        },
        //Restore color and line width
        onAfterPlotLine: function(adj) {
            var ctx = canvas.getCtx();
            ctx.lineWidth = lineWidth;
            ctx.stroleStyle = sStyle;
        }

	  });
	  //load json data
	  st.loadFromJSON(json);
	  //compute node positions and layout
	  st.compute();
	  //optional: make a translation of the tree
	  Tree.Geometry.translate(st.tree, new Complex(-200, 0), "startPos");
	  //Emulate a click on the root node.
	  st.onClick(st.tree.id);
	  
      //Add input handler to switch spacetree orientation.
      var select = $('switch').addEvent('change', function() {
        var index = select.selectedIndex;
        var or = select.options[index].text;
        select.disabled = true;
        st.switchPosition(or, {
            onComplete: function() {
                select.disabled = false;
            }
        });
      });
}

//Just a random tree generator. This code is pretty ugly and not useful to read at all.
//The only thing that does is to provide a random JSON tree with the specified depth level.
var Feeder = {
	counter:0,
	
	p: {
		idPrefix: "node",
		levelStart: 0,
		levelEnd: 3,
		maxChildrenPerNode: 5,
		counter: 0
	},
	
	makeTree: function () {
		var le = this.p.levelEnd;
		if(le == 0) return {children: []};
		this.counter = 1;
		return this.makeTreeWithParameters(this.p.idPrefix,
										   this.p.levelStart,
										   this.p.levelEnd, 
										   this.p.maxChildrenPerNode);
	},
	
	makeTreeWithParameters: function(idPrefix, levelStart, levelEnd, maxChildrenPerNode) {
		if(levelStart == levelEnd) return null;
		this.counter++;
		var numb = Math.floor(Math.random() * 10) + 1;
		var numb2 = Math.floor(Math.random() * 200 - 100);
		var ans= {
			id:   idPrefix + levelStart + this.counter,
			name: levelStart + "." + this.counter,
			data: [
				{key: 'key1', value: numb},
				{key: 'key2', value: numb2}
			],
			children: []
		};
		var childCount= Math.floor(Math.random() * maxChildrenPerNode) + 1;
		if(childCount == 1 && levelStart == 0) childCount++;
		levelStart++;
		for(var i=0; i<childCount; i++) {
			var ch= this.makeTreeWithParameters(idPrefix, levelStart, levelEnd, maxChildrenPerNode);
			if(ch != null) ans.children[i]=ch;
		}
		return ans;
   },
  
   request: function (nodeId, level, onComplete) {
   		this.p.idPrefix = nodeId;
   		this.p.levelEnd = level + 1;
   		var json = this.makeTree();
   		onComplete.onComplete(nodeId, json);
   }
};
