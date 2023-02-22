function lunbo(){
				/*轮播原理，通过移动轮播图所在的盒子#imglist向左移动模拟轮播效果-》需要拿到目标盒子*/
			//1.先获取目标盒子#imglist
			var imgList = document.getElementById("imgList");//根据id获取元素
			//2.要计算所有图片的宽度（通过js动态计算，抛弃之前静态页面写死宽度的做法）
			//2.1 先获取轮播中所有的图片->图片对象数组
			var imgArr = document.getElementsByClassName("lunboImg");
			console.log("----->imgArr的类型"+ typeof(imgArr));
			console.log("----->imgArr[0]的类型" + typeof(imgArr[0]));
			//图片的数量：数组的长度
			console.log("------->图片数量" + imgArr.length);
			//单张图片的宽度，当前应该是400
			console.log("----->单张图片的宽度" + imgArr[0].offsetWidth);
			//console.log("------->单张图片的宽度" + 400);//从css中找
			//计算存放所有图片的大盒子imglist的宽度：单张图片的宽度*图片数量
			imgList.style.width = imgArr.length * (650) + "px";//2520

			/*对导航的盒子居中动态计算*/
			/*从上面的推理中，寻找要获取的目标
			获取大盒子outer*/
			var outer = document.getElementById("outer");
			//获取盒子宽度:450
			console.log("----->大盒子的宽度" + outer.offsetWidth);
			//获取内盒子navDiv的宽度，目前为152
			var navDiv = document.getElementById("navDiv");
			console.log("----->内盒子navDiv的宽度" + navDiv.offsetWidth);
			//left偏移量计算
			var leftpx = (outer.offsetWidth - navDiv.offsetWidth)/2 + "px";
			console.log("----->left偏移量leftpx=" + leftpx);//149
			navDiv.style.left = leftpx;
			
			/*
			通过js去控制a的选中
			*/
		   //设置一个下标，表示默认选中第几个
		   var index = 0 ;
		   //获取所有navDiv的a
		   var allA = document.getElementsByClassName("lunboA");
		   //设置选中的效果(只选1次)
		   allA[index].style.backgroundColor = "#00A1D6";
		    
			/////////////////////开始加载/////////////////////
		    autoChange();
			
		   
		     ////////////////////////初始加载时自动切换图片End///////////////////////
		   /*点击a切换到对应的图片*/
		   //因为要点击a触发，所以要给所有a加点击事件
		   for(var i = 0 ; i < allA.length ; i++){
			   allA[i].num = i;
			   //点击哪个a就说明要设置哪个a的背景为black
			   allA[i].onclick = function(){
				   //点击时就要清除之前的定时器，停止所有非本a触发的定时器
				   clearInterval(timer);
				   /*bug2:下标用不了，因为初始时循环就全执行过了，i永远是6
				   解决：自定义下标，因为当前allA是一个对象数组，那么每个元素都是对象
				   --》既然是对象，就可以添加属性
				   --》添加和下标一样作用的属性，如num，每次循环都保存当前的下标
				   */ 
				  //谁调用onclick，那么this就是谁
				  //alert("123 = " + this.num);
				  console.log("allA["+i+"].num 也就是index="+ this.num);
				  index = this.num;
				 //设置index的选中效果
				 setA(index,allA);
				 //////////////////////单次切图开始////////////////////
				 //定时器
				 //这里的定时器名字要跟上面的一样 ，就会发生覆盖，否则会执行上面的定时器，执行index++
				 //==》造成点击当前图片实际来到的就是下一张了
				timer = setInterval(function(){
					console.log("开启【2号定时器】timer="+timer);
				 				   //imgList.style.left = -420 + "px";//去除这个，否则会向后多移动一次
				 				   //bug4:只切换到第二张图，后面没法切换
				 				   /*原因：写死了-420，只能移动这么多
				 				   解决：先拿到原来的偏移量，在此基础追加新的偏移量
				 				   */
				 				  //先获取原来left的值、
				 				  var oldValue = getStyle(imgList , "left");//-420
				 				  console.log("----->oldvalue=" + oldValue);
				 				  //上面取到的oldvalue时string，要转number
				 				  console.log("----->oldvalue" + typeof(oldValue));
				 				  
				 				  oldValue = parseInt(oldValue);
				 				  console.log("----->oldvalue后" + typeof(oldValue));
				 				  
				 				  
				 				  /*index：  0		1		2		3
				 				  第几张图    1		2		3		4
				 				  偏移量      0  -420  -840
				 				  
				 				  */
				 				 
				 				  /*
				 				  如果原始的left值  oldvalue=0  我们去点第四个a,切换到第4张图，此时index=3
				 				  原始index值 oldvalue
				 				  相差的下标index - 0 = 》3-0=3
				 				  所需要的偏移量
				 				  */
				 				  
				 				  
				 				  //在旧值上增加一个图的偏移量
				 				  //var newValue = oldValue + (-420);
				 				  var newValue = oldValue + (-650)*(index-oldValue/-650);
				 				  console.log("----->newvalue=" + newValue);
				 				  //使用新的偏移量来设置偏移
				 				  imgList.style.left = newValue + "px";
				 				  //执行完上面这句就已经到达目标图片，可以停止定时器，否则会一直运行
				 				  clearInterval(timer);
				 				  //当元素移到边界时，终止定时器
				 				  /*if(newValue == (-420*6)){
				 					  console.log("当前最大偏移量");
				 					  console.log("清除定时器来停止移动");
				 					  clearInterval(timer);
				 				  }*/
								  autoChange();
				 },200);
				 /////////////////////单次切图结束////////////////////////////
			   };
		   }
		  
		  function autoChange(){
			////////////////////////初始加载时自动切换图片Start///////////////////////
			
			var target;//移到的目标的位置
			//模拟轮播动画定时器 需要的参数
			//移动的终点(自动切换，每次都只移动一张图的距离，所以target就是紧邻)
			
			//当前的起点，就是当前的位置
			var current = parseInt(getStyle(imgList,"left"));
			console.log("==>>current=" + current);
			//模拟轮播动画的定时器
			timer = setInterval(function(){
						   console.log("开启【1号定时器】timer="+timer);
						   //下标index是从0开始自增的
						index++;//一开始就要加1，因为0是第一张不会位移
						target = -650 * index;
						   //自动切图永远时向左切换
						   move(imgList, "left" ,target,index,imgArr,function(){
							   //每修改一张图，导航背景跟着变
							   setA(index , allA);
						   });
						   
						   
						   
						   /*
						  
						   console.log("==>>target=" + target);
						   
						  //index它的范围是0~imgArr.length-1图片的数组的长度减1
						   //图片数组imgArr.length=》6-1=5
						   
						  if(index==imgArr.length){//下标为5时越界回到起点0
							index=0;
							target = 0;//重置终点
							  //回到第一张，完成循环
							  imgList.style.left = 0+"px"
							   console.log("[自动切换（）初始]到达一轮的周期，回到起点index=0，left=0" );
						  }
						  console.log("[自动切换（）初始]移动前index="+index );
						  //出发的起点
						   console.log("[自动切换（）初始]移动前的起点current="+current );
						  //向终点target运动
						   console.log("[自动切换（）初始]移动后终点target="+target );
						  //开始偏移
						  imgList.style.left = target+"px";
						  
						  //同步下面的导航按钮，到达第几张图时，下标就选中第几张
						  setA(index,allA);
						  */
						 if(index==imgArr.length){//下标为5时越界回到起点0
						 							index=0;
						 							target = 0;//重置终点
						 							  //回到第一张，完成循环
						 							  imgList.style.left = 0+"px";
						 }
			},1000);
		  }
		};//onload 结束