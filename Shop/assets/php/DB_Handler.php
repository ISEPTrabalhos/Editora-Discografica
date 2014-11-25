<?php
error_reporting(0);
require 'connection.php';

$function = $_GET['func'];

switch ($function) {
	case 'getAllAlbums':
		echo getAllAlbums();
		break;
	case 'getOffAlbums':
		echo getOffAlbums();
		break;
	case 'getTopSold':
		echo getTopSold();
		break;
	case 'getCartAlbumsInfo':
		echo getCartAlbumsInfo();
		break;
	case 'updateStock':
		echo updateStock();
		break;
	case 'saveNewAlbums':
		echo saveNewAlbums();
		break;
	default:
		break;
}

function getAllAlbums() {
	$db = new PDO('mysql:host='.DB_HOSTNAME.';dbname='.DB_DATABASE,
						DB_USERNAME, DB_PASSWORD);
	$db->exec("SET CHARACTER SET utf8");
	$statement = $db->prepare("SELECT * FROM albums");
	$statement->execute();
	$results = $statement->fetchAll(PDO::FETCH_ASSOC);

	if(empty($results))  { 
		$error = "No albums";
	} else {
		$error = false;
	}
	return json_encode(array('albuns' => $results, 'error' => $error));
}

function getOffAlbums() {
	$db = new PDO('mysql:host='.DB_HOSTNAME.';dbname='.DB_DATABASE,
						DB_USERNAME, DB_PASSWORD);
	$db->exec("SET CHARACTER SET utf8");
	$statement = $db->prepare("SELECT * FROM albums WHERE off != 0");
	$statement->execute();	
	$results = $statement->fetchAll(PDO::FETCH_ASSOC);

	if(empty($results))  { 
		$error = "No albums";
	} else {
		$error = false;
	}

	return json_encode(array('albuns' => $results, 'error' => $error));
}

function getTopSold() {
	$albums = array();
	$error = false;
	$db = new PDO('mysql:host='.DB_HOSTNAME.';dbname='.DB_DATABASE,
						DB_USERNAME, DB_PASSWORD);
	$db->exec("SET CHARACTER SET utf8");

	// get top albums => ID

	$statement = $db->prepare("SELECT album_id, COUNT(*) AS total FROM sales GROUP BY album_id ORDER BY total DESC LIMIT 5");
	$statement->execute();	
	$results = $statement->fetchAll(PDO::FETCH_ASSOC);

	if(empty($results))  { 
		$error = "No albums";
		return json_encode(array('albums' => $albums, 'error' => $error));
	}

	// get top albums => INFO 
	foreach ($results as $row) {
	    $statement = $db->prepare("SELECT * FROM albums WHERE id = :id");
		$statement->execute(array(':id' => $row["album_id"]));
		$results = $statement->fetchAll(PDO::FETCH_ASSOC);
		$albums[] = $results;
	}

	return json_encode(array('albums' => $albums, 'error' => $error));
}

//1,5,6,7,10
function getCartAlbumsInfo() {
	$string = $_GET['cart'];
	$cart = explode(",",$string);
	$albums = array();

	$db = new PDO('mysql:host='.DB_HOSTNAME.';dbname='.DB_DATABASE,
						DB_USERNAME, DB_PASSWORD);
	$db->exec("SET CHARACTER SET utf8");

	// get cart albums INFO
	for ($i=0; $i < sizeof($cart); $i++) {
		$statement = $db->prepare("SELECT * FROM albums WHERE id = :id");
		$statement->execute(array(':id' => $cart[$i]));
		$results = $statement->fetchAll(PDO::FETCH_ASSOC);
		$albums[] = $results;
	}
	
	return json_encode(array('albums' => $albums, 'error' => false));
}

function updateStock() {
	$cart = explode(",",$_GET['cart']);
	$stocks = explode(",",$_GET['stocks']);
	$userid = $_GET['userid'];

	$db = new PDO('mysql:host='.DB_HOSTNAME.';dbname='.DB_DATABASE,
						DB_USERNAME, DB_PASSWORD);
	$db->exec("SET CHARACTER SET utf8");

	// get cart albums INFO
	for ($i=0; $i < sizeof($cart); $i++) {
		// update stock
		$statement = $db->prepare("UPDATE albums SET qtd = :qtd WHERE id = :id");
		$statement->execute(array(':id' => $cart[$i], ':qtd' => $stocks[$i]));
		// add new sale
		$statement = $db->prepare("INSERT INTO sales (album_id,user_id) VALUES(:album,:user)");
		$statement->execute(array(':album' => $cart[$i], ':user' => $userid));
	}

	return true;

}


function saveNewAlbums() {
	$albums = json_decode($_GET['albums']);
	/*print_r($albums);
	echo '<br/><br/>';
	foreach($albums as $album){
		echo '<br/>';
     	echo $album->name;
     	echo '<br/>';
     	echo $album->tags;
  	}
  	echo '<br/>';*/
  	// save albums in database
  	$db = new PDO('mysql:host='.DB_HOSTNAME.';dbname='.DB_DATABASE,
						DB_USERNAME, DB_PASSWORD);
	$db->exec("SET CHARACTER SET utf8");
	foreach($albums as $album) { // loop through each album
		$exists = false;
		// check if album exists already
		$statement = $db->prepare("SELECT * FROM albums WHERE name = :name");
		$statement->execute(array(':name' => $album->name));
		$results = $statement->fetchAll(PDO::FETCH_ASSOC);
		if($results) {
			$exists = true;
		}

		if($exists == true)  { // then update stock 
			$statement = $db->prepare("UPDATE albums SET qtd = qtd+:qtd WHERE name = :name");
			$statement->execute(array(':qtd' => $album->qtd, ':name' => $album->name));
		} else { //  insert it 
			$statement = $db->prepare("INSERT INTO albums (name,artist,img,qtd,price,tags) 
			VALUES(:name,:artist,:img,:qtd,:price,:tags)");
			$statement->execute(array(':name' => $album->name, ':artist' => $album->artist,
		 ':img' => $album->img, ':qtd' => $album->qtd, ':price' => $album->price, ':tags' => $album->tags));
		}	
	}
	return true;
}


?>