<?php
error_reporting(0);
require 'connection.php';

// DB_HOSTNAME DB_USERNAME DB_PASSWORD DB_DATABASE

$error = false;
$row = array();
if(isset($_GET['username']) && isset($_GET['password'])) {
	$username = trim($_GET['username']);
	$password = trim($_GET['password']);

	if(!empty($username) && !empty($password)) {
		global $db;
		$statement = $db->prepare("SELECT * FROM users WHERE username = :username AND password = :password");
		$statement->execute(array(':username' => $username, ':password' => md5($password)));
		$row = $statement->fetchAll(PDO::FETCH_ASSOC);

		if(empty($row)) $error = "Invalid username or password";
	} else $error = '';
}else $error = '';

echo json_encode(array('user' => $row[0], 'error' => $error));