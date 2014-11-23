<?php 
	//error_reporting(0);
	require_once 'connection.php';
	$client = new SoapClient(SOAP_URL);

	$result = $client->GetCatalog();
	
	echo json_encode($results);