var app = angular.module('app' ,[]);
app.controller('firstController' , function($scope){
	$scope.counter = 0;
	$scope.add = function(amount){
		$scope.counter = +$scope.counter + amount;
	};
	$scope.subtract = function(amount){
		$scope.counter = +$scope.counter - amount;
	};
});
//控制器嵌套
app.controller('parentController' , function($scope){
	$scope.person = {greeted:false};
});
app.controller('childController' , function($scope){
	$scope.sayHello = function(){
		$scope.person.name = 'Ari Lerber';
	};
});
