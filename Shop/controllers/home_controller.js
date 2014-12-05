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
	    	// IF ADMIN IS LOGGED IN
	    	if(localStorage.getItem('userid') != null && localStorage.getItem('userid') == 0) {
	    		console.log('ADMIN HERE');
	    		// CHECK IF ADMIN OWNS AN API_KEY, IF NOT APPLY FOR ON
	    		$http.get("assets/php/RequestDB.php?f=getAPIKEY")
				.success(function(data) {
					$scope.email = data.email;
					console.log('Admim email: ' + $scope.email);
					if(data.api_key == "") { // dont have api key
						// SERVICE TO GET API KEY
						$http.get("services/call_service.php?func=getApiKey&username=username&email="+$scope.email)
						.success(function(data2) {
							var key = data2;
							key = key.replace(/"/g , '');
							$scope.apikey = key;
							console.log("--> " + $scope.apikey);
							var url = "assets/php/RequestDB.php?f=saveAPIKEY&key="+key+"&email="+$scope.email;
							$http.get(url)
							.success(function(data3) {
							});
						});
					} else {
						$scope.apikey = data.api_key;
						console.log("Current KEY: " + data.api_key);
					}
				});
	    	}
		});

	}]);