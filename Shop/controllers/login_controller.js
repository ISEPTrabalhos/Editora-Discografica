angular
	.module('app')
	.controller('login_controller', ['$scope', function($scope) {
		$scope.error = false;

		$scope.login = function() {
			// ajax to login user

			alert($scope.username);

			// debug
			$scope.error = "ERRO: 123";
		}
	}]);