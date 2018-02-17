$.fn.myGame = function(option){
    var defaultOption = {
        width:2,
        height:2,
        style:{
            bg_color:"rgb(184,175,158)",
            block_bg_color:"rgb(204,192,178)",
            block_size:100,
            padding:15
        },
        block_style:{
            "font-family": "微软雅黑",
            "font-weight": "bold",
            "text-align": "center"
        },
        blocks:[
            {level: 0, value: 2, style:{ "background-color": "rgb(238,228,218)", "color":"rgb(124,115,106)", "font-size": 58 }},
            {level: 1, value: 4, style:{ "background-color": "rgb(236,224,200)", "color":"rgb(124,115,106)", "font-size": 58 }},
            {level: 2, value: 8, style:{ "background-color": "rgb(242,177,121)", "color":"rgb(255,247,235)", "font-size": 58 }},
            {level: 3, value: 16, style:{ "background-color": "rgb(245,149,99)", "color":"rgb(255,250,235)", "font-size": 50 }},
            {level: 4, value: 32, style:{ "background-color": "rgb(244,123,94)", "color":"rgb(255,247,235)", "font-size": 50 }},
            {level: 5, value: 64, style:{ "background-color": "rgb(247,93,59)", "color":"rgb(255,247,235)", "font-size": 50 }},
            {level: 6, value: 128, style:{ "background-color": "rgb(236,205,112)", "color":"rgb(255,247,235)", "font-size": 42 }},
            {level: 7, value: 256, style:{ "background-color": "rgb(237,204,97)", "color":"rgb(255,247,235)", "font-size": 42 }},
            {level: 8, value: 512, style:{ "background-color": "rgb(236,200,80)", "color":"rgb(255,247,235)", "font-size": 42 }},
            {level: 9, value: 1024, style:{ "background-color": "rgb(237,197,63)", "color":"rgb(255,247,235)", "font-size": 34 }},
            {level: 10, value: 2048, style:{ "background-color": "rgb(238,194,46)", "color":"rgb(255,247,235)", "font-size": 34 }},
            {level: 11, value: 4096, style:{ "background-color": "rgb(61,58,51)", "color":"rgb(255,247,235)", "font-size": 34 }}]
    }
    if(this.length > 1) throw"游戏只能单开";
    if(this.length == 0) throw"未找到游戏容器";
//
    var $this = $(this[0]);
    option = $this.extend({},defaultOption,option);
//
    $this.css({
        "background-color":option.style.bg_color,
        "border-radius":option.style.padding,
        "-webkit-user-select":"none",
        "position":"relative",
    })
    var state = [];
    //
    function buildBackground(){
        var backgrounds = [];
        for(var x = 0;x<option.width;x++){
            for(var y = 0;y<option.height;y++){
                var bg_block = $("<div></div>");
                state.push(null);
                var position = getPosition(x,y);
                bg_block.css({
                    "position":"absolute",
                    "background-color":"rgb(204,192,178)",
                    "top":position.top,
                    "left":position.left,
                    "width":option.style.block_size,
                    "height":option.style.block_size
                })
                backgrounds.push(bg_block);
            }
        }
        $this.append(backgrounds);
        $this.width((option.style.padding + option.style.block_size) * option.width + option.style.padding );
        $this.height((option.style.padding + option.style.block_size) * option.height + option.style.padding );
    }
    buildBackground();
//
function getPosition(x,y){
    return {
        "top":option.style.padding + y * (option.style.block_size + option.style.padding) ,
        "left":option.style.padding + x * (option.style.block_size + option.style.padding)
    }
}

function getBlockIndex(){
   var emptyBLockIndex=[]
   $(state).map(function(i,o){ 
    if(o == null) emptyBLockIndex.push(i);
   })
   return emptyBLockIndex ;
}

function getIndex(x,y){
    return x +  y *option.width;
}

function getCoordinate(index){
   return{
       x:index % option.width,
       y:Math.floor(index /option.width)
   }
}

function getBlock(x,y){
    return state[getIndex(x,y)];
}

    function bulidBlock(level,x,y){
        var emptyBLockIndex = getBlockIndex();
        if(emptyBLockIndex.length == 0) return;
        var putIndex;
        if(x != undefined && y != undefined) putIndex = getIndex(x,y);
        else{
        putIndex =  emptyBLockIndex[Math.floor(Math.random()*emptyBLockIndex.length)];
        }
        if(state[putIndex] != null) throw"块已经存在";;
        var block;
        if(level !== undefined) block = $.extend({},option.blocks[level]);
        else{
        block = Math.random() > 0.5 ? option.blocks[0] :option.blocks[1];
        }
        var coordinate = getCoordinate(putIndex);
        var position = getPosition(coordinate.x,coordinate.y);
        var block_Dom = $('<div></div>');
        block_Dom.addClass("block_"+coordinate.x+"_"+coordinate.y);
        block_Dom.css($.extend(option.block_style,{
            "top":position.top + option.style.padding/2,
            "left":position.left + option.style.padding/2,
            "width":0,
            "height":0,
            "position":"absolute",
            "line-height":option.style.block_size + "px"
        },block.style));
        $this.append(block_Dom);
        state[putIndex] = block;
        block_Dom.animate({
            "top":position.top,
            "left":position.left,
            "width":option.style.block_size,
            "height":option.style.block_size
        },200,(function(block_Dom){
            block_Dom.html(block.value)
        })(block_Dom))
        //
        if(emptyBLockIndex.length == 1){
            var canMove = false;
            for(var x = 0;x<option.width;x++){
                for(var y = 0;y<option.height;y++){
                    if(y>0&&state[getIndex(x,y-1)].value == state[getIndex(x,y)].value){
                        canMove =true;
                    }
                    if(y<option.height-1 &&state[getIndex(x,y+1)].value == state[getIndex(x,y)].value){
                        canMove = true;
                    }
                    if(x>0&&state[getIndex(x-1,y)].value == state[getIndex(x,y)].value){
                        canMove =true;
                    }
                    if(x<option.width-1 &&state[getIndex(x+1,y)].value == state[getIndex(x,y)].value){
                        canMove = true;
                    }
                }
            }
            if(!canMove){
                gameEnd();
                return false;
              }
        }
    }
  
//  
    var lastMoveTime =0;
    var move = function(direction){
        if(new Date() - lastMoveTime <220) return ;
        lastMoveTime = new Date();
        var moveX,moveY,startX,startY,endX,endY;
        var doActioned = false;
        switch(direction){
        case "top":
            startX = 0;
            endX = option.width - 1;
            startY = 1;
            moveY = -1;
            moveX =0;
            endY = option.height -1;
            break;
            case "down":
            startY = option.height -2;
            endY = 0;
            moveY = 1;
            startX = 0;
            endX = option.width -1;
            moveX = 0;
            break;
        case "right":
            startX = option.width -2;
            endX = 0;
            moveX = 1;
            startY = 0;
            endY = option.height -1;
            moveY = 0;
            break;
        case "left":
            startX = 1;
            endX = option.width -1;
            moveX = -1;
            startY = 0;
            endY = option.height -1;
            moveY = 0;
            break;
        }
      
        for(var x = startX;x<= Math.max(startX,endX) && x>= Math.min(startX,endX);endX > startX? x++ : x--){
          for(var y = startY;y<= Math.max(startY,endY)&& y>= Math.min(startY,endY);endY > startY? y++ : y--){
                console.log(x,y)
                var block = getBlock(x,y);    
                if(block == null) continue;
                var moved = 0;
                var target_coordinate = {x:x,y:y};
                var target_block;
                do{
                    if(++moved > Math.max(option.width,option.height)) break;
                    target_coordinate.x += moveX;
                    target_coordinate.y += moveY;
                    target_block = getBlock(target_coordinate.x,target_coordinate.y);
                    if(direction == "top" || direction == "down"){
                        if(target_coordinate.y == 0 || target_coordinate.y == option.height -1) break;
                    }
                    if(direction == "right" || direction == "left"){
                        if(target_coordinate.x == 0 || target_coordinate.x == option.width -1) break;
                    }
              }
              while(target_block == null);
              //
              var blockDom = $(".block_" + x + "_" + y);
              if(target_block == null){
                  var position = getPosition(target_coordinate.x,target_coordinate.y);
                  state[getIndex(x,y)] = null;
                  state[getIndex(target_coordinate.x,target_coordinate.y)] = block;
                  blockDom.removeClass();
                  blockDom.addClass("block_"+target_coordinate.x+"_"+target_coordinate.y)
                  position = getPosition(target_coordinate.x,target_coordinate.y);
                  blockDom.animate({
                    "top":position.top,
                    "left":position.left,
                  },200)
              }else if(target_block.value == block.value && !target_block.justModified){
                  var position = getPosition(target_coordinate.x,target_coordinate.y);
                  var updatedBlock  = $.extend({},option.blocks[block.level + 1]);
                  updatedBlock.justModified = true;
                  if(updatedBlock.level == option.blocks.length - 1){
                    gameEnd();
                  }
                  state[getIndex(x,y)] = null;
                  state[getIndex(target_coordinate.x,target_coordinate.y)] = updatedBlock;
                  var target_blockDom = $(".block_"+ target_coordinate.x+"_"+target_coordinate.y);
                  var position = getPosition(target_coordinate.x,target_coordinate.y);
                  blockDom.animate({
                      "top":position.top,
                      "left":position.left
                  },200,(function(blockDom,target_blockDom,updatedBlock){
                      return function(){
                          blockDom.remove();
                          target_blockDom.html(updatedBlock.value);
                          target_blockDom.css(updatedBlock.style);
                      };
                  }
                  )(blockDom,target_blockDom,updatedBlock))
                       
              }else if(target_block.value != block.value || moved >1 ){
                    target_coordinate.x = target_coordinate.x  - moveX;
                    target_coordinate.y = target_coordinate.y - moveY;
                    if(target_coordinate.x  == x && target_coordinate.y == y) continue;
                    state[getIndex(x,y)] = null;
                    state[getIndex(target_coordinate.x,target_coordinate.y)] = block
                    var position = getPosition(target_coordinate.x,target_coordinate.y);
                    blockDom.removeClass();
                    blockDom.addClass("block_"+target_coordinate.x+"_"+target_coordinate.y);
                    blockDom.animate({
                        "top":position.top,
                        "left":position.left
                    },200,)
              }
              else{
                  continue;
              }
              doActioned = true;
              //
            }
        }
        for(var x = 0;x<option.width;x++){
            for(var y = 0;y<option.height;y++){
                var block = getBlock(x,y);
                if(block == null) continue;
                delete block.justModified;
            }
        }
        if(doActioned){
            bulidBlock();
        }
    }
    
    var keyHandler = function(evt){
        switch(evt.which){
            case 37:
            console.log("lefy");
            move("left")
            break;
            case 38:
            move("top")
            break;
            case 39:
            move("right");
            break;
            case 40:
            move("down");
            break
        }
    }
    var mouseStartPoint = null;
    var mouseHandler = function(evt){
      if(evt.type == "mousedown" && mouseStartPoint == null){
        mouseStartPoint = {x: evt.pageX, y: evt.pageY};
      }
      if(evt.type == "mouseup"){
        var xDistance = evt.pageX - mouseStartPoint.x;
        var yDistance = evt.pageY - mouseStartPoint.y;
        if(Math.abs(xDistance) + Math.abs(yDistance) > 20){
          if(Math.abs(xDistance) >= Math.abs(yDistance)){
            if(xDistance > 0){
              move("right");
            }else{
              move("left");
            }
          }else{
            if(yDistance > 0){
              move("down");
            }else{
              move("up");
            }
          }
        }
        mouseStartPoint = null;
      }
    }

//
    var gameStart =function(){
        $(document).on("keydown",keyHandler);
        $(document).on("mousedown",mouseHandler);
        $(document).on("mouseup",mouseHandler);

        $(this).html('');
        state = [];
        buildBackground();
        bulidBlock();
        console.log("游戏开始")
    }
    var gameEnd = function(){
        $(document).off("keydown",keyHandler);
        $(document).off("mousedown",mouseHandler);
        $(document).off("mouseup",mouseHandler); 
        var score = 0;
        for(var i=0; i<state.length; i++){
          if(state[i] == null) continue;
          score += Math.pow(2, state[i].level + 1);
        }
        console.log("游戏结束, 您的分数为:", score);
        var $endMask = $("<div></div>");
        var $mask = $("<div></div>")
        $mask.css({
          "background-color": option.style.background_color,
          "border-radius": option.style.padding,
          "position": "relative",
          "-webkit-user-select": "none",
          "opacity": 0.2,
          "width": $this.width,
          "height": $this.height
        })
        var $title = $("<h1>游戏结束</h1>");
        var $result = $("<p>您的分数为:" + score + "</p>");
        var $again = $("<button>再玩一次</button>");
        $again.click(function(evt){
          evt.preventDefault();
         
          gameStart();
          $endMask.remove();
        })
        var $content = $("<div></div>");
        $content.css({
          "width": "200px",
          "text-align": "center",
          "margin": "0 auto",
          "position": "absolute",
          "top": "50%",
          "transform": "translate(-50%, -50%)",
          "left": "50%",
          "padding": 10,
          "background-color": option.style.block_background_color
        })
        $endMask.append($mask)
        $content.append($title);
        $content.append($result);
        $content.append($again);
        $endMask.append($content);
        $this.append($endMask);
      }
      gameStart();
    }
  
