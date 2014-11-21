angular
	.module('app')
	.controller('popular_controller', ['$scope', '$http', function($scope, $http) { 

		$("#message").hide(); // hide eventually message 
		
		// get albuns on sale
		$http.get("assets/php/DB_Handler.php?func=getOffAlbums")
		.success(function(data) {
			if(data.error === false){
				$scope.sales = data.albuns;
			}
		});

		// get top sold albums
		$http.get("assets/php/DB_Handler.php?func=getTopSold")
		.success(function(data) {
			//console.log(data);
			if(data.error === false){
				$scope.tops = data.albums;
			}
		});

	}]);