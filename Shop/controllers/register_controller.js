angular
	.module('app')
	.controller('register_controller', ['$scope', '$location', '$http', function($scope, $location, $http) { 

		$("#message").hide(); // hide eventually message
		$('.error_message').hide();	// hide eventually inputs error message, maybe unnecessary because user is redirected in case of succes 
		
		$scope.error = false;

		$scope.register = function() {
			if($scope.username !== undefined && $scope.password !== undefined && $scope.email !== undefined
				&& $scope.newpassword !== undefined && $scope.name != undefined) 
			{
				if($scope.username.trim().length !== 0 && $scope.password.trim().length !== 0
					&& $scope.email.trim().length !== 0 && $scope.newpassword.trim().length !== 0
					&& $scope.name.trim().length!== 0)
				{
					if($scope.password === $scope.newpassword) {
						$http.get("assets/php/register.php?username="+$scope.username+"&password="+$scope.password+"&email="+$scope.email+"&name="+$scope.name)
						.success(function(data) {
							if(data.error == false){
								// sign in user
								window.localStorage.setItem("userid", data.user);
								window.localStorage.setItem("message", "You're now logged in.");
								$location.path('/');
								$location.replace();
							}else $scope.error = data;
						});
					} else $scope.error = "Passwords don't match";
				}	else $scope.error = "You need to fill all the fields";
			} else $scope.error = "You need to fill all the fields";
		}

	}]);