<?php
    $goodsid = $_REQUEST["goodsid"];
    $userid = $_REQUEST["userid"];
    $num = $_REQUEST["num"];
    $db = mysqli_connect("127.0.0.1:3306","root","lin147258","YQW");

    /* 检查之前是否存在对应的数据，如果存在那么就修改num值，如果不存在那么就插入数据 */
    $sql = "SELECT * FROM cart WHERE goods_id = $goodsid AND user_id =$userid"  ;
    $result = mysqli_query($db,$sql);
    
    
    if(mysqli_num_rows($result) == 0)
    {
      /* 往数据库表中新增一条数据 */
      $sql = "INSERT INTO `cart` (`user_id`, `goods_id`, `num`) VALUES ( $userid,$goodsid, 1)";
    
    }else{
      /* 更新数据 */
    
      $sql = "UPDATE `cart` SET `num`= `num`+ $num WHERE `goods_id`=$goodsid AND `user_id`=$userid";
    }
    $res = mysqli_query($db,$sql);
    echo json_encode(array("status"=>"success"));


?>