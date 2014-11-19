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

<!-- Load all the libs -->
<?php
	$files = scandir('libs');
	foreach ($files as $file ) {
		if($file != '.' && $file != '..'){
			if(trim(pathinfo($file, PATHINFO_EXTENSION)) == 'js')
				echo '<script type="text/javascript" src="libs/'. $file .'"></script>';
		}
	}
?>

<!-- Load script files -->
<script type="text/javascript" src="app/app.js"></script>
<script type="text/javascript" src="app/ShoppingCart.js"></script>

<!-- Load all the controllers -->
<?php
	$files = scandir('controllers');
	foreach ($files as $file ) {
		if($file != '.' && $file != '..'){
			if(trim(pathinfo($file, PATHINFO_EXTENSION)) == 'js')
				echo '<script type="text/javascript" src="controllers/'. $file .'"></script>';
		}
	}
?>

</body>
</html>