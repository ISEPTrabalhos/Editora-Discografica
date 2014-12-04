<?php 
	//error_reporting(E_ALL);
	//ini_set('display_errors',1);
	require 'ServiceController.php'

	$service = new ServiceController('http://localhost:49305/Services/IDEIMusicService.svc?wsdl');
	
	$data = $service->requestData('getCatalog');
	return json_encode($result->$data);

	