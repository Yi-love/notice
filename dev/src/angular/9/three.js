angular.module('app',[])
.controller('MyController' , function($scope){
	
})
.controller('peopleController' , function($scope){
	$scope.people = [
		{name : 'Ari' , city:'San Francisco'},
		{name : 'Erik' , city:'Seattle'}
	];
})
.controller('equationController' , function($scope){
	$scope.equation = {};
	$scope.change = function(){
		$scope.equation.output = parseInt($scope.equation.x)+2;
	};
})
.controller('formController' , function($scope){
	$scope.fields = [
		{placeholder: 'Username', isRequired: true},
		{placeholder: 'Password', isRequired: true},
		{placeholder: 'Email (optional)', isRequired: false}
	];
	$scope.submitForm = function(){
		alert('it works!');
	};
})
.controller('counterController' , function($scope){
	$scope.decrement = function(){
		$scope.count = $scope.count-1;
	};
})
.controller('cityController' , function($scope){
	$scope.cities = [
		{name: 'Seattle'},
		{name: 'San Francisco'},
		{name: 'Chicago'},
		{name: 'New York'},
		{name: 'Boston'}
	];
})
