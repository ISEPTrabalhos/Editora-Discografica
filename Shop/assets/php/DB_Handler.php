<?php
require 'connection.php';

class DB_Handler {

	public function saveAPIKEY($get) {
		global $db;
		$statement = $db->prepare("UPDATE shop SET api_key = :key WHERE email = :email");
		$statement->execute(array(':key' => $get['key'], ':email' => $get['email']));
	}

	public static function getAllAlbums($get) {
		global $db;
		$statement = $db->prepare("SELECT * FROM albums");
		$statement->execute();
		$results = $statement->fetchAll(PDO::FETCH_ASSOC);

		if(empty($results))  { 
			$error = "No albums";
		} else {
			$error = false;
		}
		return json_encode(array('albuns' => $results, 'error' => $error));
	}

	public static  function getOffAlbums($get) {
		global $db;
		$statement = $db->prepare("SELECT * FROM albums WHERE off != 0");
		$statement->execute();	
		$results = $statement->fetchAll(PDO::FETCH_ASSOC);

		if(empty($results))  { 
			$error = "No albums";
		} else {
			$error = false;
		}

		return json_encode(array('albuns' => $results, 'error' => $error));
	}

	public static  function getTopSold($get) {
		$albums = array();
		$error = false;
		global $db;

		// get top albums => ID

		$statement = $db->prepare("SELECT album_id, COUNT(*) AS total FROM sales_details GROUP BY album_id ORDER BY total DESC LIMIT 5");
		$statement->execute();	
		$results = $statement->fetchAll(PDO::FETCH_ASSOC);

		if(empty($results))  { 
			$error = "No albums";
			return json_encode(array('albums' => $albums, 'error' => $error));
		} 
		
		// get top albums => INFO 
		foreach ($results as $row) {
		    $statement = $db->prepare("SELECT * FROM albums WHERE id = :id");
			$statement->execute(array(':id' => $row["album_id"]));
			$results = $statement->fetchAll(PDO::FETCH_ASSOC);
			$albums[] = $results;
		}

		return json_encode(array('albums' => $albums, 'error' => $error));
	}

	public static  function getCartAlbumsInfo($get) {
		$string = $get['cart'];
		$cart = explode(",",$string);
		$albums = array();

		global $db;

		// get cart albums INFO
		for ($i=0; $i < sizeof($cart); $i++) {
			$statement = $db->prepare("SELECT * FROM albums WHERE id = :id");
			$statement->execute(array(':id' => $cart[$i]));
			$results = $statement->fetchAll(PDO::FETCH_ASSOC);
			$albums[] = $results;
		}
		
		return json_encode(array('albums' => $albums, 'error' => false));
	}

	public static  function updateStock($get) {
		$cart = explode(",",$get['cart']);
		$stocks = explode(",",$get['stocks']);
		$amounts = explode(",", $get['amounts']);
		$userid = $get['userid'];
		$total_price = $get['totalPrice'];

		global $db;
		
		// add new sale
		$statement = $db->prepare("INSERT INTO sales (user_id,total_price) VALUES(:user,:total)");
		$statement->execute(array(':user' => $userid, ':total' => $total_price));
		$id = $db->lastInsertId();

		// update stocks and save sales details
		for ($i=0; $i < sizeof($cart); $i++) {
			// update stock
			$statement = $db->prepare("UPDATE albums SET qtd = :qtd WHERE id = :id");
			$statement->execute(array(':id' => $cart[$i], ':qtd' => $stocks[$i]));
			// get unity prices
			$statement = $db->prepare("SELECT price FROM albums WHERE id = :id");
			$statement->execute(array('id' => $cart[$i]));
			$price = $statement->fetch()['price'];
			// add sales details
			$statement = $db->prepare("INSERT INTO sales_details (sales_id,album_id,quantity,price) 
				VALUES(:sales_id, :album_id, :quantity, :price)");
			$statement->execute(array(':sales_id' => $id, ':album_id' => $cart[$i], ':quantity' => $amounts[$i], ':price' => $price));
		}
		return true;
	}

	public static  function saveNewAlbuns($get) {

		$albums = json_decode($get['albuns']);
	  	// save albums in database
	  	global $db;
		foreach($albums as $album) { // loop through each album
			$exists = false;
			// check if album exists already
			$statement = $db->prepare("SELECT * FROM albums WHERE name = :name");
			$statement->execute(array(':name' => $album->title));
			$results = $statement->fetchAll(PDO::FETCH_ASSOC);
			if($results) {
				$exists = true;
			}
			
			if($exists == true)  { // then update stock 
				$statement = $db->prepare("UPDATE albums SET qtd = qtd+:qtd WHERE name = :name");
				$statement->execute(array(':qtd' => $album->qtd, ':name' => $album->title));
			} else { //  insert it 
				$statement = $db->prepare("INSERT INTO albums (name,artist,img,qtd,price,tags) 
				VALUES(:name,:artist,:img,:qtd,:price,:tags)");
				$statement->execute(array(':name' => $album->title, ':artist' => $album->artistName,
			 ':img' => $album->img, ':qtd' => $album->qtd, ':price' => $album->price, ':tags' => $album->tags));
			}
		}
		return true;
	}

	public static  function getTopTag($get) {
		$ids = explode(",", $get['albums']);
		$query = "SELECT tags FROM albums WHERE ";
		for($i = 0; $i < sizeof($ids); $i++) {
			if($i == sizeof($ids) - 1) {
				$query = $query . "id = " . $ids[$i];
			} else {
				$query = $query . "id = " . $ids[$i] . " OR ";
			}
		}
		global $db;
		$statement = $db->prepare($query);
		$statement->execute();
		$results = $statement->fetchAll(PDO::FETCH_ASSOC);
		$tags = array();
		foreach ($results as $result) { 
			$tag = $result["tags"];
			$pos = strpos($tag, ',');
			if($pos !== false) { // more than one tag
				$tg = explode(",", $tag);
				for($j = 0; $j < sizeof($tg); $j++) {
					$tags[] = $tg[$j];
				}
			} else { // just one tag
				$tags[] = $tag;
			}
		}

		$countTags = array_count_values($tags); // count each tag appearance
		$topTag = "";
		$max = 0;
		foreach ($countTags as $key => $value) { // get top tag
			if($value > $max) {
				$max = $value;
				$topTag = $key;
			}
		};

		return $topTag;
	}

	public static  function existOnShop($get) {
		$albumName = $get['albumName'];
		global $db;
		$statement = $db->prepare("SELECT id FROM albums WHERE name = :albumName");
		$statement->execute(array(':albumName' => $albumName));
		$results = $statement->fetchAll(PDO::FETCH_ASSOC);
		if(sizeof($results) == 1) { // if album exists
			return $results[0]["id"]; // return id
		} 
		return -1;
	}

	public static function getAPIKEY($_get) {
		global $db;
		$statement = $db->prepare("SELECT api_key,email FROM shop");
		$statement->execute();
		$results = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		return json_encode($results[0]);
		//echo $results[0]["email"];
	}

}