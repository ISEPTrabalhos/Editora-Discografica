angular
	.module('app')
	.controller('header_controller', function() {
		this.tag = 0;

		loadShoppingCart();
		
		this.getMessage = function() {
			var message = window.localStorage.getItem("message");
			if(message == null) message = false;
			else window.localStorage.removeItem("message");
			return message;
		};

		this.setActive = function(elem) {
			this.tag = elem;
		};

		this.isActive = function(elem) {
			return this.tag === elem;
		};



	});