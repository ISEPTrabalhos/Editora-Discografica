<?php

require_once("nusoap.php");
require_once("DAL.php");

$server = new soap_server;

$server->configureWSDL( 'ImportMusicService', 'urn:ImportMusicService', '', 'rpc');

myRegister($server,'SaveSale',
        array(
                'in' => array("Sales" => "xsd:string"),
                'out' => array('Response' => 'xsd:string')
            ));

//if in safe mode, raw post data not set:
if (!isset($HTTP_RAW_POST_DATA)) $HTTP_RAW_POST_DATA = implode("\r\n", file('php://input'));
$server->service( $HTTP_RAW_POST_DATA);

function myRegister( &$server, $methodname, $params) {
$server->register($methodname, $params["in"], $params["out"],
'urn:ImportMusicService', // namespace
$server->wsdl->endpoint .'#'. $methodname, // soapaction
'rpc', // style
'literal', // use
'Method to save a sale into the Import Music Database' // documentation
);
}

function SaveSale($Sales) {
	global $db;
	$statement = $db->prepare("INSERT INTO `Sale` (Total) VALUES(:total)");
	$statement->execute(array(':total' => 0));
	$id = $db->lastInsertId();
	$total = 0;
	$SalesDecod = json_decode($Sales, true);

	foreach ($SalesDecod as $s) {
		$totalAlbum = $s["quantity"] * $s["price"];
		$statement = $db->prepare("INSERT INTO `SaleDetails` (SaleID,Album,Quantity,Price,Type) VALUES(:saleid,:album,:quantity,:price,:type)");
		$statement->execute(array(':saleid' => $id, ':album' => $s["title"], ':quantity' => $s["quantity"],':price' => $s['price'], ':type' => $s['type']));
		$total += $totalAlbum;
	}

	$statement = $db->prepare("UPDATE `Sale` SET Total=:total WHERE ID=:id");
	$statement->execute(array(':total' => $total, ':id' => $id));

	return "true";
}


?>