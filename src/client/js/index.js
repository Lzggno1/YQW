
var speed = 2500;
        var content = document.getElementsByClassName("content")[0];
        var pic = document.getElementsByClassName("pic");
        var zindex = 0; //每张图片的层大小
        var timer = null; //计时器
        var index = 0;
        var circle = document.getElementsByClassName("circle")[0].children;

function move(res, count) {
    for (var k = 0; k < count; k++) {
        //获取层、改变层，赋值层
        for (var i = 0; i < pic.length; i++) {
            zindex = parseInt(pic[i].style.zIndex);
            if (res == "right") {
                zindex++;
                //zindex=6->7->1 透明度为0,层变为1
                if (zindex > pic.length) {
                    zindex = 1;
                    pic[i].style.opacity = "0";
                }
                //zindex=5->6 透明度为1
                if (zindex == pic.length) {
                    pic[i].style.opacity = "1"
                    index = i;
                }
            } else {
                zindex--;
                //zindex=0->6 透明度为1，层变为6
                if (zindex == 0) {
                    zindex = 3;
                    pic[i].style.opacity = "1";
                    index = i;
                }
                //zindex=6->5的透明度为0
                else if (zindex == pic.length - 1) {
                    pic[i].style.opacity = "0";
                }
            }
            pic[i].style.zIndex = zindex;
            addColor();
        }
    }
}

function animate() {
    timer = setInterval(function () {
        move("right", 1);
    }, speed);
}

//小圆点  
//颜色变化
function addColor() {
    for (var i = 0; i < circle.length; i++) {
        if (index == i) {
            circle[i].className = "bgc";
        } else {
            circle[i].className = "";
        }
    }
}


window.onload = function () {
    animate();
    addColor();
    //鼠标进入与离开
    // content.onmouseenter = function () {
    //     clearInterval(timer);
    // }
    // content.onmouseleave = function () {
    //     animate();
    // }

    //鼠标触碰小圆点
    for (var i = 0; i < circle.length; i++) {
        circle[i].index = i;
        circle[i].onmouseenter = function () {
            count = this.index - index > 0 ? this.index - index : circle.length + (this.index - index);
            move("right", count);
            index = this.index;
            addColor();
        }
    }

  
}

class indexlist {
    constructor(data){
        this.data = data
    }
    init(){

        let str2 =""
        
        this.data.smalltitle.forEach(item => {
            str2 += `
            <a herf ="">${item}</a>
            <i>|</i>
            `
        });
        let str3 = ""
        
        this.data.data.forEach(item=>{
            str3 += `
            <a>
            <P class = "p1">
            <img src = "${item.src}"/>
            </p>
            <p class="p2">
            <span>${item.goods}</span>
            </p>
            <p class="p3">
            <span>${item.price}</span>
            </p>
            
            </a>
            
            `
        })
        let str1 = ""
        str1 = `
            <div class="content_gy1">
                <div class="title">
                    <span>${this.data.bigtitle}</span>
                    <p>${str2}</p>
                </div>
                <div class="content">
                    <div class="left"><img src="${this.data.banner}"></img></div>
                    <div class ="right">${str3}</div>
                </div>
            </div>
        
        `
        $(".indexlist").append(str1)

        
        
    }

}

$(()=>{
    
    $.ajax({
        url:"../server/php/indexlist.php",
        type:"GET",
        
        dataType:"json",
        erroe(err){
            console.log(err);
            
        },
        success(data){
            console.log(typeof(data))
            // data.map((item)=>{
            //    let a =  new indexlist(item);
            //    a.init()

            // })
            // console.log(data);
            for (const key in data) {
                
                let a = new indexlist(data[key])
                a.init()
            }
            
        }
        
    })


    
   
    
})