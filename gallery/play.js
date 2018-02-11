function xyGallery(id,option){
    var container = document.getElementById(id);
    if(container.className.indexOf(my_gallery) == -1) container.className = 'my-gallery';
    var defaultOption = {
        defaultWidth : 50,
        defaultHeight : 50,
        activeWidth : 350,
        activeHeight : 350,
        runSpeed : 200
    }
    option = $.extend({},defaultOption,option);
   if(option.height == undefined) throw"height can not be defined";
   if(option.width == undefined) throw"width can not be defined";

   container.style.width = option.activeWidth + (option.defaultWidth * 2)+ "px";
   var runId = 0
   var lastTime = new Date(0);
   function activePicture(index){
        clearTimeout(runId);
       var currentTime = new Date();
       if(currentTime - lastTime <200){
           runId = setTimeout(function(){
               activePicture(index)
           },200)
           return;
       }
       lastTime = currentTime;
       var cx = index % option.width;
       var cy = Math.floor(index/option.width);
       for(var y = 0;y<option.height;y++){
           for(var x = 0;x<option.width;x++){
                var cIndex = x + y * option.width;
                var item = container.children[cIndex];
                if(cx == x && cy == y){
                    item.className = "active";
                    item.style.width = option.activeWidth + "px";
                    item.style.height = option.activeHeight + "px";
                }else if(cx == x){
                    item.className = "";
                    item.style.width = option.activeWidth + "px";
                    item.style.height = option.defaultHeight + "px";
                }else if(cy == y){
                    item.className = "";
                    item.style.width = option.defaultWidth + "px";
                    item.style.height = option.activeHeight + "px";
                }else{
                    item.className = "";
                    item.style.width = option.defaultWidth + "px";
                    item.style.height = option.defaultHeight + "px";
                }
           }
       }
   }
   activePicture(0);
   Array.prototype.forEach.call(container.children,function(o,i){
       o.addEventListener("mouseover",function(evt){
           activePicture(i);
       })
   })
}