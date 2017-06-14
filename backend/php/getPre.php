<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
session_start();
$user_name=$_GET['user_name'];
$code=2;
if($_SESSION['ifLogin']){
    $code=0;
    $sql="select * from preference where user_name = '{$user_name}'";
    $result=$conn->query($sql);
    $data=[];
    while($row = mysqli_fetch_assoc($result)) {
		$data[] = $row['type'];
	}
}else{
    $code=1;
    $msg='未登录';
}
$res=array(
    'code'=>$code,
    'msg'=>$msg,
    'data'=>$data
);
echo json_encode($res, JSON_UNESCAPED_UNICODE);
$conn->close();
?>