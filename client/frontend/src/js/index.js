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
        if(password!=rePassword){
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
    });
});

