angular
	.module('app')
	.controller('home_controller', ['$scope', '$http', function($scope, $http) {

		$("#message").hide(); // hide eventually message 
		
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