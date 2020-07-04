<?php

$db = mysqli_connect("127.0.0.1:3306","root","lin147258","YQW");
$id = $_REQUEST["id"];
$sql = "SELECT *FROM cart WHERE user_id = $id";
$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
$cart = [];
$cart1 = array("num"=>"","good"=>array());
for( $i = 0 ; $i< count($data);$i++){
    $cart1["num"]=$data[$i]["num"];
    $good_id = $data[$i]["goods_id"];
    $sql1 = "SELECT *FROM goods WHERE id =$good_id";
    $good = mysqli_fetch_all(mysqli_query($db, $sql1), MYSQLI_ASSOC);
    $cart1["good"]=$good;
    $cart[$i] =$cart1;

}
echo json_encode($cart,true);



?>