var blowsmall = document.getElementById('j_blow_small'),
	cursor = document.getElementById('cursor'),
	blowmax = document.getElementById('j_blow_max'),
	mousexy = document.getElementById('j_mouse_xy'),
	box = document.getElementById('j_blow_img_box'),
	body = document.getElementsByTagName('body')[0],
	max = 464,
	pst ;
	
if ( blowmax.style ){
		blowmax.style.width = max*2 +'px';
		blowmax.style.height = max*2+'px';
	}else if( blowmax.runtimeStyle ){
		blowmax.runtimeStyle.width = max*2 +'px';
		blowmax.runtimeStyle.height = max*2+'px';
	}
	
if ( blowsmall.addEventListener){
	blowsmall.addEventListener('mousemove' , function(e){
		pst = getPosition(e);
		setCss(pst)
		showMax(pst);
	});	
}else if ( blowsmall.attachEvent){
	blowsmall.attachEvent('onmousemove' , function(e){
		pst = getPosition(e);
		setCss(pst);
		showMax(pst);
	})
}else{
	blowsmall.onmousemove = function(e){
		pst = getPosition(e);
		setCss(pst);
		showMax(pst);
	}
};

function setCss(pst){
	if( cursor.style ){
		cursor.style.left = pst.left+'px';
		cursor.style.top = pst.top+'px';
	
	}else if(cursor.runtimeStyle){
		cursor.runtimeStyle.left = pst.left+'px';
		cursor.runtimeStyle.top = pst.top+'px';	
	}
}
function getPosition(e){
	var offset = getOffset(blowsmall) , 
		xy = getScrollXY();
	var x = +(e.clientX-offset.left+xy.x) , 
		y = +(e.clientY-offset.top+xy.y);
	var left = x-max*0.25 > 0 ? x-max*0.25 : 0 , 
		top = y-max*0.25 > 0 ? y-max*0.25 : 0;
		
	left = left > max*0.5 ? max*0.5 : left ;
	top = top > max*0.5 ? max*0.5 : top ;
	
	return {left:left ,top:top};
}
function showMax(pst){
	var x = pst.left*2 , y = pst.top*2;
	if ( blowmax.style ){
		blowmax.style.marginLeft = -x +'px';
		blowmax.style.marginTop = -y+'px';
	}else if( blowmax.runtimeStyle ){
		blowmax.runtimeStyle.marginLeft = -x +'px';
		blowmax.runtimeStyle.marginTop = -y+'px';
	}
}

function getOffset(element){
	var top = 0 , left = 0;
	if ( element ) {
		while ( element != body && element != document ){
			top = +element.offsetTop > top ? +element.offsetTop : top;
			left = +element.offsetLeft > left ? +element.offsetLeft : left;
			element = element.parentNode;
		}
	}
	return {left:left , top:top};
}
function getScrollXY(){
	return {
		x : window.scrollX  || document.documentElement.scrollLeft || document.body.scrollLeft,
		y : window.scrollY || window.scrollTop|| document.documentElement.scrollTop || document.body.scrollTop
	}
};
