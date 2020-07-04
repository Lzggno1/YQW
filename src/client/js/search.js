function goodcar(data){
    let html = Array.from(data).map((item) => {
      
        
        return `
            <div class="goodscar" data-id = "${item.id}" data-type="${item.type}">
                <a href = "./goods.html?id=${item.id}">
                    <p class="p1">
                        <img src = "${item.src}"/>
                    </p>
                    <div>
                        <p class="p2"><span>${item.Trade}</span></p>
                        <p class="p3">${item.title}</p>
                        <p class="p4">${item.price}</P>
                    </div>
                
                </a>
            
            </div>

        `
    }).join("");
    $(".tablelist").html(html)

}



$(()=>{
    $.ajax({
        url:"../server/php/search.php",
        type:"get", 
        datatype:"json",
        data:{type:"全部"},
        success(data){
            data = JSON.parse(data)
            console.log(typeof(data));
            
            goodcar(data)
        }
    })
    // $.ajax({
    //     url:"../server/php/type.php",
    //     type:"get",
    //     dataType:"json",
    //     success(data){

    //     }
    // })
    $(".Typeright").on("click","span",function(){
        console.log($(this).text());
        
        $.ajax({
            url:"../server/php/search.php",
            type:"get",
            datatype:"json",
            data:{type:$(this).text()},
            success(data){
                data = JSON.parse(data)
                goodcar(data)
            }


        })
    })
    $(".brandright").on("click","span",function(){
        console.log($(this).text());
        
        $.ajax({
            url:"../server/php/search.php",
            type:"get",
            datatype:"json",
            data:{brand:$(this).text()},
            success(data){
                data = JSON.parse(data)
                goodcar(data)
            }


        })
    })
    // $(".goodscar").on("click","a",function(){

    // })






})

