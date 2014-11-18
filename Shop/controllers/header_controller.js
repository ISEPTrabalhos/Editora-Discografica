angular
	.module('app')
	.controller('header_controller', function() {
		this.tag = 0;

		this.setActive = function(elem) {
			this.tag = elem;
		};

		this.isActive = function(elem) {
			return this.tag === elem;
		};

	});