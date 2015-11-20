var myMap ; //初始化后的地图
var useableTime = 1000;//可用时间，单位秒
var timeOuterInterval;//倒计时定时器
var timeOuter;//倒计时定时器
$(function(){
	//setInterval("showNowTime()",1000); 
	timeOuterInterval = setInterval("showRemainderTime()",1000); 
	timeOuter = setTimeout("remainderTimeOut()",useableTime*1000);
    showMap();
});

//显示时间
function showNowTime(){
	var now = new Date();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	month = checkTime(month);  
	day = checkTime(day);  
	hour = checkTime(hour);  
	minute = checkTime(minute);  
	second = checkTime(second); 
	$('#nowTime').html(now.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
}
//显示倒计时
function showRemainderTime(){
	useableTime = useableTime - 1;
	$('#remainderTime').html("倒计时 : " + useableTime);
}

//倒计时结束后显示的效果
function remainderTimeOut(){
	$('#remainderTime').html("倒计时 : 0 ");
	clearInterval(timeOuterInterval);//清除定时器
	clearTimeout(timeOuter);//清除定时器
	//window.close(); 
	for(var i=0;i<2;i++){
		alert('到点啦!!!');
	}
}
//检查时间是否小于10，小于10的前面加0
function checkTime(i)    {    
   if (i < 10) {    
	   i = "0" + i;    
	}    
   return i;    
}   


 function showMap(){
	var map = new BMap.Map("mapContainer"); //创建地图
    map.centerAndZoom(new BMap.Point(116.98,36.67), 15); //初始化地图

	var point = new BMap.Point(116.98,36.67);
    var marker = new BMap.Marker(point);
    var label = new BMap.Label('济南',{"offset":new BMap.Size(9,-15)});
    marker.setLabel(label);
    map.addOverlay(marker);

    map.enableScrollWheelZoom();  // 开启鼠标滚轮缩放    
    map.enableKeyboard();         // 开启键盘控制    
    map.enableContinuousZoom();   // 开启连续缩放效果    
    map.enableInertialDragging(); // 开启惯性拖拽效果  


    map.addControl(new BMap.NavigationControl()); //添加标准地图控件(左上角的放大缩小左右拖拽控件)  
    map.addControl(new BMap.ScaleControl());      //添加比例尺控件(左下角显示的比例尺控件)  
    map.addControl(new BMap.OverviewMapControl()); // 缩略图控件  
    map.addControl(new BMap.MapTypeControl());

    myMap = new BMap.LocalSearch(map, { renderOptions: { map: map, autoViewport: true} }); //地图显示到查询结果处

	/*var  city= new BMap.LocalSearch(map, {
		renderOptions: {map: map, panel: "r_result"}
    }); */ // 初始化带选择的下拉框的地图

    map.addEventListener("click",function(e){   //单击地图，形成折线覆盖物
		newpoint = new BMap.Point(e.point.lng,e.point.lat);
		//if(points[points.length].lng==points[points.length-1].lng){alert(111);}
		points.push(newpoint);  //将新增的点放到数组中
		polyline.setPath(points);   //设置折线的点数组
		map.addOverlay(polyline);   //将折线添加到地图上
		document.getElementById("info").innerHTML += "new BMap.Point(" + e.point.lng + "," + e.point.lat + "),</br>";    //输出数组里的经纬度
	
		}
	);
 }
 
 function search() {
	var city = $("#txtSearch").val();
	myMap.setSearchCompleteCallback(onSearchComplete);  // 设置检索结束后的回调函数。
	//参数： results: LocalResult 或  Array<LocalResult> ,
	//如果是多关键字检索，回调函数参数为LocalResult 的数组，数组中的结果顺序和检索中多关键字数组中顺序一致。 
	myMap.search(city); //查找城市
}
 function onSearchComplete(result){
	var n = result.getNumPois();   // 返回搜索结果数
	//alert(n);
}  