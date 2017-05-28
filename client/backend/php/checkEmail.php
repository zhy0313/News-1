<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
$email=$_GET['email'];
$sql="select * from user where email = '{$email}'";
$result=$conn->query($sql);
$num=mysqli_num_rows($result);
$res['num']=$num;
echo json_encode($res, JSON_UNESCAPED_UNICODE);
$conn->close();
?>