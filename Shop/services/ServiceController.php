<?php

class ServiceController {
	private $_url,
			$_soapclient;

	public function __construct($mainurl){
		$this->_url = $mainurl;
		$this->_soapclient = new SoapClient($mainurl);
	}

	public function requestData($method_name) {
		try{
			$r = $this->_soapclient->$method_name();
		
			$method_name .= 'Result';
			return json_encode($r->$method_name);
		}catch(Exception $ex){
			return -1;
		}
	} 
}