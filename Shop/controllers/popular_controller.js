angular
	.module('app')
	.controller('popular_controller', ['$scope', '$http', '$location', function($scope, $http, $location) { 
		$http.get("assets/php/dbstatus.php")
        .success(function(data) {
            if(data == 'false'){
                $location.path('/dberror');
                $location.replace();
            }
        });

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
			if(data.error === false){
				$scope.tops = data.albums;
			}
		});

	}]);