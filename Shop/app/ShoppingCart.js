/*
	Shopping Cart Methods
*/

var products;

//load shopping cart 'session' 
function loadShoppingCart()  {
	if(localStorage.getItem('cart') == null) {
		console.log("Não existe carrinho !!");
		return false;
	}
	console.log('Existe');
	var cart = document.getElementById("cart");
	var image = document.createElement("img");
	image.src = "assets/img/cart.png";
	cart.appendChild(image);
	cart.innerHTML += "(2)"; // size of current shopping cart
	cart.style.display = "inline-block";
	return true;
}

//create shopping cart 'session'
function createShoppingCart(products) {
	window.localStorage.setItem("cart",JSON.stringify(products));
}

//add new cd product to shopping cart
function addCDtoCart(id) {
	console.log("Add to cart" + id);
	if(loadShoppingCart() == false) {
		//simulate album product
		var products = '{ "products" : [' +
		'{ "id":"1" , "name":"Album1" },' +
		'{ "id":"2" , "name":"Album2" },' +
		'{ "id":"3" , "name":"Album3" } ]}';
		createShoppingCart(JSON.parse(products));
	}
}

// remove cd from shopping cart
function removeCDfromCart() {
}

function check() {
	return "LOADED";
}