/**
 * [H5Cart 转运抓淘宝购物车]
 * Jin
 * e.g: DDT_Cart.cart()  return []
 */
;DDT_Cart = (function(win){

	/**
	 * [getGoods 获取转运商品]
	 * @return {[type]} [description]
	 */
	function getGoods(){
		var alls = document.querySelectorAll('.bundlev2');//获取商品box		
		var data = JSON.stringify({code:'fail' , data:[]});
		//抓页面
		if ( alls && alls.length > 0 ){
			data = JSON.stringify({code:'success' , data :getGoodsBuyPage(alls)});
		}
		try{
			andriod.getData(data);
		}catch(e){}
		return data;
	};
	/**
	 * [getGoodsBuyPage 获取购物车页面抓转运商品信息]
	 * @param  {[type]} selector [description]
	 * @return {[type]}          [description]
	 */
	function getGoodsBuyPage( selector ){
		var i = 0 ,
			alls = selector,
			elem = null,
			cart =[],
			goods = [],
			shoptype = '',
			len = selector.length;
		/**
		 * 遍历订单
		 */
		for( ; i < len ; i++ ){
			elem = alls[i];
			if ( !elem.querySelector('.shop .title') ) continue;
			var goodarr = [],
				//商家信息
				shop = {
					shopName : elem.querySelector('.shop .title').innerHTML,
					shopUrl : elem.querySelector('.contact a').href
				},
				item = {
					goods : [],
					shopsource :'TB',
					is_check : 0,
					get_invoice : 0,
					spm:'h5.ex.cart.'+i,
					remark :'',
					orderNum :'',
					type : '',
					jsonp :'',
					biz_method : 'h5cart',
					_ : +new Date()
				};
			shoptype = shop.shopUrl.indexOf('tmall') > -1 ? 'tmall' : 'taobao';
			//商品信息 []
			goods = elem.querySelectorAll('.itemv2');
			//获取选中商品的信息 []
			goodarr = getGoodsInfo(goods);

			if ( goodarr.length > 0 ){
				item.goods = goodarr;
				item.shop = shop;
				item.type = shoptype;
				cart[cart.length] = item;//添加到转运
			}
		}
		return cart;
	}
	/**
	 * [getGoodsInfo 获取选中商品的信息]
	 * @param  {[type]} selector [description]
	 * @return {[type]}          [description]
	 */
	function getGoodsInfo( selector ){
		var i = 0,
			elem ,
			len = selector.length,
			itemcb ,
			itemdetail,
			iteminfo,
			itemthumb,
			url,
			gid ,
			goodarr = [];
		//遍历订单的多个商品
		for (; i < len ; i++ ){
			elem = selector[i];
			itemcb = elem.querySelector('.item-cb .o-t-cb');
			//选中了商品
			if ( itemcb && itemcb.nodeName.toLowerCase() == 'input' && itemcb.checked
			    || itemcb.getAttribute('checked') ){
				itemdetail = elem.querySelector('.item-detail');

				itemthumb = itemdetail.querySelector('.item-img');
				iteminfo = itemdetail.querySelector('.item-info');
				//商品信息
				var good = {
					thumb : itemthumb && itemthumb.querySelector('img') && itemthumb.querySelector('img').src,
					url : itemthumb.querySelector('a').href || iteminfo.querySelector('a').href,
					name : iteminfo.querySelector('.title').innerHTML,
					desc : iteminfo.querySelector('.sku').innerHTML,
					price : iteminfo.querySelector('.price').innerText,
					num : iteminfo.querySelector('.quantity').innerText.replace(/[^\d]/ig,'')
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
		}
		return goodarr;
	}
	return {
		cart : getGoods
	}
})(window);

(function(){
	var cssTxt = '<style>.top-fixed .header ,.header , .footer .f-fx .btn{display:none!important;}</style>';
	var styledom = document.createElement('div');
	styledom.innerHTML = cssTxt;
	document.body.appendChild(styledom);
})();











