<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
session_start();
$_SESSION = array();
$code=0;
$res=array(
    'code'=>$code,
    'msg'=>$msg,
    'data'=>$data
);
echo json_encode($res, JSON_UNESCAPED_UNICODE);
$conn->close();
?>