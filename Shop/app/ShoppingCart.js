/*
	Shopping Cart Methods
*/

//check if cart exists
function isSet() {
	if(localStorage.getItem('cart')==null) {
		return false;
	}
	return true;
}

//load shopping cart 'session' 
function loadShoppingCart()  {
	if(isSet()==false) {
		return false;
	}
	// update shopping cart info on header
	updateCartInfo();
	return true;
}

function getCart() {
	return localStorage.getItem('cart');
}

//create shopping cart 'session'
function createShoppingCart(products) {
	if(isSet()) { // if cart exists remove the old one
		localStorage.removeItem("cart");
	}
	window.localStorage.setItem("cart",products);
	updateCartInfo();
}

//add new cd product to shopping cart
function addCDtoCart(id) {
	console.log("Add to cart " + id);
	if(isSet() == false) { // se nao exister carrinho
		var products = [id];
		createShoppingCart(products);
	} else { // se existir adicionar
		var products_string = getCart();
		var products = products_string.split(',');
		products.push(id);
		createShoppingCart(products);
	}
}

// remove cd from shopping cart
function removeCDfromCart() {
}

// update shopping cart info on header
function updateCartInfo() {
	var cart_label = document.getElementById("cart_label");
	if(isSet()==true) {
		console.log('sim');
		var cart = getCart();
		var items = cart.split(',').length;
		cart_label.innerHTML = "(" + items + ")"; // number of items of current shopping cart
	} else if(isSet()==false) {
		console.log('nao');
		cart_label.innerHTML = "(0)";
	}
}