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
	case 'getTopTag':
		echo getTopTag();
		break;
	default:
		break;
}

function getAllAlbums() {
	global $db;
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
	global $db;
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
	global $db;

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

function getCartAlbumsInfo() {
	$string = $_GET['cart'];
	$cart = explode(",",$string);
	$albums = array();

	global $db;

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

	global $db;

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
  	// save albums in database
  	global $db;
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

function getTopTag() {
	$ids = explode(",", $_GET['albums']);
	$query = "SELECT tags FROM albums WHERE ";
	for($i = 0; $i < sizeof($ids); $i++) {
		if($i == sizeof($ids) - 1) {
			$query = $query . "id = " . $ids[$i];
		} else {
			$query = $query . "id = " . $ids[$i] . " OR ";
		}
	}
	global $db;
	$statement = $db->prepare($query);
	$statement->execute();
	$results = $statement->fetchAll(PDO::FETCH_ASSOC);
	$tags = array();
	foreach ($results as $result) { 
		$tag = $result["tags"];
		$pos = strpos($tag, ',');
		if($pos !== false) { // more than one tag
			$tg = explode(",", $tag);
			for($j = 0; $j < sizeof($tg); $j++) {
				$tags[] = $tg[$j];
			}
		} else { // just one tag
			$tags[] = $tag;
		}
	}

	$countTags = array_count_values($tags); // count each tag appearance
	$topTag = "";
	$max = 0;
	foreach ($countTags as $key => $value) { // get top tag
		if($value > $max) {
			$max = $value;
			$topTag = $key;
		}
	};

	return $topTag;
}

?>