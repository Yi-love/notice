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