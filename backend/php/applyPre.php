<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$user_name=$request->user_name;
$sql="delete from preference where user_name = '{$user_name}'";
$result=$conn->query($sql);
$types=$request->pres;


foreach($types as $type){     
    $sql="insert into preference (user_name,type) values('{$user_name}','{$type}')"; 
    $result=$conn->query($sql);
            
}
if(!$result){ $code=2;$msg=mysql_error();}
else{
    $code=0;$msg="成功设置偏好";
    $data=$postdata;
}
$res=array(
    'code'=>$code,
    'msg'=>$msg,
    'data'=>$data
);
echo json_encode($res, JSON_UNESCAPED_UNICODE);
$conn->close();
?>