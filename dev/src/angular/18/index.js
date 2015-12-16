angular.module('myApp' , ['ngRoute' , 'myApp.services'])
.controller('HomeController' , ['$scope','HitService' , function($scope , HitService){
	HitService.count().then(function(data){
		$scope.hits = data;
	});
	$scope.registerHit = function(){
		HitService.registerHit().then(function(data){
			$scope.hits = data;
		});
	};
}]);
/**
 * 编写服务
 */
angular.module('myApp.services' , [])
.factory('HitService' ,['$q' , '$http' , function($q , $http){
	var service = {
		count : function(){
			var d = $q.defer();
			$http.get('/angular/hits') //请求接口
				.success(function(data , status){
					d.resolve(data.hits);
				})
				.error(function(data , status){
					d.reject(data);
				});
			return d.promise;
		},
		registerHit : function(){
			var d = $q.defer();
			$http.post('/angular/hit' , {})
				.success(function(data , status){
					d.resolve(data.hits);
				})
				.error(function(data , status){
					d.reject(data);
				});
			return d.promise;
		}
	};
	return service;
}]);