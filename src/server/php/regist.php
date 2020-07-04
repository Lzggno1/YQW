<?php


$db = mysqli_connect("127.0.0.1:3306","root","lin147258","YQW");
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$userphone = $_REQUEST["userphone"];

if(mysqli_connect_errno($db)){
    echo "连接mysql失败".mysqli_connect_error();
}

$sql = "SELECT * FROM user WHERE user_name = '$username'";
$result = mysqli_query($db,$sql);

$data = array("status"=>"","data"=>array("msg"=>""));

if(mysqli_num_rows($result) == 0){
    $sql = "INSERT INTO user ".
        "(user_name,user_phone,user_password) ".
        "VALUES ".
        "('$username',$userphone,'$password')";
 
    // $sql = "INSERT INTO 'user' ('user_name','user_phone','user_password') VALUES ('$username',$userphone,'$password')";
    $result = mysqli_query($db,$sql);
    $data["status"] = "success";
    $data["data"]["msg"]="注册成功！";


}else{
    $data["status"]="error";
    $data["data"]["msg"]="注册失败，该用户名已拥有";
    
}
echo json_encode($data,true);









?>