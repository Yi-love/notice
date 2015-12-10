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
/**
 * [get get请求]
 * @param  {[String]}   url [url]
 * @param  {Function} fn  [回调函数]
 * @return {[Function || JSON]}       [fn || json]
 */
D.get = function(url , fn) {
	if ( url ){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if ( xhr.readyState === 4 && xhr.status === 200 ){
				return fn ? fn(xhr.responseText) : xhr.responseText;
			}
		};
		xhr.open('GET' , url , true);
		xhr.send();
	}
};
function caty(res){
	console.log(res);
	if ( +res.Code != 10000 ){
		alert('此商品暂时不支持代购');
	}else{
		alert( "商品可以代购");
	}
}
D.ajaxJSONP = function(options, deferred){
if (!('type' in options)) return $.ajax(options)

var _callbackName = options.jsonpCallback,
  callbackName = ($.isFunction(_callbackName) ?
    _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
  script = document.createElement('script'),
  originalCallback = window[callbackName],
  responseData,
  abort = function(errorType) {
    $(script).triggerHandler('error', errorType || 'abort')
  },
  xhr = { abort: abort }, abortTimeout

if (deferred) deferred.promise(xhr)

$(script).on('load error', function(e, errorType){
  clearTimeout(abortTimeout)
  $(script).off().remove()

  if (e.type == 'error' || !responseData) {
    ajaxError(null, errorType || 'error', xhr, options, deferred)
  } else {
    ajaxSuccess(responseData[0], xhr, options, deferred)
  }

  window[callbackName] = originalCallback
  if (responseData && $.isFunction(originalCallback))
    originalCallback(responseData[0])

  originalCallback = responseData = undefined
})

if (ajaxBeforeSend(xhr, options) === false) {
  abort('abort')
  return xhr
}

window[callbackName] = function(){
  responseData = arguments
}

script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
document.head.appendChild(script)

if (options.timeout > 0) abortTimeout = setTimeout(function(){
  abort('timeout')
}, options.timeout)

return xhr
}
function issueReport(){
 	var url = "https://api.dotdotbuy.com/run/go/rest/?prefix=TB&jsonp=caty&cid=1512&title=5.5%E5%AF%B8%E8%B6%85%E8%96%84%E5%A4%A7%E5%B1%8F%E5%AE%89%E5%8D%93%E5%85%AB%E6%A0%B8%E6%99%BA%E8%83%BD%E6%89%8B%E6%9C%BA%E7%A7%BB%E5%8A%A84G%E5%8F%8C%E5%8D%A1%E5%8F%8C%E5%BE%85%E5%AF%BC%E8%88%AA%E7%94%B7%E5%A5%B3%E6%AD%A3%E5%93%81%E8%A7%A6%E5%B1%8F&biz_method=verify_goods";
 	var s = document.createElement('script');
 	s.src = url;
 	 document.head.appendChild(s)
 }
  function issueReport2(){
 	var url = "https://api.dotdotbuy.com/run/go/rest/?prefix=TB&jsonp=caty&cid=1512&title=5.5%E5%AF%B8%E8%B6%85%E8%96%84%E5%A4%A7%E5%B1%8F%E5%AE%89%E5%8D%93%E5%85%AB%E6%A0%B8%E6%99%BA%E8%83%BD%E6%89%8B%E6%9C%BA%E7%A7%BB%E5%8A%A84G%E5%8F%8C%E5%8D%A1%E5%8F%8C%E5%BE%85%E5%AF%BC%E8%88%AA%E7%94%B7%E5%A5%B3%E6%AD%A3%E5%93%81%E8%A7%A6%E5%B1%8F&biz_method=verify_goods";
 	$.get(url,function(){}, "jsonp");
 }
var isbt = document.getElementById('D_addcar');
isbt.onclick = function(){
	issueReport();
};

var isbt2 = document.getElementById('D_addcar2');
isbt2.onclick = function(){
	issueReport2();
};