<?php
$db = mysqli_connect("127.0.0.1:3306","root","lin147258","YQW");

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
if (mysqli_connect_errno($db)) 
{ 
    echo "连接 MySQL 失败: " . mysqli_connect_error(); 
} 
$sql ="SELECT * FROM user WHERE user_name = '$username'";
$result = mysqli_query($db,$sql);
$data = array("status"=>"","data"=>array("msg"=>"","user_id"=>""));

if(mysqli_num_rows($result) == 0){
  $data["status"] = "error";
  $data["data"]["msg"] = "登录失败，用户名不存在";
}else{
  $sql2 = "SELECT * FROM user WHERE user_name='$username'";
  $result = mysqli_query($db,$sql2);
  $res = mysqli_fetch_all($result, MYSQLI_ASSOC)[0];
  $pwd = $res["user_password"];
  if($password !=  $pwd){
    $data["status"] = "error";
    $data["data"]["msg"] = "登录失败，密码不正确！！！";
  }else{
    $userId = $res["user_id"];
    $data["status"] = "success";
    $data["data"]["msg"] = "恭喜你，登录成功";
    $data["data"]["user_id"] = $userId;
  }
}

echo json_encode($data,true);

?>