<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
$keyword=$_GET['keyword'];
$types=['mli'];
$arr = [];
foreach($types as $type) {

    $sql = "select * from ".$type." where title like '%{$keyword}%' ";

    $result = $conn->query($sql);
    while ($row = mysqli_fetch_assoc($result)) {
        $x['id'] = (int)$row['id'];
        $x['title'] = $row['title'];
        $x['author'] = $row['author'];
        $x['time'] = $row['time'];
        $x['src'] = $row['src'];
        $arr[] = $x;
    }
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
$conn->close();

?>