var app = angular.module('app', [
			'ui.router'
		]);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/cds_view.html',
			controller: 'home_controller'
		})
		.state('error', {
			url: '/error',
			templateUrl: 'views/error_view.html'
		})
}]);