<?php
require_once("nusoap.php");

$server = new soap_server;
$server->configureWSDL( 'servicename', 'urn:servicename', '', 'document');
myRegister($server,'SaveSale',
        array(
                'in' => array('Title' => 'xsd:string',
                                'Quantity' => 'xsd:int')
            ));

//if in safe mode, raw post data not set:
if (!isset($HTTP_RAW_POST_DATA)) $HTTP_RAW_POST_DATA = implode("\r\n", file('php://input'));
$server->service( $HTTP_RAW_POST_DATA);

function myRegister( &$server, $methodname, $params) {
$server->register($methodname, $params["in"], $params["out"],
'urn:servicename', // namespace
$server->wsdl->endpoint .'#'. $methodname, // soapaction
'document', // style
'literal', // use
'N/A' // documentation
);
}

function SaveSale($Title,$Quantity) {
$result=false;
if ($Name=="mleiv" && $Age==35) $result=true;
return array('Pass'=>$result);
}

?>