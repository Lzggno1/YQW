<?php
$result = null;
$db = mysqli_connect("127.0.0.1:3306","root","lin147258","YQW");
$type = $_REQUEST["type"];
$brand = $_REQUEST["brand"];
if($type!=""){

    if($type == "全部"){
        $sql="SELECT * FROM goods";
       
    
    }else{
        $sql="SELECT * from goods WHERE type='$type'";
       
    }
}else{
    if($brand == "全部"){
        $sql="SELECT * FROM goods";
    }else{
        $sql="SELECT * from goods WHERE brand ='$brand'";
    }
}
$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);












?>