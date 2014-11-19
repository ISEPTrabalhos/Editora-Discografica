<?php
require 'connection.php';

$error = false;
$row = null;
if(isset($_GET['username']) && isset($_GET['password'])) {
	$username = ($_GET['username']).trim();
	$password = ($_GET['password']).trim();

	if(!empty($username) && !empty($password)) {
		$db = new PDO("...");
		$statement = $db->prepare("SELECT * FROM users WHERE username = :username AND password = :password");
		$statement->execute(array(':username' => $username, ':password' => md5($password)));
		$row = $statement->fetch();

		if(empty($now)) $error = 'Username or password incorrect!';
	} else $error = '';
}else $error = '';

echo json_encode(new array($now, $error));