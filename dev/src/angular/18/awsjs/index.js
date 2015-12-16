angular.module('myApp.services',[]);
angular.module('myApp.directives',[]);

angular.module('myApp' , ['ngRoute','myApp.services','myApp.directives'])
.config(['$routeProvider' , function($routeProvider){
	$routeProvider
		.when('/' , {
			controller : 'MainController',
			templateUrl : 'templates/main.html'
		})
		.otherwise({
			redirectTo:'/'
		});
}])
.controller('MainController' , ['$scope' , function($scope){
	
}])
