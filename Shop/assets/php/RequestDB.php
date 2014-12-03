<?php
	error_reporting(0);
	require_once 'DB_Handler.php';
	echo DB_Handler::$_GET['f']($_GET);