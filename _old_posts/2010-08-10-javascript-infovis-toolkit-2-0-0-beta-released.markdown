--- 
wordpress_id: 1568
layout: post
title: JavaScript InfoVis Toolkit 2.0.0 beta released
categories: [JavaScript InfoVis Toolkit, Version]
wordpress_url: /?p=1568
---
After many bug fixes, some tweaks to the documentation and new features the <a href="http://thejit.org/">JavaScript InfoVis Toolkit</a> 2.0.0 beta is ready!
Most of the bug fixes were on the TreeMap visualization, the generic graph morph operation, the Events system and the AreaChart visualization. If you'd like to see the commits in more detail you can take a look <a href="http://github.com/philogb/jit/commits/master">here</a>.
Some API enhancements include the ability to add edge events. This is still kind of an experimental feature, but if you'd like to know more about this you can read the <a href="http://thejit.org/static/v20/Docs/files/Options/Options-Events-js.html">Options.Events documentation</a>.
The main reason to tag this as a beta release is that besides some <a href="http://github.com/philogb/jit/issues">known issues</a> this version has proved to be pretty stable. This version is currently being used at <a href="http://exalead.com">Exalead</a> for customer projects and proved to be reliable. <a href="http://googlewavedev.blogspot.com/2010/07/wave-visualizer-turning-trees-into.html">Google</a> and <a href="http://www.mozilla.org/community/universe.html">Mozilla</a> are also using the toolkit, which is great news.

<h4>Builder</h4>
With this beta release I'm also releasing a <a href="http://thejit.org/builder/">custom toolkit builder</a>. The custom builder enables you to make your own build by choosing the visualizations you need and keeping out the code of the visualizations you don't need. As more visualizations get added to the toolkit this will be a key component to optimize your web page loading. Currently the <a href="http://thejit.org/builder/">builder</a> is on an experimental phase, but I strongly recommend you to check it out, custom builds can make a strong optimization difference.
