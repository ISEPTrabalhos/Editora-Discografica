<?php

require 'connection.php';

// DB_HOSTNAME DB_USERNAME DB_PASSWORD DB_DATABASE

$error = false;
$row = array();
if(isset($_GET['username']) && isset($_GET['password'])) {
	$username = trim($_GET['username']);
	$password = trim($_GET['password']);

	if(!empty($username) && !empty($password)) {
		$db = new PDO('mysql:host='.DB_HOSTNAME.';dbname='.DB_DATABASE,
						DB_USERNAME, DB_PASSWORD);

		$statement = $db->prepare("SELECT * FROM users WHERE username = :username AND password = :password");
		$statement->execute(array(':username' => $username, ':password' => md5($password)));
		$row = $statement->fetchAll(PDO::FETCH_ASSOC);

		if(empty($row)) $error = 'Username or password incorrect!';
	} else $error = '';
}else $error = '';

echo json_encode(array('user' => $row, 'error' => $error));