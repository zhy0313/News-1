$(document).ready(function(){
    $('#user_name').bind('blur',function(){ // 检查账号合法性
        var user_name=$('#user_name').val();
        if(user_name.length<6){
             $('.warn-info').first().text('* 用户名至少6位字符');
             return;
        }
        $.ajax({
            url:"client/backend/php/checkUserName.php?user_name="+user_name,
            method:"get",
            success:function(data){
                if(data.num>0){
                    $('.warn-info').first().text('* 用户名重复');
                }else{
                    $('.warn-info').first().text('');
                }
            }
        });
    });
    $("#signUp input:eq(1)").bind('blur',function(){
        var password=$(this).val();
        if(password.length<6){
            $('.warn-info:eq(1)').text('* 密码至少6位字符');
        }else{
            $('.warn-info:eq(1)').text('');
        }
    });
    $('#signUp input:eq(2)').bind('blur',function(){
        var rePassword=$(this).val();
        var password=$('#signUp input:eq(1)').val();
        if(password!==rePassword){
            $('.warn-info:eq(2)').text('* 密码不一致');
        }else{
            $('.warn-info:eq(2)').text('');
        }
    });
    $('#signUp input:eq(3)').bind('blur',function(){
        var email=$(this).val();
        var reg=/^\w+@\w+\.(com)$/;
        if(!email.match(reg)){
            $('.warn-info:eq(3)').text('* 不是有效邮箱');
        }else{
            $('.warn-info:eq(3)').text('');
        }
        $.ajax({
            url:"client/backend/php/checkEmail.php?email="+email,
            method:"get",
            success:function(data){
                if(data.num>0){
                    $('.warn-info:eq(3)').text('* 邮箱已经被注册');
                }else{
                    $('.warn-info:eq(3)').text('');
                }
            }
        });
    });
    $('#signUp .modal-footer button').eq(1).bind('click',function(){
        var toUp=true;
        var user_name=$('#user_name').val();
        var password=$('#signUp input:eq(1)').val();
        var rePassword=$('#signUp input:eq(2)').val();
        var email=$('#signUp input:eq(3)').val();

        if(user_name.length<6||password.length<6||rePassword!==password){
            toUp=false;
        }
        var reg=/^\w+@\w+\.(com)$/;
        if(!email.match(reg)){
            toUp=false;
        }        
        if(!toUp){
             $('#signUp .modal-footer span').text("* 信息不完整或不合法");
             return;
        }else{
            $('#signUp .modal-footer span').text("");
        }
        
        $.ajax({
            url:"client/backend/php/up.php",
            method:"post",
            datatype:JSON,
            data:{user_name:user_name,password:password,email:email},
            success:function(data){
                if(data.code===0){
                   alert("成功注册");
                }else{
                   alert("注册失败");
                }
            }
        });
    });
    
});

