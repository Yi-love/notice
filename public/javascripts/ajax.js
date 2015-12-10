var $ = {
	ajax : function(options){
		var xhr = new window.XMLHttpRequest()
		xhr.open(options.type , options.url , options.async)
		if ( options.type.toUpperCase() === 'POST')
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
			
		xhr.onreadystatechange = function(){
			if ( xhr.readyState === 4 ) {
				if ( xhr.status === 200 || xhr.status === 304 ) {
					options.success(xhr.responseText)
				}
			}
		}
		xhr.send(options.data ? options.data : null)
	}
}

$.ajax({
	type:"post",//get
	url:"/ajax",
	async:true,
	data : 'ajax=true',
	success : function(res){
		console.log(res);
	}
})