<!DOCTYPE html>
<html>
<head>
	<title>Shop</title>
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
	<meta charset="utf-8">
</head>
<body>

<div class="main-app" ng-app="app">
	<header ng-include="'views/header.html'"></header>
	<div ui-view></div>
	<footer ng-include="'views/footer.html'"></footer>
</div>


<script type="text/javascript" src="assets/js/jquery.js"></script>
<script type="text/javascript" src="assets/js/angular.min.js"></script>
<script type="text/javascript" src="assets/js/angular-ui-router.min.js"></script>
<script type="text/javascript" src="assets/js/ajax.js"></script>

<script type="text/javascript" src="app/app.js"></script>
<script type="text/javascript" src="app/ShoppingCart.js"></script>
<script type="text/javascript" src="controllers/header_controller.js"></script>
<script type="text/javascript" src="controllers/home_controller.js"></script>
<script type="text/javascript" src="controllers/login_controller.js"></script>
<script type="text/javascript" src="controllers/cart_controller.js"></script>
</body>
</html>