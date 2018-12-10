<?php
	$server = "127.0.0.1";
	$username = "live2learn";
	$password = "";
	$database = "c9";

	$dsn = "mysql:host=$server;dbname=$database";

	try {
		$db = new PDO($dsn, $username, $password);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$sth = $db->prepare("SELECT id, ime, password FROM korisnici");
		$sth->execute();

		$locations = $sth->fetchAll();


		echo json_encode($locations);

	} catch (Exception $e) {
		echo $e->getMessage();
	}

?>
