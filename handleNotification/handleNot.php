<?php
	$idBroj = $_POST['idBroj'];
	$latituda = $_POST['latituda'];
	$longituda = $_POST['longituda'];
	$idBrojKor = $_POST['idBrojKorisnika'];

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

    $sth = $db->prepare("SELECT id, imeIprezime, zahtjev, idBrojKorisnika FROM taksisti");
	$sth->execute();

	$sth->setFetchMode(PDO::FETCH_ASSOC);

	while($row = $sth->fetch()){
		if($idBroj == $row['id']){
			$updateString = "UPDATE taksisti SET lat_korisnik=$latituda, lng_korisnik=$longituda, zahtjev=1, idBrojKorisnika=$idBrojKor WHERE id=$idBroj";

			$db->exec($updateString);
		};
	}

?>