angular
	.module('app')
	.controller('admin_controller', ['$scope', function($scope) {
		
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
		}];
	}]);