<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
	<meta charset="utf-8">

	<link rel="stylesheet" type="text/css" href="login/css/login.css">

	<script type="text/javascript" src="js/taksiSide.js"></script>
</head>

<body>
	<div id="mainWrapper">
		<div id="background">
			<img src="images/sarajevo_map.png">
		</div>

		<div id="background_overlay"></div>


		<div id="mainWrapperFormWrapper">
			<div id="mainWrapperFormWrapperInput">
				<h1>Logujte se</h1>
			</div>

			<div id="mainWrapperFormWrapperInput">
				<input id="imeIprezime" type="text" name="imeIprezime" placeholder="Vaše ime i prezime..">
			</div>

			<div id="mainWrapperFormWrapperInput">
				<input id="password" type="password" name="password" placeholder="Vaš password..">
			</div>

			<!-- <form action="login.php"> -->
			<div id="mainWrapperFormWrapperInput">
				<input id="posalji" type="submit" name="posalji" value="Login" onclick="logujMe()">
			</div>
			<!-- </form> -->

		</div>

	</div>
</body>
</html>