<?php
require_once("nusoap.php");
require_once("DAL.php");

$server = new soap_server;
$server->configureWSDL( 'ImportMusicService', 'urn:ImportMusicService', '', 'document');
myRegister($server,'SaveSale',
        array(
                'in' => array('Title' => 'xsd:string',
                                'Quantity' => 'xsd:int'),
                'out' => array('Response' => 'xsd:string')
            ));

//if in safe mode, raw post data not set:
if (!isset($HTTP_RAW_POST_DATA)) $HTTP_RAW_POST_DATA = implode("\r\n", file('php://input'));
$server->service( $HTTP_RAW_POST_DATA);

function myRegister( &$server, $methodname, $params) {
$server->register($methodname, $params["in"], $params["out"],
'urn:ImportMusicService', // namespace
$server->wsdl->endpoint .'#'. $methodname, // soapaction
'document', // style
'literal', // use
'Method to save a sale into the Import Music Database' // documentation
);
}

function SaveSale($Title,$Quantity) {
	global $db;

	$statement = $db->prepare("INSERT INTO sales (Title,Quantity) VALUES(:title,:quantity)");
		$statement->execute(array(':title' => $Title, ':quantity' => $Quantity));
		
	return array('Response'=> "");
}

?>