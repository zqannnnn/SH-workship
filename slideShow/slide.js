$.fn.slideshow = function(times){
    var $this = $(this);
    var controls = $this.map(function(i,o){
        var $o = $(o);
        var $imgs = $o.find('img');
        if($imgs == undefined) throw "There are no images";
        $imgs.hide().eq(0).show();
        
        var runId = 0;
        var num = 0;
        var runtime = (times && times * 1000) || 1000;
        var max = $imgs.length -1 ;

        function showImg(index){
            $imgs.fadeOut().eq(index).fadeIn();
        }
        var start = function(){
            if(runId == 0){
            runId = setInterval(function(){
                if(num >= max) num = -1;
                showImg(++num);
            },runtime)
        }}
        start();
        var stop = function(){
            clearInterval(runId);
            runId = 0;
        }
        return {
            start:start,
            stop:stop
        }
    })
    return{
        start:function(index){
            if(index == undefined){
                for(var i = 0;i<controls.length;i++){
                    controls[i].start();
                }
            }else{
                controls[index].start();
            }
        },
        stop:function(index){
            if(index == undefined){
                for(var i = 0;i<controls.length;i++){
                    controls[i].stop();
                }
            }else{
               controls[index].stop();
            }
        }
    }
}