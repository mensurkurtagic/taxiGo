<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <!-- API KEY AIzaSyAApiBLPehhhJkDFqzlfNGN99n18N4PZxA -->
    <title>Finding Me</title>

        <link rel="stylesheet" type="text/css" href="css/index.css">
        
        <script type="text/javascript" src="js/taksiSide.js" ></script>
</head>
<body>
    <div id="mainWrapper">
        <div id="mapWrapper" onload="taksiSide()">
            
        </div>
        <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAApiBLPehhhJkDFqzlfNGN99n18N4PZxA&callback=taksiSide">
        </script>
    </div>
</body>
</html>