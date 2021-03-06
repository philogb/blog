var $_={empty:function(){},fn:function(A){return function(){return A}},merge:function(){var E={};for(var D=0,A=arguments.length;D<A;D++){var B=arguments[D];if(typeof B!="object"){continue}for(var C in B){var G=B[C],F=E[C];E[C]=(F&&typeof G=="object"&&typeof F=="object")?this.merge(F,G):this.unlink(G)}}return E},unlink:function(C){var B=null;if(this.isArray(C)){B=[];for(var D=0,A=C.length;D<A;D++){B[D]=this.unlink(C[D])}}else{if(this.isObject(C)){B={};for(var E in C){B[E]=this.unlink(C[E])}}else{return C}}return B},isArray:function(A){return A&&A.constructor&&A.constructor.toString().match(/array/i)},isString:function(A){return A&&A.constructor&&A.constructor.toString().match(/string/i)},isObject:function(A){return A&&A.constructor&&A.constructor.toString().match(/object/i)}};var Canvas=(function(){var K,G,A,J,B,I;var E={injectInto:"id",width:200,height:200,backgroundColor:"#333333",styles:{fillStyle:"#000000",strokeStyle:"#000000"},backgroundCanvas:false};function D(){D.t=D.t||typeof(HTMLCanvasElement);return"function"==D.t||"object"==D.t}function F(L,O,N){var M=document.createElement(L);(function(Q,R){if(R){for(var P in R){Q[P]=R[P]}}return arguments.callee})(M,O)(M.style,N);if(L=="canvas"&&!D()&&G_vmlCanvasManager){M=G_vmlCanvasManager.initElement(document.body.appendChild(M))}return M}function C(L){return document.getElementById(L)}function H(O,N,M,Q){var P=M?(M-O.width):O.width;var L=Q?(Q-O.height):O.height;N.translate(P/2,L/2)}return function(L,N){if(arguments.length<1){throw"Arguments missing"}var M=L+"-label",R=L+"-canvas",O=L+"-bkcanvas";N=$_.merge(E,N||{});var P={width:N.width,height:N.height};A=F("div",{id:L},$_.merge(P,{position:"relative"}));J=F("div",{id:M},{overflow:"visible",position:"absolute",top:0,left:0,width:P.width+"px",height:0});var S={position:"absolute",top:0,left:0,width:P.width+"px",height:P.height+"px"};B=F("canvas",$_.merge({id:R},P),S);var Q=N.backgroundCanvas;if(Q){I=F("canvas",$_.merge({id:O},P),S);A.appendChild(I)}A.appendChild(B);A.appendChild(J);C(N.injectInto).appendChild(A);K=B.getContext("2d");H(B,K);var T=N.styles;for(var U in T){K[U]=T[U]}if(Q){G=I.getContext("2d");var T=Q.styles;for(var U in T){G[U]=T[U]}H(I,G);Q.impl.init(I,G);Q.impl.plot(I,G)}return{id:L,getCtx:function(){return K},getElement:function(){return A},resize:function(W,V){(function(Y,X){H(Y,X,W,V);Y.width=W;Y.height=V;return arguments.callee})(B,K)(I,G)},getSize:function(){return{width:B.width,height:B.height}},path:function(V,W){K.beginPath();W(K);K[V]();K.closePath()},clear:function(){var V=this.getSize();K.clearRect(-V.width/2,-V.height/2,V.width,V.height)},clearRectangle:function(Z,X,W,Y){if(!D()){var V=K.fillStyle;K.fillStyle=N.backgroundColor;K.fillRect(Y,Z,X-Y,W-Z);K.fillStyle=V}else{K.clearRect(Y,Z-2,X-Y+2,Math.abs(W-Z)+5)}},makeRect:function(W,V){if(V=="fill"||V=="stroke"){K[V+"Rect"](W.x1,W.y1,W.x2,W.y2)}else{throw"parameter not recognized "+V}}}}})();var Complex=function(){if(arguments.length>1){this.x=arguments[0];this.y=arguments[1]}else{this.x=null;this.y=null}};Complex.prototype={clone:function(){return new Complex(this.x,this.y)},toPolar:function(){var A=this.norm();var B=Math.atan2(this.y,this.x);if(B<0){B+=Math.PI*2}return new Polar(B,A)},norm:function(){return Math.sqrt(this.squaredNorm())},squaredNorm:function(){return this.x*this.x+this.y*this.y},add:function(A){return new Complex(this.x+A.x,this.y+A.y)},prod:function(A){return new Complex(this.x*A.x-this.y*A.y,this.y*A.x+this.x*A.y)},conjugate:function(){return new Complex(this.x,-this.y)},div:function(B){var A=B.squaredNorm();return new Complex(this.x*B.x+this.y*B.y,this.y*B.x-this.x*B.y).$scale(1/A)},scale:function(A){return new Complex(this.x*A,this.y*A)},equals:function(A){return this.x==A.x&&this.y==A.y},$add:function(A){this.x+=A.x;this.y+=A.y;return this},$prod:function(C){var A=this.x,B=this.y;this.x=A*C.x-B*C.y;this.y=B*C.x+A*C.y;return this},$conjugate:function(){this.y=-this.y;return this},$scale:function(A){this.x*=A;this.y*=A;return this},$div:function(D){var A=this.x,C=this.y;var B=D.squaredNorm();this.x=A*D.x+C*D.y;this.y=C*D.x-A*D.y;return this.$scale(1/B)},moebiusTransformation:function(C){var A=this.add(C);var B=C.$conjugate().$prod(this);B.x++;A.$div(B);return A}};Complex.KER=new Complex(0,0);var Polar=function(B,A){this.theta=B;this.rho=A};Polar.prototype={toComplex:function(){return new Complex(Math.cos(this.theta),Math.sin(this.theta)).scale(this.rho)},add:function(A){return new Polar(this.theta+A.theta,this.rho+A.rho)},scale:function(A){return new Polar(this.theta,this.rho*A)},equals:function(A){return this.theta==A.theta&&this.rho==A.rho},interpolate:function(C,H){var F=Math.PI*2;var B=function(J){return(J<0)?(J%F)+F:J%F};var E=B(this.theta),G=B(C.theta);var D;if(Math.abs(E-G)>Math.PI){if(E-G>0){D=B((G+((E-F)-G)*H))}else{D=B((G-F+(E-(G-F))*H))}}else{D=B((G+(E-G)*H))}var I=(D);var A=(this.rho-C.rho)*H+C.rho;return new Polar(I,A)}};Polar.KER=new Polar(0,0);var Config={labelContainer:"label_container",drawMainCircle:true,allowVariableNodeDiameters:false,transformNodes:true,nodeRangeDiameters:{min:10,max:55},nodeRangeValues:{min:1,max:35},fps:40,animationTime:1500,nodeRadius:4};var GraphUtil={filter:function(B){if(!B||!$_.isString(B)){return function(){return true}}var A=B.split(" ");return function(D){for(var C=0;C<A.length;C++){if(D[A[C]]){return false}}return true}},clean:function(A){this.eachNode(A,function(B){B._flag=false})},eachNode:function(E,D,A){var C=this.filter(A);for(var B in E.nodes){if(C(E.nodes[B])){D(E.nodes[B])}}},eachAdjacency:function(D,E,A){var B=D.adjacencies,C=this.filter(A);for(var F in B){if(C(B[F])){E(B[F],F)}}},computeLevels:function(F,G,C){var D=this.filter(C);this.eachNode(F,function(H){H._flag=false;H._depth=-1},C);var B=F.getNode(G);B._depth=0;var A=[B];while(A.length!=0){var E=A.pop();E._flag=true;this.eachAdjacency(E,function(H){var I=H.nodeTo;if(I._flag==false&&D(I)){if(I._depth<0){I._depth=E._depth+1}A.unshift(I)}},C)}},getNode:function(A,B){return A.getNode(B)},eachBFS:function(F,G,E,B){var C=this.filter(B);this.clean(F);var A=[F.getNode(G)];while(A.length!=0){var D=A.pop();D._flag=true;E(D,D._depth);this.eachAdjacency(D,function(H){var I=H.nodeTo;if(I._flag==false&&C(I)){I._flag=true;A.unshift(I)}},B)}},eachSubnode:function(E,C,D,A){var F=C._depth,B=this.filter(A);this.eachAdjacency(C,function(G){var H=G.nodeTo;if(H._depth>F&&B(H)){D(H)}},A)},getParents:function(D,C){var B=C.adjacencies;var A=new Array();this.eachAdjacency(C,function(E){var F=E.nodeTo;if(F._depth<C._depth){A.push(F)}});return A},getSubnodes:function(E,G,F,A){var B=new Array(),D=this,C=E.getNode(G);(function(J,I){var H=arguments.callee;if(!F||F<=I._depth){B.push(I)}D.eachSubnode(J,I,function(K){H(J,K)},A)})(E,C);return B},getClosestNodeToOrigin:function(C,D,A){var B=null;this.eachNode(C,function(E){B=(B==null||E[D].rho<B[D].rho)?E:B},A);return B},moebiusTransformation:function(C,E,D,B,A){this.eachNode(C,function(G){for(var F=0;F<D.length;F++){var I=E[F].scale(-1),H=B?B:D[F];G[D[F]]=G[H].toComplex().moebiusTransformation(I).toPolar()}},A)}};var GraphOp={options:{type:"nothing",duration:2000,fps:30},removeNode:function(H,D,B){var I=$_.merge(H.controller,this.options,B);var C=$_.isString(D)?[D]:D;switch(I.type){case"nothing":for(var E=0;E<C.length;E++){H.graph.removeNode(C[E])}break;case"replot":this.removeNode(H,C,{type:"nothing"});GraphPlot.clearLabels(H);H.refresh(true);break;case"fade:seq":case"fade":var G=GraphPlot,F=this;for(var E=0;E<C.length;E++){var A=H.graph.getNode(C[E]);A.endAlpha=0}G.animate(H,$_.merge(I,{modes:["fade:nodes"],onComplete:function(){F.removeNode(H,C,{type:"nothing"});G.clearLabels(H);H.reposition();G.animate(H,$_.merge(I,{modes:["linear"],hideLabels:true}))}}));break;case"fade:con":var G=GraphPlot,F=this;for(var E=0;E<C.length;E++){var A=H.graph.getNode(C[E]);A.endAlpha=0;A.ignore=true}H.reposition();G.animate(H,$_.merge(I,{modes:["fade:nodes","linear"],hideLabels:true,onComplete:function(){F.removeNode(H,C,{type:"nothing"})}}));break;case"iter":var F=this,G=GraphPlot;G.sequence(H,{condition:function(){return C.length!=0},step:function(){F.removeNode(H,C.shift(),{type:"nothing"});G.clearLabels(H)},onComplete:function(){I.onComplete()},duration:Math.ceil(I.duration/C.length)});break;default:this.doError()}},removeEdge:function(G,C,A){var I=$_.merge(G.controller,this.options,A);var H=$_.isString(C[0])?[C]:C;switch(I.type){case"nothing":for(var B=0;B<H.length;B++){G.graph.removeAdjacence(H[B][0],H[B][1])}break;case"replot":this.removeEdge(G,H,{type:"nothing"});G.refresh(true);break;case"fade:seq":case"fade":var F=GraphPlot,E=this;for(var B=0;B<H.length;B++){var D=G.graph.getAdjacence(H[B][0],H[B][1]);if(D){D[0].endAlpha=0;D[1].endAlpha=0}}F.animate(G,$_.merge(I,{modes:["fade:vertex"],onComplete:function(){E.removeEdge(G,H,{type:"nothing"});G.reposition();F.animate(G,$_.merge(I,{modes:["linear"],hideLabels:true}))}}));break;case"fade:con":var F=GraphPlot,E=this;for(var B=0;B<H.length;B++){var D=G.graph.getAdjacence(H[B][0],H[B][1]);if(D){D[0].endAlpha=0;D[0].ignore=true;D[1].endAlpha=0;D[1].ignore=true}}G.reposition();F.animate(G,$_.merge(I,{modes:["fade:vertex","linear"],onComplete:function(){E.removeEdge(G,H,{type:"nothing"})}}));break;case"iter":var E=this,F=GraphPlot;F.sequence(G,{condition:function(){return H.length!=0},step:function(){E.removeEdge(G,H.shift(),{type:"nothing"});F.clearLabels(G)},onComplete:function(){I.onComplete()},duration:Math.ceil(I.duration/H.length)});break;default:this.doError()}},sum:function(H,J,B){var K=$_.merge(H.controller,this.options,B),F=H.root;H.root=B.id||H.root;switch(K.type){case"nothing":var I=H.construct(J),E=GraphUtil;E.eachNode(I,function(L){E.eachAdjacency(L,function(M){H.graph.addAdjacence(M.nodeFrom,M.nodeTo,M.data)})});break;case"replot":this.sum(H,J,{type:"nothing"});H.refresh(true);break;case"fade:seq":case"fade":case"fade:con":var E=GraphUtil,G=GraphPlot,D=this,I=H.construct(J);var A=this.preprocessSum(H,I);var C=!A?["fade:nodes"]:["fade:nodes","fade:vertex"];H.reposition();if(K.type!="fade:con"){G.animate(H,$_.merge(K,{modes:["linear"],hideLabels:true,onComplete:function(){G.animate(H,$_.merge(K,{modes:C,onComplete:function(){K.onComplete()}}))}}))}else{E.eachNode(H.graph,function(L){if(L.id!=F&&L.pos.equals(Polar.KER)){L.pos=L.startPos=L.endPos}});G.animate(H,$_.merge(K,{modes:["linear"].concat(C),hideLabels:true,onComplete:function(){K.onComplete()}}))}break;default:this.doError()}},morph:function(H,J,B){var K=$_.merge(H.controller,this.options,B),F=H.root;H.root=B.id||H.root;switch(K.type){case"nothing":var I=H.construct(J),E=GraphUtil;E.eachNode(I,function(L){E.eachAdjacency(L,function(M){H.graph.addAdjacence(M.nodeFrom,M.nodeTo,M.data)})});E.eachNode(H.graph,function(L){E.eachAdjacency(L,function(M){if(!I.getAdjacence(M.nodeFrom.id,M.nodeTo.id)){H.graph.removeAdjacence(M.nodeFrom.id,M.nodeTo.id)}if(!H.graph.hasNode(L.id)){H.graph.removeNode(L.id)}})});break;case"replot":this.morph(H,J,{type:"nothing"});H.refresh(true);break;case"fade:seq":case"fade":case"fade:con":var E=GraphUtil,G=GraphPlot,D=this,I=H.construct(J);var A=this.preprocessSum(H,I);E.eachNode(H.graph,function(L){if(!I.hasNode(L.id)){L.alpha=1;L.startAlpha=1;L.endAlpha=0;L.ignore=true}});E.eachNode(H.graph,function(L){if(L.ignore){return}E.eachAdjacency(L,function(M){if(M.nodeFrom.ignore||M.nodeTo.ignore){return}var N=I.getNode(M.nodeFrom.id);var O=I.getNode(M.nodeTo.id);if(!N.adjacentTo(O)){var P=H.graph.getAdjacence(N.id,O.id);A=true;P[0].alpha=1;P[0].startAlpha=1;P[0].endAlpha=0;P[0].ignore=true;P[1].alpha=1;P[1].startAlpha=1;P[1].endAlpha=0;P[1].ignore=true}})});var C=!A?["fade:nodes"]:["fade:nodes","fade:vertex"];H.reposition();E.eachNode(H.graph,function(L){if(L.id!=F&&L.pos.equals(Polar.KER)){L.pos=L.startPos=L.endPos}});G.animate(H,$_.merge(K,{modes:["polar"].concat(C),hideLabels:true,onComplete:function(){E.eachNode(H.graph,function(L){if(L.ignore){H.graph.removeNode(L.id)}});E.eachNode(H.graph,function(L){E.eachAdjacency(L,function(M){if(M.ignore){H.graph.removeAdjacence(M.nodeFrom.id,M.nodeTo.id)}})});K.onComplete()}}));break;default:this.doError()}},preprocessSum:function(A,C){var B=GraphUtil;B.eachNode(C,function(E){if(!A.graph.hasNode(E.id)){A.graph.addNode(E);var F=A.graph.getNode(E.id);F.alpha=0;F.startAlpha=0;F.endAlpha=1}});var D=false;B.eachNode(C,function(E){B.eachAdjacency(E,function(F){var G=A.graph.getNode(F.nodeFrom.id);var H=A.graph.getNode(F.nodeTo.id);if(!G.adjacentTo(H)){var I=A.graph.addAdjacence(G,H,F.data);if(G.startAlpha==G.endAlpha&&H.startAlpha==H.endAlpha){D=true;I[0].alpha=0;I[0].startAlpha=0;I[0].endAlpha=1;I[1].alpha=0;I[1].startAlpha=0;I[1].endAlpha=1}}})});return D}};var GraphPlot={Interpolator:{moebius:function(B,C,A){A=A.clone();B.pos=B.startPos.toComplex().moebiusTransformation(A).toPolar()},linear:function(A,D){var C=A.startPos.toComplex();var B=A.endPos.toComplex();A.pos=((B.$add(C.scale(-1))).$scale(D).$add(C)).toPolar()},"fade:nodes":function(A,D){if(A.endAlpha!=A.alpha){var C=A.startAlpha;var B=A.endAlpha;A.alpha=C+(B-C)*D}},"fade:vertex":function(A,D){var C=A.adjacencies;for(var B in C){this["fade:nodes"](C[B],D)}},polar:function(A,D){var C=A.startPos;var B=A.endPos;A.pos=B.interpolate(C,D)}},labelsHidden:false,labelContainer:false,labels:{},getLabelContainer:function(){return this.labelContainer?this.labelContainer:this.labelContainer=document.getElementById(Config.labelContainer)},getLabel:function(A){return(A in this.labels&&this.labels[A]!=null)?this.labels[A]:this.labels[A]=document.getElementById(A)},hideLabels:function(B){var A=this.getLabelContainer();if(B){A.style.display="none"}else{A.style.display=""}this.labelsHidden=B},clearLabels:function(A){for(var B in this.labels){if(!A.graph.hasNode(B)){this.disposeLabel(B);delete this.labels[B]}}},disposeLabel:function(B){var A=this.getLabel(B);if(A&&A.parentNode){A.parentNode.removeChild(A)}},sequence:function(A,C){C=$_.merge({condition:function(){return false},step:$_.empty,onComplete:$_.empty,duration:200},C);var B=setInterval(function(){if(C.condition()){C.step()}else{clearInterval(B);C.onComplete()}A.refresh(true)},C.duration)},animate:function(L,B,A){var F=this,M=L.graph,H=GraphUtil,I=Animation,E=B.duration||I.duration,C=B.fps||I.fps;var K=M.getNode(L.root);var J=I.duration,D=I.fps;I.duration=E;I.fps=C;if(B.hideLabels){this.hideLabels(true)}var G={compute:function(O){var N=A?A.scale(-O):null;H.eachNode(M,function(Q){for(var P=0;P<B.modes.length;P++){F.Interpolator[B.modes[P]](Q,O,N)}});F.plot(L,B)},complete:function(){H.eachNode(M,function(N){N.startPos=N.pos;N.startAlpha=N.alpha});if(B.hideLabels){F.hideLabels(false)}F.plot(L,B);B.onComplete();B.onAfterCompute();I.duration=J;I.fps=D}};Animation.controller=G;Animation.start()},plot:function(H,B){var E=H.graph,C=H.canvas,A=H.root;var F=this,I=C.getCtx(),G=GraphUtil;C.clear();var D=!!E.getNode(A).visited;G.eachNode(E,function(J){G.eachAdjacency(J,function(K){if(!!K.nodeTo.visited===D){B.onBeforePlotLine(K);I.save();I.globalAlpha=Math.min(Math.min(J.alpha,K.nodeTo.alpha),K.alpha);F.plotLine(K,C);I.restore();B.onAfterPlotLine(K)}});I.save();I.globalAlpha=J.alpha;B.onBeforePlotNode(J);F.plotNode(J,C);B.onAfterPlotNode(J);if(!F.labelsHidden&&I.globalAlpha>=0.95){F.plotLabel(C,J,B)}else{if(!F.labelsHidden&&I.globalAlpha<0.95){F.hideLabel(J)}}I.restore();J.visited=!D})},plotNode:function(C,A){var B=A.getSize();var E=Math.min(B.width,B.height)/2;var D=C.pos.toComplex(),F=D.scale(E);A.path("fill",function(H){var G=Config.transformNodes?C._radius*(1-D.squaredNorm()):C._radius;if(G>=4){H.arc(F.x,F.y,G,0,Math.PI*2,true)}})},plotLine:function(L,D){var E=L.nodeFrom,C=L.nodeTo,I=L.data;var M=E.pos.toComplex(),H=C.pos.toComplex();var G=this.computeArcThroughTwoPoints(M,H);var N=D.getSize();var F=Math.min(N.width,N.height)/2;var K=Math.atan2(H.y-G.y,H.x-G.x);var J=Math.atan2(M.y-G.y,M.x-G.x);var B=this.sense(K,J);var A=D.getCtx();A.save();D.path("stroke",function(O){if(G.a>1000||G.b>1000||G.ratio>1000){var Q=M.scale(F),P=H.scale(F);O.moveTo(Q.x,Q.y);O.lineTo(P.x,P.y)}else{O.arc(G.x*F,G.y*F,G.ratio*F,K,J,B)}});A.restore()},computeArcThroughTwoPoints:function(M,L){var E=(M.x*L.y-M.y*L.x),A=E;var D=M.squaredNorm(),C=L.squaredNorm();if(E==0){return{x:0,y:0,ratio:1001}}var K=(M.y*(C)-L.y*(D)+M.y-L.y)/E;var I=(L.x*(D)-M.x*(C)+L.x-M.x)/A;var J=-K/2;var H=-I/2;var G=(K*K+I*I)/4-1;if(G<0){return{x:0,y:0,ratio:1001}}var F=Math.sqrt(G);var B={x:J,y:H,ratio:F,a:K,b:I};return B},plotLabel:function(D,F,H){var C=F.id,K=this.getLabel(C);if(!K){K=document.createElement("div");var B=this.getLabelContainer();B.appendChild(K);K.id=C;K.className="node";K.style.position="absolute";H.onCreateLabel(K,F);this.labels[F.id]=K}var J=F.pos.toComplex();var I=D.getSize();var G=Math.min(I.width,I.height)/2;var E={x:Math.round(J.x*G+I.width/2),y:Math.round(J.y*G+I.height/2)};var A=K.style;A.left=E.x+"px";A.top=E.y+"px";A.display="";H.onPlaceLabel(K,F)},hideLabel:function(A){var B;if(B=this.getLabel(A.id)){B.style.display="none"}},sense:function(A,B){return(A<B)?((A+Math.PI>B)?false:true):((B+Math.PI>A)?true:false)}};var Hypertree=function(C,A){var B={onBeforeCompute:$_.empty,onAfterCompute:$_.empty,onCreateLabel:$_.empty,onPlaceLabel:$_.empty,onCreateElement:$_.empty,onComplete:$_.empty,onBeforePlotLine:$_.empty,onAfterPlotLine:$_.empty,onBeforePlotNode:$_.empty,onAfterPlotNode:$_.empty,request:false};this.controller=$_.merge(B,A);this.graph=new Graph();this.json=null;this.canvas=C;this.root=null;this.busy=false;Animation.fps=Config.fps;Animation.duration=Config.animationTime;Config.labelContainer=C.id+"-label"};Hypertree.prototype={construct:function(B){var C=(typeof B=="object"&&B.constructor.toString().match(/array/i));var A=new Graph();if(!C){(function(D,F){D.addNode(F);for(var E=0,G=F.children;E<G.length;E++){D.addAdjacence(F,G[E]);arguments.callee(D,G[E])}})(A,B)}else{(function(E,H){var K=function(M){for(var L=0;L<H.length;L++){if(H[L].id==M){return H[L]}}};for(var G=0;G<H.length;G++){E.addNode(H[G]);for(var F=0,D=H[G].adjacencies;F<D.length;F++){var I=D[F],J;if(typeof D[F]!="string"){J=I.data;I=I.nodeTo}E.addAdjacence(H[G],K(I),J)}}})(A,B)}return A},loadTree:function(A){this.graph=this.construct(A)},loadGraph:function(A){this.graph=this.construct(A)},flagRoot:function(A){this.unflagRoot();this.graph.nodes[A]._root=true},unflagRoot:function(){GraphUtil.eachNode(this.graph,function(A){A._root=false})},getRoot:function(){var A=false;GraphUtil.eachNode(this.graph,function(B){if(B._root){A=B}});return A},loadTreeFromJSON:function(A){this.json=A;this.loadTree(A);this.root=A.id},loadGraphFromJSON:function(B,A){this.json=B;this.loadGraph(B);this.root=B[A?A:0].id},refresh:function(A){if(A){this.reposition();GraphUtil.eachNode(this.graph,function(B){B.startPos=B.pos=B.endPos})}else{this.compute()}this.plot()},reposition:function(){this.compute("endPos");var A=this.graph.getNode(this.root).pos.toComplex().$scale(-1);GraphUtil.moebiusTransformation(this.graph,[A],["endPos"],"endPos","ignore");GraphUtil.eachNode(this.graph,function(B){if(B.ignore){B.endPos=B.pos}})},plot:function(){GraphPlot.plot(this,this.controller)},compute:function(B){var C=B||["pos","startPos"];var A=GraphUtil.getNode(this.graph,this.root);A._depth=0;this.flagRoot(this.root);GraphUtil.computeLevels(this.graph,this.root,"ignore");this.computeAngularWidths();this.computePositions(C)},computePositions:function(H){var I=(typeof H=="array"||typeof H=="object")?H:[H];var D=this.graph,F=GraphUtil;var G=this.graph.getNode(this.root),E=this,A=Config;for(var C=0;C<I.length;C++){G[I[C]]=new Polar(0,0)}G.angleSpan={begin:0,end:2*Math.PI};G._rel=1;var B=(function(){var L=0;F.eachNode(D,function(M){L=(M._depth>L)?M._depth:L},"ignore");for(var K=0.51;K<=1;K+=0.01){var J=(function(M,N){return(1-Math.pow(M,N))/(1-M)})(K,L+1);if(J>=2){return K-0.01}}return 0.5})();F.eachBFS(this.graph,this.root,function(M){var K=M.angleSpan.end-M.angleSpan.begin;var N=M.angleSpan.begin;var L=(function(O){var P=0;F.eachSubnode(D,O,function(Q){P+=Q._treeAngularWidth},"ignore");return P})(M);var J=(function(S,O){for(var Q=1,R=0,P=O;Q<=S+1;Q++){R+=P;P*=O}return R})(M._depth,B);F.eachSubnode(D,M,function(R){if(!R._flag){R._rel=R._treeAngularWidth/L;var Q=R._rel*K;var P=N+Q/2;for(var O=0;O<I.length;O++){R[I[O]]=new Polar(P,J)}R.angleSpan={begin:N,end:N+Q};N+=Q}},"ignore")},"ignore")},setAngularWidthForNodes:function(){var C=Config.nodeRangeValues,A=Config.nodeRangeDiameters,D=Config.nodeRadius;var B=function(E){return(((A.max-A.min)/(C.max-C.min))*(E-C.min)+A.min)};GraphUtil.eachBFS(this.graph,this.root,function(H,F){var I=(Config.allowVariableNodeDiameters&&H.data&&H.data.length>0)?H.data[0].value:D;var G=B(I);var E=F;H._angularWidth=G/E;H._radius=G/2})},setSubtreesAngularWidth:function(){var A=this;GraphUtil.eachNode(this.graph,function(B){A.setSubtreeAngularWidth(B)})},setSubtreeAngularWidth:function(D){var C=this,B=D._angularWidth,A=0;GraphUtil.eachSubnode(this.graph,D,function(E){C.setSubtreeAngularWidth(E);A++});D._treeAngularWidth=Math.max(B,A)},computeAngularWidths:function(){this.setAngularWidthForNodes();this.setSubtreesAngularWidth()},onClick:function(B){var A=this.graph.getNode(B).pos.toComplex();this.move(A)},move:function(D){var B=new Complex(D.x,D.y);if(this.busy===false&&B.norm()<1){this.busy=true;var A=this.graph.getNode(this.root),C=this;this.controller.onBeforeCompute(A);if(B.norm()<1){GraphPlot.animate(this,$_.merge(this.controller,{modes:["moebius"],hideLabels:true,onComplete:function(){C.busy=false}}),B)}}}};var Graph=function(){this.nodes={}};Graph.prototype={getNode:function(A){if(this.hasNode(A)){return this.nodes[A]}return false},getAdjacence:function(C,A){var B=[];if(this.hasNode(C)&&this.hasNode(A)&&this.nodes[C].adjacentTo({id:A})&&this.nodes[A].adjacentTo({id:C})){B.push(this.nodes[C].getAdjacency(A));B.push(this.nodes[A].getAdjacency(C));return B}return false},addNode:function(A){if(!this.nodes[A.id]){this.nodes[A.id]=new Graph.Node(A.id,A.name,A.data)}return this.nodes[A.id]},addAdjacence:function(D,C,B){var E=[];if(!this.hasNode(D.id)){this.addNode(D)}if(!this.hasNode(C.id)){this.addNode(C)}D=this.nodes[D.id];C=this.nodes[C.id];for(var A in this.nodes){if(this.nodes[A].id==D.id){if(!this.nodes[A].adjacentTo(C)){E.push(this.nodes[A].addAdjacency(C,B))}}if(this.nodes[A].id==C.id){if(!this.nodes[A].adjacentTo(D)){E.push(this.nodes[A].addAdjacency(D,B))}}}return E},removeNode:function(C){if(this.hasNode(C)){var B=this.nodes[C];for(var A=0 in B.adjacencies){var adj=B.adjacencies[A];this.removeAdjacence(C,adj.nodeTo.id)}delete this.nodes[C]}},removeAdjacence:function(E,D){if(this.hasNode(E)){this.nodes[E].removeAdjacency(D)}if(this.hasNode(D)){this.nodes[D].removeAdjacency(E)}},hasNode:function(D){return D in this.nodes}};Graph.Node=function(F,D,E){this.id=F;this.name=D;this.data=E;this.drawn=false;this.angleSpan={begin:0,end:0};this.pos=new Polar(0,0);this.startPos=new Polar(0,0);this.endPos=new Polar(0,0);this.alpha=1;this.startAlpha=1;this.endAlpha=1;this.adjacencies={}};Graph.Node.prototype={adjacentTo:function(D){return D.id in this.adjacencies},getAdjacency:function(D){return this.adjacencies[D]},addAdjacency:function(E,F){var D=new Graph.Adjacence(this,E,F);return this.adjacencies[E.id]=D},removeAdjacency:function(D){delete this.adjacencies[D]}};Graph.Adjacence=function(D,F,E){this.nodeFrom=D;this.nodeTo=F;this.data=E;this.alpha=1;this.startAlpha=1;this.endAlpha=1};var Trans={linear:function(D){return D},Quart:function(D){return Math.pow(D,4)},easeIn:function(D,E){return D(E)},easeOut:function(D,E){return 1-D(1-E)},easeInOut:function(D,E){return(E<=0.5)?D(2*E)/2:(2-D(2*(1-E)))/2}};var Animation={duration:Config.animationTime,fps:Config.fps,transition:function(D){return Trans.easeInOut(Trans.Quart,D)},controller:false,getTime:function(){var D=(Date.now)?Date.now():new Date().getTime();return D},step:function(){var D=this.getTime();if(D<this.time+this.duration){var E=this.transition((D-this.time)/this.duration);this.controller.compute(E)}else{this.timer=clearInterval(this.timer);this.controller.compute(1);this.controller.complete()}},start:function(){this.time=0;this.startTimer();return this},startTimer:function(){if(this.timer){return false}this.time=this.getTime()-this.time;this.timer=setInterval((function(){Animation.step()}),Math.round(1000/this.fps));return true}};
