angular.module('app' , [])
.controller('someController' , function($scope){
	$scope.someModel = {
		someValue : 'hello computer'
	};
	$scope.someAction = function(){
		$scope.someModel.someValue = 'hell human , from parent';
	};
})
.controller('childController' , function($scope){
	$scope.childAction = function(){
		$scope.someModel.someValue = 'hello human , from child';
	};
})

.controller('SomeController' , function($scope){
	// 反模式，裸值
	$scope.someBareValue = 'hello computer';
	// 设置 $scope 本身的操作，这样没问题
	$scope.someAction = function() {
		// 在SomeController和ChildController中设置{{ someBareValue }}
		$scope.someBareValue = 'hello human, from parent';
	};
})
.controller('ChildController' , function($scope){
	$scope.childAction = function() {
		// 在ChildController中设置{{ someBareValue }}
		$scope.someBareValue = 'hello human, from child';
	};
});

