<?php
include 'connect.php';
error_reporting(E_ERROR|E_WARNING);
session_start();
$types=['mli','sci','hot','eco','spo','edu'];
$hots = [];
$sort=[];
$arr=array(
    'mlis'=>array(),
    'scis'=>array(),
    'hots'=>array(),
    'ecos'=>array(),
    'spos'=>array(),
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
        case 'eco':$arr['ecos']=$tmp;break;
        case 'spo':$arr['spos']=$tmp;break;
    }
}
array_multisort($sort,SORT_DESC,$hots);
$arr['hots']=$hots;
if($_SESSION['ifLogin']){
    $arr['ifLogin']=$_SESSION['ifLogin'];
}else{
    $arr['ifLogin']=false;
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
$conn->close();
?>