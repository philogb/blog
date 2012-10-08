//opt.offset = 2;
//opt.titleHeight = 0;
TM.SliceAndDice.implement({ 
   leafBox: function(json, coord) { 
    var config = this.config; 
    var backgroundColor = config.Color.allow && this.setColor(json), 
    offst = config.offset, 
    width = coord.width - offst, 
    height = coord.height - offst; 
    var c = { 
     'top': (offst / 2) + "px", 
     'height':height + "px", 
     'width': width + "px", 
     'left': (offst / 2) + "px" 
    }; 
    if(backgroundColor) c['background-color'] = backgroundColor; 
    return "<div class=\"leaf\" style=\"" + this.toStyle(c) + "\">" + "<img src=\"gradient.png\" style=\"position:absolute; z-index:2; top:0; left:0; width:" + c.width + "; height:"+ c.height +"; \" />" + json.name + "</div>"; 
   } 
});
TM.Squarified.implement({ 
   leafBox: function(json, coord) { 
    var config = this.config; 
    var backgroundColor = config.Color.allow && this.setColor(json), 
    offst = config.offset, 
    width = coord.width - offst, 
    height = coord.height - offst; 
    var c = { 
     'top': (offst / 2) + "px", 
     'height':height + "px", 
     'width': width + "px", 
     'left': (offst / 2) + "px" 
    }; 
    if(backgroundColor) c['background-color'] = backgroundColor; 
    return "<div class=\"leaf\" style=\"" + this.toStyle(c) + "\">" + "<img src=\"gradient.png\" style=\"position:absolute; z-index:2; top:0; left:0; width:" + c.width + "; height:"+ c.height +"; \" />" + json.name + "</div>"; 
   } 
});
