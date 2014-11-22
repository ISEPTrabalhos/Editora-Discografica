<?php
error_reporting(0);
require 'connection.php';

// DB_HOSTNAME DB_USERNAME DB_PASSWORD DB_DATABASE

$row = array();
$error = false;
if(isset($_GET['username']) && isset($_GET['password'])
	&& isset($_GET['email']) && isset($_GET['name'])) {
	$username = trim($_GET['username']);
	$password = trim($_GET['password']);
	$email = trim($_GET['email']);
	$name = trim($_GET['name']);

	if(!empty($username) && !empty($password) && !empty($email)) {
		$db = new PDO('mysql:host='.DB_HOSTNAME.';dbname='.DB_DATABASE,
						DB_USERNAME, DB_PASSWORD);
		$db->exec("SET CHARACTER SET utf8");

		$statement = $db->prepare("SELECT * FROM users WHERE username = :username OR email = :email");
		$statement->execute(array(':username' => $username, ':email' => $email));
		$row = $statement->fetchAll(PDO::FETCH_ASSOC);
		if($row) {
			$error = 'Username or email already in use';
		} else {
			// insert user 
			$statement = $db->prepare("INSERT INTO users (username,password,name,email) VALUES(:username,:password,:name,:email)");
			$statement->execute(array(':username' => $username, ':password' => md5($password), ':email' => $email, ':name' => $name));	
			$id = $db->lastInsertId();
		}
		
	} else $error = 'There are invalid fields';
} else $error = 'There are invalid fields';

echo json_encode(array('user' => $id, 'error' => $error));
