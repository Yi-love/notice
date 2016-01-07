;(function($){
	var jsonpID = 0,
      	document = window.document,
      	key,
      	name,
      	escape = encodeURIComponent,
      	originAnchor = document.createElement('a')
  	
  	originAnchor.href = window.location.href
	
	function empty() {}
	function appendQuery(url, query) {
	  	if (query == '') return url
	  	return (url + '&' + query).replace(/[&?]{1,2}/, '?')
	}
	// serialize payload and append it to the URL for GET requests
	// 序列化负载并将它附加到GET请求的URL
	function serializeData(options) {
		//序列化options.data
		//1.需要序列化数据
		//2.数据不为空
		//3.数据类型不为 string
		//traditional (默认： false): 激活传统的方式通过$.param来得到序列化的 data。
	  	if (options.processData && options.data && typeof (options.data) != "string" )
	    	options.data = $.param(options.data, options.traditional)
	   
	  	//是get , 或者没有传人type
	  	if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
	    	options.url = appendQuery(options.url, options.data), options.data = undefined
	}
	/**
	 * [preSerializeData 预处理]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	function preSerializeData(options){
		var settings = $.extend({}, options || {})
		//合并默认设置和用户的设置
    	for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]
		//没有传人ajax请求url
	    if (!settings.url) settings.url = window.location.toString()//使用当前url

	    return settings
	}
	$.ajaxSettings = {
		//请求类型
		type :'GET',
		// 成功请求后的回调
		success : empty,
		//错误回调
		error : empty,
		//xhr
		xhr : function(){
			return new window.XMLHttpRequest()
		},
	    //是否跨域
    	crossDomain: false,
	    //超时设置  默认不超时
        timeout: 0,
        //数据需要被序列化
        processData: true,
        //对get请求数据进行缓存
        cache: true
	}
	$.ajax = function(options){
		//用户传人参数
    	var settings = preSerializeData(options), urlAnchor
    	
    	//判断是否跨域
	    if (!settings.crossDomain) { //没有跨域
	    	urlAnchor = document.createElement('a')
	      	urlAnchor.href = settings.url
	      	// cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049
	      	urlAnchor.href = urlAnchor.href //获取ajax请求的url
	      	//判断ajax请求是否跨域
	      	settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
	    }
	    //序列化数据
	    serializeData(settings)

	    //数据类型
	    var dataType = settings.dataType
	    if( dataType === 'jsonp' ) return $.jsonp(settings)

        if (settings.cache === false)
        	settings.url = appendQuery(settings.url, '_=' + Date.now())//添加时间戳
		//请求头对象
	    var headers = {},
	        //请求头设置函数
	        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },   
	        //new window.XMLHttpRequest()
	        xhr = settings.xhr(),
	        //复制请求头
	        nativeSetHeader = xhr.setRequestHeader,
	        abortTimeout
	    //没有跨域
	    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
	    //设置请求头
    	setHeader('Accept', '*/*')
	    //内容类型  
	    if ( settings.data && settings.type.toUpperCase() != 'GET' ) //不是get请求则添加请求头
	        setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')//post必须添加

	    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name]) //合并请求头
	        xhr.setRequestHeader = setHeader //设置到http请求头

	    //请求状态变化
	    xhr.onreadystatechange = function(){
	        if (xhr.readyState == 4) { //完成
	            xhr.onreadystatechange = empty //清除
	            clearTimeout(abortTimeout) //定时器
	            var result
	            if ((xhr.status >= 200 && xhr.status < 300)  //服务器成功接收请求
	            	|| xhr.status == 304         //原来缓冲的文档还可以继续使用。
	            	|| (xhr.status == 0 && protocol == 'file:')) { //请求本地文件成功
	              	result = xhr.responseText || xhr.responseXML //获取数据
	              	settings.success(result, xhr, settings) //success
	            } else {  //请求出错
	              	settings.error(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings)
	            }
	        }
	    }
	    var async = 'async' in settings ? settings.async : true //请求是否异步 默认异步
	    xhr.open(settings.type, settings.url, async, settings.username, settings.password) //打开请求
	    for (name in headers) nativeSetHeader.apply(xhr, headers[name]) //xhr请求参数
	    if (settings.timeout > 0) 
	    	abortTimeout = setTimeout(function(){  //设置请求超时
		        xhr.onreadystatechange = empty
		        xhr.abort()
		        settings.error.call( null , 'timeout', xhr , settings)
	        }, settings.timeout)

	    xhr.send(settings.data ? settings.data : null) //发送数据
	    return xhr //返回xhr
	}
	/**
	 * [jsonp jsonp]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	$.jsonp = function(options){
		var settings = preSerializeData(options)
	    serializeData(settings)	
	    
	    var callbackName = settings.jsonp ? settings.jsonp : 'callback',
	    	_callbackName = 'jsonp'+(++jsonpID),
	    	script = document.createElement('script'),
	    	responseData,abortTimeout

	    $(script).on('load error' , function(e,errorType){
	    	clearTimeout(abortTimeout)
	    	$(script).remove()
	    	if ( e.type == 'error' || !responseData){
	    		settings.error(errorType , e , settings)
	    	}else{
	    		settings.success(responseData , e , settings)
	    	}
	    	window[_callbackName] = undefined
	    })
	    window[_callbackName] = function(){//callback函数注册到window
	      responseData = arguments
	    }
	    settings.url = appendQuery(settings.url, callbackName+'='+_callbackName)
	    //添加src并添加到head
    	script.src = appendQuery(settings.url, '_=' + Date.now())//添加时间戳
	    document.head.appendChild(script)

		  //是否存在超时
	    if (settings.timeout > 0) 
	    	abortTimeout = setTimeout(function(){
	    		$(script).trigger('error')
	    	}, settings.timeout)
	}
	/**
	* 序列化
	* @param {Object} params [] 最后生成的参数数组
	* @param {Object} obj       需要序列化的对象
	* @param {Object} traditional  表示是否以传统的方式拼接数据
	* @param {Object} scope   表示范围
	*/
	function serialize(params, obj, traditional, scope){
	    var type, 
	    	array = $.isArray(obj), //数组 
	    	hash = $.isPlainObject(obj) //对象
	    $.each(obj, function(key, value) {
	    	//判断值的类型
	      	type = $.type(value)
	      	//scope用作处理value也是object或者array的情况
	      	//传统的意思就是比如现有一个数据{a:[1,2,3]},转成查询字符串后结果为'a=1&a=2&a=3'
	      	//非传统的的结果则是a[]=1&a[]=2&a[]=3
	      	if (scope) {  //
	      		key = traditional ? //
	      		scope :
	        	scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
	        }
	      	// handle data in serializeArray() format
	      	if (!scope && array) params.add(value.name, value.value)
	      	// recurse into nested objects
	      	//当value值是数组或者是对象且不是按传统的方式序列化的时候，需要再次遍历value
	      	else if (type == "array" || (!traditional && type == "object"))
	        	serialize(params, value, traditional, key)
	      	else params.add(key, value) //正常添加
	    })
	}
	/**
	* 参数化
	* @param {Object} obj   需要参数化的对象
	* @param {Object} traditional 表示是否以传统的方式拼接数据，
	*/
	$.param = function(obj, traditional){
	    var params = []
	    params.add = function(key, value) { //定义添加函数
	     	if ($.isFunction(value)) value = value() //value是函数，执行函数
	      	if (value == null) value = ""  //为空
	      	this.push(escape(key) + '=' + escape(value)) //以 '='链接key和value ，用encodeURIComponent()转义
	    }
	    serialize(params, obj, traditional) //序列化
	    return params.join('&').replace(/%20/g, '+') //以'&'链接 ,把空格转化成 '+'
	}
})(B)