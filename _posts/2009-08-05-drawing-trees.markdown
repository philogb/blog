--- 
wordpress_id: 971
layout: post
title: Drawing Trees
categories: [Visualization]
wordpress_url: /?p=971
---
While trying to fix a <a href="http://github.com/philogb/jit/issues/closed#issue/1">SpaceTree layout issue</a> for version 1.1.2 of the <a href="http://thejit.org">JavaScript InfoVis Toolkit</a> I found a <a href="http://research.microsoft.com/en-us/um/people/akenn/fun/drawingtrees.pdf">Microsoft Research paper</a> that describes a functional programming approach for rendering trees in an aesthetically pleasing way.

But what is <em>aesthetically pleasing</em>?

Andrew J. Kennedy takes Radack and <a href="http://portal.acm.org/citation.cfm?id=79026">Walker rules</a>:

<em>
<ol>
<li>Two nodes at the same level should be placed at least a given distance apart.</li>
<li>A parent should be centred over its o?spring.</li>
<li>
Tree drawings should be symmetrical with respect to re?ection—a tree and 
its mirror image should produce drawings that are re?ections of each other. In 
particular, this means that symmetric trees will be rendered symmetrically.
</li>
<li>Identical subtrees should be rendered identically—their position in the larger 
tree should not a?ect their appearance.</li>
<li>
Trees should be as narrow as possible without violating these rules
</li>
</ol>
</em>

In order to calculate nodes' positions Kennedy takes a "bottom-up" approach:

Starting from the root node, draw for each node all its subtrees without breaking any rules. Fit these subtrees together without changing their shape, and also without breaking rules 1 and 3 (i.e do not break symmetry and avoid cluttering/overlapping of nodes). Finally, center their parent above them like specified in rule 2.

The "fitting" of the subtrees is calculated by operating on subtrees <em>extents</em>. A subtree extent is a data structure containing the relative coordinates of the boundary of a subtree. One frequent operation between extents is merging:

<img src="/blog/assets/merging-extents.png" style="padding:1px; border:1px solid cyan; margin:7px auto;" />
 
Other operations involve setting the distance between two extents, translating extents, etc.

<h4>Implementation</h4>

Kennedy implements this algorithm in Standard ML. I made a <a href="http://github.com/philogb/jit/blob/5b106d98c227c250330328c408642c5fd49e64da/Source/Spacetree.js#L219">JavaScript adaptation</a>. I like the Standard ML version a lot more; in this case rich typing makes very elegant code.

Here's my code implementation, in case you want to compare it to Kennedy's.
My version takes into account different tree layouts (left, right, bottom, top), siblings and subtrees offsets and different node sizes as opposed to Kennedy's version.

{% highlight js %}
 function movetree(node, prop, val, orn) {
   var p = (orn == "left" || orn == "right")? "y" : "x";
   node[prop][p] += val;
 };
 
 function moveextent(extent, val) {
     var ans = [];
     $each(extent, function(elem) {
         elem = slice.call(elem);
         elem[0] += val;
         elem[1] += val;
         ans.push(elem);
     });
     return ans;
 };
 
 function merge(ps, qs) {
   if(ps.length == 0) return qs;
   if(qs.length == 0) return ps;
   var p = ps.shift(), q = qs.shift();
   return [[p[0], q[1]]].concat(merge(ps, qs));
 };
 
 function mergelist(ls, def) {
     def = def || [];
     if(ls.length == 0) return def;
     var ps = ls.pop();
     return mergelist(ls, merge(ps, def));
 };
 
 function fit(ext1, ext2, subtreeOffset, siblingOffset, i) {
     i = i || 0;
     if(ext1.length <= i ||
        ext2.length <= i) return 0;
     
     var p = ext1[i][1], q = ext2[i][0];
     return Math.max(fit(ext1, ext2, subtreeOffset, siblingOffset, ++i) + subtreeOffset,
                 p - q + siblingOffset);
 };
 
 function fitlistl(es, subtreeOffset, siblingOffset) {
   function $fitlistl(acc, es, i) {
       i = i || 0;
       if(es.length <= i) return [];
       var e = es[i], ans = fit(acc, e, subtreeOffset, siblingOffset);
       return [ans].concat($fitlistl(merge(acc, moveextent(e, ans)), es, ++i));
   };
   return $fitlistl([], es);
 };
 
 function fitlistr(es, subtreeOffset, siblingOffset) {
   function $fitlistr(acc, es, i) {
       i = i || 0;
       if(es.length <= i) return [];
       var e = es[i], ans = -fit(e, acc, subtreeOffset, siblingOffset);
       return [ans].concat($fitlistr(merge(moveextent(e, ans), acc), es, ++i));
   };
   es = slice.call(es);
   var ans = $fitlistr([], es.reverse());
   return ans.reverse();
 };
 
 function fitlist(es, subtreeOffset, siblingOffset) {
    var esl = fitlistl(es, subtreeOffset, siblingOffset),
        esr = fitlistr(es, subtreeOffset, siblingOffset);
    for(var i = 0, ans = []; i < esl.length; i++) {
        ans[i] = (esl[i] + esr[i]) / 2;
    }
    return ans;
 };
 
 function design(graph, node, prop, config) {
     var orn = config.orientation;
     var auxp = ['x', 'y'], auxs = ['width', 'height'];
     var ind = +(orn == "left" || orn == "right");
     var p = auxp[ind], notp = auxp[1 - ind];
     
     var cnode = config.Node;
     var s = auxs[ind], nots = auxs[1 - ind];
 
     var siblingOffset = config.siblingOffset;
     var subtreeOffset = config.subtreeOffset;
     
     var GUtil = Graph.Util;
     function $design(node, maxsize, acum) {
         var sval = (cnode.overridable && node.data["$" + s]) || cnode[s];
         var notsval = maxsize || ((cnode.overridable && node.data["$" + nots]) || cnode[nots]);
         
         var trees = [], extents = [], chmaxsize = false;
         var chacum = notsval + config.levelDistance;
         GUtil.eachSubnode(node, function(n) {
             if(n.exist) {
                 if(!chmaxsize)
                    chmaxsize = getBoundaries(graph, config, n._depth);
                 
                 var s = $design(n, chmaxsize[nots], acum + chacum);
                 trees.push(s.tree);
                 extents.push(s.extent);
             }
         });
         var positions = fitlist(extents, subtreeOffset, siblingOffset);
         for(var i=0, ptrees = [], pextents = []; i < trees.length; i++) {
             movetree(trees[i], prop, positions[i], orn);
             pextents.push(moveextent(extents[i], positions[i]));
         }
         var resultextent = [[-sval/2, sval/2]].concat(mergelist(pextents));
         node[prop][p] = 0;
 
         if (orn == "top" || orn == "left") {
            node[prop][notp] = acum;
         } else {
            node[prop][notp] = -acum;
         }
         return {
           tree: node,
           extent: resultextent
         };
     };
     $design(node, false, 0);
 };
 
{% endhighlight %}
