<?php

require_once("nusoap.php");
require_once("DAL.php");

$server = new soap_server;

$server->configureWSDL( 'ImportMusicService', 'urn:ImportMusicService', '', 'rpc');

$server->wsdl->addComplexType(
'Order',	
'complexType',	
'struct',	
'all',
'',
array(
'title' => array('name' => 'title', 'type' => 'xsd:string'),
'quantity' => array('name' => 'quantity', 'type' => 'xsd:int'),
'price' => array('name' => "price", "type" => "xsd:decimal")
));

myRegister($server,'SaveSale',
        array(
                'in' => array("Orders" => "tns:Order"),
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

function SaveSale($Orders) {
	global $db;
	$statement = $db->prepare("INSERT INTO `Order` (Total) VALUES(:total)");
	$statement->execute(array(':total' => 0));
	$id = $db->lastInsertId();
	$total = 0;
	foreach ($Orders as $Order) {
		$totalAlbum = $Order["quantity"] * $Order["price"];
		$statement = $db->prepare("INSERT INTO `OrderDetail` (OrderID,Album,Quantity,Total) VALUES(:orderid,:album,:quantity,:total)");
		$statement->execute(array(':orderid' => $id, ':album' => $Order["title"], ':quantity' => $Order["quantity"],':total' => $totalAlbum));
		$total += $totalAlbum;
	}
	

	$statement = $db->prepare("UPDATE `Order` SET Total=:total WHERE ID=:id");
	$statement->execute(array(':total' => $total, ':id' => $id));

	return array('Response'=> "True");
}


?>