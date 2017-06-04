<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
    $servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname='news';
	date_default_timezone_set('prc');
	// 创建连接
	$conn = new mysqli($servername, $username, $password,$dbname);
	$conn->query("set names utf8;");
?>