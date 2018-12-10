<?php
	$imeIprezime = $_POST['imeIprezime'];
	$pass = $_POST['password'];
	$tel = $_POST['telefon'];
	$tablice = $_POST['tablice'];
	$latituda = $_POST['latituda'];
	$longituda = $_POST['longituda'];

	$serverName = "127.0.0.1";
	$username = "live2learn";
	$root_password = "";
	$database = "c9";

	try{
		$conn = new PDO("mysql:host=$serverName;dbname=c9", $username, $root_password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	echo "Connected successfully";
       	$insertString = "INSERT into `taksisti` (
							`imeIprezime`,
							`password`,
							`brojTelefona`,
							`tablice`,
							`latituda`,
							`longituda`
						) 
						VALUES
						(
							'{$imeIprezime}',
							'{$pass}',
							'{$tel}',
							'{$tablice}',
							'{$latituda}',
							'{$longituda}'
						)";

		$conn->exec($insertString);
		echo "Podaci uspjesno upisani.";
	}
	catch(PDOException $e){
    	echo $sql . "<br>" . $e->getMessage();
    }


	$conn = null;
?>