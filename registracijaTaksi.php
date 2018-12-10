<!DOCTYPE html>
<html>
<head>
	<title>Registracija taksiste</title>

	<meta charset="utf-8">

	<link rel="stylesheet" type="text/css" href="registracijaTaksi/css/registracijaTaksi.css">

	<script type="text/javascript" src="registracijaTaksi/js/registracijaTaksi.js"></script>
</head>
<body>
	<div id="mainWrapper">
		<div id="background">
			<img src="images/sarajevo_map.png">
		</div>

		<div id="background_overlay"></div>

		<div id="mainWrapperFormWrapper">
			<div id="mainWrapperFormWrapperInput">
				<h1>Registrujte se</h1>
			</div>
			
			<div id="mainWrapperFormWrapperInput">
				<input id="imeIprezime" type="text" name="ime" placeholder="Vaše ime i prezime.." required>
			</div>

			<div id="mainWrapperFormWrapperInput">
				<input id="password" type="password" name="password" placeholder="Vaš password.." required>
			</div>

			<div id="mainWrapperFormWrapperInput">
				<input id="telefon" type="text" name="telefon" placeholder="Vaš broj telefona.." required>
			</div>

			<div id="mainWrapperFormWrapperInput">
				<input id="tablice" type="text" name="tablice" placeholder="Broj tablica.." required>
			</div>
			<!-- <form action="login.php">-->
			<div id="mainWrapperFormWrapperInput">
				<input id="posalji" type="submit" name="posalji" value="Registrujte se" onclick="saveData()">
			</div>
			<!-- </form>-->
		</div>
	</div>
</body>
</html>