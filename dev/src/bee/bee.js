/**
 * bee.js  v0.0.1
 * 2015/12/18
 * ie 8+
 * author ： jin
 */
var B = (function(){
	var $ , bee = {} , classList = [] ,document = window.document , class2type = {} ,toString = class2type.toString,
	classCache = {},emptyArray = [],
	simpleSelectorRE = /^[\w-]*$/,
	readyRE = /complete|loaded|interactive/
	
	/**
	 * [类型判断]
	 */
	;"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(name){
		class2type["[object "+name+"]"] = name.toLowerCase()
	})
	function isFunction( value ){	return type(value) == 'function'}
	function isObject(obj){ return type(obj) == "object" }
	function type(obj){	return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object'}
	/**
	 * [classRE class正则表达式]
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	function classRE(name) {
	    return name in classCache ?
	        classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
	}
	function funcArg(context, arg, idx, payload) {
    	return isFunction(arg) ? arg.call(context, idx, payload) : arg
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
	 * [init 根据不同的情况执行不同的函数]
	 * @param  {[type]} selector [description]
	 * @return {[Array]}          [description]
	 */
	bee.init = function(selector){
		var dom;
		if (!selector ) return bee.B()
		if ( typeof selector == 'string' ) dom = bee.qsa(document , selector.trim())
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
		// var found,
	 //    	  //判断第一个字符是不是 '#'  e.g: $('#id')
	 //        maybeID = selector[0] == '#', 
	 //        //判断第一个字符是不是 '.'  e.g: $('.classname')
	 //        maybeClass = !maybeID && selector[0] == '.',
	 //        //判断是不是html标签名            确保1个字符标记名称被检查
	 //        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, 
		// 	//判断 是不是只有一个标签名                 simpleSelectorRE = /^[\w-]*$/
		// 	isSimple = simpleSelectorRE.test(nameOnly)
	 //   	//浏览器存在getElementById函数 , 只有一个id
	 //    if ( (element.getElementById && isSimple && maybeID) ){
		// 	found = element.getElementById(nameOnly)
		// 	if ( found ){ //找到了
		// 		return [found]
		// 	}
		// 	return [] //没找到
		// }else {  
		// 	//判断element的类型  
		// 	//1: 元素
		// 	//9: 表示整个文档（DOM 树的根节点）
		// 	//11：表示轻量级的 Document 对象，其中容纳了一部分文档。
		// 	if (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11){
		// 		return []
		// 	}else{
		// 		if ( isSimple && !maybeID && element.getElementsByClassName ){
		// 			//通过class查找
		// 			if ( maybeClass ) {
		// 				return [].slice.call(element.getElementsByClassName(nameOnly))
		// 			//标签名查询
		// 			}else{ 
		// 				return [].slice.call(element.getElementsByTagName(selector))
		// 			}
		// 		//混合查询 ie8以上
		// 		}else{ 
		// 			return [].slice.call(element.querySelectorAll(selector))
		// 		}
		// 	}
		// }
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
	    empty : function(){
	    	return this.each(function(){this.innerHTML = ''})
	    },
	    append : function(html){
	    	if ( !html ) return this
	    	return isObject(html) ? (0 in this ? (function(node , element){return node.appendChild(element)})(this[0] , html): null) 
	    						:  this.each(function(){ this.innerHTML += html})
	    },
	    html : function(html){
	    	return 0 in arguments ?
	    		this.each(function(idx){
	    			var originHtml = this.innerHTML
	    			$(this).empty().append(funcArg(this, html, idx, originHtml))	
	    		}) : 
	    		(0 in this ? (function(node){return node.innerHTML;})(this[0]): null)
	    },
	    text: function(text){
	     	return 0 in arguments ?
		        this.each(function(idx){
		          	var newText = funcArg(this, text, idx, this.textContent)
		          	this.textContent = newText == null ? '' : ''+newText
		        }) :
		        (0 in this ? (function(node){return node.textContent;})(this[0]) : null)
	    },
	    val: function(value){
      		return 0 in arguments ?
		        this.each(function(idx){
		          	this.value = funcArg(this, value, idx, this.value)
		        }) : this[0].value // option not support
	    },
	    attr: function(name, value){
		    var result
		    return (typeof name == 'string' && !(1 in arguments)) ?
		        (!this.length || this[0].nodeType !== 1 ? undefined :
		          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
		        ) :
		        this.each(function(idx){
		          if (this.nodeType !== 1) return
		          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
		          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
		        })
	    },
	    removeAttr: function(name){
	      	return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
	        	setAttribute(this, attribute)
	      	}, this)})
	    },
	    hasClass : function(name){
	   		if ( !name ) return this;
	   		return emptyArray.some.call(this , function(node){
	   			return this.test(className(node))// svg not support
	   		} , classRE(name))
	    },
	    addClass : function(name){
	    	if ( !name ) return this
	    	return this.each(function(idx){
	    		if (!('className' in this)) return
	    		classList = []
		        var cls = className(this), newName = funcArg(this, name, idx, cls)
		        newName.split(/\s+/g).forEach(function(klass){
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
	    		funcArg(this , name , idx , classList).split(/\s+/g).forEach(function(klass){
	    			classList = classList.replace(classRE(klass) , ' ')
	    		})
	    		className(this ,classList.trim())
	    	})
	    }
	};
	bee.B.prototype = Bee.prototype = $.fn
	$.bee = bee
	return $
})();

window.B = B
window.$ === undefined && (window.$ = B)