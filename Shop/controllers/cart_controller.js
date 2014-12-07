angular
	.module('app')
	.controller('cart_controller', ['$scope', '$http', '$location', function($scope, $http, $location) {
		
		$http.get("assets/php/dbstatus.php")
        .success(function(data) {
            if(data == 'false'){
                $location.path('/dberror');
                $location.replace();
            }
        });
        
        // calculate total price
        $scope.updateTotalPrice = function() {
        	$scope.totalPrice = 0;
			$scope.cart.forEach(function(cd) {
				$scope.totalPrice += parseFloat(cd[0].totalPrice);
			});
			$scope.totalPrice = $scope.totalPrice.toFixed(2);
		}

		$scope.isEmpty = function() {
			return (window.localStorage.getItem("cart") != null);
		}

		// update 'number of items' prices
		$scope.updatePrices = function(cd) {
			var input = document.getElementById(cd.id);
			var newAmount = input.value;
			var regExp = /^[0-9]\d*$/;
			if(regExp.test(newAmount)) {
				if(newAmount < parseInt(input.min)) {
					alert("You need to order at least 1.");
					input.value = 1;
				} else if(newAmount > parseInt(input.max)) {
					alert("Sorry, we don't have enough stock for your order.");
					input.value = 1;
				} else {
					cd.totalPrice = cd.price * newAmount;
					$scope.updateTotalPrice();	
				}
			} else {
				alert("Invalid amount.");
				input.value = 1;
			}
		}

		$scope.getTopTagOnCart = function() {
			var cart = getCart();
			// get cart top tag
			$http.get("assets/php/RequestDB.php?f=getTopTag&albums="+cart.toString())
			.success(function(data) {
				$scope.topTag = data;
				$scope.getLastFMTopAlbuns($scope.topTag);
			});
		}

		$scope.loadItems = function() {
			if(window.localStorage.getItem("cart") != null) {
				var cart = getCart();
				// get cart albums info
				$http.get("assets/php/RequestDB.php?f=getCartAlbumsInfo&cart="+cart.toString())
				.success(function(data) {
					$scope.cart = data.albums;
					$scope.totalPrice = 0;
					$scope.cart.forEach(function(cd) { // add some new properties, JUST HERE, to manipulate prices
						//cd[0].amount = 1;
						cd[0].totalPrice = cd[0].price; // at the beggining its just one
					});
					$scope.updateTotalPrice();
					$scope.getTopTagOnCart();
				});
			}
		}
		
		$scope.getLastFMTopAlbuns = function(tag) {
			var url = "http://ws.audioscrobbler.com/2.0/?method=tag.getTopAlbums&tag=" + tag + "&limit=8&api_key=e85bfd5e26e0e91b53160653d86ba063&format=json";
			$http.get(url)
			.success(function(data) {
				// data contains all the top albums by tag
				var albums = data.topalbums.album;
				$scope.topAlbums = albums;
				var index = 0;
				$scope.topAlbums.forEach(function(album){
					album.id = index;
					index = index + 1; 
				});
			});
		}

		$scope.loadItems();

		$scope.searchByTag = function() {
			if($scope.searchTag !== undefined && $scope.searchTag.trim().length !== 0) {
				$scope.topTag = $scope.searchTag;
				$scope.getLastFMTopAlbuns($scope.searchTag);
			} else {
				alert("Please enter a name.");
			}
		}

		// add suggested to current cart
		$scope.addToCurrentCart = function(id, albumName) {
        	addToCart(id);
        	$scope.loadItems();
        	showSuccess(albumName + " added to cart.");
        }

		// verify if album exist on stock
		$scope.checkIfAvailable = function(element) {
			var albumName = element.$parent.album.name;
			if(element.id != undefined) { // add to cart
				var cart = getCart().split(",");
				if(cart.indexOf(element.id) == -1 ) { // check if already exists
					$scope.addToCurrentCart(element.id, albumName);
				} else {
					showError("Product already in shopping cart");
				}
			} else {
				var span = document.getElementsByClassName(albumName);
				var url = "assets/php/RequestDB.php?f=existOnShop&albumName=" + albumName;
				$http.get(url)
				.success(function(data) {
					if(data != -1) {
						span[0].innerHTML = "Add to cart";
						element.id = data;
					} else {
						span[0].innerHTML = "Unavailable";
					}
				});
			}
        };

		$scope.removeFromCart = function(id) {
			var products = getCart().split(',');
			var index = products.indexOf(id);
			var size = products.length;
			if(index != -1) {
				products.splice(index, 1);
			}
			if(size == 1) {
				window.localStorage.removeItem('cart');
				$location.path('/');
				$location.replace();
				loadShoppingCart();
			} else {
				updateShoppingCart(products);
				$scope.loadItems();
			}
		}

		$scope.confirm = function(element) {
			var sales = []; // sales array to send to ImportMusic
			if(window.localStorage.getItem('userid')!=null) { // need to be logged in
				// update cart and DB
				var qtds = document.querySelectorAll(".quantity"); // grab all qtds inputs
				var types = document.querySelectorAll(".type"); // grab all types options
				var stocks = [];
				var amounts = [];
				for(var i = 0; i < qtds.length; i++) { // get amounts
					stocks[i] = qtds[i].max - qtds[i].value;
					amounts[i] = qtds[i].value;
					//console.log(element[i][0].name);
					//console.log(element[i][0].price);
					var type = types[i].options[types[i].selectedIndex].value;
					var album = {title:element[i][0].name, quantity:parseInt(qtds[i].value), price:parseFloat(element[i][0].price), type:type};
					//console.log(album);
					sales.push(album);
				}

				// send sales to import music
				console.log(JSON.stringify(sales));
				var url = "services/callImportMusic.php?Sales="+JSON.stringify(sales);
				$http.get(url)
				.success(function(data2) {
				});


				// update DB stock from that album
				var userid = localStorage.getItem('userid');
				var products = getCart().split(',');
				url = "assets/php/RequestDB.php?f=updateStock&cart="+products+"&stocks="+stocks.toString()+
					"&amounts="+amounts.toString()+"&userid="+userid+"&totalPrice="+$scope.totalPrice;
				$http.get(url)
				.success(function(data) {
					if(data == true) {
						// delete shopping cart
						window.localStorage.removeItem("cart");
						window.localStorage.setItem("buy",true);
						updateCartInfo();
						//REDIRECT TO HOMEPAGE
						$location.path('/');
						$location.replace();
					}
				});
			} else {
				$location.path('login');
				$location.replace();
			}
		}

}]);