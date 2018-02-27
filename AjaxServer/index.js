var express = require('express');
var port = 3000;
var app = express();//服务器app；

var DB;
app.use("/",express.static("static"));
app.listen(port);

app.get("/api/add_comment",function(req,res,next){
    DB.push({
        username:req.query.username,
        comment:req.query.comment,
        date:new Date()
    })
    res.send(JSON.stringify(DB));
})
//req.query.username;req.query.comment;
//post
//require ('body-parser');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));