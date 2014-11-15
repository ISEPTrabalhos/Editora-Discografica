/*
	Shopping Cart Methods
*/

//load shopping cart 'session' 
function loadShoppingCart()  {
	if(isSet()==false) {
		console.log("Não existe carrinho !!");
		return false;
	}
	console.log('Existe carrinho !!');
	// update shopping cart info on header
	updateCartInfo();
	return true;
}

//
function isSet() {
	if(localStorage.getItem('cart')==null) {
		return false;
	}
	return true;
}

//get products list
function getProducstFromShoppingCart() {
	// no need to check if cart exist, done earlier
	var json = JSON.parse(localStorage.getItem('cart'));
	return json.products;
}

//create shopping cart 'session'
function createShoppingCart(products) {
	window.localStorage.setItem("cart",JSON.stringify(products));
	updateCartInfo();
}

//add new cd product to shopping cart
function addCDtoCart(id) {
	console.log("Add to cart " + id);
	/* simular conjunto de produtos
	var products = '{ "products" : [' +
		'{ "id":' + id +' , "price":"17.99" },' +
		'{ "id":"2" , "price":"7.30" },' +
		'{ "id":"3" , "price":"5.99" } ]}';
		*/
	if(isSet() == false) { // se nao exister criar uma nova
		
		var products = '{ "products" : [' +
		'{ "id":' + id +' , "price":"19.99" }' + ']}';
		
		createShoppingCart(JSON.parse(products));
	} else { // se existir adicionar
		console.log(JSON.parse(localStorage.getItem('cart')));
		// adicionar ao array
		// ..
		//update cart header info
		updateCartInfo();
	}
	/*
		var json_products = JSON.parse(localStorage.getItem('cart'));
		var newProduct = '{"id":"1777", "price":"19.99"}';
		console.log("asdasdas");
		//console.log(json_products);
		console.log(newProduct);

		//json_products += newProduct;
		//simulate album product
		
		*/
}

// remove cd from shopping cart
function removeCDfromCart() {
}

// update shopping cart info on header
function updateCartInfo() {
	var cart_label = document.getElementById("cart_label");
	var json = JSON.parse(localStorage.getItem('cart'));
	var products = getProducstFromShoppingCart();
	cart_label.innerHTML = "(" + products.length + ")"; // size of current shopping cart
	cart_label.style.display = "inline-block";
}