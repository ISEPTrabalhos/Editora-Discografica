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

$(document).ready(function(){
	
	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
	
});