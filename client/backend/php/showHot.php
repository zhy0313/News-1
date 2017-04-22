<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);

$types=['mli','sci'];
$hots = [];
$sort=[];
$arr=array(
    'mli'=>array(),
    'sci'=>array(),
    'hots'=>array()
);
foreach ($types as $type){
    $sql="select * from {$type} order by count desc limit 0,5";
    $result=$conn->query($sql);
    $i=0;
    while($row = mysqli_fetch_assoc($result)) {
        $x['title']=$row['title'];
        $x['author']=$row['author'];
        $x['src']=$row['src'];
        $x['count']=$row['count'];
        switch ($type){
            case 'mli';$x['type']='军事新闻';$arr['mli'][]=$x;break;
            case 'sci':$x['type']='科技新闻';$arr['sci'][]=$x;break;
            default:$x['type']='其他';break;
        }
        $i++;
        if($i<=2){
            $sort[]=$x['count'];
            $hots[] = $x;
        }
    }
}
array_multisort($sort,SORT_DESC,$hots);
$arr['hots']=$hots;
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
$conn->close();
?>