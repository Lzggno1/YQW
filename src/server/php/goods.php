<?php
    $id = $_REQUEST["id"];
    $db = mysqli_connect("127.0.0.1:3306","root","lin147258","YQW");
    
    $sql="SELECT * from goods WHERE id='$id'";
    $result = mysqli_query($db,$sql);
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($data,true);

?>