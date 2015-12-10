
var J = (function( undefined ){
	var $ , document = window.document , jin = {}, class2type = {}, toString = class2type.toString,
	simpleSelectorRE = /^[\w-]*$/,
	readyRE = /complete|loaded|interactive/
	
	function type(obj){
		return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object'
	}
	function isFunction(value){
		return type(value) == 'function'
	}
	function likeArray(obj) { 
		return typeof obj.length == 'number' 
	}
	function Jin(dom , selector){
		var i , len = dom ? dom.length: 0
		for (i = 0 ; i < len ; i++ ) this[i] = dom[i]
		this.length = len
		this.selector = selector || ''
	}
	jin.matches = function(element , selector){
		if (!selector || !element || element.nodeType !== 1 ) return false
		var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
		                      element.oMatchesSelector || element.matchesSelector
	    if (matchesSelector) return matchesSelector.call(element, selector)
	    // fall back to performing a selector:
	    var match, parent = element.parentNode, temp = !parent
	    if (temp) (parent = tempParent).appendChild(element)
	    match = ~jin.qsa(parent, selector).indexOf(element)
	    temp && tempParent.removeChild(element)
	    return match 
	}
	jin.J = function(dom , selector){
		return new Jin(dom , selector)
	}
	jin.isJin = function( object ){
		return object instanceof jin.J
	}
	jin.init = function(selector , context){
		var dom
		if (!selector) return jin.J()
		else if ( typeof selector == 'string' ){
			selector = selector.trim()
			if (context !== undefined ) return $(context).find(selector)
			else dom = jin.qsa(document , selector)
		}
		else if (isFunction(selector)) return $(document).ready(selector)
		else if (jin.isJin(selector)) return selector
		return jin.J(dom , selector)
	}
	jin.qsa = function(element, selector){
	    var found,
	    	  //判断第一个字符是不是 '#'  e.g: $('#id')
	        maybeID = selector[0] == '#', 
	        //判断第一个字符是不是 '.'  e.g: $('.classname')
	        maybeClass = !maybeID && selector[0] == '.',
	        //判断是不是html标签名            确保1个字符标记名称被检查
	        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, 
			//判断 是不是只有一个标签名                 simpleSelectorRE = /^[\w-]*$/
			isSimple = simpleSelectorRE.test(nameOnly)
	   	//浏览器存在getElementById函数 , 只有一个id
	    if ( (element.getElementById && isSimple && maybeID) ){
				found = element.getElementById(nameOnly)
			if ( found ){ //找到了
				  return [found]
			}
			return [] //没找到
		}else {  
			//判断element的类型  
			//1: 元素
			//9: 表示整个文档（DOM 树的根节点）
			//11：表示轻量级的 Document 对象，其中容纳了一部分文档。
			if (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11){
				return []
			}else{
				if ( isSimple && !maybeID && element.getElementsByClassName ){
					//通过class查找
					if ( maybeClass ) {
						return [].slice.call(element.getElementsByClassName(nameOnly))
					//标签名查询
					}else{ 
						return [].slice.call(element.getElementsByTagName(selector))
					}
				//混合查询 ie8以上
				}else{ 
					return [].slice.call(element.querySelectorAll(selector))
				}
			}
		}
	}
	$ = function(selector , context){
		return jin.init(selector , context) 
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
	$.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase()
	})
	$.contains = document.documentElement.contains ?
		function(parent , node){
			return parent !== node && parent.contains(node)
		} :
		function(parent , node){
			while(node && (node != node.parentNode))
				if (node === parent) return true
			return false
		}
	$.map = function(elements, callback){
	    var value, values = [], i, key
	    if (likeArray(elements))
	      	for (i = 0; i < elements.length; i++) {
	        	value = callback(elements[i], i)
	        if (value != null) values.push(value)
	    }
	    else
	      	for (key in elements) {
	        	value = callback(elements[key], key)
	        if (value != null) values.push(value)
	    }
	    return flatten(values)
	}
	$.fn = {
		constructor: jin.J,
		length: 0,
		
		forEach: [].forEach,
	    reduce: [].reduce,
	    push: [].push,
	    sort: [].sort,
	    splice: [].splice,
	    indexOf: [].indexOf,

		ready : function(callback){
			if (readyRE.test(document.readyState) && document.body) callback($)
			else document.addEventListener('DOMContentLoaded' , function(){callback($) , false})
			return this
		},
		slice: function(){
	     	return $(slice.apply(this, arguments))
	    },
		map: function(fn){
	      	return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
	    },
		find : function(selector){
			var result , $this = this
			if ( !selector ) result = $()
			else if (typeof selector == 'object' )
				result = $(selector).filter(function(){
					var node = this
					return [].some.call($this , function(parent){
						return $.contains(parent ,node)
					})
				})
			else if (this.length == 1) result = $(jin.qsa(this[0] ,selector))
			else result = this.map(function(){return jin.qsa(this , selector)})
			return result
		},
		not : function( selector ){
			var nodes=[]
			if (isFunction(selector) && selector.call !== undefined)
			  	this.each(function(idx){
			    	if (!selector.call(this,idx)) nodes.push(this)
			  	})
			else {
			  	var excludes = typeof selector == 'string' ? this.filter(selector) :
			    	(likeArray(selector) && isFunction(selector.item)) ? [].slice.call(selector) : $(selector)
			  	this.forEach(function(el){
			    	if (excludes.indexOf(el) < 0) nodes.push(el)
			  	})
			}
			return $(nodes)
		},
		filter : function (selector){
			if (!isFunction(selector)) return this.not(this.not(selector))
			return $([].filter.call(this, function(element){
				return jin.matches(element , selector)
			}))
		}
	}

	jin.J.prototype = Jin.prototype = $.fn
	$.jin = jin
	return $
})()

window.J = J
window.$ === undefined && (window.$ = J)
