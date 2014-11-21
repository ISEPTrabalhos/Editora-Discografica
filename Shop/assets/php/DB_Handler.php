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

?>