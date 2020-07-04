$(() => {


    $(".div4").click(function () {
        let username = $("#username").val()
        let userphone = $("#userphone").val()
        let password = $("#password").val()
        let repassword = $("#repassword").val()
        let imgReg = $("#verify").val()
        let reg = /^1[3-9]\d{9}$/

        if (username == "") {
            alert("请输入用户名")
            return
        }else if(!/^[a-zA-Z0-9]{2,6}$/.test(username)) {
            alert("请输入合规的用户名")
            return
        }

        if (userphone == "") {
            alert("请输入手机号")
            return
        } else if (!reg.test(userphone)) {
            console.log(userphone);
            
            alert("请输入正确的手机号码")
            return
        }
        if (!/^[a-zA-Z0-9]{6,16}$/.test(password)) {
            alert("请输入6到16位的密码")
            return
        }
        if (password != repassword) {
            alert("两次密码输入不一致")
            return
        }
        if (imgreg.toUpperCase() != imgReg.toUpperCase()) {
            console.log(imgreg+"|"+imgReg);
            
            alert("请输入正确的验证码")
            return
        }
        if (!$("input[type='checkbox']").is(":checked")) {
            alert("请阅读并同意用户协议")
            return
        }
        $.ajax({
            type: "post",
            url: "../server/php/regist.php",
            data: {
                username,
                password: md5(password).substr(0, 15),
                userphone
            },
            dataType:"json",
            success(response) {
                // console.log(response);
                /* 如果注册成功，那么就先提示用户然后再跳转 */
                if (response.status == "success") {
                    alert(response.data.msg);
                    window.location.href = "./login.html";
                } else {
                    alert(response.msg);
                }
            }
        })
    })
})