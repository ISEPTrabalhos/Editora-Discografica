<?php
	define(DB_HOSTNAME, "localhost");
	define(DB_USERNAME, "root");
	define(DB_PASSWORD, "root");
	define(DB_DATABASE, "ImportMusic");

	$db = new PDO('mysql:host='.DB_HOSTNAME.';dbname='.DB_DATABASE,
						DB_USERNAME, DB_PASSWORD);
	$db->exec("SET CHARACTER SET utf8");
	
/**
 * if change pls use the following command:
 * git update-index --assume-unchanged assets/php/connection.php
 * (You need to be in the Shop folder, if you are not pls change the path)
 */