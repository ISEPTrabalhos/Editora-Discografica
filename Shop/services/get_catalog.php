<?php 
	//error_reporting(E_ALL);
	//ini_set('display_errors',1);
	$var = $_GET['var'];
	$client = new SoapClient('http://localhost:49305/Services/IDEIMusicService.svc?wsdl');
	$result = $client->getCatalog();
	
	return json_encode($result->getCatalogResult);