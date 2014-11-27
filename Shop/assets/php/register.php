<?php
error_reporting(0);
require 'connection.php';

$function = $_GET['func'];

switch ($function) {
	case 'checkUsername':
		echo checkUsername();
		break;
	case 'checkEmail':
		echo checkEmail();
		break;
	case 'registerUser':
		echo registerUser();
		break;
}

function checkUsername() {
	global $db;
	if(isset($_GET['username'])) {
		$username = trim($_GET['username']);
		if(!empty($username)) {
			$statement = $db->prepare("SELECT * FROM users WHERE username = :username");
			$statement->execute(array(':username' => $username));
			$row = $statement->fetchAll(PDO::FETCH_ASSOC);
			if($row) {
				return false;
			}
		}
	}
	return true;
}

function checkEmail() {
	global $db;
	if(isset($_GET['email'])) {
		$email = trim($_GET['email']);
		if(!empty($email)) {
			$statement = $db->prepare("SELECT * FROM users WHERE email = :email");
			$statement->execute(array(':email' => $email));
			$row = $statement->fetchAll(PDO::FETCH_ASSOC);
			if($row) {
				return false;
			}
		}
	}
	return true;
}

function registerUser() {
	$row = array();
	$error = false;
	if(isset($_GET['username']) && isset($_GET['password'])
		&& isset($_GET['email']) && isset($_GET['name'])) {
		$username = trim($_GET['username']);
		$password = trim($_GET['password']);
		$email = trim($_GET['email']);
		$name = trim($_GET['name']);

		if(!empty($username) && !empty($password) && !empty($email)) {
			global $db;
			$statement = $db->prepare("INSERT INTO users (username,password,name,email) VALUES(:username,:password,:name,:email)");
			$statement->execute(array(':username' => $username, ':password' => md5($password), ':email' => $email, ':name' => $name));	
			$id = $db->lastInsertId();
		} else $error = 'There are invalid fields';
	} else $error = 'There are invalid fields';

	echo json_encode(array('user' => $id, 'error' => $error));

}