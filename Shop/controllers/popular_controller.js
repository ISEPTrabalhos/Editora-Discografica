angular
	.module('app')
	.controller('popular_controller', ['$scope', function($scope) { 

		$("#message").hide(); // hide eventually message 
		
		// simulate get info from DB
		$scope.sales = getSales();
		$scope.tops = getTops();
	}]);