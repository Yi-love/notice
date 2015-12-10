var app = angular.module('app',[]);

/**
 * 自定义过滤器
 */
app.filter('capitalize' , function(){
	return function(source){
		if (source){
			return source[0].toUpperCase()+source.slice(1);
		}
	};
});

app.controller('filterController' , ['$scope','$filter' , function($scope , $filter){
	$scope.name = $filter('lowercase')('Ari');
	$scope.today = new Date();
	$scope.isCapitalized = function(str) {
		return str[0] == str[0].toUpperCase();
	};
}]);

app.controller('formController' , function($scope){
	$scope.user = {
		username : '',
		email : 'example@xx.com',
		age : 18, 
		facebook_url : 'https://www.facebook.com/user'
	};
	$scope.submitted = false;
	$scope.signupForm = function(){
		if ( $scope.form.$valid ){
			console.log('all pass');
		}else{
			$scope.form.submitted = true;
		}
	};
}).directive('ensureUnique', function($http) {
	return {
		require: 'ngModel',
		link: function(scope, ele, attrs, c) {
			scope.$watch(attrs.ngModel, function(n) {
				if (!n) return;
				$http({
					method: 'POST',
					url: '/angular/check/' + attrs.ensureUnique,
					data: {
						field: attrs.ensureUnique, value: n
					}
				}).success(function(data) {
					c.$setValidity('unique', data.isUnique);
				}).error(function(data) {
					c.$setValidity('unique', false);
				});
			});
		}
	};
});
