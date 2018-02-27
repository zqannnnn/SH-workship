$("#commentForm").submit(function(evt){
    evt.preventDefault();
    $.ajax("/api/add_comment",{
        type:"GET",
        data:{
            username:$('username').val(),
            comment:$('comment').val()
        },
        success:function(result){
            var comments = JSON.parse(result);
            console.log(result);
            console.log("提交成功");
            
        }
    })
    return false;
})  
