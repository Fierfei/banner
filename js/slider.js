window.onload=function(){
	var outer = document.getElementById('outer');
	var ul = outer.querySelector('ul');
	var ol = outer.querySelector('ol');
	var right = document.querySelector('.right');
	var arrLi=ul.querySelectorAll('li');
	var aLi=ol.querySelectorAll('li');
	var imgWidth = arrLi[0].offsetWidth;
	
	var left = document.querySelector('.left');

	var index=0;
	right.onclick=function(){
		index++;
		if(index>arrLi.length-1){//这里注意要是大于号  不能等于号		
			ul.style.left=0; //这里要先设置left值为0
			index=1;//从第二张开始滑动
		}
		$(ul).animate({'left':-imgWidth*index});
		light(index);
		
	}

	left.onclick = function(){//这里存在图片反向拖回，是因为少加px单位
		index--;
		if(index<0){
			ul.style.left=-imgWidth*(arrLi.length-1)+'px';
			index=arrLi.length-2;
		}
		$(ul).animate({'left':-imgWidth*index});
		light(index);
	}
	
	//自动轮播
	timer=null;
	clearInterval(timer);
	timer=setInterval(function(){
		index++;
		if(index>arrLi.length-1){//这里注意要是大于号  不能等于号		
			ul.style.left=0; //这里要先设置left值为0
			index=1;//从第二张开始滑动
		}
		$(ul).animate({'left':-imgWidth*index});
		light(index);
	}, 1000);

	//鼠标悬停的时候 轮播图暂停
	outer.onmouseover=function(){
		clearInterval(timer);
	}
	outer.onmouseout=function(){
		timer=setInterval(function(){
		index++;
		if(index>arrLi.length-1){//这里注意要是大于号  不能等于号		
			ul.style.left=0; //这里要先设置left值为0
			index=1;//从第二张开始滑动
		}
		$(ul).animate({'left':-imgWidth*index});
		light(index);
	}, 1000);
	}
		
	function light(index){
			index=index>aLi.length-1?0:index;
			for(var j=0;j<aLi.length;j++){
				aLi[j].className='';
			}
			aLi[index].className='now';
			console.log(index);

		
	}

}
	





