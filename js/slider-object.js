// window.onload=function(){
// $.fn.extend(function(){

	if(!window.Fier){
		window.Fier = {};
	}
	Fier.translateEnd=function(dom,callback){
		if(typeof dom == 'object'){
			dom.addEventListener('webkitTransitionEnd', function(){
				callback&&callback();
			});
			dom.addEventListener('transitionEnd', function(){
				callback&&callback();
			})
		}
	}
	Fier.slider=function(id,cname){
		this.outer=document.getElementById(id);
		this.ul=this.outer.getElementsByTagName('ul')[0];
		this.ol=this.outer.getElementsByTagName('ol')[0];
		this.arrLi=this.ul.getElementsByTagName('li');
		this.aLi=this.ol.getElementsByTagName('li');
		this.right=this.outer.getElementsByTagName('span')[1];
		this.left=this.outer.getElementsByTagName('span')[0];
		this.imgWidth=this.arrLi[0].offsetWidth;
		this.index=0;
		this.cname=cname;
		this.timer=null;
	}
	Fier.slider.prototype={
		constructor:Fier.slider,
		_init:function(){
			//动态生成小圆点
			this.createCircle(this.arrLi.length);
			//定时器
			var that = this;
			this.timerFn();
			//右击滑动
			this.right.onclick=function(){
				that.autoplay();
			}
			//左击滑动
			this.left.onclick=function(){
				that.LeftClick();
			}
			//鼠标悬停动画停止
			this.outer.onmouseover=function(){
				clearInterval(that.timer);
			}
			//鼠标离开动画重新开始
			this.outer.onmouseout=function(){
				that.timerFn();
			}
			//点击每一个小原点标签 切换到相应的图片
			for(var i=0;i<this.aLi.length;i++){
				var _this = this;
				that.aLi[i].count=i
				that.aLi[i].onclick=function(){
					_this.change(this.count);
				}
			}	
		},
		autoplay:function(){
			this.index++;
			if(this.index>this.arrLi.length-1){
				this.ul.style.left=0;
				this.index=1;
			}
			$(this.ul).animate({'left':-this.imgWidth*(this.index)});
			this.light(this.index);
		},
		light:function(index){
			index=index>this.arrLi.length-2?0:index;
			for(var i=0;i<this.aLi.length;i++){
				this.aLi[i].className='';
			}
			this.aLi[index].className=this.cname;
			index++; //这里保证原点的索引值和图片相对应
		
		},
		//点击每一个小原点标签 切换到相应的图片
		change:function(index){
			this.light(index);
			// this.ul.style.left=-this.imgWidth*(index)+'px';
			$(this.ul).animate({'left':-this.imgWidth*(index)});
			this.index=index; //这里保证全局公用一个index 能够联系起来
		},
		//动态生成小圆点
		createCircle:function(length){
			for(var i=0;i<length-1;i++){
				var newNode = document.createElement('li');
				this.ol.appendChild(newNode);
			}			
		},
		//左箭头图片滑动
		LeftClick:function(){
			this.index--;
			if(this.index<0){
				this.ul.style.left=-this.imgWidth*(this.arrLi.length-1)+'px';
				this.index=this.arrLi.length-2;
			}
			$(this.ul).animate({'left':-this.imgWidth*this.index});
			this.light(this.index);
		},
		//定时器
		timerFn:function(){
			
			var that=this;
			clearInterval(that.timer);
			this.timer=setInterval(function(){
				that.autoplay();
			},1000);
		}
	}


