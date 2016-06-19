/**
 * 页面加载完毕执行入口函数
 */
$(function(){

	FastClick.attach(document.body);

	//文档加载完毕时执行
	console.log('Jquery加载完成(mobile)');
	//渲染头图
	ContentComponent.renderDemo();
	//渲染数据列
	ContentComponent.renderBlock();
	//注册最新/最热按钮事件
	ContentComponent.addContentListButtonEvent();
	//注册底部加载/返回按钮事件
	ContentComponent.addContentBottomButtonEvent();
	//注册搜索按钮点击态事件
	ContentComponent.addSearchButtonEvent();
	//注册底部返回PC端按键事件
	FooterComponent.addfooterGoPCButtonEvent();

});

//页尾区组件
var FooterComponent = {
	addfooterGoPCButtonEvent:function(){
		$('.footer_goPCButton').on(
			'click',
			function(){
				//跨域属性
				window.name = 'travellerPC';
				window.location = 'index.html';
			}
		);
	}

};

//内容区组件
var ContentComponent = {

	//配置文件路径
	blockDataJsonFilePath : ['js/json/blockData_part1.json','js/json/blockData_part2.json','js/json/blockData_part3.json','js/json/blockData_part4.json'],
	//当前页面json数据来源(0:最热，1:最新)
	currentJsonNum:0,
	//渲染头图
	renderDemo : function(){

		//获取json数据
		$.getJSON("js/json/figureData.json",function(data){
			
			var figureDataStrObj = [];

			var len = data.list.length;
			for(var i=0; i<len; i++){
				data.list[i].imgFile =data.baseURL+data.list[i].imgFile;
				data.list[i].travellerFile =data.baseURL+data.list[i].travellerFile;

				var domObj={
					content:
					 ("<figure class='content_figure'>"
						+"<img class='content_img' src='"+data.list[i].imgFile+"' alt='"+data.list[i].imgTitle+"' width='100%' height='100%' /> "
						+"<figcaption class='content_figcaption'>"
							+"<p class='content_figcaption_title'>"+data.list[i].imgTitle+"</p>"
							+"<div class='content_figcaption_box'>"
								+"<img class='content_figcaption_img'  src='"+data.list[i].travellerFile+"' width='100%' height='100%'/>"
								+"<span class='content_figcaption_name'>"+data.list[i].travellerName+"</span>"
								+"<span class='content_figcaption_date'>"+data.list[i].imgDate+"</span>"
							+"</div>"
						+"</figcaption>"
					+"</figure>")
				};
				//添加到轮播图数组中
				figureDataStrObj.push(domObj);
			}

			//使用插件渲染头图
			var islider = new iSlider({
			    dom: document.getElementById("content_demo"),
			    data: figureDataStrObj,
			    isAutoplay:true,
			    duration:2000,
				isLooping:true,
				animateTime:1200,

			});

		});
		
	},
	addSearchButtonEvent:function(){
		$('.header_search_button').on(
			'click',
			function(event){
				//点击态的设计
				$target = $(event.target);
				$target.css({'color':'#333333'});
				setTimeout(function(){
					$target.css({'color':'#999999'});
				},200);
			}
		);
	},
	//渲染显示块，
	//callback :function 获取数据并渲染完成后的回调函数（可选）
	//removeAll:boolean  是否清空原列表 true:清空 false:不清空（可选）
	renderBlock:function(callback,removeAll){

		$.getJSON(this.blockDataJsonFilePath[this.currentJsonNum],function(data){

			//获取json对象
			var len = data.list.length;
			//要插入的父节点
			var $parentDom = $('#content_list');

			//是否清空原来的列表
			if(removeAll){
				$parentDom.empty();
			}
			var lazyLoadClassName = 'block'+this.currentJsonNum;
			for(var i=0; i<len; i++){
				
				data.list[i].blockFile =data.baseURL+data.list[i].blockFile;
				data.list[i].travellerFile =data.baseURL+data.list[i].travellerFile;


				//渲染DOM
				var $block = $('.content_list_block_model').eq(0).clone();
				//添加样式，变为可见
				$block.attr({'class':'content_list_block '});
				//$block.removeClass('content_list_block_model').addClass('content_list_block');
				//获取图片DOM
				var $img       = $block.children().eq(0).children().eq(0);
				$img.attr({
					src:'',
					'data-original':data.list[i].blockFile,
					alt:data.list[i].blockTitle
				}).addClass(lazyLoadClassName);
				//获取TitleDOM
				var $title     = $block.children().eq(1).children().eq(0);
				$title.text(data.list[i].blockTitle);
				//获取作者
				var $name      = $block.children().eq(1).children().eq(1).children().eq(0);
				$name.text(data.list[i].travellerName);
				//获取类型
				var $type = $block.children().eq(1).children().eq(1).children().eq(1);
				if(data.list[i].blockType=='1'){
					
					$type.html("<icon class='icon_content_icon'>&#xe60d;</icon>图文");

				}else if(data.list[i].blockType=='2'){


					$type.html("VR视频").css({'color':'#B22222'});
					
				}else{

					$type.html("<icon class='icon_content_icon'>&#xe62e;</icon>视频");

				}
				//获取描述
				var $desc     = $block.children().eq(1).children().eq(2);
				$desc.text(data.list[i].bloclDesc);

				//从后面插入父节点
				$parentDom.append($block);

				
			}

			var $lazyLoadClassName = '.'+lazyLoadClassName;

			$($lazyLoadClassName).lazyload({
				effect:'show',
				threshold:100,
				failurelimit:3
			});

			//执行回调函数
			if(callback){
				callback();
			}
			
		});
		
	},
	//注册最新/最热按钮事件（事件委托方式）
	addContentListButtonEvent:function(){
		var _this = this;
		$('.content_list_block_line').on(
			'click',
			'.content_list_hotButton',
			function(event){
				//最热按钮点击事件
				if(_this.currentJsonNum!=0){

					//切换按钮状态
					var changeState = function(){
						
						$('.content_list_newButton').removeClass('content_list_buttom_selected');
						$('.content_list_hotButton').addClass('content_list_buttom_selected');
					};
					//改变列表数据
					_this.currentJsonNum=0;
					_this.renderBlock(changeState,true);

				}
			}
		).on(
			'click',
			'.content_list_newButton',
			function(event){
				//最新按钮点击事件
				if(_this.currentJsonNum!=1){
					//切换按钮状态
					var callback = function(){
						
						$('.content_list_hotButton').removeClass('content_list_buttom_selected');
						$('.content_list_newButton').addClass('content_list_buttom_selected');
						$('.content_list_getMoreButton').html("<icon class='icon_content_icon'>&#xe621;</icon>加载更多").css({'color':'#333333'});
					};
					//改变列表数据
					_this.currentJsonNum=1;
					_this.renderBlock(callback,true);

				}
			}
		);
	},
	//注册底部按钮事件 返回顶部与加载更多（事件委托方式）
	addContentBottomButtonEvent:function(){
		var _this = this;
		$('.content_list_bottom_botton').on(
			'click',
			'.content_list_goTopButton',
			function(){
				//滚动到顶部
				$('body,html').animate(
					{scrollTop:0},
					"slow"
				);
			}
		).on(
			'click',
			'.content_list_getMoreButton',
			function(event){
				//加载更多数据
				if(_this.currentJsonNum<2){
					_this.currentJsonNum=2;
				}else if(_this.currentJsonNum==2){
					_this.currentJsonNum=3;	
				}else{
					return ;
				}
				//回调函数
				var callback;
				if(_this.currentJsonNum>=(_this.blockDataJsonFilePath.length-1)){
					callback = function(){
						$('.content_list_getMoreButton').html("<icon class='icon_content_icon'>&#xe621;</icon>加载完毕").css({'color':'#999999'});
					};
				}
				
				_this.renderBlock(callback,false);
				
			}
		);
	}

};