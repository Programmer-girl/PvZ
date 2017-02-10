var t = false;
var arr1 = new Array();//数组用于存在在第一行生成的僵尸！以方便后面叫人打死用的
var arr2 = new Array();//数组用于存在在第二行生成的僵尸！以方便后面叫人打死用的
var arr3 = new Array();//数组用于存在在第二行生成的僵尸！以方便后面叫人打死用的
var arr4 = new Array();//数组用于存在在第二行生成的僵尸！以方便后面叫人打死用的
var arr5 = new Array();//数组用于存在在第二行生成的僵尸！以方便后面叫人打死用的
window.onload=function(){
    //页面加载，首先让遮罩上浮
    ztflow(1);
    //每四秒钟产生太阳花
    setInterval(function(){
        createSunFlower("img/Sun.gif",4);
    },4000);//每一秒钟产生一个太阳花，原值为4000；
    //每5秒钟产生一个僵尸
    setInterval(function(){
        //调整僵尸的速度，原值为2；调整僵尸的血量值，原值为6；
        createJs("img/js.gif",10,parseInt(Math.random()*5)+1,3);
        //调整僵尸的产生时间，原值为5000；
    },5000);
}

$("zw").onmousedown = function (){
    $("zw").setAttribute('im','1');//ismove
    if(t==true && (parseInt($("money").innerText) >= 50)){
        //alert('s')
        var zw  = document.createElement("img");
        zw.src = $("zw").src;
        document.body.appendChild(zw);

        $("st").style.height = "100px";//100 消失了！
        ztflow(1);//遮罩
        t = false;//不可以点击

        document.onmousemove = function (){
            zw.style.position = "absolute";
            zw.style.left = (event.x - 50) + "px";
            zw.style.top = (event.y - 50) +"px";
        }

        document.onmouseup = function (){
            var t = parseInt((event.y+30)/100);
            var l = parseInt((event.x -100)/100);
            //没有钱也可以创建射手
            if((parseInt($("money").innerText) >= 50) && $('zw').getAttribute("im") == 1 && ((t>0 && t < 6)&&(l>0 && l < 9))){//((t>0 && t < 5)&&(l>0 && l < 9))
                document.body.removeChild(zw);
                createZw(zw.src,t,l,true);
                $("zw").setAttribute('im','2');
                $("money").innerText = parseInt($("money").innerText) - 50;
            }
        }
    }
}
/*
 * 创建植物
 * src:创建图片的来源
 * row:产生植物所在的行
 * col:产生植物所在的列
 * */
function createZw(src,row,col,ist){
    var zw =document.createElement("img");//植物占位
    zw.src =src;//植物
    zw.style.position = "absolute";//绝对
    zw.style.left = ((col-1)*100+230)+"px"; //距离左面的位置
    zw.style.top =  ((row-1)*100 + 70)+"px";//距离右面的位置

    document.body.appendChild(zw);//添加植物到页面当中
    if(ist)
    //调整子弹的速度 原值为2
        createZd(zw,"img/zd.gif",10,row); //生成子弹
}
/*
 * 创建子弹
 * shooter:豌豆射手
 * src:图片来源
 * speed:子弹的速度
 * row：所在的行
 * */
function createZd(shooter,src,speed,row){//function 方法  () 方法名 createZd(参数)
    setInterval(function (){
        var i = document.createElement("img");//生成一个图片占位符
        i.src = src;//添加一个图片
        i.style.position = "absolute";//可以让图片移动
        i.style.left = (shooter.offsetLeft + 50)+"px";
        i.style.top = (shooter.offsetTop + 20)+"px";//距离上面
        document.body.appendChild(i);//添加图片到body
        setInterval(function (){
            //遇火
            /*if(i.offsetLeft >= 420){
             i.src = "firezd.gif";
             }*/
            var obj = null;
            //添加三个就可以
            switch(row){
                case 1://情况：hang == 1的时候
                    obj = arr1;//把生成的僵尸！仍到数组当中（仍到一数组当中）
                    break;//跳出
                case 2:
                    obj = arr2;
                    break;//跳出
                case 3://情况：hang == 1的时候
                    obj = arr3;//把生成的僵尸！仍到数组当中（仍到一数组当中）
                    break;//跳出
                case 4:
                    obj = arr4;
                    break;//跳出
                case 5:
                    obj = arr5;
                    break;//跳出
            };
            //子弹是否打死僵尸
            for(var j = 0;j < obj.length;j++){
                if(i.offsetLeft >= obj[j].offsetLeft){//相遇

                    var u = parseInt(obj[j].getAttribute("xl")) -1;//血量减

                    //把原来的血量减1
                    if(u <= 0 ){//getAttribute(); parseInt  (把一个字符串转成数字)
                        //杀死僵尸
                        //从数组当中移除
                        //obj[j].removeNode(true);//除ie8以外好多版本不支持修改
                        document.body.removeChild(obj[j]);
                        obj.splice(j,1);//删除当前那个被人打死了的僵尸
                    }else{
                        obj[j].setAttribute("xl",parseInt(obj[j].getAttribute("xl"))-1);
                    }

                    i.src = "boom.gif";
                    setTimeout(function (){
                        document.body.removeChild(i);
                    },10);

                }
            }
            //如果没有僵尸！子弹要移动到1000位置以外才可以消失
            if(i.offsetLeft <= 1000){
                i.style.left = (i.offsetLeft + (10*speed))+"px";//全部添加单位，要不谷歌等不支持
            }else{
                document.body.removeChild(i);
            }
        },100);
    },3000);//调整子弹的频率，原值为3000
}

/*
 * 创建僵尸
 * src:创建僵尸图片来源
 * speed:僵尸移动的速度
 * row:产生僵尸所在的行
 * pit:产生僵尸时，僵尸所带的血量
 * */
function createJs(src,speed,row,pit){
    var js = document.createElement("img");
    js.src = src ;
    js.style.position = "absolute";
    js.style.left = "900px";
    js.style.top = ((row-1)*100)+"px";
    js.setAttribute("xl",pit);// set: 设置  attribute 属性
    document.body.appendChild(js);

    //添加三个就可以
    switch(row){
        case 1://情况：hang == 1的时候
            arr1[arr1.length] = js;//把生成的僵尸！仍到数组当中（仍到一数组当中）
            break;//跳出
        case 2:
            arr2[arr2.length] = js;
            break;//跳出
        case 3://情况：hang == 1的时候
            arr3[arr3.length] = js;//把生成的僵尸！仍到数组当中（仍到一数组当中）
            break;//跳出
        case 4:
            arr4[arr4.length] = js;
            break;//跳出
        case 5:
            arr5[arr5.length] = js;
            break;//跳出
    };
    setInterval(function (){
        if(js.offsetLeft >= 250){
            js.style.left = (js.offsetLeft - speed)+"px";
        }else{
            document.body.removeChild(js);
        }
    },300);
}

function $(id){
    return document.getElementById(id);
}
/*
 *   功能：让遮罩上浮
 *   speed:上浮的速度
 * */
function ztflow(speed){
    var inter=setInterval(function(){
        //判断遮罩的高度是否大于0
        if($("st").offsetHeight>0){

            $("st").style.height=$("st").offsetHeight -speed +"px";

        }else{
            clearInterval(inter);
            t=true;
        }


    },10);
}

/*
 *   功能：产生太阳花
 *   src:太阳花的来源
 *   downSpeed 太阳花下落的速度
 * */
function createSunFlower(src,downSpeed){
    var sun = document.createElement("img");
    sun.src = src;
    sun.style.position = "absolute";
    document.body.appendChild(sun);
    //阳光  : top : 0px left  : 随机
    sun.style.top = "0px";
    sun.style.left = parseInt((Math.random()*500) + 500) + "px";//随机
    //阳光下落
    var xlcs = parseInt((Math.random()*100) + 10);//5
    var cn = 0;
    var ty = setInterval(function (){
        if(cn == xlcs){
            clearInterval(ty);
            //阳光下落完成三秒以后自动消失
            setTimeout(function (){
                if(sun != null)
                    document.body.removeChild(sun)
            },3000);//调整阳光在地上停留的时间，原值为3秒
        }else{
            //调整阳光下落的速度原值为4，
            sun.style.top = (sun.offsetTop + downSpeed)+"px";
            cn++;
        }
    },100);//频率原值为100
    //阳光点击以后  money+25
    //写完这个
    sun.onclick = function (){
        document.body.removeChild(sun);
        //调整太阳花的分值原值为25
        $("money").innerText = parseInt($("money").innerText) + 25;
    }
}