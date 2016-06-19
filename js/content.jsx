//React实现图片轮播
//获取初始JSON信息
var figureData = [];
var travellerData = [];
var blockListData = [];

//内容块加载JSON文件路径
var blockDataJsonFilePath = ['js/json/blockData_part1.json','js/json/blockData_part2.json','js/json/blockData_part3.json','js/json/blockData_part4.json'];

//循环播放
var openAutoCircle = true;

//初始化函数 自执行
(function init(){
	
	//加载并渲染头图
	loadDemo();


})();

//解析JSON文件，渲染头图 
function loadDemo(){
	$.getJSON("js/json/figureData.json",function(data){
		//获取json对象
		var len = data.list.length;
		for(var i=0; i<len; i++){
			data.list[i].imgFile =data.baseURL+data.list[i].imgFile;
			data.list[i].travellerFile =data.baseURL+data.list[i].travellerFile;
		}
		figureData = data.list;
		//渲染DOM
		renderFigureDom();

		window.setTimeout(loadTraveller,500);

	});
}


//渲染侧边栏 旅行家 
function loadTraveller(){
	$.getJSON("js/json/travellerData.json",function(data){
		//获取json对象
		var len = data.list.length;
		for(var i=0; i<len; i++){
			data.list[i].imgFile =data.baseURL+data.list[i].imgFile;
		}
		travellerData = data.list;
		//渲染DOM
		renderTravellerDom();

		window.setTimeout(loadBlockList,500);

	});
}


//渲染 显示块内容区域 
function loadBlockList(){
	$.getJSON(blockDataJsonFilePath[0],function(data){
		//获取json对象
		var len = data.list.length;
		for(var i=0; i<len; i++){
			data.list[i].blockFile =data.baseURL+data.list[i].blockFile;
			data.list[i].travellerFile =data.baseURL+data.list[i].travellerFile;
		}
		blockListData = data.list;
		//渲染DOM
		renderBlockListDom();
		
	});
}



// 定义缩略图组件
var NavEle = React.createClass(
{
	mouseEnterHandle:function(event){
		//鼠标滑入
		//console.log('index'+this.props.index);
		$('.content_nav_block').removeClass('content_nav_block_selected');
		$(this.refs.content_nav_block).addClass('content_nav_block_selected');
		this.props.changeFigure();
		//关闭自动轮播
		openAutoCircle = false;
		event.stopPropagation();
		event.preventDefault();
	},
	mouseLeaveHandle:function(event){
		//开启自动轮播
		openAutoCircle = true;
		event.stopPropagation();
		event.preventDefault();
	},
	render:function(){
		//渲染数据
		var classValue = 'content_nav_block';
		if(this.props.index=='0'){
			classValue = 'content_nav_block content_nav_block_selected';
		}
		return (
			<div ref='content_nav_block' className={classValue} onMouseEnter={  this.mouseEnterHandle } onMouseLeave={ this.mouseLeaveHandle }>
				<img className='content_nav_img' width='100%' height='100%' alt={this.props.imgTitle} src={this.props.imgFile} />
			</div>
		);
	}
}
);

// 定义头图大舞台组件
var Stage = React.createClass(
{
	getInitialState:function(){
		//初始化state信息
	    return ({
	       info:figureData[0],
	       curIndex:0
	    });
	},
	mouseEnterHandle:function(event){
		//鼠标滑入
		//关闭自动轮播
		openAutoCircle = false;
		$(this.refs.content_figure).addClass('content_figure_select');
		event.stopPropagation();
		event.preventDefault();
	},
	mouseLeaveHandle:function(event){
		//开启自动轮播
		openAutoCircle = true;
		$(this.refs.content_figure).removeClass('content_figure_select');
		event.stopPropagation();
		event.preventDefault();
	},
	changeStage:function(index){

		if($('.content_img').length>1){
			//删除上一个隐藏在底下的DOM元素
			$('.content_img').eq(1).remove();
		}
		var $current_img = $('.content_img').eq(0);
		var $next_img = $current_img.clone();
		$next_img.css({'z-index':5});
		$next_img.attr({'src':figureData[index].imgFile});
		$next_img.prependTo($('.content_figure'));
		$current_img.addClass('content_img_hidden');
		
		this.setState(
			{
	          info:figureData[index],
	          curIndex:index
	     	}
		);
		$next_img.css({'z-index':10});
	},

	render:function(){
		//渲染数据

		//导航组件 数组
		var navEle = [];
		figureData.forEach(
			function(value,index){
				navEle.push(<NavEle key={'navEle'+index} index={index} changeFigure={ this.changeStage.bind(this,index) } imgTitle={value['imgTitle']} imgFile={value['imgFile']} />);
			},
			this
		);

		return (
			<section>
				<figure className='content_figure' ref='content_figure' onMouseEnter={  this.mouseEnterHandle } onMouseLeave={ this.mouseLeaveHandle }>
					<img className='content_img' src={this.props.info.imgFile} alt={this.props.info.imgTitle} width='100%' height='100%' /> 
					<figcaption className='content_figcaption'>
						<img className='content_figcaption_img' width='100%' height='100%' src={this.state.info.travellerFile}/>
						<h3 className='content_figcaption_title'>{this.state.info.imgTitle}</h3>
						<span className='content_figcaption_date'>{this.state.info.imgDate}</span>
						<span className='content_figcaption_name'>{this.state.info.travellerName}</span>

					</figcaption>
				</figure>
				<nav className='content_nav'>
					{navEle}
				</nav>
			</section>
		);
	},
	componentDidMount:function() {
	     //渲染完毕
	     // console.log('渲染完毕');
	     window.setInterval(function(){
	     	if(!openAutoCircle){
	     		return ;
	     	}
	     	var nextIndex = ++this.state.curIndex;
	     	if(nextIndex>2){
	     		nextIndex = 0;
	     	}
	     	this.changeStage(nextIndex);
	     	//添加缩略图效果
	     	$('.content_nav_block').removeClass('content_nav_block_selected');
	   		$('.content_nav_block').eq(nextIndex).addClass('content_nav_block_selected');

	     }.bind(this),3000);
	}
		
}
);

//定义侧边拦列数据组件
var Traveller = React.createClass(
{
	render:function(){
		return (
				
				<li className='content_sidebar_person_list'>
					<img className='content_sidebar_person_list_img' width='100%' height='100%' src={this.props.traveller.imgFile}/>
					<h4 className='content_sidebar_person_list_name'>{this.props.traveller.travellerName}</h4>
					<span className='content_sidebar_person_list_desc'>{this.props.traveller.travellerDescription}</span>
				</li>
				
		);
	}
}
);

//定义侧边拦大舞台组件
var TravellerStage = React.createClass(
{
	render:function(){
		//渲染数据

		//侧边栏列组件 数组
		var traveller = [];
		travellerData.forEach(
			function(value,index){
				traveller.push(<Traveller key={'traveller'+index} traveller={value} />);
			},
			this
		);

		return (
			<div>
				<span className='content_sidebar_person_title'>
					<i className='icon_content_icon'>&#xe61f;</i>王牌旅行家
				</span>
				<span href='' className="content_sidebar_person_a" title='获取更多旅行家'>更多></span>
				
				<ul className='content_sidebar_person_nav'>
					{traveller}
				</ul>
				<br/><br/>
			</div>
		);

	}
}
);

//定义显示块组件
var Block = React.createClass(
{
	render:function(){
		//渲染数据
		var contentType = '';
		if(this.props.blockData.blockType=='1'){
			contentType = <span className='content_list_block_desc_type'><icon className='icon_content_icon'>&#xe60d;</icon>图文</span> ;
		}else if(this.props.blockData.blockType=='2'){
			contentType = <span className='content_list_block_desc_type_red'>VR视频</span> ;
		}else{
			contentType = <span className='content_list_block_desc_type'><icon className='icon_content_icon'>&#xe62e;</icon>视频</span> ;
		}
		var imgClass = 'content_list_block_img '+this.props.lazyloadClass;
		return (
			<div className='content_list_block' >
				<div className='content_list_block_window'>
					<img className={imgClass} width='100%' height='100%' data-original={this.props.blockData.blockFile } />
				</div>
				<div className='content_list_block_info'>
					
					<h4 className='content_list_block_info_title' alt={this.props.blockData.blockTitle }>{this.props.blockData.blockTitle }</h4>
					<img className='content_list_block_info_img' width='100%' height='100%' src={this.props.blockData.travellerFile } />
					<span className='content_list_block_info_name'>{this.props.blockData.travellerName }</span>
					<span className='content_list_block_info_date'>{this.props.blockData.blockDate }</span>
				</div>
				<div className='content_list_block_desc'>
					<p className='content_list_block_desc_word'>{this.props.blockData.bloclDesc }</p>
					<span className='content_list_block_desc_hot'><i className='icon_fire_icon'>&#xe63c;</i>热度:{this.props.blockData.blockHot }</span>
					{contentType}
				</div>
			</div>
		);

	}
}
);

//定义显示列大舞台组件
var ListStage = React.createClass(
{
	getInitialState:function(){
		//初始化state信息
		var blocklist = [];
		//显示块组件 数组
		blockListData.forEach(
			function(value,index){
				blocklist.push(<Block key={'block'+index} lazyloadClass={'blockList0'} blockData={value} />);
			},
			this
		);

	    return ({
	       blocks:blocklist,
	       jsonNum:0,
	       contentType:'hot'
	    });
	},

	listTopClickHandle:function(type,event){
	
		//'最新'/'最热'按键点击事件触发
		//停止向上冒泡,阻止默认行为
		event.stopPropagation();
		event.preventDefault();

		if(this.state.contentType==type){
			return ;
		}else{
			//更新自身按钮状态
			this.state.contentType = type;
			if(type=='hot'){
				this.state.jsonNum = 0;
			}else if(type=='new'){
				this.state.jsonNum = 1;
			}
			//清空block数组
			this.state.blocks.length=0;
		}
		//渲染 内容区域
		this.updateBlocksByJsonNum();
	},
	getMoreButtonClickHandle:function(event){
		//'加载更多'按键点击事件触发
		//停止向上冒泡,阻止默认行为
		event.stopPropagation();
		event.preventDefault();

		if(this.state.jsonNum<2){
			this.state.jsonNum=2;
		}else if(this.state.jsonNum==2){
			this.state.jsonNum++;
			//$(event.target).text('加载完毕').css({'color':'#999999'});
		}else{
			return ;
		}

		//渲染 内容区域
		this.updateBlocksByJsonNum();
	},
	updateBlocksByJsonNum:function(){
		//组件内部函数：根据组件状态JsonNum读取配置文件 添加组件blocks数据，并重新渲染

		$.getJSON(blockDataJsonFilePath[this.state.jsonNum],function(data){
			//获取json对象
			var len = data.list.length;
			for(var i=0; i<len; i++){
				data.list[i].blockFile =data.baseURL+data.list[i].blockFile;
				data.list[i].travellerFile =data.baseURL+data.list[i].travellerFile;
			}
			var currentIndex = this.state.blocks.length;

			//将内容块添加到数组中并修改
			data.list.forEach(
				function(value,index){
					var keyNum = currentIndex+index;
					this.state.blocks.push(<Block key={'block'+keyNum} lazyloadClass={'blockList'+this.state.jsonNum} blockData={value} />);
				},
				this
			);
			this.forceUpdate();
		}.bind(this) );
	},
	goUpButtonClickHandle:function(goCover,event){

		//'返回封面'/'返回顶部'按键点击事件触发 goCover:true 返回封面 goCover:false 返回顶部
		//停止向上冒泡,阻止默认行为
		event.stopPropagation();
		event.preventDefault();
		//滚动到顶部
		$('body,html').animate(
			{scrollTop:0},
			"slow",
			function(){
				if(goCover){
					setTimeout(
						function(){
							if(coverState.isOpened==false){
								coverState.changeState();
							}
							
						}
						,200
					);
					
				}
				
			}
		);

	},

	render:function(){

		//渲染数据
		//'加载更多'按键数据
		var hotButtonClass='content_list_hotButton';
		var newButtonClass='content_list_newButton';
		var getMoreButtonValue = '加载更多';
		var getMoreButtonStyle = {};
		if(this.state.jsonNum==3){
			getMoreButtonValue = '加载完毕';
			getMoreButtonStyle = {color:"#999999"};
		}
		//"最新"/"最热"按键数据
		if(this.state.contentType=='hot'){
			hotButtonClass += ' content_list_buttom_selected';
		}else if(this.state.contentType=='new'){
			newButtonClass += ' content_list_buttom_selected';
		}


		return (
			<div>
				<p className='content_list_block_line'>
					<a className={hotButtonClass} title='hot' onClick={this.listTopClickHandle.bind(this,'hot')  }>最热</a>
					<a className={newButtonClass} title='new' onClick={this.listTopClickHandle.bind(this,'new')  }>最新</a>
				</p>
				

				<div className='content_sidebar_person_nav'>
					{this.state.blocks}
				</div>

				<p className='content_list_bottom_botton'>
					<a className='content_list_goTopButton' title='toTop' onClick={this.goUpButtonClickHandle.bind(this,false)}><icon className='icon_contentBottom_icon'>&#xe63a;</icon>返回顶部</a>
					<a className='content_list_getMoreButton' title='getData' style={getMoreButtonStyle} onClick={this.getMoreButtonClickHandle} ><icon className='icon_contentBottom_icon'>&#xe621;</icon>{getMoreButtonValue}</a>
					<a className='content_list_goCoverButton' title='goCover' onClick={this.goUpButtonClickHandle.bind(this,true)}><icon className='icon_contentBottom_icon'>&#xe614;</icon>返回封面</a>
					
				</p>
			</div>
		);

	},
	componentDidMount : function(){
	      
		$('.blockList0').lazyload({
			effect:'fadeIn',
			threshold:20,
			failurelimit:6
		});
	},
	componentDidUpdate : function() {

	      $('.blockList'+this.state.jsonNum).lazyload({
			effect:'fadeIn',
			threshold:20,
			failurelimit:6
		});
	}
}
);


//渲染轮播组件
function renderFigureDom(){
	ReactDOM.render(
		<Stage info={figureData[0]}/>,
		document.getElementById('content_demo')
	);
}

//渲染轮播组件
function renderTravellerDom(){
	ReactDOM.render(
		<TravellerStage />,
		document.getElementById('content_sidebar_person')
	);
}

//渲染轮播组件
function renderBlockListDom(){
	ReactDOM.render(
		<ListStage />,
		document.getElementById('content_list')
	);
}

