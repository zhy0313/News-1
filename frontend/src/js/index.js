$(document).ready(function(){
    $('#user_name').bind('blur',function(){ // 检查账号合法性
        var user_name=$('#user_name').val();
        if(user_name.length<6){
             $('.warn-info').first().text('* 用户名至少6位字符');
             return;
        }
        $.ajax({
            url:"backend/php/checkUserName.php?user_name="+user_name,
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
            url:"backend/php/checkEmail.php?email="+email,
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
            url:"backend/php/up.php",
            method:"post",
            datatype:JSON,
            data:{user_name:user_name,password:password,email:email},
            success:function(data){
                if(data.code===0){
                   alert("注册成功");
                   $("#signUp").modal('hide');
                }else{
                    $('#signUp .modal-footer span').text("* 注册失败");                }
            }
        });
    });
    $('#signIn .modal-body input').first().bind('blur',function(){
        if($(this).val().length===0){
            $('#signIn .warn-info').first().text("* 邮箱不得为空");
            return;
        }else{
            $('#signIn .warn-info').first().text("");
        }
        var email=$(this).val();
        var reg=/^\w+@\w+\.(com)$/;
        if(!email.match(reg)){
            $(this).next().text('* 不是有效邮箱');
        }else{
           $(this).next().text('');
        }
    });
    $('#signIn .modal-body input:eq(1)').bind('blur',function(){
        if($(this).val().length===0){
            $(this).next().text("* 密码不得为空");
        }else{
            $(this).next().text("");
        }
    });
    
    $('#signIn .modal-footer button:eq(1)').bind('click',function(){
        var email= $('#signIn .modal-body input').first().val();
        var password=$('#signIn .modal-body input:eq(1)').val();
        var reg=/^\w+@\w+\.(com)$/;
        if(!email||!email.match(reg)||!password){
            $('#signIn .modal-footer .warn-info').text('* 信息不完整或不合法');
        }else{
            $('#signIn .modal-footer .warn-info').text('');
        }
        $.ajax({
            url:"backend/php/in.php",
            method:"post",
            datatype:JSON,
            data:{password:password,email:email},
            success:function(data){
                if(data.code===0){
                   alert("登录成功");
                   var right=$('.navbar-nav.navbar-right');
                   right.children().first().removeClass('hide').show();
                   right.children().eq(1).hide();
                   right.children().eq(2).hide();
                   $('.navbar-nav.navbar-right li.dropdown>a').html(data.data.user_name+'<span class="glyphicon glyphicon-menu-down"></span>');
                 //  console.log( $('.navbar-nav.navbar-right li.dropdown>a')[0]);
                   $.cookie('user_name',data.data.user_name);
                   $('#signIn').modal('hide');
                }else{
                    $('#signIn').find('.warn-info').last().text('* '+data.msg);
                }
            }
        });
    });
});

