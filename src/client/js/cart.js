    
    function goodslist(data){
        let html =""
        data.forEach((item) => {
            
            
            html+=`
            <div class="good">
            <span class="span0">
                <label>

                    <input type="checkbox" data-id="${item.good[0].id}" name="rec_id" data-price="${item.num*item.good[0].price}" data-number="${item.num}">
                
                </label>
            </span>
            <span class="span_pic">
                <img src="${item.good[0].src}"
                    style="cursor: pointer;" onclick="location.href='./goods.html?id=${item.good[0].id}'">
            </span>
            <span class="span1">${item.good[0].title}<br></b>
                <br><b class="b2">有效期${item.good[0].term}</b>
            </span>
            <span class="span2">${item.good[0].barcode}</span>
            <span class="span3">${item.good[0].Trade}</span>
            <span class="span4">¥${item.good[0].price}</span>
            <span class="span5">${item.num}</span>
            <span class="span6"><span style="margin-left:25px">￥</span><span class="price22">${item.num*item.good[0].price}</span></span>
            <span class="span7 delelt_one" data-id="${item.good[0].id}"><img src="http://www.yiqingo.cn/Public/web/images/icon_pic4.png" alt=""></span>
        </div>
            `
            
        });
        $(".list").html(html)
    }

    function keepTwoDecimalFull(num) {
        var result = parseFloat(num);
        if (isNaN(result)) {
            alert('传递参数错误，请检查！');
            return false;
        }
        result = Math.round(num * 100) / 100;
        var s_x = result.toString(); //将数字转换为字符串

        var pos_decimal = s_x.indexOf('.'); //小数点的索引值


        // 当整数时，pos_decimal=-1 自动补0  
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        }

        // 当数字的长度< 小数点索引+2时，补0  
        while (s_x.length <= pos_decimal + 2) {
            s_x += '0';
        }
        return s_x;
    }  
    
    $(()=>{
        let user = getCookie("user")
        let psd = getCookie("pws")
        let user_id = getCookie("id")
        if( user&& psd){
            $.ajax({
                url:"../server/php/getcart.php",
                type:"get",
                data:{id:user_id},
                dataType:"json",
                success(data){
                    console.log(data);
                    goodslist(data)
                    
                }
            })
        }
        $(".carttitle .span1 input").click(function(){
            console.log(1);
            let zj = 0
            let num = 0 
            if($(this).is(":checked")){
                Array.prototype.forEach.call($(".shoppingCart input"), function(item) {
                    $(item).prop("checked",true);
                    
                    
                 })
                Array.prototype.forEach.call($(".list .price22"),function(item){
                    zj += $(item).text()*1
                    num += $(item).parent().prev().text()*1
                    console.log(num);
                    
                })
                $(".goods_total").text(zj)
                $(".goods_count").text(num)
                
            }else{
                Array.prototype.forEach.call($(".shoppingCart input"), function(item) {
                    $(item).prop("checked",false);
                    // console.log($(item).is(":checked"));

                    
                })
                $(".goods_count").text(0)
                $(".goods_total").text(0)
                
               
            }

        })
        //下面全选
        $(".contentB input").click(function(){
            console.log(1);
            let zj = 0
            let num = 0 
            if($(this).is(":checked")){
                Array.prototype.forEach.call($(".shoppingCart input"), function(item) {
                    $(item).prop("checked",true);
                    
                    
                 })
                 Array.prototype.forEach.call($(".list .price22"),function(item){
                    zj += $(item).text()*1
                    num += $(item).parent().prev().text()*1
                    console.log(num);
                    
                })
                Array.prototype.forEach.call($(".list .price22"),function(item){
                    zj += $(item).text()*1
                    
                    
                })
                $(".goods_count").text(num)
                $(".goods_total").text(zj)
                
            }else{
                Array.prototype.forEach.call($(".shoppingCart input"), function(item) {
                    $(item).prop("checked",false);
                    console.log($(item).is(":checked"));

                    
                })
                $(".goods_total").text(0)
                $(".goods_count").text(0)
               
            }

        })
        $(".contentB .span1").click(function(){
         
            Array.prototype.forEach.call($(".list input"),function(item){
                if($(item).is(":checked")){
                    $(item).parents(".good").remove()
                    $(".goods_count").text($(".goods_count").text()*1-$(item).data("number"))
                    
                    
                    $(".goods_total").text(keepTwoDecimalFull($(".goods_total").text())*1-keepTwoDecimalFull($(item).data("price")))
                    console.log($(item).data("price"));
                    console.log($(".goods_total").text()*1);
                    
                    
                }

            })
            alert("删除成功")
        })
        $(".list").on("click",".span7 img",function(){
            let good_id =  $(this).parent(".span7").data("id")
            $(this).parents(".good").remove()
           
            
            // $.ajax({
            //     url:"../server/php/deletegood.php",
            //     type:"get",
            //     data:{id:user_id,good_id}

            // })
            
        })
        $(".list").on("click","input",function(){






            let zj = $(".goods_total").text()*1
        
            let num11 = $(".goods_count").text()*1
            
            
            if($(this).is(":checked")){
              
                
                num11 += $(this).parents(".span0").nextAll(".span5").text()*1
                let ischecked = true
                Array.prototype.forEach.call($(".list input"),function(item){
                    if(!$(item).is(":checked")){
                        ischecked = false
                    }

                })
                if(ischecked){
                    $(".carttitle .span1 input").prop("checked",true)
                    $(".contentB input").prop("checked",true)
                }

                $(".goods_total").text(keepTwoDecimalFull(zj+$(this).data("price")))
    
               
                
                
            
                
                
            }else{
                num11 -= $(this).parents(".span0").nextAll(".span5").text()*1
                $(".carttitle .span1 input").prop("checked",false)
                    $(".contentB input").prop("checked",false)
                $(".goods_total").text(keepTwoDecimalFull(zj-$(this).data("price")))
            }
            $(".goods_count").text(num11)
        })
        $(".Settlement").click(function(){
            // let ischecked = true
            //     Array.prototype.forEach.call($(".list input"),function(item){
            //         if(!$(item).is(":checked")){
            //             ischecked = false
            //         }

            //     })
            //     if(ischecked){
                    
            //     }

            Array.prototype.forEach.call($(".list input"),function(item){
                if($(item).is(":checked")){
                    $(item).parents(".good").remove()
                }

            })
            $(".goods_total").text("0")
            alert("结算成功")
        })
















    })