<?php
	include 'connect.php';
	error_reporting(E_ERROR|E_WARNING);
	$type=$_GET['type'];
	$sql="select * from ".$type;
    $result=$conn->query($sql);
	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$x['id']=(int)$row['id'];
		$x['title']=$row['title'];
		$x['author']=$row['author'];
		$x['time']=$row['time'];
		$x['src']=$row['src'];
		$x['count']=$row['count'];
		$arr[] = $x;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>