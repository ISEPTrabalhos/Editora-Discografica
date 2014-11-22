angular
	.module('app')
	.controller('cart_controller', ['$scope', '$http', '$location', function($scope, $http, $location) {

		$("#message").hide(); // hide eventually message 

		//check if user is logged in
		if(window.localStorage.getItem('userid')!=null) {
			// load cart
			var cart = getCart();
			// get cart albums info
			$http.get("assets/php/DB_Handler.php?func=getCartAlbumsInfo&cart="+cart.toString())
			.success(function(data) {
				$scope.cart = data.albums;
				$scope.totalPrice = 0;
				/* FIX THIS LATER, TOTAL PRICE IS WRONG */
				/*for (var i = 0; i < data.albums.length; i++) {
					$scope.totalPrice+=data.albums[i][0].price;
				}
				console.log($scope.totalPrice);*/
				$scope.total = 0;
				$scope.cart.forEach(function(cd) {
					console.log('--> ' + cd[0].price);
					$scope.total = $scope.total + cd[0].price;
				});
				console.log($scope.total);
				//console.log($scope.cart[0][0].price + $scope.cart[1][0].price);
			});
			
		} else {
			$location.path('login');
			$location.replace();
		}

		$scope.confirm = function() {
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
						//products.splice(index, 1);
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
		}
	}]);