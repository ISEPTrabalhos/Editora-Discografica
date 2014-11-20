angular
	.module('app')
	.controller('register_controller', ['$scope', '$http', function($scope, $http) { 

		$("#message").hide(); // hide eventually message 
		
		$scope.error = false;

		$scope.register = function() {
			if($scope.username !== undefined && $scope.password !== undefined && $scope.email !== undefined
				&& $scope.newpassword !== undefined) 
			{
				if($scope.username.trim().length !== 0 && $scope.password.trim().length !== 0
					&& $scope.email.trim().length !== 0 && $scope.newpassword.trim().length !== 0)
				{
					if($scope.password === $scope.newpassword) {
						//alert($scope.username + ", " + $scope.password + ", " + $scope.email);
						$http.get("assets/php/register.php?username="+$scope.username+"&password="+$scope.password+"&email="+$scope.email)
						.success(function(data) {
							console.log(data);
							if(data === "true"){
								alert("INSERIR");
								/*window.localStorage.setItem("userid", data.user.id);
								window.localStorage.setItem("message", "Welcome <strong>"+data.user.name+"</strong>");
								$location.path('/');
								$location.replace();*/
							}else $scope.error = "HOUVE ERRO!!";
						});
					} else $scope.error = "Passwords don't match";
				}	else $scope.error = "You need to fill all the fields";
			} else $scope.error = "You need to fill all the fields";
		}

	}]);