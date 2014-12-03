angular
	.module('app')
	.controller('home_controller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		
		loadShoppingCart();

		$http.get("assets/php/dbstatus.php")
        .success(function(data) {
            if(data == 'false'){
                $location.path('/dberror');
                $location.replace();
            }
        });

        // show client confirmation message
		if(window.localStorage.getItem('buy') != null) {
			showMessage("Thank you !! You'll receive the album(s) soon !!");
			window.localStorage.removeItem("buy");
		}

		 // show admin confirmation message
		if(window.localStorage.getItem('order') != null) {
			showMessage("Thank you !! You'll receive your order soon !!");
			window.localStorage.removeItem("order");
		}
		
		// get album collection
		$http.get("assets/php/RequestDB.php?f=getAllAlbums")
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