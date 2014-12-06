angular
	.module('app')
	.controller('admin_controller', ['$scope', '$location', '$http', function($scope, $location, $http) {
		
		loadShoppingCart();

		// calculate total price
		$scope.updateTotalPrice = function() {
        	$scope.totalPrice = 0;
			$scope.catalog.forEach(function(cd) {
				$scope.totalPrice += parseFloat(cd.totalPrice);			
			});
			$scope.totalPrice = $scope.totalPrice.toFixed(2);
		}

		$scope.updatePrices = function(cd) {
			var input = document.getElementById(cd.ID);
			var newAmount = input.value;
			var regExp = /^[1-9]\d*$/;
			if(regExp.test(newAmount) && newAmount >= parseInt(input.min)) {
				cd.totalPrice = cd.price * newAmount;
				$scope.updateTotalPrice();
			} else {
				alert("Invalid amount");
				input.value = 1;
			}
		}

		// receive catalog through service ( get_catalog.php )
		$scope.loadCatalog = function() {
			$http.get("services/call_service.php?func=getCatalog")
			.success(function(data) {
				$scope.catalog = data.Album;
				$scope.catalog.forEach(function(cd) { // add some new properties, JUST HERE, to manipulate prices
					cd.totalPrice = cd.price; // at the beggining its just one
				});
				$scope.updateTotalPrice();
			});	
		}

		$scope.loadCatalog();

		$scope.order = function() {

			var albums = []; // array to save selected albums ( to save or update in DB )
			var selected = []; // array to save selected albums ID's ( editor sales history )
			var checkboxes = document.getElementsByClassName("check"); // grab all checkboxes
			for (var i = 0; i < checkboxes.length; i++) { 
				var id = checkboxes[i].id;
				if(checkboxes[i].checked == true) { // if checked
					selected.push(id);
					console.log();
					var input = document.getElementById(id);
					var qtd = input.value; // get the quantity
					selected.push(qtd);
					$scope.catalog.forEach(function(cd) { // get the selected cd
						if(cd.ID == id) {
							cd['qtd'] = qtd;
							albums.push(cd);
						}
					});
				}
			}
			
			if(albums.length == 0) { // if nothing is selected
				showError("You need to choose at least one album.");
			} else { // save albums on db & send sales to editor's
				// send sales through service
				var apikey =  window.localStorage.getItem('apikey');
				var url = "services/call_service.php?func=sellAlbums&ids="+selected.toString()+"&userID="+apikey;
				$http.get(url)
				.success(function(data2) {
				});
				// save albums on db
				var new_albums = JSON.stringify(albums);
				var url2 = "assets/php/RequestDB.php?f=saveNewAlbuns&albuns="+new_albums;
				$http.get(url2)
				.success(function(data) {
					if(data == true){
						// redirect to homepage
						window.localStorage.setItem("order",true);
						$location.path('/');
						$location.replace();
					}
				});
			}
			
		};

	}]);