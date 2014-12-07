angular
	.module('app')
	.controller('home_controller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		
		loadShoppingCart();

		$scope.page = 0;
		$scope.numcds = 0;

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

		getCDs();
		
		// get album collection
		function getCDs() {
			$http.get("assets/php/RequestDB.php?f=getAllAlbums&page=" + $scope.page)
				.success(function(data) {
					if(data.error === false){
						$scope.cds = data.albuns;
					}
				});
		}

		$scope.prevPage = function() {
			$scope.page--;
			getCDs();
		}

		$scope.nextPage = function() {
			$scope.page++;
			getCDs();
		}

		$scope.$on('$viewContentLoaded', function(){
			var msg = window.localStorage.getItem("message");
	    	if(msg != null) {
    		    showMessage(msg);
    		    window.localStorage.removeItem("message");
	    	}
	    	// IF ADMIN IS LOGGED IN
	    	if(localStorage.getItem('userid') != null && localStorage.getItem('userid') == 0) {
	    		// CHECK IF ADMIN OWNS AN API_KEY, IF NOT APPLY FOR ON
	    		$http.get("assets/php/RequestDB.php?f=getAPIKEY")
				.success(function(data) {
					$scope.email = data.email;
					if(data.api_key == "") { // dont have api key
						// SERVICE TO GET API KEY
						$http.get("services/call_service.php?func=getApiKey&username=username&email="+$scope.email)
						.success(function(data2) {
							var key = data2;
							key = key.replace(/"/g , '');
							window.localStorage.setItem("apikey", key);
							var url = "assets/php/RequestDB.php?f=saveAPIKEY&key="+key+"&email="+$scope.email;
							$http.get(url)
							.success(function(data3) {
							});
						});
					} else {
						window.localStorage.setItem("apikey", data.api_key);
					}
				});
	    	}
		});

	}]);