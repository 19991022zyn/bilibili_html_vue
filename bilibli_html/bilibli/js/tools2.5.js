		/************* 分离【工具】函数：专门设获取元素当前的样式 ************/
			/**
			 * 参数 ：
			 * 		obj :要获取样式的元素
			 * 		name :要获取样式的名字
			 */
			function getStyle(obj , name){
				console.log("--------------  getStyle()  ---------------------");
				var oldValue;
				if (window.getComputedStyle) {
					//非 IE8及以下浏览器
					oldValue = getComputedStyle(obj , null)[name];
				}else{
					//IE8及以下浏览器
					oldValue = obj.currentStyle[name];
				}
				return oldValue;
			}
			
			
			/************* 分离函数：专门设置选中的a的效果 ************/
			function setA(index , allA){	
				//Bug3:选中一个着色时，其它的选中颜色还在
				/**
				 * 希望：选中当前a变黑时，其它a变红
				 * 解决：可以给所有的a设置空，让它们走默认的内部样式red
				 */
				for (var i = 0 ; i < allA.length ; i++) {
					allA[i].style.backgroundColor = "";
				}
				//注意顺序 ：一定要放在后面，否则会被前面这个循环清除
				allA[index].style.backgroundColor = "#00A1D6";
				
			}
			
			
			/*分离函数 专门执行轮播动画*/
			/*参数：
			obj：要执行动画的对象
			attr：要执行动画的样式 ， 如：left，top，width
			target：要执行动画的目标位置
			callba：回调函数，它在动画执行完毕后运行（收尾操作，方便以后扩展）
			index:图片数组下标
			*/
			function move(obj, attr,target,index,imgArr,callback){
				clearInterval(obj.timer);
				
				 //////////////////////单次切图开始////////////////////
				 //定时器
				 //这里的定时器名字要跟上面的一样 ，就会发生覆盖，否则会执行上面的定时器，执行index++
				 //==》造成点击当前图片实际来到的就是下一张了
				obj.timer = setInterval(function(){
					console.log("开启【move中的定时器】timer="+obj.timer);
				 				   
				 	var oldValue = getStyle(obj , attr);//-420
				 	console.log("原对象"+obj+"的"+attr+"----->oldvalue=" + oldValue);
				 				  //上面取到的oldvalue时string，要转number
								  
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
				 	console.log("----->[move]newvalue=" + newValue);
				 				  //使用新的偏移量来设置偏移
				 	obj.style.left = newValue + "px";
				 				  //执行完上面这句就已经到达目标图片，可以停止定时器，否则会一直运行
				 	clearInterval(obj.timer);
				 				  //当元素移到边界时，终止定时器
					if(index==imgArr.length){//下标为5时越界回到起点0
												index=0;
												target = 0;//重置终点
												  //回到第一张，完成循环
												  obj.style.left = 0+"px"
												   console.log("[自动切换（）初始]到达一轮的周期，回到起点index=0，left=0" );
					}
					
					obj.style.left = target+"px";
					/*动画执行完后可以调用回调函数收尾
					通过下面的写法判断是否需要回调
					*/
					callback && callback();
				 },200);
			}