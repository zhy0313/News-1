<?php
	include 'connect.php';
	error_reporting(E_ERROR|E_WARNING);
	session_start();
//	echo json_encode($_SESSION['ifLogin'], JSON_UNESCAPED_UNICODE);
	$type=$_GET['type'];
	$count=$_GET['count'];$before=($count-1)*10;
	$sql="select * from ".$type." order by time desc limit ".$before.",10";
	//echo json_encode($sql, JSON_UNESCAPED_UNICODE);


    $result=$conn->query($sql);
	$num=mysqli_num_rows($result);
	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$x['id']=(int)$row['id'];
		$x['title']=$row['title'];
		$x['author']=$row['author'];
		$x['time']=$row['time'];
		$x['count']=$row['count'];
		$x['imgUrl']=$row['imgUrl'];
		$arr[] = $x;
	}
	$ar['list']=$arr;
	$ar['ifLogin']=$_SESSION['ifLogin'];
	$ar['num']=$num;
	echo json_encode($ar, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>