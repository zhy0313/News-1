<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
$user_name=$_POST['user_name'];
$password=$_POST['password'];
$email=$_POST['email'];
$sql="insert into user (user_name,password,email) values('{$user_name}','{$password}','{$email}')";
$result=$conn->query($sql);
if(!$result){ $code=2;$msg=mysql_error();}
else{
    $code=0;$msg="成功注册";
}
$res=array(
    'code'=>$code,
    'msg'=>$msg,
    'data'=>$data
);
echo json_encode($res, JSON_UNESCAPED_UNICODE);
$conn->close();
?>