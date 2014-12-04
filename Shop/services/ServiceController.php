<?php

class ServiceController {
	private $_url,
			$_soapclient;

	public function __construct($mainurl){
		$this->_url = $mainurl;
		$this->_soapclient = new SoapClient($mainurl);
	}

	public function requestData($get) {
		$method_name = $get['func'];
		try{
			if(isset($get['username']) && isset($get['email'])) {
				$param = $get['username'];
				$email = $get['email'];
				$r = $this->_soapclient->$method_name(array($param => $email));
			} else {
				$r = $this->_soapclient->$method_name();
			}
			$method_name .= 'Result';
			return json_encode($r->$method_name);
		}catch(Exception $ex){
			return -1;
		}
	} 
}