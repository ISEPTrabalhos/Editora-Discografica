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
			$http.get("services/get_catalog.php?func=getCatalog")
			.success(function(data) {
				console.log(data);
				$scope.catalog = data.Album;
				$scope.catalog.forEach(function(cd) { // add some new properties, JUST HERE, to manipulate prices
					cd.totalPrice = cd.price; // at the beggining its just one
				});
				$scope.updateTotalPrice();
			});	
		}

		$scope.loadCatalog();

		/*$scope.catalog = [
		{
			id: 10,
			img: 'http://userserve-ak.last.fm/serve/_/95407343/I+am+Hardwell.png',
			title: 'I am Hardwell',
			artist: 'Hardwell',
			price: 8.99,
			qtd: 2,
			tags: 'house,electro'
		},
		{
			id: 11,
			img: 'http://userserve-ak.last.fm/serve/_/95407343/I+am+Hardwell.png',
			title: 'I am Hardwell',
			artist: 'Hardwell',
			price: 8.99,
			qtd: 2,
			tags: 'house,electro'
		}];*/

		$scope.order = function() {


			// CHECK IF ADMIN OWNS AN API_KEY, IF NOT APPLY FOR ONE
			$http.get("assets/php/RequestDB.php?f=getAPIKEY")
			.success(function(data) {
				console.log(data);
				if(data == "") {
					console.log('SERVICE TO GET API KEY');
					// SERVICE TO GET API KEY
				} else {
					console.log("API_KEY: " + data);
				}
			});




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
			} else { //save albums on db
				// SEND SALES THROUGH SERVICE
				// ... 
				console.log(selected);
				var new_albums = JSON.stringify(albums);
				var url = "assets/php/RequestDB.php?f=saveNewAlbuns&albuns="+new_albums;
				// get albuns on sale
				$http.get(url)
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