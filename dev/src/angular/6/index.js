//服务化
angular.module('emailParser' , [])
//修改 {{value}}  为 __value__
//.config(['$interpolateProvider' , function($interpolateProvider){
//	$interpolateProvider.startSymbol('__');
//	$interpolateProvider.endSymbol('__');
//}])
.factory('EmailParser' , ['$interpolate' , function($interpolate){
	return {
		parse : function(text , context){
			var template = $interpolate(text);
			return template(context);
		}
	};
}]);

var app = angular.module("app" , ['emailParser']);
//表达式
app.controller('myController' , function($scope , $parse){
	$scope.expr = '"1+2"';
	$scope.$watch('expr' , function(newVal , oldVal , scope){
		if ( newVal !== oldVal ){
			var parseFun = $parse(newVal);
			$scope.parseValue = parseFun(scope);
		}
	});
});

//插入字符串
app.controller('interpolateController' , function($scope , $interpolate){
	$scope.$watch('emailBody' , function(body){
		if (body){
			var template = $interpolate(body);
			$scope.previewText = template({to:$scope.to});
		}
	});
});

//服务化
app.controller('parseController' , ['$scope' , 'EmailParser' , function($scope , EmailParser){
	$scope.$watch('emailBody' , function(body){
		if ( body){
			$scope.previewText = EmailParser.parse(body , {to : $scope.emailTo});
		}
	});
}]);
