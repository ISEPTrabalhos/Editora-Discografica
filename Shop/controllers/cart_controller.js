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

		$scope.loadItems = function() {
			//check if user is logged in
			//if(window.localStorage.getItem('userid')!=null) {
				// load cart
				var cart = getCart();
				// get cart albums info
				$http.get("assets/php/DB_Handler.php?func=getCartAlbumsInfo&cart="+cart.toString())
				.success(function(data) {
					$scope.cart = data.albums;
					$scope.totalPrice = 0;
					$scope.cart.forEach(function(cd) {
						$scope.totalPrice += parseFloat(cd[0].price);
					});
				});
			/*} else {
				$location.path('login');
				$location.replace();
			}*/
		}
		
		$scope.loadItems();

		// NOT READY YET 
		$scope.removeFromCart = function(id) {
			var products = getCart().split(',');
			var index = products.indexOf(id);
			var size = products.length;
			if(index != -1) {
				products.splice(index, 1);
			}
			if(size == 1) {
				window.localStorage.removeItem('cart');
				loadShoppingCart();
				$location.path('/');
				$location.replace();
				loadShoppingCart();
			} else {
				updateShoppingCart(products);
				$scope.loadItems();
			}
		}

		$scope.confirm = function() {
			if(window.localStorage.getItem('userid')!=null) { // need to be logged in
				// update cart and DB
				var qtds = document.querySelectorAll(".quantity");
				var products = getCart().split(',');
				var stocks = [];
				for(var i = 0; i < qtds.length; i++) {
					var qtd = qtds[i].value;
					var id = qtds[i].id;
					if(qtd >= 1) { // user bought something
						// remove from cart
						var index = products.indexOf(id);
						if(index !=-1 ) { // if exists on cart ( unnecessary but good for testing purpose )
							products.splice(index, 1);
						}
					}
					stocks[i] = qtds[i].max - qtds[i].value;
				}
				// update DB stock from that album
				var userid = localStorage.getItem('userid');
				$http.get("assets/php/DB_Handler.php?func=updateStock&cart="+cart.toString()+"&stocks="+stocks.toString()+"&userid="+userid)
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