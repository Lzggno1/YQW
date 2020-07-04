$(()=>{
    $.ajax({
        url:"../server/php/search.php",
        type:"get", 
        datatype:"json",
        data:{type:"全部"},
        success(data){
            data = JSON.parse(data)
            let type = []
            data.forEach(item => {
               type.push(item.type)
            });
            var new_arr=[];
            for(var i=0;i<type.length;i++) {  
            var items=type[i];  
            //判断元素是否存在于new_arr中，如果不存在则插入到new_ar中
            if($.inArray(items,new_arr)==-1) {  
                new_arr.push(items);  
                }  
            } 
            let html = ""
            new_arr.forEach(item=>{
                html+=`<p><a href="./search.html?type=${item}">${item}</a></p>`
            })
            $(".navBlist").html(html)

            // goodcar(data)
        }
    })
    function clearCookie(name) {  
            setCookie(name, "", -1);  
    }  
    function setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                var expires = "expires="+d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    
      
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
    let user = getCookie("user")
    let pwd = getCookie("pws")
    if (user && pwd) {
        $(".login").css({"display":"none"})
        $(".regist").css({"display":"none"})
        $(".user").css({"display":"inline-block"}).text(user)
        $(".welcome").css({"display":"inline-block"})
    }
    $(".cartbtn").click(function(){
        if(user && pwd){
            window.location.href="./cart.html"
        }else{
            window.location.href="./login.html"
        }1
    })
    $(".welcome").click(function(){
        clearCookie("user");

        
        
        clearCookie("pws")
     
        
        $(".login").css({"display":"inline-block"})
        $(".regist").css({"display":"inline-block"})
        $(".user").css({"display":"none"}).text(user)
        $(".welcome").css({"display":"none"})
    })

    $(".navBleft").mouseenter(function(){

        $(".navBlist").css("display","block");
       ;
    });
    $(".navBleft").mouseleave(function(){
        $(".navBlist").css("display","none");
    });
    $(".navBlist").mouseenter(()=>{
        console.log("1");
        
        $(".navBlist").css({"display":"block"})
    })
    $(".navBlist").mouseleave(()=>{
        console.log("2");
        
        $(".navBlist").css("display","none")
    })
    navBlist
})