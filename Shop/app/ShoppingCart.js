/*
	Shopping Cart Methods
*/

var products;

$(document).ready(function() {
	loadShoppingCart();
});

//load shopping cart 'session' 
function loadShoppingCart()  {
	if(localStorage.getItem('cart') == null) {
		console.log("Não existe carrinho !!");
		return false;
	}
	return true;
}

//create shopping cart 'session'
function createShoppingCart(products) {
	window.localStorage.setItem("cart",JSON.stringify(products));
}

//add new cd product to shopping cart
function addCDtoCart() {
	console.log("Add to cart");
	if(loadShoppingCart() == false) {
		//simulate album product
		var products = '{ "products" : [' +
		'{ "id":"1" , "name":"Album1" },' +
		'{ "id":"2" , "name":"Album2" },' +
		'{ "id":"3" , "name":"Album3" } ]}';
		createShoppingCart(JSON.parse(products));
	}
	/*
	var users = '{ "users" : [' +
		'{ "firstName":"John" , "lastName":"Doe" },' +
		'{ "firstName":"Anna" , "lastName":"Smith" },' +
		'{ "firstName":"Peter" , "lastName":"Jones" } ]}';
	//var users = JSON.parse(text);
	//console.log(users);
	//window.localStorage.setItem("users",JSON.stringify(users));*/
}

// remove cd from shopping cart
function removeCDfromCart() {
}