<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
$email=$_GET('email');
$sql="select * from user where email = ".$email;
$result=$conn->query($sql);
$row_num=mysqli_num_rows($result);
if($row_num>0){
    $x['code']=0;
}else{
    $x['code']=1;
}
echo json_encode($x, JSON_UNESCAPED_UNICODE);
$conn->close();
?>