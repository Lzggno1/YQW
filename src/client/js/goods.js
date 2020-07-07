function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
// 2、放大镜
    
        
function goodbox(data){
    let html = Array.from(data).map((item) => {
      
        
        return `
        <div class="news_address">
        <div class="addressC">
            <p><b>${item.Trade}</b>&gt;${item.title}</p>
        </div>
    </div>
    <div class="goodsbox">
        <div class="goodsboxC">
            <div class="goodLeft" style="width: 430px;height: 470px;float: left;">
                <div class="showimg ">
                    <img src="${item.src}" alt="">
                    <div class="box"></div>
                </div>
                <div class="show-box"></div>

                <div class="imglist">
                    <p>
                        <span>
                            <img src="${item.src}" alt="">
                        </span>
                       
                    </p>
                </div>
            </div>
            <div class="goodRight" style="margin: 0px 10px;width: 730px;height: 531px; float: left;">
                <p class="title " style="margin-top: 20px;">
                    <span class="span1">${item.trade}</span>
                    <span class="span2">${item.title}</span>

                </p>
                <p class="p1 ">
                    <span class="span1">售价</span>
                    <span class="span2 ">￥ ${item.price}</span>
                </p>
                <p class="p2">:${item.tishi}</p>
                <p class="p3">
                    <i>贸易类型：</i>
                    <span>${item.Trade}</span>
                </p>
                <p class="p4 ">
                    <i>国际条形码：</i>
                    <span >${item.barcode}</span>
                </p>
                <p class="p4 ">
                    <i>有效期：</i>
                    <span >${item.term}</span>
                </p>
                <p class="p4 a">
                    <i>库存状态：</i>
                    <span >有货</span>
                </p>
                <div class="p5 ">
                    <p class="price totalprice">￥ ${item.price}</p>
                    <div class="price1" style = "margin-left:35px">
                        <p class="priceadd">+</P><input class="goodsnum" type="text" value = "1"></input><p class="priceadd">-</p>
                    </div>
                </div>
                <p class="p6 ">
                    <span class="span1 buy_now">立即下单</span>
                    <span class="span2 add_cart">加入购物车</span>                 
                </p>
            </div>
            <div class="clear"></div>
        </div>

    </div>

        `
    }).join("");
    $(".goodtable").html(html)

}

let user = getCookie("user")
let pwd = getCookie("pws")
let id = getCookie("id")


$(()=>{

 
    let goodsid = GetQueryString("id")
    console.log(goodsid);
    let price 
    $.ajax({
        url:"../server/php/goods.php",
        type:"get",
        data:{id:goodsid},
        datatype:"json",
        success(data){
            data=JSON.parse(data)
            console.log(data);
            price = data[0].price*1;
            console.log(price);
            
            goodbox(data)
            
        }

    })
    $(".showbox").on("mousemove", ".showbox-img", function (e) {
                let oMirrorBox = $(".showbox");
                let oBox = $(".box");
                let oShowBox = $("#show-box");
                let boxOffsetLeft = oMirrorBox[0].offsetLeft;
                let boxOffsetTop = oMirrorBox[0].offsetTop;
        
                let mirrorWidth = oBox[0].offsetWidth;
                let mirrorHeight = oBox[0].offsetHeight;
        
                // 一、数据处理
                // 1、计算oMirrorBox应该出现的位置(基于父盒子oBox的left和top)
                let left1 = e.pageX - boxOffsetLeft - mirrorWidth / 2;
                let top1 = e.pageY - boxOffsetTop - mirrorHeight / 2;
        
                // 2、处理边界
                if (left1 < 0) {
                    left1 = 0;
                } else if (left1 + mirrorWidth > 398) {
                    left1 = 398 - mirrorWidth;
                }
                if (top1 < 0) {
                    top1 = 0;
                } else if (top1 + mirrorHeight > 398) {
                    top1 = 398 - mirrorHeight;
                }
                // 二、外观呈现
                // 1、移动放大镜
                // console.log(oMirrorBox.style.left)
                oBox[0].style.left = `${left1}px`;
                oBox[0].style.top = `${top1}px`;
        
                // 2、改变show-box的背景图片的位置
                oShowBox[0].style.backgroundPosition = `-${left1 * 2}px -${top1 * 2}px`;
            })
            // 3、鼠标移入放大镜
            $(".big-img").on("mouseenter", ".showbox-img", function () {
                $("#box").toggleClass("box-op")
                $(".show-simg").css({ "display": "block" })
            })
            $(".showbox").on("mouseleave", ".showbox-img", function () {
                $("#box").toggleClass("box-op")
                $(".show-simg").css({ "display": "none" })
            })
    $(".goodtable").on("click",".priceadd",function(){
       
        
        let val = $(this).text()
        console.log(price)    
        if(val == "+"){
            $(this).next().val($(this).next().val()*1+1)
            let num = $(this).next().val()*1
            $(".totalprice").text(price*num)
            console.log($(".totalprice"));
            
            
        }else{
            $(this).prev().val($(this).prev().val()*1-1)           
            if($(this).prev().val()*1<1){
                $(this).prev().val("1")
            }
            let num = $(this).prev().val()*1
            $(".totalprice").text(price*num)
        }
    })

    $(".goodtable").on("click",".add_cart",function(){
        console.log($(this));
        if (user && pwd){

            $.ajax({
                url:"../server/php/addcar.php",
                type:"get",
                data:{goodsid:goodsid,userid : id,num:$(".goodsnum").val()},
                datatype:"json",
                success(data){
                    data = JSON.parse(data)
                    console.log(data);
                    
                    if(data.status=="success"){
                        alert("加入购物车成功")
                    }
                    
                }
            })
        }else{
            location.href = "./login.html"
        }
    })
    $(".goodtable").on("click",".buy_now",function(){
        if (user && pwd){
            alert("下单成功")
        }else{
            location.href = "./login.html"
        }
        
    })

})

// class Magnifier{
//         constructor(){
//             // 选择元素
//             this.Sbox = document.querySelector(".big-img");
//             this.Simg = document.querySelector(".big-img img");
//             this.span = document.querySelector(".big-img span");
//             this.Bbox = document.querySelector(".bigger-img");
//             this.Bimg = document.querySelector(".bigger-img img");
    
//             this.abtn = document.querySelectorAll(".small-img-list li");
    
//             // 绑定事件
//             this.addEvent();
//         }
//         addEvent(){
//             var that = this;
//             this.Sbox.onmouseover = function(){
//                 that.over();
//             }
//             this.Sbox.onmouseout = function(){
//                 that.out();
//             }
//             this.Sbox.onmousemove = function(eve){
//                 var e = eve || window.event;
//                 that.move(e);
//             }
//             // 给所有的li添加点击事件
//             for(var i=0;i<this.abtn.length;i++){
//                 this.abtn[i].onclick = function(){
//                     // 点击时，准备修改图片地址，记得将当前点击的元素传入
//                     that.changeImg(this);
//                 }
//             }
//         }
//         changeImg(ele){
//             // 根据当前点击的元素的子元素(img)的src，切换图片
//             this.Simg.src = this.Bimg.src = ele.children[0].src;
//         }
//         over(){
//             this.span.style.display = "block";
//             this.Bbox.style.display = "block";
    
//             // span宽高比例：根据右侧大图和显示区域计算得来
//             var spanW = this.Bimg.offsetWidth / this.Bbox.offsetWidth;
//             var spanH = this.Bimg.offsetHeight / this.Bbox.offsetHeight;
//             // console.log(spanW,spanH)
//             // 根据宽高比例，设置span的真正宽高
//             this.span.style.width = this.Sbox.offsetWidth / spanW + "px";
//             this.span.style.height = this.Sbox.offsetHeight / spanH + "px";
//         }
//         out(){
//             this.span.style.display = "none";
//             this.Bbox.style.display = "none";
//         }
//         move(e){
//             // 鼠标相对于页面的坐标 - sBox左边的位置 - span宽度的一半
//             var l = e.pageX - this.Sbox.offsetLeft - this.span.offsetWidth/2;
//             var t = e.pageY - this.Sbox.offsetTop - this.span.offsetHeight/2;
//          // 边界限定
//                 if(l<0) l=0;    // left
//                 if(t<0) t=0;    // top
//                 // right
//                 if(l > this.Sbox.offsetWidth - this.span.offsetWidth){
//                     l = this.Sbox.offsetWidth - this.span.offsetWidth
//                 }
//                 // bottom
//                 if(t > this.Sbox.offsetHeight - this.span.offsetHeight){
//                     t = this.Sbox.offsetHeight - this.span.offsetHeight
//                 }
        
//                 // 设置span的位置
//                 this.span.style.left = l + "px";
//                 this.span.style.top = t + "px";
        
//                 // 计算span在sBox中的移动比例
//                 var x = l / (this.Sbox.offsetWidth - this.span.offsetWidth);
//                 var y = t / (this.Sbox.offsetHeight - this.span.offsetHeight);
//                 // console.log(x, y);
        
//                 // 根据比例设置右侧大图的移动位置
//                 this.Bimg.style.left = x * (this.Bbox.offsetWidth - this.Bimg.offsetWidth) + "px";
//                 this.Bimg.style.top =  y * (this.Bbox.offsetHeight - this.Bimg.offsetHeight) + "px";
//             }
//         }