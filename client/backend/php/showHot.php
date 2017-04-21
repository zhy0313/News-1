<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);

$types=['mli','sci'];
$arr = [];
$sort=[];
foreach ($types as $type){
    $sql="select * from {$type} order by count desc limit 0,2";
    $result=$conn->query($sql);
    while($row = mysqli_fetch_assoc($result)) {
        $x['title']=$row['title'];
        $x['author']=$row['author'];
        $x['src']=$row['src'];
        $x['count']=$row['count'];
        switch ($type){
            case 'mli';$x['type']='军事新闻';break;
            case 'sci':$x['type']='科技新闻';break;
            default:$x['type']='其他';break;
        }
        $sort[]=$x['count'];
        $arr[] = $x;
    }
}
array_multisort($sort,SORT_DESC,$arr);




echo json_encode($arr, JSON_UNESCAPED_UNICODE);
$conn->close();

?>