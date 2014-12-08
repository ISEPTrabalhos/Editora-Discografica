<?php

require 'nusoap.php';

$params = $_GET['sales'];

print_r($params);

$sClient = new nusoap_client('http://localhost/Editora-Discografica/ImportMusic/index.php?wsdl','wsdl','','','','');
$response = $sClient->call('SaveSale',array('Sales' => $params));

echo '<br/> Supostamente funcionou !! ';

