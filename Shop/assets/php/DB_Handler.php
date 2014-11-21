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


?>