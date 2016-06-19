/**
 * 页面加载完毕执行入口函数
 */
$(function(){



	//文档加载完毕时执行
	console.log('Jquery加载完成');
	//1.加载用户信息
	CoverComponent.initUserInfo();
	//2.返回页面顶部
	CoverComponent.goTop();
	//3.加载后续内容
	CoverComponent.loadContentData();
	//4.注册封面导航条事件
	CoverComponent.coverNavButtonEvent();
	//5.注册蒙层点击消失事件
	CoverComponent.upfloorClickEvent();
	//6.注册登录区登录/取消按钮事件
	CoverComponent.coverLoginButtonEvent();


});


//封面状态机(全局)
var coverState = {
	//封面展开状态，默认展开
	isOpened:true,
	//根据状态展开或关闭封面
	changeState:function(){
		
			if(coverState.isOpened){
				//如果封面是展开状态，则关闭
				$('.cover_close_button').addClass('cover_close_button_close');
				$('.cover_close_button_before').text('返回');
				$('.cover_close_button_after').text('封面');
				
				$('.header').removeClass('blurStyle');
				$('.content').removeClass('blurStyle');
				$('.footer').removeClass('blurStyle');
				$('.cover').addClass('cover_close');
				$('.upfloor').fadeOut(600);
				
				this.isOpened=false;
			}else{
				//如果封面是关闭状态，则展开
				$('.cover_close_button').removeClass('cover_close_button_close');
				$('.cover_close_button_before').text('进入');
				$('.cover_close_button_after').text('主页');
				$('.cover').removeClass('cover_close');
				this.isOpened=true;
			}
			
		}
};

//登录区状态机(全局)
var loginState = {
	//登录区是否出现 true:出现 false:隐藏
	isShow:false,
	//是否为登录状态
	islogin:true,
	//展开登录
	loginShow:function(){
			$('.cover_login_login_button').val('登录').css({'background-color':'#FF4500'});
			if(!this.isShow){
				//登录区 未出现
				
				$('.cover_login_pwd_again').css({'visibility':'hidden'});
				//$('.cover_login').css({'display':'block'});
				$('.cover_login').fadeIn('slow');
				this.isShow=true;
				this.islogin=true;
			}else{
				
				if(this.islogin){
					//登录区已出现 是登录状态
					this.isShow=true;
					this.islogin=true;
					return ;
				}else{
					//登录区已出现 是注册状态
					$('.cover_login_pwd_again').css({'visibility':'hidden'});
					this.isShow=true;
					this.islogin=true;
				}
			}
			
	},
	//展开注册
	regisiterShow:function(){

			$('.cover_login_login_button').val('注册').css({'background-color':'#FF4500'});
			if(!this.isShow){
				//登录区 未出现

				
				$('.cover_login_pwd_again').css({'visibility':'visible'});
				//$('.cover_login').css({'display':'block'});
				$('.cover_login').fadeIn('slow');
				this.isShow=true;
				this.islogin=false;
			}else{
				if(this.islogin){
					//登录区已出现 是登录状态
					$('.cover_login_login_button').val('注册');
					$('.cover_login_pwd_again').css({'visibility':'visible'});


					this.isShow=true;
					this.islogin=false;
				}else{
					//登录区已出现 是注册状态
					this.isShow=true;
					this.islogin=false;
					return ;
				}
			}

	},
	//关闭
	allClose:function(){
			//$('.cover_login').css({'display':'none'});
			$('.cover_login').fadeOut();
			this.isShow=false;

	}

};

//声明 封面组件相关方法，避免污染全局变量，降低分组开发命名冲突的bug
var CoverComponent = {
	
	/**
	 * 注册导航条上的事件：(采用事件委托的方式)
	 * 1.点击关闭封面图，进入主页
	 * 2.鼠标进入产生边框效果
	 * 3.鼠标离开边框效果消失
	 * 4.点击登录出现登录页面
	 * 5.点击注册出现注册页面
	 */
	coverNavButtonEvent : function(){

		// 上拉按键 鼠标进入产生边框效果
		function coverCloseButtonMouseover(){
			$('.cover_close_button_before').addClass('cover_close_button_hover');
			$('.cover_close_button_after').addClass('cover_close_button_hover');
		}

		// 上拉按键 鼠标离开取消边框效果
		function coverCloseButtonMouseout(){
			$('.cover_close_button_before').removeClass('cover_close_button_hover');
			$('.cover_close_button_after').removeClass('cover_close_button_hover');
		}

		//点击上拉，鼠标进入产生边框 ，鼠标滑出边框消失
		$('.cover_nav').on(
			'click',
			'.cover_close_button, .cover_close_button_before, .cover_close_button_after',
			function(){
				coverState.changeState();
			}
		)
		.on(
			'mouseover',
			'.cover_close_button, .cover_close_button_before, .cover_close_button_after',
			coverCloseButtonMouseover
		).on(
			'mouseout',
			'.cover_close_button, .cover_close_button_before, .cover_close_button_after',
			coverCloseButtonMouseout
		).on(
			'click',
			'.cover_login_button',
			function(){
				if(coverState.isOpened){
					//如果封面区域时展开的
					loginState.loginShow();
				}else{
					//如果封面区域时展开的
					loginState.loginShow();
					coverState.changeState();
				}	
			}
			
		).on(
			'click',
			'.cover_register_button',
			function(){
				if(coverState.isOpened){
					//如果封面区域时展开的
					loginState.regisiterShow();
				}else{
					//如果封面区域时展开的
					loginState.regisiterShow();
					coverState.changeState();
				}
				
			}	
		).on(
			'mouseenter',
			'.cover_urlCode_button',
			function(){
				//扫码出现
				if(coverState.isOpened){
					$('.cover_urlCode').removeClass('cover_urlCode_Down');
					
					$('.cover_urlCode').css({'display':'block'});
				}else{
					$('.cover_urlCode').addClass('cover_urlCode_Down');
					$('.cover_urlCode').css({'display':'block'});
				}
			}

		).on(
			'mouseleave',
			'.cover_urlCode_button',
			function(){
				$('.cover_urlCode').css({'display':'none'});
			}
		);
	},

	upfloorClickEvent:function(){
		$('.upfloor').on(
			'click',
			function(){
				coverState.changeState();
			}
		);
	},

	/**
	 * 注册登录按钮/取消按钮 的事件：(采用事件委托的方式)
	 */
	coverLoginButtonEvent:function (){
		$('.cover_login_login_button').on(
			'click',
			function(event){
				var userName = $('.cover_login_username_input').val();
				if(!userName){
					userName = 'Yu Peng';
				}
				$('.cover_login_button').attr({'class':'cover_userInfo_button'}).text('用户:'+userName);
				//利用sessionStroage存储用户信息
				if(window.sessionStorage){
					//浏览器支持sessionStroage
					window.sessionStorage.setItem('TravellerUserName',userName);

				}
				$('.cover_register_button').fadeOut();
				$(event.target).css({'background-color':'#3CB371'}).val('成功');
				window.setTimeout(
					function(){
						loginState.allClose();
					},
					1000
				);
				
			}
		);

		$('.cover_login_cancel_button').on(
			'click',
			function(event){
				loginState.allClose();
			}
		);
	},


	// 利用sessionStroage存储的用户信息 初始化页面
	initUserInfo : function(){

		if(window.sessionStorage){
			//浏览器支持sessionStroage
			if(window.sessionStorage.getItem('TravellerUserName')){
				var userName = window.sessionStorage.getItem('TravellerUserName');
				$('.cover_login_button').attr({'class':'cover_userInfo_button'}).text('用户：'+userName);
				$('.cover_register_button').css({'display':'none'});
			}
		}

	},

	//页面初始时返回顶部
	goTop:function(){

		//滚动到顶部
		$('body,html').animate(
			{scrollTop:0},
			"slow"
		);

	},

	//加载后续页面数据
	loadContentData: function(){
		console.log('动态加载后续content数据');
		$('.contentJSX').attr({'src':'js/content.jsx'});
		
	}

};

