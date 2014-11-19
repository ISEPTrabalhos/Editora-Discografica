angular
	.module('app')
	.controller('login_controller', ['$scope', '$location', function($scope, $location) {
		$scope.error = false;

		$scope.login = function() {
			if($scope.username !== undefined && $scope.password !== undefined) {
				if($scope.username.trim().length !== 0 && $scope.password.trim().length !== 0) {
					// ajax request
					
					if(true){
						$location.path('/');
						$location.replace();
						window.localStorage.setItem("userid", "1");
					}else $scope.error = "Invalid email or password";

				}else $scope.error = "You need to fill all the fields";
			}else $scope.error = "You need to fill all the fields";
		}
	}]);