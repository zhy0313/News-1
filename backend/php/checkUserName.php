<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
$user_name=$_GET['user_name'];
$sql="select * from user where user_name = '{$user_name}'";
$result=$conn->query($sql);
$num=mysqli_num_rows($result);
$res['num']=$num;
echo json_encode($res, JSON_UNESCAPED_UNICODE);
$conn->close();
?>