<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
$id=$_GET['id'];
$type=$_GET['type'];
$sql="update {$type} set count = count +1 where id = {$id}";
$result=$conn->query($sql);
$conn->close();

?>