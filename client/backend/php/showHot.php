<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
session_start();
$types=['mli','sci','hot','gam','ent','edu'];
$hots = [];
$sort=[];
$arr=array(
    'mlis'=>array(),
    'scis'=>array(),
    'hots'=>array(),
    'gams'=>array(),
    'ents'=>array(),
    'edus'=>array()
);
foreach ($types as $type){
    $sql="select * from {$type} order by count desc limit 0,5";
    $result=$conn->query($sql);
    $i=0;
    $tmp=[];
    while($row = mysqli_fetch_assoc($result)) {
        $x['id']=$row['id'];
        $x['title']=$row['title'];
        $x['author']=$row['author'];
        $x['src']=$row['src'];
        $x['count']=$row['count'];
        $x['type']=$type;
        $i++;
        if($i<=2){
            $sort[]=$x['count'];
            $hots[] = $x;
        }
        $tmp[]=$x;
    }
    switch ($type){
        case 'mli':$arr['mlis']=$tmp;break;
        case 'sci':$arr['scis']=$tmp;break;
        case 'edu':$arr['edus']=$tmp;break;
        case 'ent':$arr['ents']=$tmp;break;
        case 'gam':$arr['gams']=$tmp;break;
    }
}
array_multisort($sort,SORT_DESC,$hots);
$arr['hots']=$hots;
$arr['ifLogin']=$_SESSION['ifLigin'];
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
$conn->close();
?>