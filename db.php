<?php
	

	$serverName = "127.0.0.1";
	$username = "live2learn";
	$root_password = "";
	$database = "c9";
	try{
		$conn = new PDO("mysql:host=$serverName;dbname=podaci", $username, $root_password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	//echo "Connected successfully";
	}
	catch(PDOException $e){
    	echo $sql . "<br>" . $e->getMessage();
    }


	
?>