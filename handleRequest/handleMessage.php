<?php
	$idNum = $_POST['idNum'];
		
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
    	//echo $sql . "<br>" . $e->getMessage();
    }

    $sth = $db->prepare("SELECT id FROM korisnici");
	$sth->execute();

	$sth->setFetchMode(PDO::FETCH_ASSOC);
	
	while($row = $sth->fetch()){
		if($idNum == $row['id']){
			$updateString = "UPDATE taksisti SET izgubljenoNadjeno=1 WHERE idBrojKorisnika=$idNum";

			$db->exec($updateString);
		};
	}

?>