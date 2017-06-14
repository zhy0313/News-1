<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
session_start();
$id=$_GET['id'];
$type=$_GET['type'];
$sql="update {$type} set count = count +1 where id = {$id}";
$result=$conn->query($sql);
$sql_content="select * from ".$type." where id = ".$id;
$result_content=$conn->query($sql_content);
$row = mysqli_fetch_assoc($result_content);
$x['content']=$row['content'];
$x['title']=$row['title'];
$x['author']=$row['author'];
$x['time']=$row['time'];
$x['count']=$row['count'];
$x['ifLogin']=$_SESSION['ifLogin'];
echo json_encode($x, JSON_UNESCAPED_UNICODE);
$conn->close();
?>