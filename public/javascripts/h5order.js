/**
 * [购物车转运]
 * @param  {[type]} win              [description]
 * @param  {[type]} doc              [description]
 * @param  {[type]} undefined
 *
 * e.g : DDT_Order.order() return []  获取转运订单
 *       DDT_Order.rander() 渲染按钮
 */
;DDT_Order=(function(win , doc , undefined){
	var mdpr = dpr || win.devicePixelRatio || 1;//缩放倍数
	msize = 36*mdpr; //最后大小
	var str = ['<div class="d-ex-bt">',
			  '    <span class="d-ex-add"></span>',
			  '    <span class="d-ex-del"></span>',
			  '</div>'].join('');
	var cssTxt = ['<style>',
				  '.top-fixed .header{display:none!important;}',
				  '.d-ex-box{width:100%;height:'+msize+'px;background:#3bccba;position:relative;margin-bottom:30px;overflow:hidden;}',
				  '.d-ex-box .d-ex-bt{width:100%;height:96px;background:#3bccba;-webkit-transition:all .2s;-moz-transition:all .2s;transition:all .2s;}',
				  '.d-ex-box .d-ex-bt .d-ex-add{width:100%;height:'+msize+'px;text-align:center;display:block;background:url(https://api.dotdotbuy.com/pub/chrome/images/btn-exp.png) center center no-repeat;background-size:auto 80%;}',
				  '.d-ex-box .d-ex-checked{-webkit-transform:translateY(-'+msize+'px);-moz-transform:translateY(-'+msize+'px);-o-transform:translateY(-'+msize+'px);transform:translateY(-'+msize+'px);}',
				  '.d-ex-box .d-ex-bt .d-ex-del{width:100%;height:100%;color:#fff;border:none;display:block;position:relative;margin:0 auto;}',
				  '.d-ex-box .d-ex-bt .d-ex-del:before,.d-ex-box .d-ex-bt .d-ex-del:after{display:block;content:" ";position:absolute;left:50%;top:4px;width:'+mdpr+'px;overflow:hidden;color:#fff;height:'+(32*mdpr)+'px;background:#fff;}',
				  '.d-ex-box .d-ex-bt .d-ex-del:before{-webkit-transform:rotateZ(-45deg);-moz-transform:rotateZ(-45deg);-o-transform:rotateZ(-45deg);transform:rotateZ(-45deg);}',
				  '.d-ex-box .d-ex-bt .d-ex-del:after{-o-transform:rotateZ(45deg);-webkit-transform:rotateZ(45deg);-moz-transform:rotateZ(45deg);transform:rotateZ(45deg);}',
				  '</style>'].join('');

	function _hasClass( obj , cls ) {
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	};
	function _addClass( obj , cls ) {
		if (!_hasClass(obj, cls)){ obj.className += " " + cls;}
	};
	function _removeClass( obj , cls ) {
		if (_hasClass(obj, cls)) {
	        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	        obj.className = obj.className.replace(reg, '');
	    }
	};
	function _toggleClass(obj , cls){
		if (_hasClass(obj, cls)){
			_removeClass(obj,cls);
		}else{
			_addClass(obj,cls);
		}
	}
	win.location.onload = win.location.reload = rander;
	/**
	 * [rander 添加转运按钮]
	 * @return {[type]} [description]
	 */
	function rander(){
		var orderlist = doc.querySelectorAll('.order-list>li'),
			styledom = document.createElement('div');

		styledom.innerHTML = cssTxt;
		doc.body.appendChild(styledom);

		if (orderlist){
			for (var i = 0; i < orderlist.length; i++) { //添加按钮
				if ( !(orderlist[i].querySelector('.d-ex-box')) ){
					var exdom = doc.createElement('div');
					exdom.className = 'd-ex-box'; 
					exdom.innerHTML = str;
					orderlist[i].appendChild(exdom);
				}
			};
		}
		var dom = doc.querySelector('.scroll-content'),
			exbts = doc.querySelectorAll('.d-ex-bt');
		dom.style.height = (parseInt(dom.style.height)+(msize+30)*orderlist.length)+'px';
		
		for ( var i = 0 ; i < exbts.length ; i++ ){
			(function(){
				var exbt = exbts[i];
				exbt.addEventListener('click' , function(){ //添加事件 
					_toggleClass(exbt , 'd-ex-checked');
				});
			})();	
		}
	};

	/**
	 * [getOrder 获取订单]
	 * @return {[type]} [description]
	 */
	function getOrder(){
		var i = 0 ,
			shop = {}, 
			cart =[] ,
			goodarr = [],
			orderck ,
			orderitem,
			orderlist = doc.querySelectorAll('.order-list>li');
		for ( ; i < orderlist.length ; i++ ){
			orderitem = orderlist[i];
			orderck = orderitem.querySelector('.d-ex-checked');
			//商家信息
			var item = {
				goods : [],
				shopsource :'TB',
				is_check : 0,
				get_invoice : 0,
				spm:'h5.ex.order.'+i,
				remark :'',
				orderNum :'',
				type : '',
				jsonp :'',
				biz_method : 'h5order',
				_ : +new Date()
			};
			if ( orderck ){
				shop = getShopInfo(orderitem);
				shoptype = shop.shopUrl.indexOf('tmall') > -1 ? 'tmall' : 'taobao';
				goodarr = getGoodInfo(orderitem.querySelectorAll('.item .item-list') || orderitem.querySelectorAll('.item-list'));
				item.goods = goodarr;
				item.shop = shop;
				item.type = shoptype;
				cart[cart.length] = item;//添加到转运
			}
		}
		var data = cart.length ? JSON.stringify({code:'success' , data : cart}) : JSON.stringify({code:'fail' , data : []});
		try{
			andriod.getData(data);
		}catch(e){}
		return data;
	}
	/**
	 * [getShopInfo 获取店铺信息]
	 * @param  {[type]} selector [description]
	 * @return {[type]}          [description]
	 */
	function getShopInfo(selector){
		var shop = {
				shopName : selector.querySelector('.seller .title').innerHTML ||
					       selector.querySelector('.o-t-title-shop .title').innerHTML,
				shopUrl : selector.querySelector('.contact a').href
			}
		return shop;
	}
	/**
	 * [getGoodInfo 获取商品信息]
	 * @param  {[type]} selector [description]
	 * @return {[type]}          [description]
	 */
	function getGoodInfo(selector){
		var i = 0,
			elem ,
			len = selector.length,
			itemcb ,
			itempay,
			iteminfo,
			itemthumb,
			url,
			gid ,
			goodarr = [];
		//遍历订单的多个商品
		for (; i < len ; i++ ){
			elem = selector[i];
			itemthumb = elem.querySelector('.item-img');
			iteminfo = elem.querySelector('.item-info');
			itempay = elem.querySelector('.item-pay');
			if (!itemthumb) continue;
			//商品信息
			var good = {
				thumb : itemthumb && itemthumb.querySelector('img') && itemthumb.querySelector('img').src || '',
				url : '',//itemthumb.querySelector('a').href || iteminfo.querySelector('a').href,
				name : iteminfo.querySelector('.title').innerHTML,
				desc : iteminfo.querySelector('.sku').innerHTML,
				price : itempay.querySelector('.price').innerText.replace(/[^\d.]/ig,''),
				num : itempay.querySelector('.nums').innerText.replace(/[^\d]/ig,'')
			};
			//商品id
			if ( good.url ){
				url = good.url.match(/\/i?(\d)+\.(htm|html)?$/ig)
					 || good.url.match(/(\?|&)id=(\d)+(&)?/ig);
			    gid = url ? url[0].replace(/[^\d]/ig,'') : good.url;
			    good.url = gid;
			}
			goodarr[goodarr.length] = good;
		}
		return goodarr;
	}

	return {
		rander : rander,
		order : getOrder
	};
})(window , document);

