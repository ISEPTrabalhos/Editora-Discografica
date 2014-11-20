angular
	.module('app')
	.controller('popular_controller', ['$scope', function($scope) { 
		// simulate get info from DB
		$scope.sales = getSalesAndTops();
		$scope.tops = getSalesAndTops();
	}]);