<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <!-- API KEY AIzaSyAApiBLPehhhJkDFqzlfNGN99n18N4PZxA -->
    <title>Finding Me</title>

        <link rel="stylesheet" type="text/css" href="css/index.css">
        <script type="text/javascript" src="js/index.js" ></script>
</head>
<body>
    <div id="mainWrapper">
        <div id="mapWrapper" onload="initMap()">
            
        </div>
        <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAApiBLPehhhJkDFqzlfNGN99n18N4PZxA&callback=initMap">
        </script>

        <div id="checkRequest">
            <input id="check" type="submit" name="check" value="Provjeri status" onclick="checkStatus()">
        </div>

        <div id="lostFound">
            <img src="images/close-envelope.png" onclick="sendMessage()">
        </div>

        <div id="mainWrapperFormWrapper">
            <div id="mainWrapperFormWrapperInput">
                <h1>Pošaljite zahtjev za izgubljenim stvarima</h1>
            </div>
            <!-- <form action="login.php"> -->
            <div id="mainWrapperFormWrapperInput">
                <input id="posalji" type="submit" name="posalji" value="Pošalji zahtjev" onclick="posaljiPoruku()">
            </div>
            <!-- </form> -->

        </div>
    </div>
</body>
</html>