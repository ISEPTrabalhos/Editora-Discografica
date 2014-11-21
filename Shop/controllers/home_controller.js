angular
	.module('app')
	.controller('home_controller', ['$scope', '$http', function($scope, $http) {

		$("#message").hide(); // hide eventually message 
		

		$http.get("assets/php/DB_Handler.php?func=getAllAlbums")
		.success(function(data) {
			if(data.error === false){
				$scope.cds = data.albuns;
			}
		});
		
	}]);