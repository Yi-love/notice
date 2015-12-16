angular.module('app' , [])
.factory('greeter' , function(){
	return {
		greet : function(msg){alert(msg);}
	};
})
.controller('myController' , ['$scope' , 'greeter' , function($scope , greeter){
	$scope.sayHello = function(){
		greeter.greet('Hello');
	};
}]);
