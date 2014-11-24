angular
	.module('app')
	.controller('admin_controller', ['$scope', '$location', function($scope, $location) {
		
		loadShoppingCart();

		// receive catalog through service ( get_catalog.php )
		
		$scope.catalog = [
		{
			id: 10,
			img: 'http://userserve-ak.last.fm/serve/_/95407343/I+am+Hardwell.png',
			name: 'I am Hardwell',
			artist: 'Hardwell',
			price: 8.99,
			qtd: 5
		},
		{
			id: 11,
			img: 'http://userserve-ak.last.fm/serve/_/95407343/I+am+Hardwell.png',
			name: 'I am Hardwell',
			artist: 'Hardwell',
			price: 8.99,
			qtd: 5
		}];

		$scope.order = function() {
			var albums = [];
			var checkboxes = document.getElementsByClassName("check"); // grab all checkboxes
			for (var i = 0; i < checkboxes.length; i++) { 
				var id = checkboxes[i].id;
				if(checkboxes[i].checked == true) { // if checked 
					var input = document.getElementById(id);
					var qtd = input.value; // get the quantity
					$scope.catalog.forEach(function(cd) { // get the selected cd
						if(cd.id == id) {
							albums.push(cd);
						}
					});
				} 
			}
			if(albums.length == 0) { // if nothing is selected
				showError("You need to choose at least one album.");
			} else {
				console.log(albums);
				//save albumns on db
				//...
				window.localStorage.setItem("order",true);
				$location.path('/');
				$location.replace();
			}
			
		};

	}]);