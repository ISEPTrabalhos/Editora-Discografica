angular
	.module('app')
	.controller('home_controller', ['$scope', '$http', function($scope, $http) {

		if(window.localStorage.getItem('buy') != null) {
			$("#message").css("background", "#FFFF00");
			$("#message").html("Thank you !! You'll receive the album(s) soon !!");
			$("#message").show("medium");
			window.localStorage.removeItem('buy');
		} else {
			$("#message").hide(); // hide eventually message 	
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