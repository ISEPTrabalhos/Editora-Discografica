<?php 
	//error_reporting(0);
	require_once 'connection.php';
	$client = new SoapClient(SOAP_URL);

	$albums = $_GET["albums"];

	$params = explode(',', $albums);
	$result = $client->BuyAlbums($params);
	
	echo json_encode($results);