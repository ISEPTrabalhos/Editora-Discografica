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
function addOrRemoveCDtoCart(id) {
	var products;
	if(isSet() == false) { // if there's no cart
		products = [id];
		createShoppingCart(products);
	} else { // se existir carrinho
		var cartImage = document.getElementById(id);
		var products_string = getCart();
		products = products_string.split(',');
		var exists = existOnCart(id,products);
		if(exists == -1) { // add product
			products.push(id);
			cartImage.src = "assets/img/cartRemove.png";
		} else { // else remove it
			cartImage.src = "assets/img/cartAdd.png";
			products.splice(exists, 1);
			console.log(products);
		}
		if(products.length != 0) {
			createShoppingCart(products);
		}	
	}
}

//check if product is already in cart
function existOnCart(id, products) {
	return products.indexOf(id);
}
function removeCDfromCart() {
}

// update shopping cart info on header
function updateCartInfo() {
	var cart_label = document.getElementById("cart_label");
	if(isSet()==true) {
		var cart = getCart();
		var items = cart.split(',').length;
		cart_label.innerHTML = "(" + items + ")"; // number of items of current shopping cart
	} 
}

// set add or remove image 
function checkImages(id) {
	console.log("--> " + id);
	if(isSet()==true) { // if there's a cart
		var products_string = getCart();
		var products = products_string.split(',');
		if( existOnCart(id,products) != -1) { // if album belongs to cart
			document.getElementById(id).src="assets/img/cartRemove.png";
		}
	}
}
//