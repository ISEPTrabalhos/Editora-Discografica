angular
	.module('app')
	.controller('admin_controller', ['$scope', '$location', '$http', function($scope, $location, $http) {
		
		loadShoppingCart();

		// receive catalog through service ( get_catalog.php )
		
		$scope.catalog = [
		{
			id: 10,
			img: 'http://userserve-ak.last.fm/serve/_/95407343/I+am+Hardwell.png',
			name: 'I am Hardwell',
			artist: 'Hardwell',
			price: 8.99,
			qtd: 2,
			tags: 'house,electro'
		},
		{
			id: 11,
			img: 'http://userserve-ak.last.fm/serve/_/95407343/I+am+Hardwell.png',
			name: 'I am Hardwell',
			artist: 'Hardwell',
			price: 8.99,
			qtd: 2,
			tags: 'house,electro'
		}];

		$scope.order = function() {
			var albums = []; // array to save selected albums
			var selected = []; // array to save selected albums ID's ( editor sales history )
			var checkboxes = document.getElementsByClassName("check"); // grab all checkboxes
			for (var i = 0; i < checkboxes.length; i++) { 
				var id = checkboxes[i].id;
				if(checkboxes[i].checked == true) { // if checked
					selected.push(id);
					var input = document.getElementById(id);
					var qtd = input.value; // get the quantity
					$scope.catalog.forEach(function(cd) { // get the selected cd
						if(cd.id == id) {
							cd['qtd'] = qtd;
							albums.push(cd);
						}
					});
				} 
			}
			if(albums.length == 0) { // if nothing is selected
				showError("You need to choose at least one album.");
			} else { //save albums on db
				// send sales to editor's
				// ... console.log(selected);
				var new_albums = JSON.stringify(albums);
				var url = "assets/php/DB_Handler.php?func=saveNewAlbums&albums="+new_albums;
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