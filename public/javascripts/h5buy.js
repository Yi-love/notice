/**********************************************************
 *
 * [APP天猫淘宝商品代购 h5页面信息抓取]
 * Author : Jin
 * Time ； 2015/08/06 
 * 思路：
 *     文档加载时：
 *        judge() -----> parseURL()--Y--->(parseTmall() || parseTaobao() )---Y--->category();  // callback = ( tmallChecked || taobaoSelected || failBuy )
 *     用户点击提交代购：
 *     DDT_Car.ddtCar() == go()
 *        		|
 *           callback()  
 *        		|----------(tmallChecked() || taobaoSelected())---skumap ? ----N-------> subObj()--------> return JSON    //  成功
 *        		|                                                  |                  ^
 *        		|                                                  |  Y               |  Y
 *        		|                                                  |--------getSku() ------ N-------> errorMsg()
 *        		|----------failBuy()----->errorMsg()
 * 
 * eq : 
 * 	DDT_Car.ddtCar();  return [JSON || false]
 *  
 * @param  {[Object]} doc       [window.document]
 * @param  {[Object]} undefined [防止全局undefind污染]
 * @return {[Function]} ddtCar          [回调函数 入口]
 * 
 ***********************************************************/
;DDT_Car = (function( doc , undefined){
	var local,   						//商品链接信息                                                           
		detail,                         //天猫商品数据(1)  天猫数据存在页面上                    
		mdskip,                         //天猫商品数据(2)                  
		tbdata,                         //淘宝数据对象     淘宝数据必须通过 $.get()获取           
		flag = false ,                  //判断是否可以提交数据  true； 可以 
        fail = false ,                  //标记回调函数    

		callback ,                      //回调函数对象   
		skumap ,                        //商品skus集合
		ps ,                            //费用数据集合
		qs ,                            //价格数据
		fg ,                            //快递费数据
		errdata ,                       //错误信息Object
		dtsku = null ,
		dtskuclass = 'dt-sku-active',

		hostnamearr = {tmall: parseTmall , taobao : parseTaobao},               //天猫/淘宝各自对应的解析函数          
		shopSource = {tmall : "Tmall" , taobao : "TB"},                         //天猫/淘宝各自对象的商店前缀
		hostcallback = {tmall: tmallChecked , taobao : taobaoSelected},         //天猫/淘宝各自对应的选择商品属性处理函数
		tbshopurl = "https://shop.m.taobao.com/shop/shopIndex.htm?shop_id=",    //淘宝店铺链接前缀
		taobaourl = "https://hws.m.taobao.com/cache/wdetail/5.0/?id=",          //请求数据淘宝商品接口
		ddtapi = "https://api.dotdotbuy.com/run/go/rest/?prefix=TB&" ,          //ddt判断商品是否可以进行代购的接口  10000表示可以，其他则否
		obj = {                        //ddt购物车所需要的数据对象
			Name		: "",	       //商品名
			GoodsId 	: "",          //商品ID
			ShopLink	: "",	       //店铺链接
			Link		: "",          //商品链接
			Skus 		: "", 	       //商品sku
			ShopName	: "",          //店铺名称
			cid 		: "",          //商品类别id ： ddt通过cid判断是否可以代购该商品
			Price		: "",	       //价格
			Freight		: 0,	       //运费
			Count		: 1,	       //数量
			ShopSource	: "",          //店铺前缀
			ShopId 		: "" ,         //店铺ID
			Picture		: "" 	       //商品图片url
		},
		styTxt = "display:none;background:rgba(0,0,0,0.6);color:#fff;text-align:center;padding:2% 5%;margin:10%;position:fixed;z-index:9999999;top:40%;"+
				 "width:70%;font-size:16px;box-shadow:0px 0px 20px #666;border-radius:2px;",
		errobj = doc.createElement("div"),   //选择商品信息提示对象
	    displaynone = doc.createElement('div'); //隐藏天猫淘宝原有按钮

	doc.body.appendChild(errobj);
	doc.body.appendChild(displaynone);

	displaynone.innerHTML = "<style>.thw-detail-panel , .thw-service-hook .option ,.dgsc-ft ,.item-action ,#s-actionBar-container , .bottom-fxied ,.mui-bottom-smart-banner,#inner-cart{display:none!important;}.dt-sku-active{border:2px solid red;-webkit-animation:skuactive 4s ease;animation:skuactive 4s ease}@keyframes skuactive{20%{border-color:#fff}40%{border-color:red}60%{border-color:#fff}80%{border-color:red}}@-webkit-keyframes skuactive{20%{border-color:#fff}40%{border-color:red}60%{border-color:#fff}80%{border-color:red}}</style>";
	errobj.style.cssText = styTxt;

	/**
	 * [D_$ ddt选择器]
	 * @type {Object}
	 */
	var D_$ = {
		init: function (selector){
			return doc.querySelectorAll(selector);
		}
	};
	var D = function ( selector ){
		return D_$.init(selector);
	};
	function _hasClass( obj , cls ) {
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	};
	function _addClass( obj , cls ) {
		if (!_hasClass(obj, cls)){ obj.className += " " + cls;}
	};
	function _removeClass( obj , cls ) {
		if (_hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
	};
	/**
	 * [parseURL 解析商品url]
	 * @param  {[String]} url [url]
	 * @return {[Object]}     [返回解析好的对象]
	 */
	function parseURL(url) {
	    var a =  document.createElement("a");
	    a.href = url;
	    return {
	        source: url,
	        protocol: a.protocol.replace(":",""),
	        host: a.hostname,
	        port: a.port,
	        query: a.search,
	        params: (function(){
	            var ret = {},
	                seg = a.search.replace(/^\?/,"").split("&"),
	                len = seg.length, i = 0, s;
	            for ( ; i < len ; i++ ) {
	                if ( !seg[i] ) { continue; }
	                s = seg[i].split("=");
	                ret[s[0]] = s[1];
	            }
	            return ret;
	        })(),
	        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,""])[1],
	        hash: a.hash.replace("#",""),
	        path: a.pathname.replace(/^([^\/])/,"/$1"),
	        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,""])[1],
	        segments: a.pathname.replace(/^\//,"").split("/")
	    };
	};

	/**
	 * [judge 判断函数  该函数会在页面加载的时候执行]
	 * @return 
	 */
	function judge(){
		try{
			localStorage.closeDate = Date.now();//关闭广告
		}catch(e){}
		local = parseURL(doc.location.href);
		for ( var hsname in hostnamearr){
			if ( local.host.indexOf(hsname) >= 0 ){
				obj.ShopSource = shopSource[hsname];
				callback = hostcallback[hsname];                 //回调函数 ： fn  hostcallback[hsname]
				fail = true;
				hostnamearr[hsname].call();                //执行解析函数：  fn ； hostnamearr[name]
				break;
			}
		}
	};

	/**
	 * [category 判断商品是不是可以代购]
	 *  
	 *  只有 res.Code === 10000 ||10001 时才表示商品可以代购
	 * @param  {[String]} url [URL]
	 * @return
	 */
	function category(url){
		var script = doc.createElement("script");
		script.src = url+"jsonp=DDT_Car.ddtCategory";
		doc.head.appendChild(script);
	};
	/**
	 * [categoryRespose 商品是否支持代购数据反馈]
	 * @param  {[OBJECT]} res [description]
	 * @return {[type]}     [description]
	 */
	function categoryResponse(res){
		var code = +res.Code;
		if ( code != 10000 && code != 10001 ){
			fail = false;
			failBuy();
			return;
		}
		if ( code === 10001 ){
			errorMsg(undefined , "温馨提示：此商品需谨慎购买");
		}
	};
	/**
	 * [parseTmall 天猫数据解析]
	 * @return 
	 */
	function parseTmall(){
		var itemdo;
		$ = D;
		dtsku = doc.querySelector('.sku .content');
		if ( (detail = _DATA_Detail) && (mdskip = _DATA_Mdskip) ) {

			// 基本数据设置
			// 商品除了  [价格 , 数量 , sku] 会变
			// 其他的均视为：基本数据只会在商品加载的时候设置一次

		    skumap = detail.valItemInfo.skuMap ;
		    ps = mdskip.defaultModel;
		    qs = ps.itemPriceResultDO.priceInfo;
		    fg = ps.deliveryDO.deliverySkuMap.default[0].postage;
		    fg = fg.replace(/[^0-9.]/g , '');

		    itemdo = detail.itemDO;
		    obj.GoodsId = local.params["id"];
			obj.Link = local.source;
			obj.Name = itemdo.title;
			obj.Freight = fg ? parseFloat(fg).toFixed(2) : 0;
			obj.cid = itemdo.categoryId;
			obj.Picture = itemdo.mainPic;
			obj.ShopId = itemdo.encryptSellerId;
			obj.ShopLink = detail.detail.shopSameCategoryUrl;
			obj.ShopName = decodeURIComponent(itemdo.sellerNickName);

			errdata = detail.valItemInfo && detail.valItemInfo.skuName || {};	

			category(encodeURI(ddtapi+'cid='+obj.cid+'&title='+obj.Name+'&biz_method=verify_goods&'));//判断商品是否可以代购
		}
	};

	/**
	 * [parseTaobao 淘宝数据解析]
	 * @return
	 */
	function parseTaobao(){
		var itemim , seller;
		dtsku = doc.querySelector('.dt-sku');
		$.get(taobaourl+local.params["id"], function(res){

			// 基本数据设置
			// 商品除了  [价格 , sku] 会变
			// 其他的均视为：基本数据只会在商品加载的时候设置一次
			
			tbdata = res.data;
			if ( tbdata ){		
				skumap = tbdata.skuModel && tbdata.skuModel.ppathIdmap;
				ps = tbdata.apiStack[0].value ? JSON.parse(tbdata.apiStack[0].value).data :
								     JSON.parse(tbdata.extras.defDyn);
				fg = ps.delivery && ps.delivery.deliveryFees[0];
				fg = fg.replace(/[^0-9.]/g , '');

				itemim = tbdata.itemInfoModel;
				seller = tbdata.seller;
				obj.GoodsId = local.params["id"];
				obj.Link = local.source;
				obj.Name = itemim.title;
				obj.Freight = fg ? parseFloat(fg).toFixed(2) : 0;
				obj.cid = itemim.categoryId;
				obj.Picture = itemim.picsPath[0];
				obj.ShopId = seller.shopId;
				obj.ShopLink = tbshopurl+obj.ShopId;
				obj.ShopName = seller.shopTitle;

				errdata = tbdata.skuModel && tbdata.skuModel.skuProps || {};
				
				category(encodeURI(ddtapi+'cid='+obj.cid+'&title='+obj.Name+'&biz_method=verify_goods&')); //判断商品是否可以代购
			}
		} , "jsonp");
	};

	/**
	 * [tmallChecked 天猫获取用户选择商品属性]
	 * @return {[Object || Boolean]} [Object:返回选择好的数据 || boolean: false 说明用户没有选择好商品]
	 */
	function tmallChecked(){
		var l ,
			n = 1,
			sku = "" ,
		    p = 0,
		    q , 
		    i = 0,
		    selectorarr = [".sku-control input:checked" , ".sku-control .checked"];
		if ( skumap ){
			for ( i = 0 ; i < selectorarr.length ; i++ ){
				if ( $(selectorarr[i]) && $(selectorarr[i]).length > 0 ){
					l = $(selectorarr[i]);
					break;
				}
			}
			if ( i === selectorarr.length ){
				return errorMsg();
			}
			n = $(".number-control .num")[0].value;//商品数量
			sku = getSku(l , skumap );  //获取sku
			if ( !sku ) {
				return false;
			};
		}
		q = sku ? qs[sku] : qs.def;
		if ( q.suggestivePromotionList && q.suggestivePromotionList.length > 0 ){ //双11
			if ( +(q.suggestivePromotionList[0].endTime) - (+new Date())+((new Date()).getTimezoneOffset()/60+8)*3600 >= 0 &&
				+(q.suggestivePromotionList[0].startTime) - (+new Date())+((new Date()).getTimezoneOffset()/60+8)*3600 <= 0
				){
				p = q.suggestivePromotionList[0].price || (q.promotionList && q.promotionList[0].price) || q.price;
			}else{
				p = (q.promotionList && q.promotionList[0].price) || q.price;
			}
		}else{
			p = (q.promotionList && q.promotionList[0].price) || q.price;
		}
		obj.Count = n;
		obj.Skus = sku;
		obj.Price = p;
		
		flag = true;
		return subObj(); //提交数据
	};

	/**
	 * [taobaoSelected 淘宝获取用户选择的商品属性]
	 * @return  {[Object || Boolean]} [Object:返回选择好的数据 || boolean: false 说明用户没有选择好商品]
	 */
	function taobaoSelected(){
		var l ,
			i = 0,
		    sku = "",
		    n = $('.num-display').text(),
		    p = 0,
		    selectorarr = [".dgscp-c .sel[data-id]" , ".dgscp-c .sel" , ".sel"];
		if ( skumap ){
			for ( i = 0 ; i < selectorarr.length ; i++ ){
				l = $(selectorarr[i]);
				if ( l.length > 0 ){
					break;
				}
			}
			if ( i === selectorarr.length ){
				return errorMsg();
			}
			sku = getSku(l , skumap);//获取sku
			if ( !sku ) {
				return false;
			};
	    }
	   
		p = (sku && ps.skuModel && ps.skuModel.skus[sku].priceUnits[0].price)  || 
			ps.itemInfoModel.priceUnits[0].price ;    

		obj.Count = +n > 1 ? +n : 1;
		obj.Skus = sku;
		obj.Price = p;

		flag = true;
		return subObj();//提交数据
	};

	/**
	 * [getSku 获取sku]
	 * @param  {[Array]} l      [用户点击页面属性时的sku集合]
	 * @param  {[Object]} skumap [商品本身的sku集合]
	 * @return {[String || false]}        [String : sku 获取sku成功并返回sku  || false : 提示用户没有选择完全]
	 */
	function getSku(l , skumap){
		var sku ,
		    i = 0,
		    skus = [],
		    len = 0 ,
		    j = 0 ,
		    t = 0 ,
		    propId = "";
		for ( i = 0 , len = l.length ; i < len ; i++ ){  //获取用户点击产生的sku
			skus[i] = (l[i].nodeName.toUpperCase() === "INPUT" && l[i].value) 
					|| l[i].getAttribute("data-value")
					|| $(l).eq(i).val() || $(l).eq(i).attr("data-id");
		}
		for ( var skuname in skumap ) {
			var s = skuname.replace(/;/g , "");
			for ( j = 0 ; j < len ; j++ ){
				if ( s.indexOf(skus[j]) >= 0 ){     //为了防止sku的顺序问题，选用正则匹配
					s = s.replace(skus[j] , "");
					continue;
				}
				break;
			}
			if ( s === "" ){
				sku = skumap[skuname].skuId || skumap[skuname];  // 天猫sku  / 淘宝sku  ： 请不要换位置
				return sku;
			}else if ( j > t && s ){
				propId = s.split(":")[0]; // 获取没有选中属性的属性id
				t = j;
			}
		}
		return errorMsg(propId);;
	};

	/**
	 * [errorMsg 错误提示]
	 * @param  {[String]} propId [商品属性id]
	 * @param  {[String]} errtxt [提示信息]
	 * @return {[boolean : false]}        [flag = false : 不能提交数据]
	 */
	function  errorMsg(propId , errtxt) {
		var i = 0 ,
			l ,
		    errpre = errtxt ? errtxt : "请选择 商品属性";
		if ( propId ) {
			errpre = "请选择 ";
			l =  errdata.length;
			for ( ; i < l ; i++ ) {
				var err = errdata[i];
				if ( err.id && (propId == err.id) ){  //天猫
					errpre += err.text;
					break;
				}else if ( err.propId && (propId == err.propId) ){  //淘宝
					errpre += err.propName;
					break;
				}
			};
			errpre = i === l ? errpre+" 商品属性" : errpre;
		}else{
			if ( dtsku && !errtxt){
				_addClass(dtsku , dtskuclass);
				setTimeout(function(){
					_removeClass(dtsku , dtskuclass);
				} , 10000);
			}
		}

		errobj.innerHTML = errpre;        //显示提示
		errobj.style.display = "block";
		setTimeout(function(){
			errobj.style.display = "none";
			errobj.innerHTML = "";
		} , 1500);

		return flag = false;
	};

	/**
	 * [subObj 提交数据]
	 * @return {[JSON]} [json格式的数据对象]
	 */
	function subObj(){
		if ( !flag ){ return false;}
		var buyobj = JSON.stringify({code: "success" , data :obj}); //数据JSON花
		try{
			android.addToCart(buyobj);  // android 提交数据
			return true;
		}catch( e ){}
		flag = false;
		return buyobj;  // IOS返回数据
	};

	/**
	 * [failBuy 不能代购提示]
	 * @return
	 */
	function failBuy(){
		try{
			android.onError();
			return;
		}catch(e){}
		errorMsg(undefined , "此商品暂时不支持代购");
		return 'unsupport';
	};

	/**
	 * [issueReport 测试函数发布前删除]
	 * @return {[type]} [description]
	 */
	// function  issueReport(){
	// 	(new Image()).src = 'http://192.168.0.226:3000/sendto?url='+encodeURIComponent(local.source); //采集不能代购的商品数据 发布前删除
	// };

	/**
	 * [issue 问题反馈     测试数据 发布前删除]
	 * @type {[type]}
	 */
	// var issue =  doc.createElement("div");
	// issue.innerHTML = '<a href="#" id="D_addcar" style="position: fixed;z-index: 9999999;bottom:10%;right: 0;width:auto;text-align: center;  padding: 0 5px;line-height: 36px;background-color: rgb(23, 7, 7); border-radius:2px;  color: #fff;font-size: 1em;">无法代购反馈</a>';
	// doc.body.appendChild(issue);
	// var isbt = document.getElementById('D_addcar');
	// isbt.onclick = function(evt){
	// 	evt.preventDefault();
	// 	issueReport();
	// };

	/**
	 * [go 开始代购]
	 * @return {[JSON || false ]} [返回数据 || false]
	 */
	function go(){
	   callback = fail ? callback : failBuy;
	   return callback();
	};

	function informationText(){
		var div = doc.createElement('div');
		var size = 1;
		try{
			size = +dpr;
		}catch(e){}
		var cssText = "position:fixed;z-index:99999;top: 20%;left: 3%;font-size:"+(size*20)+"px;background-color: #fff;color: #000;width: 90%;padding:20% 2%;text-align:center;";
		div.innerHTML ='马云家太小气，屏蔽海外剁手党，请移步PC端<br><span style="color: #EE093B;">www.dotdotbuy.com</span>抢购，<br>还有惊喜优惠';
		div.style.cssText = cssText;
		doc.body.appendChild(div);
	}
	// informationText();
	judge();
	
	/**
	 *    DDT_Car 统一入口
	 */
	return {
		ddtCar : go,
		ddtCategory : categoryResponse
	};
})( this.document );