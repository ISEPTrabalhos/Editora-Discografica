angular
	.module('app')
	.controller('cart_controller', ['$scope', '$http', '$location', function($scope, $http, $location) {

		$("#message").hide(); // hide eventually message 

		//check if user is logged in
		if(window.localStorage.getItem('userid')!=null) {
			var id = window.localStorage.getItem('userid');
			// load cart
			var cart = getCart();
			// get cart albums info
			$http.get("assets/php/DB_Handler.php?func=getCartAlbumsInfo&cart="+cart.toString())
			.success(function(data) {
				$scope.cart = data.albums;
			});
			$scope.totalPrice = 0;
			/* NEXT FIX
			$scope.cart.forEach(function(cd) {
				$scope.totalPrice += cd[0].price;
			});*/
			$scope.totalPrice = $scope.totalPrice.toFixed(2);
		} else {
			$location.path('login');
			$location.replace();
		}

		$scope.confirm = function() {
			//UPDATE CART AND DB
			var qtds = document.querySelectorAll(".quantity");
			var products = getCart().split(',');
			for(var i = 0; i < qtds.length; i++) {
				var qtd = qtds[i].value;
				var id = qtds[i].id;
				if(qtd >= 1) { // user bought something
					//UPDATE DB STOCK FROM THAT ALBUM, using that

					//REMOVE IT FROM CART
					var index = products.indexOf(id);
					if(index !=-1 ) { // if exists on cart ( unnecessary but good for testing purpose )
						products.splice(index, 1);
					}
				}
			}
			updateShoppingCart(products);

			//REDIRECT TO HOMEPAGE
			$location.path('/');
			$location.replace();
		}

	}]);