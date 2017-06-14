<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
session_start();
$password=$_POST['password'];
$email=$_POST['email'];
$sql="select user_name from user where email = '{$email}' and password='{$password}'";
$result=$conn->query($sql);
$num=mysqli_num_rows($result);
if(!$result){ $code=2;$msg=mysql_error();}
else if($num==1){
    $code=0;$msg="登录成功";
    $_SESSION['email']=$email;
    $_SESSION['password']=$password;
    $_SESSION['ifLogin']=true;
    $row=mysqli_fetch_assoc($result);
    $data['user_name']=$row['user_name'];
}else if($num==0){
    $_SESSION['ifLogin']=true;
    $code=1;$msg="登录失败，用户不存在或者密码错误";
}else{
    $code=1;$msg='登录失败，服务器内部错误';
    $_SESSION['ifLogin']=true;
}
$res=array(
    'code'=>$code,
    'msg'=>$msg,
    'data'=>$data
);
echo json_encode($res, JSON_UNESCAPED_UNICODE);
$conn->close();
?>