var app = angular.module('app',[]);

/**
 * app 自定义指令
 */
app.directive('myDirective' , function(){
	return {
		restrict : 'EACM',
		replace : true,
		scope : {
			myUrl : '@', //绑定策略
			myLinkText:'@'
			},
		template : '<a href="{{myUrl}}">{{myLinkText}}</a>'
	};
})
.directive('myDirectivetwo' , function(){
	return {
		restrict : 'A',
		replace : true,
		scope : {
				myUrl : '=someAttr', //=双向绑定
				myLinkText : '@'
			},
		template : ['<div class="form-group">',
					'	<label>My Url Field:</label>',
					'	<input type="text" ng-model="myUrl" class="form-control" />',
					'	<a href="{{myUrl}}">{{myLinkText}}</a>',
					'</div>'].join('')
	}
})
