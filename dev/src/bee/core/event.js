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