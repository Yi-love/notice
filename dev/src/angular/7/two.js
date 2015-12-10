var app = angular.module('app' ,['ngMessages']);

app.controller('signupController' , function($scope){
	$scope.submitted = false;
	$scope.signupForm = function(){
		if ( $scope.signup_form.$valid ){
			console.log('all pass');
		}else{
			$scope.signup_form.submitted = true;
		}
	};
}).directive('ensureUnipue' , function($http){
	return {
		require : 'ngModel',
		link : function(scope , ele , attrs , ctrl){
			ctrl.$parsers.push(function(val){
				if ( !val || val.length === 0 ) return;
				ngModel.$setValidity('checkingAvailability', true);
				ngModel.$setValidity('usernameAvailablity', false);
			});
		}
	};
});
