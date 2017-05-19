<?php
	include 'connect.php';
	error_reporting(E_ERROR|E_WARNING);
	$type=$_GET['type'];
	$count=$_GET['count'];$before=($count-1)*10;
	$sql="select * from ".$type." limit ".$before.",10";
	//echo json_encode($sql, JSON_UNESCAPED_UNICODE);

    $result=$conn->query($sql);
	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$x['id']=(int)$row['id'];
		$x['title']=$row['title'];
		$x['author']=$row['author'];
		$x['time']=$row['time'];
		$x['count']=$row['count'];
		$arr[] = $x;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>