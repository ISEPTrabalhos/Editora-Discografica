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
	if(isSet()) {
		return localStorage.getItem('cart');
	}
}

//create shopping cart 'session'
function createShoppingCart(products) {
	if(isSet()) { // if cart exists remove the old one
		window.localStorage.removeItem("cart");
	}
	window.localStorage.setItem("cart",products);
	updateCartInfo();
}

//update cart products
function updateShoppingCart(products) {
	if(products.length != 0) {
		createShoppingCart(products);
	} else {
		localStorage.removeItem("cart");
		updateCartInfo();
	}
}

//add new cd product to shopping cart
function addOrRemoveCDtoCart(id, albumName) {
	var cartImage = document.getElementById(id);
	var products;
	if(isSet() == false) { // if there's no cart
		products = [id];
		createShoppingCart(products);
		cartImage.src = "assets/img/cartRemove.png";
		showSuccess(albumName + " added to cart.");
	} else { // se existir carrinho
		var products_string = getCart();
		products = products_string.split(',');
		var exists = existOnCart(id,products);
		if(exists == -1) { // add product
			products.push(id);
			cartImage.src = "assets/img/cartRemove.png";
			showSuccess(albumName + " added to cart.");
		} else { // else remove it
			cartImage.src = "assets/img/cartAdd.png";
			products.splice(exists, 1);
			showError(albumName + " removed from cart.");
		}
		updateShoppingCart(products);
	}
}

//check if product is already in cart
function existOnCart(id, products) {
	return products.indexOf(id);
}

// update shopping cart info on header
function updateCartInfo() {
	var cart_label = document.getElementById("cart_label");
	if(isSet()==true) {
		var cart = getCart();
		var items = cart.split(',').length;
		cart_label.innerHTML = "(" + items + ")"; // number of items of current shopping cart
	} else {
		cart_label.innerHTML = "(0)";
	}
}

// set add or remove image 
function checkImages(id) {
	if(isSet()==true) { // if there's a cart
		var products_string = getCart();
		var products = products_string.split(',');
		if(existOnCart(id,products) != -1) { // if album belongs to cart
			document.getElementById(id).src="assets/img/cartRemove.png";
		}
	}
}
