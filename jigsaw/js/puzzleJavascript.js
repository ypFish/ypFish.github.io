// JavaScript Document
	//var currentCity = "city_2";
	//var nextCity = "city_3";
		var city =[
			{picName:'阿格拉',
			picAddress:'pic/citys/AGRA.jpg',
			picDefination:'&nbsp;&nbsp;&nbsp;&nbsp;阿格拉是典型的印度北方城市，喧闹，拥挤。而就是在这样的一个都市，却屹立着世界七大奇迹之一泰姬陵。',
			time:50
			},
			{picName:'里约',
			picAddress:'pic/citys/RIO.jpg',
			picDefination:'&nbsp;&nbsp;&nbsp;&nbsp;里约热内卢位于巴西东南部，在1960年以前为巴西首都。里约基督像位于该市，是世界新七大奇迹之一。',
			time:30
			},
			{picName:'开罗',
			picAddress:'pic/citys/CAIRO.jpg',
			picDefination:'&nbsp;&nbsp;&nbsp;&nbsp;开罗是埃及首都，北非及阿拉伯世界最大的城市，横跨尼罗河，是整个中东地区的政治、经济和交通中心。',
			time:50
			},
			{picName:'巴黎',
			picAddress:'pic/citys/PARIS.jpg',
			picDefination:'&nbsp;&nbsp;&nbsp;&nbsp;巴黎，法兰西共和国首都和最大城市，法国的政治、经济、文化、贸易中心,素有时尚之都之美称。',
			time:50
			},
			{picName:'莫斯科',
			picAddress:'pic/citys/MOSCOW.jpg',
			picDefination:'&nbsp;&nbsp;&nbsp;&nbsp;莫斯科是俄罗斯联邦首都，始建于1147年，拥有800余年历史，是历史悠久的克林姆林宫所在地。',
			time:50
			},
			{picName:'比萨',
			picAddress:'pic/citys/PISA.jpg',
			picDefination:'&nbsp;&nbsp;&nbsp;&nbsp;比萨是意大利中西部城市。曾是利古里亚海岸港口，距佛罗伦萨68公里，世界闻名的比萨斜塔坐落于此。',
			time:30
			}
			];

	//配置背景音乐
	var backSound_mp3="timemove.mp3";
	var backSound_ogg="timemove.ogg";
	
	var buttonSound_wav="ButtonSound.wav ";
	var buttonSound_ogg="ButtonSound.ogg";
	
	var picName="阿格拉";
	var picAddress="pic/citys/AGRA.jpg";
	var picDefination='&nbsp;&nbsp;&nbsp;&nbsp;阿格拉是典型的印度北方城市，喧闹，拥挤。而就是在这样的一个都市，却屹立着世界七大奇迹之一泰姬陵。';
	var time =50;
	
	var nextPicName="里约";
	var nextPicAddress="pic/citys/RIO.jpg";
	var nextPicDefination="&nbsp;&nbsp;&nbsp;&nbsp;里约热内卢位于巴西东南部，在1960年以前为巴西首都。里约基督像位于该市，是世界新七大奇迹之一。";
	var nextTime =30;
	
	var picAddressURL="url("+picAddress+")";
	var smallPicBackImgTop=-30;
	var smallPicBackImgLeft=-30;
	var smallDomIdFore = "small";
	var smallInitTop=30;
	var smallInitLeft=565;
	
	var allowMove=false;
	var relativeX=0;
	var relativeY=0;
	var moveX=0;
	var moveY=0;
	
	var currentDomNum=0;
	//创建元素
	var domName="<div class='puzzle-body-right-pic-block-inner'></div>";
	var domClassName=".puzzle-body-right-pic-block-inner";
	
	var timeWord="剩余：";
	
	var timeInitWidth=-150;
	var timeFinalWidth=2;
	var growNumber = 0;
	var topString = "px 0px";
	var startTime;
	var everyGrowWidth=parseInt((timeFinalWidth-timeInitWidth)/time);
	var initEveryGrowWidth=(timeFinalWidth-timeInitWidth)%time+everyGrowWidth;
	
	var onAddress="pic/on.gif";
	var offAddress="pic/off.gif";
	

	var playingFlag=true;
	
	//初始化背景音乐
	function InitBackgroundMusic(){

		if(navigator.userAgent.indexOf("MSIE")>0){
			$("#backgroundMusicIE").attr({"src":"sounds/"+backSound_mp3,"volume":"-780"});
		}else{
			var media=document.getElementById("backgroundMusic");
			if(media.canPlayType("video/ogg")!=""){
				media.src="sounds/"+backSound_ogg;
			}else{
				media.src="sounds/"+backSound_mp3;
			}
			media.volume =0.5;
			media.play();	
		}	
	}
	//播放背景音乐
	function playBackgroundMusic(){
		//IE
		if(navigator.userAgent.indexOf("MSIE")>0){
			$("#backgroundMusicIE").attr({"src":"sounds/"+backSound_mp3});
		//非IE
		}else{
			var media=document.getElementById("backgroundMusic");
			media.play();	
		}

	}
	
	//播放按键音乐
	function playButtonMusic(){
		if(playingFlag){
			if(navigator.userAgent.indexOf("MSIE")>0){
				$("#buttonMusicIE").attr({"src":"sounds/"+buttonSound_wav});
			//非IE
			}else{
				var buttonMedia=document.getElementById("buttonMusic");
				if(buttonMedia.canPlayType("video/ogg")!=""){
					buttonMedia.src="sounds/"+buttonSound_ogg;
				}else{
					buttonMedia.src="sounds/"+buttonSound_wav;
				}
				buttonMedia.volume=0.5;
				buttonMedia.play();	
			}
		}	
	}
	
	//停止背景音乐播放
	function stopBackgroundMusic(){
		//IE
		if(navigator.userAgent.indexOf("MSIE")>0){
			$("#backgroundMusicIE").attr({"src":""});
		//非IE
		}else{
			var media=document.getElementById("backgroundMusic");
			media.pause();	
		}		
	}
	
	
	//通过localstorage获取城市编号
	function getCityNumber(){
		var cityNumber=0;
		if(window.localStorage){
			if(window.localStorage.cityNumber==null||(parseInt(window.localStorage.cityNumber))>city.length-1){
				window.localStorage.cityNumber=0;	
			}else{
				cityNumber=window.localStorage.cityNumber;
			}	
		}
		return cityNumber;
	}
	
		
	//通过json装载初始信息
	function getCityInfomation(cityNumber){
				picName=city[parseInt(cityNumber)].picName;
				picAddress=city[parseInt(cityNumber)].picAddress;
				picDefination=city[parseInt(cityNumber)].picDefination;
				time =city[parseInt(cityNumber)].time;
				var nextCityNumber = 0;
				if(parseInt(cityNumber)!=city.length-1){
					nextCityNumber=parseInt(cityNumber)+1;	
				}
				nextPicName=city[nextCityNumber].picName;
				nextPicAddress=city[nextCityNumber].picAddress;
				nextPicDefination=city[nextCityNumber].picDefination;
				nextTime =city[nextCityNumber].time;
				picAddressURL="url("+picAddress+")";
		}
	
	//解析本地文件json数据
	function getCityInfo(){
		$.getJSON("json/citys.json",function(data){
			$.each(data,function(i,item){
					if(i==currentCity){
						picName=item["picName"];
						picAddress=item["picAddress"];
						picDefination=item["picDefination"];
						time=item["time"];
						picAddressURL="url("+picAddress+")";
					}else if(i==nextCity){
						nextPicName=item["picName"];
						nextPicAddress=item["picAddress"];
						nextPicDefination=item["picDefination"];
					}
				}
			);
		});
	}
	//跳转到下一城市
	function toNextCity(){
		if(window.localStorage){
			window.localStorage.cityNumber=	parseInt(window.localStorage.cityNumber)+1;
		}	
	}
	
	//每次增长时间条
	function grow(){
			growNumber++;
			if(growNumber>time){
				$(".puzzle-body-left-time-back").css({"backgroundPosition":"2px 0px"});
				window.clearInterval(startTime);
				showResult(false);
			}else{
				$(".puzzle-body-left-time-back").css({"backgroundPosition":((timeInitWidth+growNumber*everyGrowWidth)+topString)});
				$(".puzzle-body-left-time-word").text(timeWord+(time-growNumber));
			}
	}
	//展示结果面板
	function showResultPanel(result){
		$(".bg-content .info .inner .fontCurrent").text(picName);
		$(".bg-content .info .inner .fontNext").text(nextPicName);
        $(".bg").show();
        $(".bg-content").show();

	}
	//隐藏结果面板
	function hideResultPanel(){
		$(".bg").hide();
        $(".bg-content").hide();
	}
	//显示结果邮戳
	function showResult(result){
		if(result){
			$(".puzzle-body-right-pic-block-inner-result").css({"background-image":"url(pic/win.gif)"}).fadeIn(500);
		}else{
			var currentDom = $("#"+smallDomIdFore+randomNum[currentDomNum]);
			currentDom.unbind("mousedown").css({"cursor":"default"});
			$(document).unbind("mousemove").unbind("mouseup");
			$(".puzzle-body-right-pic-block-inner-result").css({"background-image":"url(pic/lose.gif)"}).fadeIn(500);
		}
	}
	//开启时间条
	function startTimeBlock(){
		everyGrowWidth=parseInt((timeFinalWidth-timeInitWidth)/time);
		initEveryGrowWidth=(timeFinalWidth-timeInitWidth)%time+everyGrowWidth;
		growNumber=0;
		window.clearInterval(startTime);
		$(".puzzle-body-left-time-word").text(timeWord+time);
		startTime = window.setInterval("grow()",1000);
	}
	
	//随机数数组
	var randomNum = new Array();
	//获取随机数函数，入参：随机数个数
	function makeRandom(n){
		var rNum=new Array();
		var arrays=new Array();
		var temp=0;
		for(var i=0;i<n;i++){
			rNum[i]=i;	
		}
		for(var i=0;i<rNum.length;i++){ 
			var num=parseInt(Math.random()*(n-i));
			for(var j=0;j<rNum.length;j++){
				if(j==num){
					arrays[i]=rNum[j];
					temp=rNum[n-1-i];
					rNum[n-1-i]=rNum[j];
					rNum[j]=temp;
				}
			} 
		 }
		 return arrays;
	}
	//迭代下一个模块
	function nextDomInit(){
		var currentDom = $("#"+smallDomIdFore+randomNum[currentDomNum]);
		currentDom.css({"z-index":currentDomNum+10});
		currentDom.fadeIn(300);
		bindEvent(currentDom,randomNum[currentDomNum]);
		currentDomNum++;	
	}
	
	//为各个模块绑定事件
	function bindEvent(dom,num){
		dom.bind(
			"mousedown",
			function(e){
					allowMove=true;
					relativeX =e.pageX-parseInt($(this).css("left"));
					relativeY =e.pageY-parseInt($(this).css("top"));
					//$(this).fadeTo(20,0.5);
			}
		);
		$(document).bind(
			"mousemove",
			function(e){
				if(allowMove){
					moveX=e.pageX-relativeX;
					moveY=e.pageY-relativeY;
					dom.css({"border-width":"3"});
						dom.css({left:moveX,top:moveY});	
					}
				}
			).bind(
				"mouseup",
				function(){
					if(allowMove){
						playButtonMusic();
					}
					allowMove=false;
					dom.css({"border-width":"0"});
					var pointerX = parseInt(dom.css("left"))+parseInt((dom.width()+1)/2);
					var pointerY = parseInt(dom.css("top"))+parseInt((dom.height()+1)/2);
					var targetX=Math.abs(smallPicBackImgLeft)+parseInt(num%4)*125;
					var targetY=Math.abs(smallPicBackImgTop)+parseInt(num/4)*125;
					if(pointerX>targetX&&pointerX<targetX+125&&pointerY>targetY&&pointerY<targetY+125){
						dom.css({"border-width":"1"});
						dom.animate(
							{
								left:targetX,
								top:targetY
							},
							100,
							function(){
								
								dom.unbind("mousedown").css({"cursor":"default"});
								$(document).unbind("mousemove").unbind("mouseup");
								if(currentDomNum>=12){
									$(".puzzle-body-right-pic-inner").hide();
									window.clearInterval(startTime);
									showResult(true);
									//alert("赢得胜利！");
								}else{
									nextDomInit();
								}
							}
						);
					}else{
						dom.animate(
						{
							top:smallInitTop,
							left:smallInitLeft
						},
						150
						);
					}	
				}
			);
	}
	//初始化每个模块位置信息以及先后顺序
	function initSmallPic(){
		//还原标志位
		currentDomNum=0;
		allowMove=false;
		relativeX=0;
		relativeY=0;
		moveX=0;
		moveY=0;
		$(".puzzle-body-right-pic-inner").show();
		
		//清空所有元素
		$(domClassName).each(function(){
				$(this).remove();
			}
		);
		//清除结果印章
		$(".puzzle-body-right-pic-block-inner-result").hide();
		for(var i =0 ;i<12;i++){
			var backImgPositionLeft=(smallPicBackImgLeft-125*parseInt(i%4))+"px ";
			var backImgPositionTop=(smallPicBackImgTop-125*parseInt(i/4))+"px";
			var domId=smallDomIdFore+i;
			var newDom=$(domName);
			newDom.appendTo($(".puzzle-body-right")).css({"background-image":picAddressURL,"backgroundPosition":(backImgPositionLeft+backImgPositionTop)}).attr({"id":domId});
		}	
	}
	
	//解析json数据
	//getCityInfo();
	getCityInfomation(getCityNumber());
	$(document).ready(function(){
			$(".puzzle-body-left-pic-img").attr({"src":picAddress});
			$(".puzzle-body-left-pic-defination").html(picDefination);
			$(".puzzle-body-right").css({"background-image":picAddressURL});
			$("#bg-content-pic").attr("src",picAddress);
			$(".bg").height($(this).height());	
			
			//初始化播放背景音乐
			InitBackgroundMusic();
			
			//鼠标单击“开始游戏”事件
			$(".puzzle-body-left-startButton").first().click(function(){
					//启动时间条
					startTimeBlock();
					//获取随机数组
					randomNum=makeRandom(12);
					//初始化所有元素及位置
					initSmallPic();
					//使第一个元素可见
					nextDomInit();
				}
			);
			
			//鼠标单击跳转到下一城市
			$(".puzzle-body-left-startButton").eq(1).click(function(){
					toNextCity();
					location.reload();
				}
			);
			//跳转到首页
			$(".puzzle-body-left-startButton").eq(2).click(function(){
					window.location.href="MaFengPuzzle.html";
				}
			);
			
			//按键变色动画
			$(".puzzle-body-left-startButton").each(
				function(){
					$(this).bind(
						"mouseenter",
						function(){
							$(this).css({"color":"#000"});
						}
					).bind(
						"mouseleave",
						function(){
							$(this).css({"color":"#FFF"});	
						}
					);
					}
			);
			//显示遮盖面板
			$(".puzzle-body-left-pic").bind(
				"click",
				function(){
					showResultPanel(false);	
				}
			);
			//隐藏遮盖面板
			$(".bg").bind(
			"click",
				function(){
				hideResultPanel();	
				}
			);
			$(".close").bind(
			"click",
				function(){
				hideResultPanel();	
				}		
			);
			$("#backSound").bind(
				"click",
				function(){
						if($(this).attr("src")==onAddress){
							$(this).attr({"src":offAddress});
							stopBackgroundMusic();
						}else{
							$(this).attr({"src":onAddress});
							playBackgroundMusic();	
						}
						
				}
			);
			$("#buttonSound").bind(
				"click",
				function(){
					if($(this).attr("src")==onAddress){
							$(this).attr({"src":offAddress});
							playingFlag=false;
						}else{
							$(this).attr({"src":onAddress});
							playingFlag=true;
						}	
				}
			);
			
		}
	);