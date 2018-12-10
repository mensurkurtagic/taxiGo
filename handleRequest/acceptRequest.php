<?php
	$server = "127.0.0.1";
	$username = "live2learn";
	$password = "";
	$database = "c9";

	$dsn = "mysql:host=$server;dbname=$database";

	try{
		$db = new PDO($dsn, $username, $password);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$db_1 = new PDO($dsn, $username, $password);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	//echo "Connected successfully";
	}
	catch(PDOException $e){
    	echo $sql . "<br>" . $e->getMessage();
    }

    $sth = $db->prepare("SELECT idBrojKorisnika FROM taksisti");
	$sth->execute();

	$sth->setFetchMode(PDO::FETCH_ASSOC);

	$users = $sth->fetchAll();
	
	echo json_encode($users);

?>