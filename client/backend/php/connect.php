<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
    $servername = "120.77.34.253";
	$username = "root";
	$password = "exciting";
	$dbname='news';
	date_default_timezone_set('prc');
	// 创建连接
	$conn = new mysqli($servername, $username, $password,$dbname);
	$conn->query("set names utf8;");
?>