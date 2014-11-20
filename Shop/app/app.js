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
		.state('login', {
			url: '/login',
			templateUrl: 'views/login_view.html',
			controller: 'login_controller'
		})
		.state('error', {
			url: '/error',
			templateUrl: 'views/error_view.html'
		})
		.state('cart', {
			url: '/cart',
			templateUrl: 'views/cart_view.html',
			controller: 'cart_controller'
		})
		.state('popular', {
			url: '/popular',
			templateUrl: 'views/popular_view.html',
			controller: 'popular_controller'
		})
		.state('register', {
			url: '/register',
			templateUrl: 'views/register_view.html',
			controller: 'register_controller'
		})
}]);