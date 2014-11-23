<?php
	error_reporting(0);
	require 'connection.php';
	
	try{
		$db = new PDO('mysql:host='.DB_HOSTNAME.';dbname='.DB_DATABASE,
		DB_USERNAME, DB_PASSWORD);
		echo json_encode(true);     
	}catch(Exception $ex) {
		echo json_encode(false);
	}            