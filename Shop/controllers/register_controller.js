angular
	.module('app')
	.controller('register_controller', ['$scope', '$location', '$http', function($scope, $location, $http) {
		$http.get("assets/php/dbstatus.php")
        .success(function(data) {
            if(data == 'false'){
                $location.path('/dberror');
                $location.replace();
            }
        });
		
		$("#message").hide(); // hide eventually message
		$('.error_message').hide();	// hide eventually inputs error message, maybe unnecessary because user is redirected in case of succes 
		
		$scope.email_error = "";
		$scope.username_error = "";
		$scope.password_error = "";
		$scope.name_error = "";

		$scope.checkEmail = function() {
			var regExp = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
			var valid = regExp.test($scope.email);

			if($scope.email !== undefined && $scope.email.trim().length !== 0) {
				if(valid) {
					$http.get("assets/php/register.php?func=checkEmail&email="+$scope.email)
					.success(function(data) {
						if(data == false) {
							$scope.email_error = "Email already in use";
						} else {
							$scope.email_error = false;
						}
					});
				} else {
					$scope.email_error = "Invalid email address";
				}
			} else {
				$scope.email_error = "Email required";
			}
		}

		$scope.checkUsername = function() {
			if($scope.username !== undefined && $scope.username.trim().length !== 0) {
				$http.get("assets/php/register.php?func=checkUsername&username="+$scope.username)
				.success(function(data) {
					if(data == false) {
						$scope.username_error = "Username already in use.";
						$scope.hasError = true;
					} else {
						$scope.username_error = false;
					}
				});
			} else {
				$scope.username_error = "Username required";
			}
		}

		$scope.checkPasswords = function() {
			if($scope.password !== undefined && $scope.password.trim().length!== 0 
				&& $scope.newpassword !== undefined && $scope.newpassword.trim().length !== 0) {
				if(!($scope.password == $scope.newpassword)) {
					$scope.password_error = "Passwords don't match";
				} else {
					$scope.password_error = false;
				}
			} else {
				$scope.password_error = "Password required"
			}
		}

		$scope.checkName = function() {
			if($scope.name !== undefined && $scope.name.trim().length !==0) {
				$scope.name_error = false;
			} else {
				$scope.name_error = "Name required";
			}
		}

		$scope.register = function() {
			// $scope.hasError == false && $scope.hasError !== undefined
			if($scope.email_error == false && $scope.username_error == false &&
				$scope.name_error == false && $scope.password_error == false) {
				$http.get("assets/php/register.php?func=registerUser&username="+$scope.username+"&password="+$scope.password+"&email="+$scope.email+"&name="+$scope.name)
				.success(function(data) {
					if(data.error == false){
						// sign in user
						window.localStorage.setItem("userid", data.user);
						window.localStorage.setItem("message", "Thank you for sign up. You're now automatically logged in.");
						$location.path('/');
						$location.replace();
					} else $scope.hasError = data;
				});
			} else {
				$scope.error = "There are problems with your data";
			}
		}

	}]);