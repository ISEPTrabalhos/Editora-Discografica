<?php

$func = $_GET['func'];

switch ($func) {
	case 'getCatalogo':
		echo getCatalogo();
		break;
	default:
		break;
}

function getCatalogo() {
	$client = new SoapClient('http://localhost:49305/Services/IDEIMusicService.svc?wsdl');
	$result = $client->getCatalog();
	
	return json_encode($result->getCatalogResult);
}