/*
 * File: Core.js
 * 
 * Author: Nicolas Garcia Belmonte
 * 
 * Copyright: Copyright 2008-2009 by Nicolas Garcia Belmonte.
 * 
 * License: BSD License
 * 
 * Homepage: <http://thejit.org>
 * 
 * Version: 1.0.8a
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the organization nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY Nicolas Garcia Belmonte ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL Nicolas Garcia Belmonte BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */

/*
   Object: $_

   Provides some common utility functions.
*/
var $_ = {
	empty: function() {},
	
	fn: function(val) { return function() { return val; }; },

	merge: function(){
		var mix = {};
		for (var i = 0, l = arguments.length; i < l; i++){
			var object = arguments[i];
			if (typeof object != 'object') continue;
			for (var key in object){
				var op = object[key], mp = mix[key];
				mix[key] = (mp && typeof op == 'object' && typeof mp == 'object') ? this.merge(mp, op) : this.unlink(op);
			}
		}
		return mix;
	},

	unlink: function (object){
		var unlinked = null;
		if(this.isArray(object)) {
				unlinked = [];
				for (var i = 0, l = object.length; i < l; i++) unlinked[i] = this.unlink(object[i]);
		} else if(this.isObject(object)) {
				unlinked = {};
				for (var p in object) unlinked[p] = this.unlink(object[p]);
		} else return object;

		return unlinked;
	},
	
	isArray: function(obj) {
		return obj && obj.constructor && obj.constructor.toString().match(/array/i);
	},
	
	isString: function(obj) {
		return obj && obj.constructor && obj.constructor.toString().match(/string/i);
	},
	
	isObject: function(obj) {
		return obj && obj.constructor && obj.constructor.toString().match(/object/i);
	}
} ;
/*
 * File: Canvas.js
 * 
 * Author: Nicolas Garcia Belmonte
 * 
 * Copyright: Copyright 2008-2009 by Nicolas Garcia Belmonte.
 * 
 * License: BSD License
 * 
 * Homepage: <http://thejit.org>
 * 
 * Version: 1.0.8a
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the organization nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY Nicolas Garcia Belmonte ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL Nicolas Garcia Belmonte BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */


/*
   Class: Canvas

   A multi-purpose Canvas object decorator.
*/
var Canvas = (function () {
	var ctx, bkctx, mainContainer, labelContainer, canvas, bkcanvas;
	var config = {
		'injectInto': 'id',
		
		'width':200,
		'height':200,
		
		'backgroundColor':'#333333',
		
		'styles': {
			'fillStyle':'#000000',
			'strokeStyle':'#000000'
		},
		
		'backgroundCanvas': false
	};
	
	function hasCanvas() {
		hasCanvas.t = hasCanvas.t || typeof(HTMLCanvasElement);
		return "function" == hasCanvas.t || "object" == hasCanvas.t;
	};
	
	function create(tag, prop, styles) {
		var elem = document.createElement(tag);
		(function(obj, prop) {
			if(prop) for (var p in prop) obj[p] = prop[p];
			return arguments.callee;
		})(elem, prop)(elem.style, styles);
		 //feature check
		 if(tag == "canvas" && !hasCanvas() && G_vmlCanvasManager) {
			elem = G_vmlCanvasManager.initElement(
				document.body.appendChild(elem));
		 }
		 	
		return elem;
	};
	
	function get(id) {
		return document.getElementById(id);
	};
	
	function translateToCenter(canvas, ctx, w, h) {
		var width = w? (w - canvas.width) : canvas.width;
		var height = h? (h - canvas.height) : canvas.height;
		ctx.translate(width / 2, height / 2);
	};
	
	/*
	   Constructor: Canvas
	
	   Canvas constructor.
	
	   Parameters:
	
	      id - The canvas tag id.
	      opt - configuration object, possible parameters are:
	      - *injectInto* id for the container of the canvas.
	      Canvas object will be appended to the object specified by this id.
	      - *width* canvas width, default's 200
	      - *height* canvas height, default's 200
	      - *backgroundColor* used for background color when clipping in IE
	      - *styles* an object containing canvas style properties. See <https://developer.mozilla.org/en/Canvas_tutorial/Applying_styles_and_colors>
		  - *backgroundCanvas* an object containing configuration properties for a background canvas.
		  
		  A possible configuration object could be defined as:
		  (start code)
			var config = {
				'injectInto': 'id',
				
				'width':200,
				'height':200,
				
				'backgroundColor':'#333333',
				
				'styles': {
					'fillStyle':'#000000',
					'strokeStyle':'#000000'
				},
				
				'backgroundCanvas': false
			};
		  (end code)
		  
		  More information in <http://blog.thejit.org>.

	   Returns:
	
	      A new Canvas instance.
	*/
	return function(id, opt) {
		if(arguments.length < 1) throw "Arguments missing";
		var idLabel = id + "-label", idCanvas = id + "-canvas", idBCanvas = id + "-bkcanvas";
		opt = $_.merge(config, opt || {});
		//create elements
		var dim = { 'width': opt.width, 'height': opt.height };
		mainContainer = create("div", { 'id': id }, $_.merge(dim, { 'position': 'relative' }));
		labelContainer = create("div", { 'id': idLabel }, { 
			'overflow': 'visible',
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'width': dim.width + 'px',
			'height': 0
		});
		var dimPos = {
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'width': dim.width + 'px',
			'height': dim.height + 'px'
		};
		canvas = create("canvas", $_.merge({ 'id': idCanvas }, dim), dimPos);
		var bc = opt.backgroundCanvas;
		if(bc) {
			bkcanvas = create("canvas", $_.merge({ 'id': idBCanvas }, dim), dimPos);
			//append elements
			mainContainer.appendChild(bkcanvas);
		}
		mainContainer.appendChild(canvas);
		mainContainer.appendChild(labelContainer);
		get(opt.injectInto).appendChild(mainContainer);
		
		//create contexts
		ctx = canvas.getContext('2d');
		translateToCenter(canvas, ctx);
		var st = opt.styles;
		for(var s in st) ctx[s] = st[s];
		if(bc) {
			bkctx = bkcanvas.getContext('2d');
			var st = bc.styles;
			for(var s in st) bkctx[s] = st[s];
			translateToCenter(bkcanvas, bkctx);
			bc.impl.init(bkcanvas, bkctx);
			bc.impl.plot(bkcanvas, bkctx);
		}
		//create methods
		return {
			'id': id,
			/*
			   Method: getCtx
			
			   Returns:
			
			      Main canvas context.
			*/
			getCtx: function() {
				return ctx;
			},

			/*
			   Method: getElement
			
			   Returns:
			
			      DOM canvas wrapper generated. More information
			      about this can be found in the post <http://blog.thejit.org>
			*/
			getElement: function() {
				return mainContainer;
			},
			
			/*
			   Method: resize
			
			   Resizes the canvas.
			
			   Parameters:
			
			      width - New canvas width.
			      height - New canvas height.
			
			*/
			resize: function(width, height) {
				(function(canvas, ctx) {
					translateToCenter(canvas, ctx, width, height);
					canvas.width = width;
					canvas.height = height;
					return arguments.callee;
				})(canvas, ctx)(bkcanvas, bkctx);
			},
			
			/*
			   Method: getSize
			
			   Returns canvas dimensions.
			
			   Returns:
			
			      An object with _width_ and _height_ properties.
			*/
			getSize: function() {
				return { 'width': canvas.width, 'height': canvas.height };
			},
			
			/*
			   Method: path
			   
			  Performs a _beginPath_ executes _action_ doing then a _type_ ('fill' or 'stroke') and closing the path with closePath.
			*/
			path: function(type, action) {
				ctx.beginPath();
				action(ctx);
				ctx[type]();
				ctx.closePath();
			},
			
			/*
			   Method: clear
			
			   Clears the canvas object.
			*/		
			clear: function () {
				var size = this.getSize();
				ctx.clearRect(-size.width / 2, -size.height / 2, size.width, size.height);
			},
			
			/*
			   Method: clearReactangle
			
			   Same as <clear> but only clears a section of the canvas.
			   
			   Parameters:
			   
			   	top - An integer specifying the top of the rectangle.
			   	right -  An integer specifying the right of the rectangle.
			   	bottom - An integer specifying the bottom of the rectangle.
			   	left - An integer specifying the left of the rectangle.
			*/		
			clearRectangle: function (top, right, bottom, left) {
				//if using excanvas
				if(!hasCanvas()) {
					var f0 = ctx.fillStyle;
					ctx.fillStyle = opt.backgroundColor;
					ctx.fillRect(left, top, right - left, bottom - top);
					ctx.fillStyle = f0;
				} else {
					//TODO absolutely arbitraty offsets!
					ctx.clearRect(left, top -2, right - left +2, Math.abs(bottom - top) +5);
				}
			},
			
			/*
			   Method: makeRect
			
			   Draws a rectangle in canvas.
			
			   Parameters:
			
			      mode - A String sepecifying if mode is "fill" or "stroke".
			      pos - A set of two coordinates specifying top left and bottom right corners of the rectangle.
			*/
			makeRect: function(pos, mode) {
				if(mode == "fill" || mode == "stroke") {
					ctx[mode + "Rect"](pos.x1, pos.y1, pos.x2, pos.y2);
				} else throw "parameter not recognized " + mode;
			}
			
		};
	};
	
})();
/*
 * File: Spacetree.js
 * 
 * Author: Nicolas Garcia Belmonte
 * 
 * Copyright: Copyright 2008-2009 by Nicolas Garcia Belmonte.
 * 
 * License: BSD License
 * 
 * Homepage: <http://thejit.org>
 * 
 * Version: 1.0.8a
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the organization nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY Nicolas Garcia Belmonte ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL Nicolas Garcia Belmonte BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */


/*
   Object: Config

   <ST> global configuration object. Contains important properties to enable customization and proper behavior for the <ST>.
*/

var Config= {
	//Property: orientation
	//Sets the orientation layout. Implemented orientations are _left_ (the root node will be placed on the left side of the screen), _top_ (the root node will be placed on top of the screen), _bottom_ and _right_.
	orientation: "left",
	//Property: labelContainer
	//The id for the label container. The label container should be a div dom element where label div dom elements will be injected. You have to put the label container div dom element explicitly on your page to run the <ST>.
	labelContainer: 'label_container',
	//Property: levelsToShow
	//Depth of the plotted tree. The plotted tree will be pruned in order to fit with the specified depth. Useful when using the "request" method on the controller.
	levelsToShow: 2,
	//Property: offsetBase
	//Separation offset between nodes.
	offsetBase:	8,
	//Property: Label
	//Configuration object to customize labels size and offset.		
	Label: {
		//Property: height
		//Label height (offset included)
		height:       26,
		//Property: realHeight
		//Label realHeight (offset excluded)
		realHeight:   20,			
		//Property: width
		//Label width (offset included)
		width:        95,
		//Property: realWidth
		//Label realWidth (offset excluded)
		realWidth:    90,
		//Property: offsetHeight
		//Used on the currently expanded subtree. Adds recursively offsetHeight between nodes for each expanded level.
		offsetHeight: 30,
		//Property: offsetWidth
		//Used on the currently expanded subtree. Adds recursively offsetWidth between nodes for each expanded level.
		offsetWidth:  30
	},
	//Property: Node
	//Configuration object to customize node styles. Use <Config.Label> to configure node width and height.
	Node: {
		//Property: mode
		//If setted to "stroke" only the boundary of the node will be plotted. If setted to fill, each node will be plotted with a background - fill.
		mode: 'fill' //stroke or fill
	},
	//Property: animationTime
	//Time for the animation.
	animationTime: 700,
	//Property: fps
	//Animation frames per second.
	fps: 25
};

/*
   Class: Complex
	
	 A multi-purpose Complex Class with common methods.

*/


/*
   Constructor: Complex

   Complex constructor.

   Parameters:

      re - A real number.
      im - An real number representing the imaginary part.


   Returns:

      A new Complex instance.
*/
var Complex= function() {
	this.x= arguments[0] || 0;
	this.y= arguments[1] || 0;
};

Complex.prototype= {
	/*
	   Method: clone
	
	   Returns a copy of the current object.
	
	   Returns:
	
	      A copy of the real object.
	*/
	clone: function() {
		return new Complex(this.x, this.y);
	},

	/*
	   Method: norm
	
	   Calculates the complex norm.
	
	   Returns:
	
	      A real number representing the complex norm.
	*/
	norm: function () {
		return Math.sqrt(this.squaredNorm());
	},
	
	/*
	   Method: squaredNorm
	
	   Calculates the complex squared norm.
	
	   Returns:
	
	      A real number representing the complex squared norm.
	*/
	squaredNorm: function () {
		return this.x*this.x + this.y*this.y;
	},

	/*
	   Method: add
	
	   Returns the result of adding two complex numbers.
	   Does not alter the original object.

	   Parameters:
	
	      pos - A Complex initialized instance.
	
	   Returns:
	
	     The result of adding two complex numbers.
	*/
	add: function(pos) {
		return new Complex(this.x + pos.x, this.y + pos.y);
	},

	/*
	   Method: prod
	
	   Returns the result of multiplying two complex numbers.
	   Does not alter the original object.

	   Parameters:
	
	      pos - A Complex initialized instance.
	
	   Returns:
	
	     The result of multiplying two complex numbers.
	*/
	prod: function(pos) {
		return new Complex(this.x*pos.x - this.y*pos.y, this.y*pos.x + this.x*pos.y);
	},

	/*
	   Method: conjugate
	
	   Returns the conjugate for this complex.
	   Does not alter the original object.

	   Returns:
	
	     The conjugate for this complex.
	*/
	conjugate: function() {
		return new Complex(this.x, -this.y);
	},


	/*
	   Method: scale
	
	   Returns the result of scaling a Complex instance.
	   Does not alter the original object.

	   Parameters:
	
	      factor - A scale factor.
	
	   Returns:
	
	     The result of scaling this complex to a factor.
	*/
	scale: function(factor) {
		return new Complex(this.x * factor, this.y * factor);
	},

	/*
	   Method: $add
	
	   Returns the result of adding two complex numbers.
	   Alters the original object.

	   Parameters:
	
	      pos - A Complex initialized instance.
	
	   Returns:
	
	     The result of adding two complex numbers.
	*/
	$add: function(pos) {
		this.x += pos.x; this.y += pos.y;
		return this;	
	},
	
	/*
	   Method: $prod
	
	   Returns the result of multiplying two complex numbers.
	   Alters the original object.

	   Parameters:
	
	      pos - A Complex initialized instance.
	
	   Returns:
	
	     The result of multiplying two complex numbers.
	*/
	$prod:function(pos) {
		var x = this.x, y = this.y
		this.x = x*pos.x - y*pos.y;
		this.y = y*pos.x + x*pos.y;
		return this;
	},
	
	/*
	   Method: $conjugate
	
	   Returns the conjugate for this complex.
	   Alters the original object.

	   Returns:
	
	     The conjugate for this complex.
	*/
	$conjugate: function() {
		this.y = -this.y;
		return this;
	},
	
	/*
	   Method: $scale
	
	   Returns the result of scaling a Complex instance.
	   Alters the original object.

	   Parameters:
	
	      factor - A scale factor.
	
	   Returns:
	
	     The result of scaling this complex to a factor.
	*/
	$scale: function(factor) {
		this.x *= factor; this.y *= factor;
		return this;
	},
	
	/*
	   Method: $div
	
	   Returns the division of two complex numbers.
	   Alters the original object.

	   Parameters:
	
	      pos - A Complex number.
	
	   Returns:
	
	     The result of scaling this complex to a factor.
	*/
	$div: function(pos) {
		var x = this.x, y = this.y;
		var sq = pos.squaredNorm();
		this.x = x * pos.x + y * pos.y; this.y = y * pos.x - x * pos.y;
		return this.$scale(1 / sq);
	}
};

/*
   Class: Tree
	
	 Provides packages with useful methods for tree manipulation.

*/


/*
   Constructor: Tree

   Tree constructor. Enhances the json tree object with some special properties.

   Parameters:

      json - A json tree object.

*/
var Tree = function(json) {
	(function(json, _parent) {
		Tree.Node(json, _parent);
		for(var i=0; i<json.children.length; i++) {
			arguments.callee(json.children[i], json);
		}
	})(json, null);
};

/*
   Class: Tree.Node
	
	 Enhances the json tree node with special properties.

*/


/*
   Constructor: Tree.Node

   Tree.Node constructor.

   Parameters:

      json - A json tree object.
      parent - The nodes parent node.

*/
Tree.Node = function (json, _parent) {
	//Property: selected
	//sets the node as selected.
	json.selected= false;
	//Property: drawn
	//sets the node as visible or not. (as in CSS visibility:hidden)
	json.drawn= false;
	//Property: exist
	//treats the node as if it existed or not (somewhat similar to CSS display:none)
	json.exist= false;
	//Property: _parent
	//Node parent.
	json._parent= _parent;
	//Property: pos
	//Node position
	json.pos= new Complex(0, 0);
	//Property: startPos
	//node from position
	json.startPos= new Complex(0, 0);
	//Property: endPos
	//node to position
	json.endPos= new Complex(0, 0);
	//Property: startAlpha
	//not being used by the moment.	
	json.startAlpha = 1;
	//Property: endAlpha
	//not being used by the moment.	
	json.endAlpha = 1;
	//Property: alpha
	//not being used by the moment.	
	json.alpha = 1;

};


/*
   Object: Tree.Util
	
	 Provides iterators and utility methods for trees.

*/
Tree.Util = {
	/*
	   Method: set
	
	   To set multiple values to multiple properties of a tree node.
	*/
	set: function(tree, props, value) {
		if(typeof props == 'object')
			for(var prop in props) {
				tree[prop] = props[prop];
			}
		else if(typeof props == 'array')
			for(var i=0; i<props.length; i++) {
				tree[props[i]] = value;
			}
		else tree[props] = value;
	},
	
	/*
	   Method: addSubtree
	
		Makes a proper <Tree> object from a Tree JSON structure and inserts it where specified by _id_.
	
	   Parameters:
	      tree - A tree object.
	      id - A node identifier where this subtree will be appended. If the root of the appended subtree and the id match, then it will append the subtree children to the node specified by _id_
		  subtree - A JSON Tree object.

	   Returns:
	
	   The transformed and appended subtree.
	*/
	addSubtree: function(tree, id, subtree) {
		var s = this.getSubtree(tree, id);
		Tree(subtree);
		if(id == subtree.id) {
			s.children = s.children.concat(subtree.children);
			Tree.Children.each(s, function(ch) {
				ch._parent = s;
			});
		} else {
			s.children.push(subtree);
			subtree._parent = s;
		}
		return subtree;
	},
	
	/*
	   Method: removeSubtree
	
		Deletes a subtree completely.
	
	   Parameters:
	      tree - A tree object.
	      id - The root node to be deleted.
		  removeRoot - A boolean indicating if the root node of the subtree must be also removed.
	*/
	removeSubtree: function(tree, id, removeRoot) {
		var s = this.getSubtree(tree, id);
		var p = s._parent;
		if(!removeRoot) {
			delete s.children;
			s.children = [];
		} else {
			var newChildren = new Array();
			Tree.Children.each(p, function(ch) {
				if(id != ch.id) newChildren.push(ch);
			});
			p.children = newChildren;
		}
	},


	/*
	   Method: each
	
	   Iterates over tree nodes performing an action.
	*/
	each: function(tree, action) {
		this.eachLevel(tree, 0, Number.MAX_VALUE, action);
	},
	
	/*
	   Method: eachLevel
	
	   Iterates over tree nodes to a certain tree level performing an action.
	*/
	eachLevel: function(tree, levelBegin, levelEnd, action) {
		if(levelBegin <= levelEnd) {
			action(tree, levelBegin);
			for(var i=0, ch=tree.children; i<ch.length; i++) {
				this.eachLevel(ch[i], levelBegin +1, levelEnd, action);	
			}
		}
	},
	/*
	   Method: atLevel
	
	   Iterates over tree nodes from a sepecified level performing an action.
	*/
	atLevel: function(tree, level, action) {
		this.eachLevel(tree, 0, level, function (elem, i) {
			if(i == level) action(elem);
		});
	},
	
	/*
	   Method: getLevel
	
	   Returns the current level of the tree node.
	*/
	getLevel: function(tree) {
		var getLevelHandle= function(tree, level) {
			if (tree._parent == null) 
				return level;
			else 
				return getLevelHandle(tree._parent, level +1);
		};
		return getLevelHandle(tree, 0);
	},

	/*
	   Method: getRoot
	
	   Returns the tree root node.
	*/
	getRoot: function(tree) {
		if(tree._parent == null) return tree;
		return this.getRoot(tree._parent);
	},

	/*
	   Method: getLeaves
	
	   Returns an array of the tree leaves.
	*/
	getLeaves: function(tree) {
		var leaves = new Array();
		this.eachLevel(tree, 0, Config.levelsToShow, function(elem, i) {
			if(elem.drawn && !Tree.Children.children(elem, 'exist')) {
				leaves.push(elem);
				elem._level = Config.levelsToShow - i;
			}
		});
		return leaves;
	},

	/*
	   Method: getSubtree
	
	   Returns the subtree of the node with specified id or null if it doesn't find it. 
	*/
	getSubtree: function(tree, id) {
		var ans = null;
		this.each(tree, function(elem) {
			if(elem.id == id) ans = elem;
		});
		return ans;
	}
};

/*
   Object: Tree.Children
	
	 Provides iterators and utility methods for tree children.

*/
Tree.Children = {
	/*
	   Method: each
	
	   Iterates over a nodes children performing an _action_. 
	*/
	each: function(tree, action) {
		for(var i=0, ch=tree.children; i<ch.length; i++) action(ch[i]);
	},
	
	/*
	   Method: children
	
	   Returns true if the current node has at least one node with _property_ set to true. 
	*/
	children: function(tree, property) {
		for(var i=0, ch=tree.children; i<ch.length; i++) 
			if(!property || ch[i][property]) return true;
		return false;
	},

	/*
	   Method: getChildren
	
	   Returns a filtered array of children for the current node. 
	*/
	getChildren: function(tree, property) {
		for(var i=0, ans=new Array(), ch=tree.children; i<ch.length; i++) 
			if(!property || ch[i][property]) ans.push(ch[i]);
		return ans;
	},		
	
	/*
	   Method: getLength
	
	   Returns the length of a filtered children array. 
	*/
	getLength: function(tree, property) {
		if(!property) return tree.children.length;
		for(var i=0, j= 0, ch= tree.children; i<ch.length; i++) if(ch[i][property]) j++;	
		return j;
	}

};

/*
   Object: Tree.Group
	
	 Performs operations on group of nodes.

*/
Tree.Group = {
	/*
	   Method: requestNodes
	
	   Calls the request method on the controller to request a subtree for each node. 
	*/
	requestNodes: function(nodes, controller) {
		var counter = 0, len = nodes.length, nodeSelected = {};
		var complete = function() { controller.onComplete(); };
		if(len == 0) complete();
		for(var i=0; i<len; i++) {
			nodeSelected[nodes[i].id] = nodes[i];
			controller.request(nodes[i].id, nodes[i]._level, {
				onComplete: function(nodeId, data) {
					if(data && data.children) {
						Tree(data);
						for(var j=0, ch=data.children; j<ch.length; j++) {
							ch[j]._parent = nodeSelected[nodeId];
						}
						nodeSelected[nodeId].children = data.children;
					}
					if(++counter == len) {
						complete();
					}
				}
			});
		}
	},
	/*
	   Method: hide
	
	   Collapses group of nodes. 
	*/
	hide: function(nodes, canvas, controller) {
		nodes = this.getNodesWithChildren(nodes);
		var ctx= canvas.getCtx();
		
		for(var i=0; i<nodes.length; i++)
			Tree.Children.each(nodes[i], function(elem) {
				Tree.Plot.hideLabels(elem, true);
			});
		
		ctx.save();
		var animationController = {
			compute: function(delta) {
			  for(var i=0; i<nodes.length; i++) {
			    ctx.save();
			  	var node= nodes[i];
			    var bb= Tree.Geometry.getBoundingBox(node);
		        canvas.clearRectangle(bb.top, bb.right, bb.bottom, bb.left);
			  	if(delta == 1) delta = .99;
		  		Tree.Plot.plot({
					tree: node,
					canvas: canvas
				}, controller, 1 - delta);
				ctx.restore();
			  }
			},
			
			complete: function() {
				ctx.restore();
				for(var i=0; i<nodes.length; i++) {
					if(!controller || !controller.request) {
						if(Tree.Children.children(nodes[i], 'exist')) {
							Tree.Util.each(nodes[i], function(elem) {
								Tree.Util.set(elem, {
									'drawn':false,
									'exist':false
								});
							});
							Tree.Util.set(nodes[i], {
								'drawn':true,
								'exist':true
							});
						}						
					} else {
						delete nodes[i].children;
						nodes[i].children = [];
					}
				}
				
				controller.onComplete();
			}		
		};

		Animation.controller = animationController;
		Animation.start();
	},

	/*
	   Method: show
	
	   Expands group of nodes. 
	*/
	show: function(nodes, canvas, controller) {
		nodes = this.getNodesWithChildren(nodes), newNodes = new Array();
		var ctx= canvas.getCtx();
		for(var i=0; i<nodes.length; i++)
			if(!Tree.Children.children(nodes[i], 'drawn')) {
				newNodes.push(nodes[i]);
				Tree.Util.eachLevel(nodes[i], 0, Config.levelsToShow, function(elem) {
					if(elem.exist) elem.drawn = true;
				});
			}
		nodes = newNodes;		
		ctx.save();
		var animationController = {
			compute: function(delta) {
			  for(var i=0; i<nodes.length; i++) {
			    ctx.save();
			  	var node= nodes[i];
			    var bb= Tree.Geometry.getBoundingBox(node);
		        canvas.clearRectangle(bb.top, bb.right, bb.bottom, bb.left);
			  	Tree.Plot.plot({
					tree: node,
					canvas: canvas
				}, controller, delta);
				ctx.restore();
			  }
			},
			
			complete: function() {
				ctx.restore();
			  	for(var i=0; i<nodes.length; i++) {
				  	var node= nodes[i];
				    var bb= Tree.Geometry.getBoundingBox(node);
			        canvas.clearRectangle(bb.top, bb.right, bb.bottom, bb.left);
				  	Tree.Plot.plot({
						tree: node,
						canvas: canvas
					}, controller);
				}
				controller.onComplete();
			}		
		};

		Animation.controller = animationController;
		Animation.start();
	},
	/*
	   Method: getNodesWithChildren
	
	   Filters an array of nodes leaving only nodes with children.
	*/
	getNodesWithChildren: function(nodes) {
		var ans = new Array();
		for(var i=0; i<nodes.length; i++) {
			if(Tree.Children.children(nodes[i], 'exist')) ans.push(nodes[i]);
		}
		return ans;
	}
};

/*
   Object: Tree.Plot
	
	 Performs plotting operations.

*/
Tree.Plot = {
	
	Interpolator: {
		'linear': function(elem, delta) {
			var from = elem.startPos.clone();
			var to = elem.endPos.clone();
			elem.pos = (to.$add(from.scale(-1))).$scale(delta).$add(from);
		},
		
		'fade:nodes': function(elem, delta) {
			if(elem.endAlpha != elem.alpha) {
				var from = elem.startAlpha;
				var to   = elem.endAlpha;
				elem.alpha = from + (to - from) * delta;
			}
		},
		
		'fade:vertex': function(elem, delta) {
			var adjs = elem.adjacencies;
			for(var id in adjs) this['fade:nodes'](adjs[id], delta);
		}
	},
	
	/*
	   Method: plot
	
	   Plots the spacetree
	*/
	plot: function(viz, opt, scale) {
		var tree = viz.tree, canvas = viz.canvas;
		if(scale >= 0) {
			tree.drawn = false;		
			var ctx = canvas.getCtx();
			var diff = Tree.Geometry.getScaledTreePosition(tree, scale);
			ctx.translate(diff.x, diff.y);
			ctx.scale(scale, scale);
		}
		this.plotTree(viz, !scale, opt);
		if(scale >= 0) tree.drawn = true;
	},
	/*
	   Method: plotTree
	
	   Plots nodes and edges of the tree.
	*/
	plotTree: function(viz, plotLabel, opt) {
		var that = this, 
		canvas = viz.canvas,
		tree = viz.tree,
		ctx = canvas.getCtx();
		var begin= Tree.Geometry.getEdge(tree.pos, 'begin');
		Tree.Children.each(tree, function(elem) {
			if(elem.exist) {
				var end= Tree.Geometry.getEdge(elem.pos, 'end');
				if(elem.drawn) {
					var adj = {
						nodeFrom: tree,
						nodeTo: elem
					};
					opt.onBeforePlotLine(adj);
					ctx.globalAlpha = Math.min(tree.alpha, elem.alpha);
					that.plotEdge(begin, end, canvas, tree.selected && elem.selected);
					opt.onAfterPlotLine(adj);
				}
				that.plotTree({
					tree: elem,
					canvas: canvas
				}, plotLabel, opt);
			}
		});
		if(tree.drawn && tree.exist) {
			ctx.globalAlpha = tree.alpha;
			opt.onBeforePlotNode(tree);
			this.plotNode(tree, canvas);
			opt.onAfterPlotNode(tree);
			if(plotLabel && ctx.globalAlpha >= .95) 
				Tree.Label.plotOn(tree, canvas);
			else 
				Tree.Label.hide(tree);
		}
	},

	/*
	   Method: plotNode
	
	   Plots a tree node.
	*/
	plotNode: function(node, canvas) {
		this.plotNodeSquared(node, canvas);
	},
	
	/*
	   Method: plotNodeSquared
	
	   Plots a square node. Eventually more functions could be appended to draw different types of nodes.
	*/
	plotNodeSquared: function(node, canvas) {
		var pos = node.pos, selected = node.selected, labelOpt = Config.Label;
		var square = {
			x1: pos.x,
			y1: pos.y - labelOpt.height + (labelOpt.height - labelOpt.realHeight)/2,
			x2: labelOpt.realWidth,
			y2: labelOpt.realHeight
		};
		canvas.makeRect(square, Config.Node.mode);
	},
	
	/*
	   Method: plotEdge
	
	   Plots an Edge.	   
	*/
	plotEdge: function(begin, end, canvas, selected) {
		canvas.path('stroke', function(ctx) {
			ctx.moveTo(begin.x, begin.y);
			ctx.lineTo(end.x, end.y);
		});
	},
	
	/*
	   Method: hideLabels
	
	   Hides all labels of the tree.
	*/
	hideLabels: function(subtree, hide) {
		var l = Tree.Label;
		Tree.Util.each(subtree, function(elem) {
			if(hide) l.hide(elem); else l.show(elem);
		});
	},
	
	/*
	   Method: animate
	
	   Animates the graph by performing a translation from _elem.startPos_ to _elem.endPos_.
	*/
	animate: function(viz, opt) {
		var that = this,
		canvas = viz.canvas,
		tree   = viz.tree,
		Anim = Animation,
		duration = opt.duration || Anim.duration,
		fps = opt.fps || Anim.fps;
		//Should be changed eventually, when Animation becomes a class.
		var prevDuration = Anim.duration, prevFps = Anim.fps;
		
		Anim.duration = duration;
		Anim.fps = fps;
		
		var animationController = {
			compute: function(delta) {
				canvas.clear();
				Tree.Util.each(tree, function(node) { 
					for(var i=0; i<opt.modes.length; i++) {
						that.Interpolator[opt.modes[i]](node, delta);
					}
 				});
				that.plot(viz, opt);
			},
			
			complete: function() {
				Tree.Util.each(tree, function(elem) { 
					elem.startPos = elem.pos;
					elem.startAlpha = elem.alpha;
				});
				Anim.duration = prevDuration;
				Anim.fps = prevFps;
				opt.onComplete(); //?
			}		
		};
		Anim.controller = animationController;
		Anim.start();
	}
};

/*
   Object: Tree.Label

	Permorfs all label operations like showing, hiding, setting a label to a particular position, adding/removing classNames, etc.
*/

Tree.Label = {
	nodeHash: {},
	container: false,
	controller: null,
	
	/*
	   Method: chk
	
	   Checks if a label with the homologue id of the current tree node exists and if it doesn't it creates a label with this id.
	*/
	chk: function(node) {
		if(!(node.id in this.nodeHash)) 	this.init(node);
		return this.nodeHash[node.id];
	},
	
	/*
	   Method: init
	
	   Creates a label with the same id of the specified node and sets some initial properties.
	*/
	init: function(node) {
		if(!(node.id in this.nodeHash)) {
			if(!this.container) this.container = document.getElementById(Config.labelContainer);
			var labelElement = document.createElement('a');
			this.container.appendChild(labelElement);
			this.controller.onCreateLabel(labelElement, node);
			this.nodeHash[node.id] = labelElement;
		}
		
		this.setClass(node, "node hidden"); this.setDimensions(node);
	},

		
	/*
	   Method: plotOn
	   
	   Plots the label (if this fits in canvas).
	
	   Parameters:
	
	      pos - The position where to put the label. This position is relative to Canvas.
	      canvas - A Canvas instance.
	*/	
	plotOn: function (node, canvas) {
			var pos = node.pos;
			if(this.fitsInCanvas(pos, canvas))
				this.setDivProperties(node, 'node', canvas);
			else this.hide(node);
	},

	/*
	   Method: fitsInCanvas
	   
	   Returns true or false if the current position is between canvas limits or not.
	
	   Parameters:
	
	      pos - The position where to put the label. This position is relative to Canvas.
	      canvas - A Canvas instance.
	*/	
	fitsInCanvas: function(pos, canvas) {
		var size = canvas.getSize();
		return !(Math.abs(pos.x + Config.Label.width/2) >= size.width/2 
			|| Math.abs(pos.y) >= size.height/2);
	},
	
	/*
	   Method: setDivProperties
	
	   Intended for private use: sets some label properties, such as positioning and className.

	   Parameters:
	
	      cssClass - A class name.
	      canvas - A Canvas instance.
	      node - The labels node reference.
	*/	
	setDivProperties: function(node, cssClass, canvas) {
		var radius= canvas.getSize(), pos = node.pos;
		var labelPos= {
				x: Math.round(pos.x + radius.width/2),
				y: Math.round(pos.y + radius.height/2 - Config.Label.height)
			};

		var div= this.chk(node);
	    div.style.top= labelPos.y+'px';
		div.style.left= labelPos.x+'px';
		this.removeClass(node, "hidden");
		this.setDimensions(node);
		
	},
	
	/*
	   Method: addClass
	   
	   Adds the specified className to the label.
	
	   Parameters:
	
	      cssClass - class name to add to label.
	     node - the node label reference.
	*/	
	addClass: function(node, cssClass) {
		var element = this.chk(node);
		if(!this.hasClass(node, cssClass)) {
			var array= element.className.split(" ");
			array.push(cssClass); 
			element.className= array.join(" ");
		}
	},

	/*
	   Method: setDimensions
	   
	   Sets label width and height based on <Config.Label> realWidth and realHeight values.
	*/	
	setDimensions: function (node) {
		var elem = this.chk(node);
		elem.style.width= Config.Label.realWidth + 'px';
		elem.style.height= Config.Label.realHeight + 'px';
		this.controller.onPlaceLabel(elem, node);
	},

	/*
	   Method: removeClass
	   
	   Removes a specified class from the label.
	
	   Parameters:
	
	      cssClass - A class name.
	      node - A label's node reference.
	*/	
	removeClass: function(node, cssClass) {
		var element = this.chk(node);
		var array= element.className.split(" ");
		var exit= false;
		for(var i=0; i<array.length && !exit; i++) {
			if(array[i] == cssClass) {
				array.splice(i, 1); exit= true;
			}
		}
		element.className= array.join(" ");
	},
	
	/*
	   Method: hasClass
	   
	   Returns true if the specified class name is found in the label. Returns false otherwise.
	   
	
	   Parameters:
	
	      cssClass - A class name.
	      node - A labels node reference.
	   
	  Returns:
	  	 A boolean value.
	*/	
	hasClass: function(node, cssClass) {
		var array= this.chk(node).className.split(" ");
		for(var i=0; i<array.length; i++) {
			if(cssClass == array[i]) return true;
		}
		return false;
	},
	

	/*
	   Method: setClass
	   
	   Sets the className property of the label with a cssClass String.
	   
	
	   Parameters:
	
	      cssClass - A class name.
	      node - A labels node reference.
	*/	
	setClass: function(node, cssClass) {
		this.chk(node).className= cssClass;
	},

	/*
	   Method: hide
	   
	   Hides the label by adding a "hidden" className to it.
	*/	
	hide: function(node) {
		this.addClass(node, "hidden");
	},

	/*
	   Method: show
	   
	   Displays the label by removing the "hidden" className.
	*/	
	show: function(node) {
		this.removeClass(node, "hidden");
	}	
}; 


/*
   Object: Tree.Geometry

	Performs geometrical computations like calculating bounding boxes, a subtree base size, etc.
*/
Tree.Geometry = {
	
	/*
	   Method: dispatch
	   
	   Makes a value dispatch according to the current layout
	   Works like a CSS property, either _top-right-bottom-left_ or _top|bottom - left|right_.
	 */
	dispatch: function() {
		var args = arguments, len = args.length, s = Config.orientation;
		var val = function(a) { return typeof a == 'function'? a() : a; };
		if(len == 2) {
            return (s == "top" || s == "bottom")? val(args[0]) : val(args[1]);
		} else if(len == 4) {
			switch(s) {
				case "top": return val(args[0]);
				case "right": return val(args[1]);
				case "bottom": return val(args[2]);
				case "left": return val(args[3]);
			}
		}
	},

	/*
	   Method: switchOrientation
	   
	   Changes the tree current orientation from top to left or viceversa.
	*/	
	switchOrientation: function() {
		var args = arguments;
		if(args.length > 0) {
		  Config.orientation = args[0];
		} else {
		  var s = this.dispatch("bottom", "top", "left", "right");
		  Config.orientation = s;	
		}
		
	},

	/*
	   Method: getSize
	   
	   Returns label height or with, depending on the tree current orientation.
	*/	
	getSize: function(invert) {
		var w = Config.Label.width, h = Config.Label.height;
		if(!invert)
			return this.dispatch(h, w);
		else
			return this.dispatch(w, h);
	},
	
	/*
	   Method: getOffsetSize
	   
	   Returns label offsetHeight or offsetWidth, depending on the tree current orientation.
	*/	
	getOffsetSize: function() {
		var lab = Config.Label;
		return this.dispatch(lab.offsetHeight, lab.offsetWidth);
	},

	/*
	   Method: translate
	   
	   Applys a translation to the tree.
	*/	
	translate: function(tree, pos, prop) {
		Tree.Util.each(tree, function(elem) {
			elem[prop].$add(pos);
		});
	},
	
	/*
	   Method: getBoundingBox
	   
	   Calculates a tree bounding box.
	*/	
	getBoundingBox: function (tree) {
		var dim = Config.Label, pos = tree.pos;
		var corners = {
			top:    pos.y,
			bottom: pos.y,
			right:  pos.x,
			left:   pos.x		

		};		
		this.calculateCorners(tree, corners);
		return this.dispatch({
            left: corners.left,
            bottom: corners.bottom,
            top: corners.top,
            right: corners.right + dim.width
		}, {
	        left: corners.left,
	        bottom: corners.bottom,
	        top: corners.top - dim.height,
	        right: corners.right - 2 //TODO: what's this doing here?!
		}, {
            left: corners.left,
            bottom: corners.bottom - dim.height,
            top: corners.top - dim.height,
            right: corners.right + dim.width
		}, {
            left: corners.left + dim.realWidth,
            bottom: corners.bottom,
            top: corners.top - dim.height,
            right: corners.right + dim.width
		});
	},

	/*
	   Method: calculateCorners
	   
	   Intended for private use. Performs intermediate calculations for a subtree bounding box calculation.
	*/	
	calculateCorners: function(tree, corners) {
		var pos = tree.pos;
		if(tree.exist) {
			if(corners.top > pos.y)    corners.top=    pos.y;
			if(corners.bottom < pos.y) corners.bottom= pos.y;
			if(corners.right < pos.x)  corners.right=  pos.x;
			if(corners.left > pos.x)   corners.left=   pos.x;
			for(var i=0, ch = tree.children; i < ch.length; i++)						
				this.calculateCorners(ch[i], corners);	
		}
	},

	/*
	   Method: getBaseSize
	   
	   Calculates a subtree base size.
	*/	
	getBaseSize: function(tree, contracted, type) {
		var size = this.getSize(true);
		if(contracted)
			return (type == 'available')? size : 
				Tree.Children.getLength(tree, 'exist') * size + Config.offsetBase;

		return this.getTreeBaseSize(tree, 'expanded');
	},

	/*
	   Method: getTreeBaseSize
	   
	   Calculates a subtree base size. This is an utility function used by _getBaseSize_
	*/	
	getTreeBaseSize: function(tree, type, level) {
		var size = this.getSize(true), 
		comp = function (tree, level, type) { return level == 0 || (type == "expanded")? Tree.Children.getLength(tree, 'exist') == 0 : tree.children.length == 0;  },
		level = (arguments.length == 3)? level : Number.MAX_VALUE;
		if(comp(tree, level, type)) return size;
		for(var i=0, ch = tree.children, baseHeight = 0; i<ch.length; i++) {
			baseHeight+= this.getTreeBaseSize(ch[i], type, level -1);
		}
		return baseHeight + Config.offsetBase;
	},

	/*
	   Method: getEdge
	   
	   Returns a Complex instance with the begin or end position of the edge to be plotted.
	*/	
	getEdge: function(pos, type) {
		var dim = Config.Label;
		var $C = function(a, b) { 
		  return function(){
			return pos.add(new Complex(a, b));
		  }; 
		};
		
		if(type == 'begin') {
			return this.dispatch($C(dim.realWidth / 2, (dim.realHeight - dim.height)/2),
			                     $C(0, -dim.height / 2),
								 $C(dim.realWidth / 2, - dim.realHeight + (dim.realHeight - dim.height)/2),
								 $C(dim.realWidth, - dim.height / 2));
			
		} else if(type == 'end') {
            return this.dispatch($C(dim.realWidth / 2, -dim.realHeight),
                                 $C(dim.realWidth, -dim.height / 2),
                                 $C(dim.realWidth / 2, (dim.realHeight - dim.height)/2),
                                 $C(0, - dim.height / 2));
		}
	},

	/*
	   Method: getScaledTreePosition
	   
	   Adjusts the tree position due to canvas scaling or translation.
	*/	
	getScaledTreePosition: function(tree, scale) {
		var width = Config.Label.width, height = Config.Label.height;
        var $C = function(a, b) { 
          return function(){
            return tree.pos.add(new Complex(a, b)).$scale(1 - scale);
          }; 
        };
		return this.dispatch($C(width / 2, 0),
		                     $C(0, -height / 2),
					         $C(width / 2, -height),
					         $C(width, -height / 2));
	},

	/*
	   Method: treeFitsInCanvas
	   
	   Returns a Boolean if the current tree fits in canvas.
	*/	
	treeFitsInCanvas: function(tree, canvas, level) {
		var csize = canvas.getSize();
		var size = this.dispatch(csize.width, csize.height);
		var baseSize = this.getTreeBaseSize(tree, 'exist', level);
		return (baseSize < size);
	},
	
	/*
	   Method: getFirstPos
	   
	   Calculates the _first_ children position given a node position.
	*/	
	getFirstPos: function(initialPos, baseHeight) {
        var C = function(a, b) { 
          return function(){
            return new Complex(a, b);
          }; 
        };
		var size = this.getSize() + this.getOffsetSize();
		var factor = -baseHeight / 2 + Config.offsetBase / 2;
        return this.dispatch(C(initialPos.x + factor, initialPos.y + size),
		                     C(initialPos.x - size, initialPos.y + factor),
							 C(initialPos.x + factor, initialPos.y - size),
							 C(initialPos.x + size, initialPos.y + factor));
	},
	
	/*
	   Method: nextPosition
	   
	   Calculates a siblings node position given a node position.
	*/	
	nextPosition: function(firstPos, offsetHeight) {
        var $C = function(a, b) { 
          return function(){
            return new Complex(a, b);
          }; 
        };
        return this.dispatch($C(firstPos.x + offsetHeight, firstPos.y),
                             $C(firstPos.x, firstPos.y + offsetHeight),
                             $C(firstPos.x + offsetHeight, firstPos.y),
                             $C(firstPos.x, firstPos.y + offsetHeight));
	},
	
	/*
	   Method: setRightLevelToShow
	   
	   Hides levels of the tree until it properly fits in canvas.
	*/	
	setRightLevelToShow: function(tree, canvas) {
		var level = this.getRightLevelToShow(tree, canvas);
		Tree.Util.eachLevel(tree, 0, Config.levelsToShow, function (elem, i) {
			if(i > level) { 
				elem.drawn = false; elem.exist = false; Tree.Label.hide(elem);
			} else {
				elem.exist= true;
			}
		});
		tree.drawn= true;
	},
	
	/*
	   Method: getRightLevelToShow
	   
	   Returns the right level to show for the current tree in order to fit in canvas.
	*/	
	getRightLevelToShow: function(tree, canvas) {
		var level = Config.levelsToShow;
		while(!this.treeFitsInCanvas(tree, canvas, level) && level > 1) { level-- ; }
		return level;
	}
};

/*
 	Class: ST
 	
 	The main Spacetree class.
 */

/*
 Constructor: ST

 Creates a new ST instance.
 
 Parameters:

    canvas - A <Canvas> instance.
    controller - a ST controller <http://blog.thejit.org/?p=8>
*/	
var ST= function(canvas, controller)  {
	var innerController = {
		onBeforeCompute: $_.empty,
		onAfterCompute:  $_.empty,
		onCreateLabel:   $_.empty,
		onPlaceLabel:    $_.empty,
		onComplete:      $_.empty,
		onBeforePlotNode:$_.empty,
		onAfterPlotNode: $_.empty,
		onBeforePlotLine:$_.empty,
		onAfterPlotLine: $_.empty,
		request:         false
	};
	this.controller = $_.merge(innerController, controller);
	this.canvas=       canvas;
	this.tree=           null;
	this.clickedNode=    null;
	
	//If this library was OO (which it will at version 1.1) 
	//I could do this in not an uglier way.
	Tree.Label.controller = this.controller;
	Config.labelContainer = canvas.id + "-label";
	Animation.fps = Config.fps;
	Animation.duration = Config.animationTime;
};

ST.prototype= {
	/*
	 	Method: loadFromJSON
	 	
	 	Loads a json object into the ST.
	 */
	loadFromJSON: function(json) {
		this.tree = json;
		Tree(json);
	},
	
	/*
	 Method: compute
	
	 Calculates positions from root node.
	*/	
	compute: function () {
	  	Tree.Util.set(this.tree, {
	  		'drawn':true,
	  		'exist':true,
	  		'selected':true
	  	});
		this.calculatePositions(this.tree, new Complex(0, 0), "startPos");
	},
	
	/*
	 Method: calculatePositions
	
	 This method implements the core algorithm to calculate node positioning.
	*/	
	calculatePositions: function (tree, initialPos, property, contracted) {
		var Geom = Tree.Geometry, TC = Tree.Children, contracted = (arguments.length == 3)? true : contracted;
		if(this.clickedNode && (tree.id == this.clickedNode.id) && contracted) contracted = false;
		
		tree[property] = initialPos;
		var ch = Tree.Children.getChildren(tree, 'exist');
		if (ch.length > 0) {
			var baseHeight   = Geom.getBaseSize(tree, contracted);
			var prevBaseSize = Geom.getBaseSize(ch[0], contracted, 'available');
			var offsetBase   = (ch.length == 1)? Config.offsetBase : baseHeight - prevBaseSize;

			var firstPos= ch[0][property]= Geom.getFirstPos(initialPos, offsetBase);
			this.calculatePositions(ch[0], firstPos, property, contracted);
			for(var i=1; i<ch.length; i++) {
				var leaf = !TC.children(ch[i], 'exist') || !TC.children(ch[i -1], 'exist');
				var nextBaseSize = Geom.getBaseSize(ch[i], contracted, 'available');
				var offsetHeight = leaf? Geom.getSize(true) : (prevBaseSize + nextBaseSize) / 2;
				firstPos = Geom.nextPosition(firstPos, offsetHeight);
				prevBaseSize = nextBaseSize;
				this.calculatePositions(ch[i], firstPos, property, contracted);
			}
		}
	},

	/*
	 Method: plot
	
	 This method plots the tree. Note that, before plotting the tree, you have to call <compute> to properly calculatePositions.
	*/	
	plot: function() { Tree.Plot.plot(this.tree, this.canvas, this.controller); },

  
 	/*
	 Method: switchPosition
	
	 Switches the tree orientation from vertical to horizontal or viceversa.
	*/	
  switchPosition: function(pos, onComplete) {
	var Geom = Tree.Geometry, Plot = Tree.Plot, tree = this.tree, that = this;
  	if(!Plot.busy) {
	  	Plot.busy = true;
	  	this.contract({
	  		onComplete: function() {
                Geom.switchOrientation(pos);
	  			that.calculatePositions(tree, new Complex(0, 0), 'endPos');
	  			Plot.busy = false;
	  			that.onClick(that.clickedNode.id, onComplete);
	  		}
	  	}, pos);
	}
  },

	/*
	 	Method: requestNodes
	 	
	 	If the controller has a request method, it asynchonously requests subtrees for the leaves of the tree.
	 */
  requestNodes: function(node, onComplete) {
  	var handler = $_.merge(this.controller, onComplete);
  	if(handler.request)
   		Tree.Group.requestNodes(Tree.Util.getLeaves(node), handler);
  	  else
		handler.onComplete();
  },
 
	/*
	 	Method: contract
	 	
	 	Contracts selected nodes.
	 */
  contract: function(onComplete, switched) {
	var orn = Config.orientation;
	var Geom = Tree.Geometry, Util = Tree.Util, Group = Tree.Group;
	var tree = this.clickedNode;
  	//get nodes that must be contracted
  	var nodesToHide = function(tree, canvas) {
		var level = Util.getLevel(tree), root = Util.getRoot(tree), nodeArray = new Array();
		Util.eachLevel(root, 0, level, function(elem, i) {
			if(elem.exist && !elem.selected) {
				nodeArray.push(elem);			
			}
		});

		level = Geom.getRightLevelToShow(tree, canvas);
		Util.atLevel(tree, level, function (elem, i) {
			if(elem.exist) {
				nodeArray.push(elem);
			}
		});
		return nodeArray;		
  	};
  	
  	if(switched) Geom.switchOrientation(switched);
  	var nodes = nodesToHide(tree, this.canvas);
  	if(switched) Geom.switchOrientation(orn);
  	Group.hide(nodes, this.canvas, $_.merge(this.controller, onComplete));
  },
  
	/*
	 	Method: move
	 	
	 	Performs the animation of the translation of the tree.
	 */
	move: function(node, onComplete) {
		this.calculatePositions(this.tree, new Complex(0, 0), "endPos");
		Tree.Geometry.translate(this.tree, node.endPos.scale(-1), "endPos");
		Tree.Plot.animate(this, $_.merge(this.controller, onComplete, { modes: ['linear'] }));
	},
  
  
  	/*
	 Method: expand
	
	 Determines which nodes to expand (and expands their subtrees).
	*/	
  expand: function (node, onComplete) {
	var nodeArray= new Array();
	Tree.Util.eachLevel(node, 0, Config.levelsToShow, function (elem, i)  {
		if(!Tree.Children.children(elem, 'drawn')) {
			nodeArray.push(elem);
		}
	});
	Tree.Group.show(nodeArray, this.canvas, $_.merge(this.controller, onComplete));
  },


  /*
	 Method: selectPath
	
	 Sets a "selected" flag to nodes that are in the path.
  */	
  selectPath: function(node, nodePrev) {
  	(function(node, val) {
  		if(node == null) return arguments.callee;
  		node.selected = val;
  		return arguments.callee(node._parent, val);
  	})(nodePrev, false)(node, true);
  },
  
	/*
	   Method: addSubtree
	
		Adds a subtree, performing optionally an animation.
	
	   Parameters:
	      id - A node identifier where this subtree will be appended. If the id of the root of the appended subtree and the parameter _id_ match, then only the subtrees children will be appended to the node specified by _id_
		  subtree - A JSON Tree object.
		  method - _optional_ set this to _animate_ to animate the tree after adding the subtree. You can also set this parameter to _replot_ to just replot the subtree.
		  onComplete - An action to perform after the animation (if any).

	   Returns:
	
	   The transformed and appended subtree.
	*/
	addSubtree: function(id, subtree, method, onComplete) {
		var Util = Tree.Util, that = this, res = Util.addSubtree(this.tree, id, subtree);
		if(method == 'replot') {
			this.onClick(this.clickedNode.id, $_.merge({
				onMoveComplete: function() {
					Util.each(res, function(elem) {
						elem.drawn = elem.exist;
					});
				},
				
				onExpandComplete: function() {
					that.canvas.clear();
					that.plot();
				}
			}, onComplete));
		} else if (method == 'animate') {
			this.onClick(this.clickedNode.id, {
				onMoveComplete: function() {
					Util.each(res, function(elem) {
						elem.drawn = elem.exist;
					});
				},
				
				onExpandComplete: function() {
					Util.each(res, function(elem) {
						Util.set(elem, {
							'drawn': elem.exist,
							'startAlpha': elem.exist? 0 : 1,
							'endAlpha': 1,
							'alpha': elem.exist? 0 : 1
						});
					});
					Tree.Plot.animate(that, $_.merge(that.controller, onComplete, { modes: ['fade:nodes'] }));
				}
			});
		}
	},

	/*
	   Method: removeSubtree
	
		Removes a subtree, performing optionally an animation.
	
	   Parameters:
	      id - A node identifier where this subtree will be appended. If the id of the root of the appended subtree and the parameter _id_ match, then only the subtrees children will be appended to the node specified by _id_
		  removeRoot - Remove the root subtree or only its children.
		  method - _optional_ set this to _animate_ to animate the tree after adding the subtree. You can also set this parameter to _replot_ to just replot the subtree.
		  onComplete - An action to perform after the animation (if any).

	*/
	removeSubtree: function(id, removeRoot, method, onComplete) {
		var Util = Tree.Util, that = this;
		if(method == 'replot') {
			this.onClick(this.clickedNode.id, $_.merge({
				onContractComplete: function() {
					Tree.Plot.hideLabels(Util.getSubtree(that.tree, id), true);
					Util.removeSubtree(that.tree, id, removeRoot);
				}
			}, onComplete));
		} else if (method == 'animate') {
			var res = Util.getSubtree(this.tree, id);
			Util.each(res, function(elem) {
				Util.set(elem, {
					'drawn': elem.exist,
					'startAlpha': 1,
					'endAlpha': 0,
					'alpha': 1
				});
			});
			if(!removeRoot)
				Util.set(res, {
					'drawn': elem.exist,
					'startAlpha': 1,
					'endAlpha': 1,
					'alpha': 1
				});
			Tree.Plot.animate(this, $_.merge(that.controller, {
				onComplete: function() {
					Util.removeSubtree(that.tree, id, removeRoot);
					that.onClick(that.clickedNode.id, onComplete);
				},
				'modes': ['fade:nodes']
			}));
		}
	},

  /*
	 Method: onClick

	This method is called when clicking on a tree node. It mainly performs all calculations and the animation of contracting, translating and expanding pertinent nodes.
	
		
	 Parameters:
	
	    ide - The label id. The label id is usually the same as the tree node id.
	    onComplete - A controller method to perform things when the animation completes.

	*/	  
  onClick: function (id, onComplete) {
	var canvas = this.canvas, that = this, Plot = Tree.Plot,  Util = Tree.Util, Geom = Tree.Geometry;
	var innerController = {
		onRequestNodesComplete: $_.empty,
		onContractComplete: $_.empty,
		onMoveComplete: $_.empty,
		onExpandComplete: $_.empty
	};
	var complete = $_.merge(this.controller, innerController, onComplete);
	
	if(!Plot.busy) {
		Plot.busy= true;
		var node=  Util.getSubtree(this.tree, id);
		this.selectPath(node, this.clickedNode);
		this.clickedNode= node;
		complete.onBeforeCompute(node);
		this.requestNodes(node, {
			onComplete: function() {
				complete.onRequestNodesComplete();
				that.contract({
					onComplete: function() {
						Geom.setRightLevelToShow(node, canvas);
						complete.onContractComplete();
						that.move(node, {
							onComplete: function() {
								complete.onMoveComplete();
								that.expand(node, {
									onComplete: function() {
										complete.onExpandComplete();
										complete.onAfterCompute(id);
										complete.onComplete();
										Plot.busy = false;
									}
								}); //expand
							}
						}); //move
					}
				});//contract
			}
		});//request
	}
  }
};

/*
   Object: Trans
	
	 An object containing multiple type of transformations. Based on the mootools library <http://mootools.net>.

*/
var Trans = {
	linear: function(p) { return p;	},
	Quart: function(p) {
		return Math.pow(p, 4);
	},
	easeIn: function(transition, pos){
		return transition(pos);
	},
	easeOut: function(transition, pos){
		return 1 - transition(1 - pos);
	},
	easeInOut: function(transition, pos){
		return (pos <= 0.5) ? transition(2 * pos) / 2 : (2 - transition(2 * (1 - pos))) / 2;
	}
};


/*
   Object: Animation
	
	 An object that performs animations. Based on Fx.Base from Mootools.

*/

var Animation = {

	duration: Config.animationTime,
	fps: Config.fps,
	transition: function(p) {return Trans.easeInOut(Trans.Quart, p);},
	//transition: Trans.linear,
	controller: false,
	
	getTime: function() {
		var ans = (Date.now)? Date.now() : new Date().getTime();
		return ans;
	},
	
	step: function(){
		var time = this.getTime();
		if (time < this.time + this.duration){
			var delta = this.transition((time - this.time) / this.duration);
			this.controller.compute(delta);
		} else {
			this.timer = clearInterval(this.timer);
			this.controller.compute(1);
			this.controller.complete();
		}
	},

	start: function(){
		this.time = 0;
		this.startTimer();
		return this;
	},

	startTimer: function(){
		if (this.timer) return false;
		this.time = this.getTime() - this.time;
		this.timer = setInterval((function () { Animation.step(); }), Math.round(1000 / this.fps));
		return true;
	}
};
