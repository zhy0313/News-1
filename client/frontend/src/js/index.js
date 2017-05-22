$(document).ready(function(){
    $("#sendCode").click(function(){
        var email=$("#signUp .modal-body input").val();
        $.ajax({
            url:"client/backend/php/sendCode.php?email="+email,
            method:"get",
            success:function(data){
                if(data.code==1){
                    console.log("无重复");
                }
            }
        });
    });
});

