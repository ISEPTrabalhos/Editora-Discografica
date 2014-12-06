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
			if(isset($get['username']) && isset($get['email'])) { // get api key
				$param = $get['username'];
				$email = $get['email'];
				$r = $this->_soapclient->$method_name(array($param => $email));
				$method_name .= 'Result';
				return json_encode($r->$method_name);
			} else if(isset($get['ids']) && isset($get['userID'])) { // send admin orders
				$ids = explode(",",$get['ids']);
				$r = $this->_soapclient->$method_name(array('ids' => $ids, 'userID' => $get['userID']));
				return true;
			} else { // get catalog
				$r = $this->_soapclient->$method_name();
				$method_name .= 'Result';
				return json_encode($r->$method_name);
			}
		}catch(Exception $ex){
			return -1;
		}
	} 
}