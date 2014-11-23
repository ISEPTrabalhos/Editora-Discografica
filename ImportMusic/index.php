<?php 

	error_reporting(E_ALL);
	ini_set('display_errors', '1');

	$albums = $_GET["albums"];
	$params = array();

	$client = new SoapClient("http://wvm042.url");
	$params = explode(',', $albums);
	$result = $client->BuyAlbums($params);
	echo $results;
	
 ?>