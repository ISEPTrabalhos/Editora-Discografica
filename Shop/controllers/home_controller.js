angular
	.module('app')
	.controller('home_controller', ['$scope', '$http', function($scope, $http) {

		if(window.localStorage.getItem('buy') != null) {
			showMessage("Thank you !! You'll receive the album(s) soon !!");
			window.localStorage.removeItem("buy");
		}
		
		// get album collection
		$http.get("assets/php/DB_Handler.php?func=getAllAlbums")
		.success(function(data) {
			if(data.error === false){
				$scope.cds = data.albuns;
			}
		});

		$scope.$on('$viewContentLoaded', function(){
	    	var msg = window.localStorage.getItem("message");
	    	if(msg != null) {
    		    showMessage(msg);
    		    window.localStorage.removeItem("message");
	    	}
		});

	}]);