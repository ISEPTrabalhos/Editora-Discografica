angular
	.module('app')
	.controller('register_controller', ['$scope', function($scope) { 

		$("#message").hide(); // hide eventually message 
		
		$scope.error = false;

		$scope.var = "Register User Page";

	}]);