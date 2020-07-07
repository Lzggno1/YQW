$(()=>{

    
    let user1 = getCookie("user1")
    let pwd1 = getCookie("pws1")
    console.log(user1,"|",pwd1);
    
    if (user1 !=null&& user1!=""&pwd1 != null && pwd1 != ""){
        $("#user_name").val(user1)
        $("#password").val(pwd1)
        $("input[type='checkbox']").attr("checked", true);

    }

    //let uRl = localStorage.getItem("url")
    $(".loginbtn").click(function(){
        let username = $("#user_name").val()
        let password = $("#password").val()
        if(username.length == 0 ){
            alert("请输入用户名")
            return
        }
        if(password.length == 0 ){
            alert("请输入密码")
            return
        }
        
        let userdata = {
            username,
            password:md5(password).substr(0,15)
        }
        
        $.ajax({
            type:"post",
            url:"../server/php/login.php",
            data:userdata,
            dataType:"json"
            
        }).done(data => {
            console.log(data);
            
            
            if (data.status == "success") {
                if($("input[type='checkbox']").is(":checked")){
                    var d = new Date();
                    d.setTime(d.getTime()+(7*24*60*60*1000));
                    document.cookie = "user1 =" + username + "; " + "expires=-1";
                    document.cookie = "pws1 =" + username + "; " + "expires=-1";
                    var expires = "expires="+d.toGMTString();
                    document.cookie = "user1 =" + username + "; " + expires; 
                    document.cookie = "pws1 = " + password + ";" +expires;  
                    document.cookie ="user =" + username;
                    document.cookie ="pws =" + password;

                }else{
                    document.cookie ="user =" + username;
                    document.cookie ="pws =" + password;
                }
                document.cookie = "id="+data.data.user_id
                /* (2) 跳转回列表页 */
                location.href = "./index.html";
            } else {
                alert("error:登录失败，账号密码错误")
                
            }
        })
    })
})