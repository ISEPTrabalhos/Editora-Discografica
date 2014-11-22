<?php 

	error_reporting(E_ALL);
	ini_set('display_errors', '1');

	$albums = $_GET["albums"];
	$params = array();

	$client = new SoapClient("http://wvm042.url");
	foreach ($albums => $id) {
		$params[] = $id;
	}
	$result = $client->BuyAlbums($params);
	echo $results;
	
 ?>