var app = angular.module('app' ,[]);

app.run(function($rootScope, $timeout) {
	$rootScope.isDisabled = true;
	$timeout(function() {
		$rootScope.isDisabled = false;
	}, 5000);
})
.run(function($rootScope, $timeout) {
	$timeout(function() {
		$rootScope.myHref = 'http://google.com';
	}, 2000);
})
.run(function($rootScope, $timeout) {
	$timeout(function() {
		$rootScope.imgSrc = '/images/git.png';
	}, 2000);
});

