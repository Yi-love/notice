/**
 * bee.js  v1.0.0
 * 2015/12/18
 * ie 8+
 * author : jin
 */
var B = (function(){
	var $ , undefined, key,bee = {} , classList = [] ,document = window.document , class2type = {} ,toString = class2type.toString,
	classCache = {},emptyArray = [],
	readyRE = /complete|loaded|interactive/,
	isArray = Array.isArray || function(object){ return object instanceof Array }
	/**
	 * [类型判断]
	 */
	;"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(name){
		class2type["[object "+name+"]"] = name.toLowerCase()
	})
	function likeArray(obj) { return typeof obj.length == 'number' }
	function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
	function isWindow(obj) { return obj != null && obj == obj.window }
	function isFunction( value ){	return type(value) == 'function'}
	function isObject(obj){ return type(obj) == "object" }
	function isString( obj ){ return type(obj) == 'string'}
	function type(obj){	return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object'}
	function isPlainObject(obj) {
	    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	}
	/**
	 * [classRE class正则表达式]
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	function classRE(name) {
	    return name in classCache ?
	        classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
	}
  	/**
  	 * [className 添加class 或获取class]
  	 * @param  {[type]} node  [description]
  	 * @param  {[type]} value [description]
  	 * @return {[type]}       [description]
  	 */
	function className(node , value){
		var classname = node.className || ''
  		return value === undefined ?  classname : node.className = value 
  	}
  	/**
  	 * [setAttribute 属性设置]
  	 * @param {[type]} node  [description]
  	 * @param {[type]} name  [description]
  	 * @param {[type]} value [description]
  	 */
	function setAttribute(node, name, value) {
	    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
	}

	/**
	 * [Bee 提供基本操作]
	 * @param {[type]} dom      [description]
	 * @param {[type]} selector [description]
	 */
	function Bee(dom , selector){
		var i , len = dom ? dom.length: 0
		for (i = 0 ; i < len ; i++ ) this[i] = dom[i]
		this.length = len
		this.selector = selector || ''
	}
	bee.B = function(dom , selector){
		return new Bee(dom , selector)
	}
	bee.isBee = function( object ){
		return object instanceof bee.B
	}
	/**
	 * [matches 判断一个元素是否匹配给定的选择器]
	 * @param  {[type]} element  [子元素]
	 * @param  {[type]} selector [域]
	 * @return {[type]}          [true | false]
	 */
    bee.matches = function(element, selector) {
	    if (!element || element.nodeType !== 1) return false
	    //引用浏览器提供的MatchesSelector方法
	    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector
	    if (matchesSelector) return matchesSelector.call(element, selector)
	    //如果浏览器不支持MatchesSelector方法，则将节点放入一个临时div节点，
	    //再通过selector来查找这个div下的节点集，再判断给定的element是否在节点集中，如果在，则返回一个非零(即非false)的数字
	    // fall back to performing a selector:
	    var match, parent = element.parentNode,temp = !parent
	    //当element没有父节点，那么将其插入到一个临时的div里面
	    if (temp)(parent = tempParent).appendChild(element)
	    //将parent作为上下文，来查找selector的匹配结果，并获取element在结果集的索引，不存在时为－1,再通过~-1转成0，存在时返回一个非零的值
	    match = ~bee.qsa(parent, selector).indexOf(element)
	    //将插入的节点删掉
	    temp && tempParent.removeChild(element)
	    return match
    }
	/**
	 * [init 根据不同的情况执行不同的函数]
	 * @param  {[type]} selector [description]
	 * @return {[Array]}          [description]
	 */
	bee.init = function(selector){
		var dom
		if ( !selector ) return bee.B()
		if ( isString(selector) ) dom = bee.qsa(document , selector.trim())
		else if ( isFunction(selector) ) return $(document).ready(selector)
		else if ( bee.isBee(selector) ) return selector
		else if (isObject(selector)) dom = [selector], selector = null
		return bee.B(dom , selector)
	}
	/**
	 * [qsa dom元素获取]
	 * @param  {[type]} element  [域]
	 * @param  {[type]} selector [元素]
	 * @return {[type]}          [description]
	 */
	bee.qsa = function(element , selector){
		return emptyArray.slice.call(element.querySelectorAll(selector))
	}
	/**
	 * [$ 入口]
	 * @param  {[type]} selector [description]
	 * @return {[type]}          [description]
	 */
	$ = function(selector){
		return bee.init(selector)
	}
    function extend( target , source , deep ){
    	for ( key in source ){
    		if ( deep && (isPlainObject(source[key]) || isArray(source[key]))){
    			if (isPlainObject(source[key]) && !isPlainObject(target[key])){
    				target[key] = {}
    			}
    			if (isArray(source[key]) && !isArray(target[key])){
    				target[key] = emptyArray
    			}
    			extend(target[key] , source[key] , deep)
    		}else if ( source[key] != undefined ) target[key] = source[key]
    	}
    }
    /**
     * [extend 扩展]
     * @param  {[type]} target [description]
     * @return {[type]}        [description]
     */
    $.extend = function(target){
    	var deep , args = emptyArray.slice.call(arguments ,1)
    	if ( typeof target == 'boolean' ){
    		deep = target
    		target = arguments.shift()
    	}
    	args.forEach(function(arg){ extend(target , arg , deep)})
    	return target
    }
    $.each = function(elements, callback){
        var i, key
        if (likeArray(elements)) {
            for (i = 0; i < elements.length; i++)
            	if (callback.call(elements[i], i, elements[i]) === false) return elements
        } else {
          	for (key in elements)
            	if (callback.call(elements[key], key, elements[key]) === false) return elements
        }
        return elements
    }
	$.fn = {
		constructor: bee.B,
		length: 0,
		//这几个函数可以让 new Bee(dom , selector);  返回的是数组
		forEach: emptyArray.forEach,
	    reduce: emptyArray.reduce,
	    push: emptyArray.push,
	    sort: emptyArray.sort,
	    splice: emptyArray.splice,
	    indexOf: emptyArray.indexOf,

	    ready : function(callback){
			if (readyRE.test(document.readyState) && document.body) callback($)
			else document.addEventListener('DOMContentLoaded' , function(){callback($) , false})
			return this
		},
		each: function(callback){
	      	emptyArray.every.call(this, function(el, idx){
	        	return callback.call(el, idx, el) !== false
	      	})
	      	return this
	    },
	    closest: function(selector, context){
      		var node = this[0], collection = false
      		if (isObject(selector)) collection = $(selector)
      		while (node && !(collection ? collection.indexOf(node) >= 0 : bee.matches(node, selector)))
        		node = node !== context && !isDocument(node) && node.parentNode
      		return $(node)
    	},
	    empty : function(){
	    	return this.each(function(){this.innerHTML = ''})
	    },
	    remove: function(){
      		return this.each(function(){
        		if (this.parentNode != null)
          			this.parentNode.removeChild(this)
      		})
    	},
	    append : function(html){
	    	if ( !html ) return this
	    	return isObject(html) ? (0 in this ? (function(node , element){return node.appendChild(element)})(this[0] , html): null) 
	    						:  this.each(function(){ this.innerHTML += html})
	    },
	    html : function(html){
	    	return 0 in arguments ?
	    		this.each(function(idx){
	    			$(this).empty().append(html)	
	    		}) : 
	    		(0 in this ? (function(node){return node.innerHTML})(this[0]): null)
	    },
	    text: function(text){
	     	return 0 in arguments ?
		        this.each(function(idx){
		          	this.textContent = text == null ? '' : ''+text
		        }) :
		        (0 in this ? (function(node){return node.textContent})(this[0]) : null)
	    },
	    val: function(value){
      		return 0 in arguments ?
		        this.each(function(idx){
		          	this.value = value
		        }) : this[0].value // option not support
	    },
	    attr: function(name, value){
		    var result
		    return ( isString(name) && !(1 in arguments)) ?
		        (!this.length || this[0].nodeType !== 1 ? undefined :
		          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
		        ) :
		        this.each(function(idx){
		          if (this.nodeType !== 1) return
		          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
		          else setAttribute(this, name, value)
		        })
	    },
	    removeAttr: function(name){
	      	return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
	        	setAttribute(this, attribute)
	      	}, this)})
	    },
	    hasClass : function(name){
	   		if ( !name ) return this
	   		return emptyArray.some.call(this , function(node){
	   			return this.test(className(node))// svg not support
	   		} , classRE(name))
	    },
	    addClass : function(name){
	    	if ( !name ) return this
	    	return this.each(function(idx){
	    		if (!('className' in this)) return
	    		classList = emptyArray
		        var cls = className(this)
		        name.split(/\s+/g).forEach(function(klass){
		          if (!$(this).hasClass(klass)) classList.push(klass)
		        }, this)
		        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
	    	})
	    },
	    removeClass: function(name){
	    	return this.each(function(idx){
	    		if (!('className' in this)) return
	    		if (name === undefined ) return className(this , '')
	    		classList = className(this)
	    		classList.split(/\s+/g).forEach(function(klass){
	    			classList = classList.replace(classRE(klass) , ' ')
	    		})
	    		className(this ,classList.trim())
	    	})
	    }
	}
	bee.B.prototype = Bee.prototype = $.fn
	$.bee = bee
	$.type = type
	$.isString = isString
	$.isFunction = isFunction
	$.isArray = isArray
	$.isPlainObject = isPlainObject
	return $
})()

window.B = B
window.$ === undefined && (window.$ = B)
;(function($){
	var _bid = 1 , undefined , 
		handlers = {},
		emptyArray = [],
		isString = $.isString,
		isFunction = $.isFunction,
		returnFalse = function(){return false},
		returnTrue = function(){return true},
    	ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
    	eventMethods = {
	        preventDefault: 'isDefaultPrevented',//检测 event.preventDefault() 是否被调用过 true | false
	        stopImmediatePropagation: 'isImmediatePropagationStopped',//函数用于判断是否已经调用过event.stopImmediatePropagation()函数。
	        stopPropagation: 'isPropagationStopped' //是否调用过 event.stopPropagation() 方法来返回一个布尔值。
	    }
	/**
    * [bid 获取唯一id]
    * @param  {[type]} element [description]
    * @return {[type]}         [description]
    */
	function bid(element) {
		return element._bid || (element._bid = _bid++)
	}
    /**
     * [add 添加事件]
     * @param {[type]}   element   [description]
     * @param {[type]}   events    [description]
     * @param {Function} fn        [description]
     * @param {[type]}   selector  [description]
     * @param {[type]}   delegator [description]
    */
	function add(element , events , fn , selector , delegator){
		//为每个对象的事件分配一个唯一的id ，获取事件句柄数组
   		var id = bid(element), set = (handlers[id] || (handlers[id] = []))
   		events.split(/\s/).forEach(function(event){
   			//ready事件独立处理
      		if (event == 'ready') return $(document).ready(fn)
      		//为事件添加句柄
      		var handler   = {e:event}
      		handler.fn    = fn 
      		handler.sel   = selector
  		    var callback  = delegator || fn //回调
  		    handler.proxy = function(e){
  		        e = compatible(e) //检测事件状态
  		        if (e.isImmediatePropagationStopped()) return //事件被阻止冒泡
  		        var result = callback.apply(element,  [e]) //回调  return true | false |undefined
  		        if (result === false) e.preventDefault(), e.stopPropagation() //阻止默认行为，停止捕获
  		        return result
  		    }
  		    handler.i = set.length //事件i
  		    set.push(handler) //添加到事件数组
  		    if ('addEventListener' in element) //添加事件
  		        element.addEventListener(handler.e, handler.proxy, false)
   		})
	}
	/**
	 * [createProxy 常见代理事件]
	 * @param  {[type]} event [事件]
	 * @return {[type]}       [description]
	 */
	function createProxy(event){
		var key , proxy = { originalEvent : event}
		for ( key in event )
			if ( !ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]
		return compatible(proxy , event)
	}
	/**
	* [compatible 兼容]
	* @param  {[type]} event  [代理事件]
	* @param  {[type]} source [源事件]
	* @return {[type]}        [代理事件]
	*/
	function compatible(event, source) {
	    // e.preventDefault   方法阻止元素发生默认的行为
	    // e.stopImmediatePropagation  用于阻止事件冒泡（非标准情况下，用window.event.stopBubble来阻止冒泡）
	    //e.stopPropagation   终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播
	    if (source || !event.isDefaultPrevented) { //检测 event.preventDefault() 是否被调用过 true | false
	        source || (source = event)
	        $.each(eventMethods, function(name, predicate) {
	        	var sourceMethod = source[name]
	        	event[name] = function(){
	          		this[predicate] = returnTrue
	          		return sourceMethod && sourceMethod.apply(source, arguments)
	        	}
	        	event[predicate] = returnFalse
	        })
	        //当前事件的默认动作是否被取消,也就是是否执行了 event.preventDefault()方法
	        if (source.defaultPrevented !== undefined ? source.defaultPrevented :
	          	'returnValue' in source ? source.returnValue === false :
	         	source.getPreventDefault && source.getPreventDefault())
	        	event.isDefaultPrevented = returnTrue
	    }
	    return event
	}
	/**
	 * [on 添加事件函数]
	 * @param  {[type]}   event    [事件]
	 * @param  {[type]}   selector [dom元素]
	 * @param  {[type]}   data [数据]
	 * @param  {Function} callback [回调]
	 * @return {[type]}            [description]
	 */
	$.fn.on = function(event , selector , callback){
		var $this = this , delegator
		//传人事件 但不是string类型的
    	if (event && !isString(event)) {
      		$.each(event, function(type, fn){
        		$this.on(type, selector, fn)
      		})
      		return $this
    	}
		if (!isString(selector)) callback = selector , selector = undefined
		if (!isFunction(callback)) callback = returnFalse
		return $this.each(function(_ , element){
			if( selector ) delegator = function(e){
				var evt , match = $(e.target).closest(selector,element)
				if (match && match !== element ){
					evt = $.extend(createProxy(e) , {currentTarget : match , liveFired:element})
					return callback.apply(match,[evt].concat(emptyArray.slice.call(arguments,1)))
				}
			}
			add(element , event , callback , selector , delegator)
		})
	}
	/**
	 * [Event 创建Event]
	 * @param {[type]} type [description]
	 */
	$.Event = function(type){
		if ( !isString(type) ) return
		var event = document.createEvent('Events')
		event.initEvent(type , true , true)
		return event
	}
	/**
	 * [trigger 触发事件]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	$.fn.trigger = function(event){
		event = isString(event) ? $.Event(event) :  compatible(event)
		return this.each(function(){
			if ( 'dispatchEvent' in this )	
				this.dispatchEvent(event)
		})
	}
})(B)
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