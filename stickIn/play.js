var context = document.getElementById('canvas');
var ctx = context.getContext('2d');

//defaultOption
var level;
if(parseInt(window.location.href.split("#")[1])){
    level =(parseInt(window.location.href.split("#")[1]));
}else{
    level = 0;
}

var centerX = 300;
var centerY = 200;
var centerRad = 50;

var levelArray = [
    {"initNum":4,"waitNum":7,"speed":200},
    {"initNum":4,"waitNum":8,"speed":180},
    {"initNum":5,"waitNum":5,"speed":160},
    {"initNum":3,"waitNum":5,"speed":140},
    {"initNum":4,"waitNum":8,"speed":120},
    {"initNum":5,"waitNum":5,"speed":100},
    {"initNum":6,"waitNum":7,"speed":90}
]

var balls = [];
var ballNum = levelArray[level].initNum;
var linelen = 130;
var ballRadius = 10;

for(var i = 0;i<ballNum;i++){
    var angle = (360/ballNum) * (i+1);
    balls.push({"angles":angle,"numStr":""});
}

var waitballs = [];
var waitNum = levelArray[level].waitNum;
var waitOffset = 380;
var waitRadius = 10;

for(var i = waitNum;i>0;i--){
    waitballs.push({"angle":"","numStr":i})
}

function bigBall(){
    ctx.fillStyle = "black";
    ctx.beginPath(); 
    ctx.arc(centerX,centerY,centerRad,0,2*Math.PI,false);
    ctx.closePath();
    ctx.fill();
  
  
}

function drawBall(deg){
    balls.map(function(o){
        ctx.save();
        o.angles += deg;
        if(o.angles>=360){
            o.angles = 0;
        }
        var rad = o.angles*Math.PI/180;//角度转弧度
        var cx = centerX + linelen*Math.cos(rad);
        var cy = centerY + linelen*Math.sin(rad);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.moveTo(centerX,centerY);
        ctx.lineTo(cx,cy);
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(cx,cy,ballRadius,0,Math.PI*2,false);
        ctx.fill();
        if(o.numStr){    
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.font = "10px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";  
            ctx.strokeText(o.numStr,cx,cy);
            ctx.closePath();
        }
    })
}

function drawWait(){
    var waitY = waitOffset;
    waitballs.map(function(o){ 
        ctx.beginPath();
        ctx.arc(centerX,waitY,waitRadius,0,Math.PI*2,false);
        ctx.fillStyle = "black";
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";  
        ctx.strokeText(o.numStr,centerX,waitY);
        ctx.closePath();
        waitY += 3*waitRadius
    })
}


setInterval(function(){
    ctx.clearRect(0,0,600,600);
    bigBall();
    drawBall(10)
    drawWait();

},levelArray[level].speed);

var state;
document.onclick = function(){
    var failed = false;
    var ball = waitballs.shift();
    ball.angles = 90;

    balls.forEach(function(o,i){
        if(failed) return;
        if(Math.abs(o.angles - ball.angles)/2< 360*ballRadius/(linelen*Math.PI)){
            state = 0;
            failed = false;
        }else if(i === balls.length -1 && waitballs.length ===0 ){
            state = 1;
            failed = true;
        }
    })
    balls.push(ball);

    if(state == 0){
        alert("you failed in this game");
        window.location.href = "index.html#"+level;
    }
    if(state == 1){
        alert("go to the next level");
        level++;
        window.location.href = "index.html#" +level;
    }
}