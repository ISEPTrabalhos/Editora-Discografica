angular
	.module('app')
	.controller('popular_controller', ['$scope', '$http', function($scope, $http) { 

		$("#message").hide(); // hide eventually message 
		
		// get albuns on sale
		$http.get("assets/php/DB_Handler.php?func=getOffAlbums")
		.success(function(data) {
			console.log(data);
			if(data.error === false){
				$scope.sales = data.albuns;
			}
		});


		// simulate get info from DB
		$scope.tops = getTops();
	}]);