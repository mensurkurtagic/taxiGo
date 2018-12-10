<?php
	$idBroj = $_POST['idBroj'];

	$server = "127.0.0.1";
	$username = "live2learn";
	$password = "";
	$database = "c9";

	$dsn = "mysql:host=$server;dbname=$database";

	try{
		$db = new PDO($dsn, $username, $password);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	//echo "Connected successfully";
	}
	catch(PDOException $e){
    	echo $sql . "<br>" . $e->getMessage();
    }

    $sth = $db->prepare("SELECT id FROM korisnici");
	$sth->execute();

	$sth->setFetchMode(PDO::FETCH_ASSOC);

	while($row = $sth->fetch()){
		if($idBroj == $row['id']){
			$updateString = "UPDATE taksisti SET zahtjev=0 WHERE id=$idBroj";

			$db->exec($updateString);
		};
	}

?>