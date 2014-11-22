angular
	.module('app')
	.controller('login_controller', ['$scope', '$location', '$http', function($scope, $location, $http) {

		$("#message").hide(); // hide eventually message 

		$scope.error = false;
		$scope.login = function() {
			if($scope.username !== undefined && $scope.password !== undefined) {
				if($scope.username.trim().length !== 0 && $scope.password.trim().length !== 0) {
					// ajax request
					$http.get("assets/php/login.php?username="+$scope.username+"&password="+$scope.password)
					.success(function(data) {
						if(data.error === false){
							window.localStorage.setItem("userid", data.user.id);
							window.localStorage.setItem("message", "Welcome "+data.user.name);
							$location.path('/');
							$location.replace();
						}else $scope.error = data.error;
					});

				}else $scope.error = "You need to fill all the fields";
			}else $scope.error = "You need to fill all the fields";
		}
	}]);