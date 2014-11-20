<?php
error_reporting(0);
require 'connection.php';

// DB_HOSTNAME DB_USERNAME DB_PASSWORD DB_DATABASE

$error = false;
$row = array();
if(isset($_GET['username']) && isset($_GET['password'])
	&& isset($_GET['email'])) {
	$username = trim($_GET['username']);
	$password = trim($_GET['password']);
	$email = trim($_GET['email']);

	if(!empty($username) && !empty($password) && !empty($email)) {
		$db = new PDO('mysql:host='.DB_HOSTNAME.';dbname='.DB_DATABASE,
						DB_USERNAME, DB_PASSWORD);
		$db->exec("SET CHARACTER SET utf8");

		$statement = $db->prepare("SELECT * FROM users WHERE username = :username OR email = :email");
		$statement->execute(array(':username' => $username, ':email' => $email));
		$row = $statement->fetchAll(PDO::FETCH_ASSOC);
		if($row) {
			//echo 'Exist user';
			echo 'false';
		} else {
			// insert user 
			// redirect it to homepage
			echo 'true';
		}
		
	} else echo 'false';
} else echo 'false';
