var app = angular.module('app',[]);

/**
 * app 自定义指令
 */
app.directive('myDirective' , function(){
	return {
		restrict : 'EACM',
		replace : true,
		template : '<a href="https://www.baidu.com">Click me to go to Baidu</a>'
	};
});

/**
 * 当前作用域介绍
 */
app.run(function($rootScope){
	$rootScope.rootProperty = 'root scope';
}).controller('parentController' , function($scope){
	$scope.parentProperty = 'parent scope';
}).controller('childController' , function($scope){
	$scope.childProperty = 'child scope';
	$scope.fullSentenceFromChild  = ['some $scope: we can access: ',
									$scope.rootProperty + ' and ' ,
									$scope.parentProperty + ' and ',
									$scope.childProperty].join('');							
});
