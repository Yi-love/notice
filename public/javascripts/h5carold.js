var D_CartData = null;
//TB接口
function D_queryOrder(){
	var params = lib.env.params || {};     
        params.exParams = "{\"mergeCombo\":\"true\"}";
        params.isPage = "false";
        params.extStatus = '0';
	return lib.mtop.request({
            'api': 'mtop.trade.queryBag',
            'v': '5.0',
            'data': params,
            'ttid': params.ttid,
            'isSec': "0",
            'ecode': "1",
            'AntiFlood': true,
            'AntiCreep': true,
            'H5Request': true
        });
}
//请求接口
function D_requestTMCart(){
	var tmdata = D_queryOrder().then(function(response){
		D_CartData = response.data;
		D_getStructureData(D_CartData);
	});
}
//获取购物车数据
function D_getStorage(){
	//获取用户名
	var useNick = lib.login.getUserNick();
	//缓存中获取数据
	var local = window.localStorage;
    if (local) {
        var cartData = local.getItem('cartData');
        if (cartData) {
            try {
                cartData = JSON.parse(cartData);
                D_CartData = cartData[useNick];
                D_getStructureData(D_CartData);
            } catch (err) {
            	D_requestTMCart();
            }
        }else{
        	D_requestTMCart();
        }
    }else{
    	D_requestTMCart();
    }
}

function D_getStructureData( pageData ){
	console.log('this is data:' , pageData);
    var data = pageData['data'];
    var hierarchy = pageData['hierarchy'];
    var structure = hierarchy.structure;
    var root = hierarchy.root;
    var structure = hierarchy.structure;
    var rootData = structure[root];
    
   
}