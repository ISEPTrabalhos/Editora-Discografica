angular
	.module('app')
	.controller('home_controller', ['$scope', function($scope) {

		$("#message").hide(); // hide eventually message 
		
		//simulacao de conjunto de cds da base de dados da loja
		//futuro metodo que chama PHP ( $http.get ) que retorna um array
		$scope.cds = getCDS();
	}]);