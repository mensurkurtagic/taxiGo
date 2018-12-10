var map;
var pozicija = {lat: 43.855841999999996, lng: 18.407011699999998};
var data;
var idBroj; //globalna varijabla za id broj taksiste
var myStorage = window.localStorage;

var marker; //globalna varijabla za marker trenutne pozicije korisnika da bi se kasnije mogla obrisati ako je zahtjev odbijen

function taksiSide(){
	//trenutna lokacija
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(taksiSideWithLoc);
	}
}

function taksiSideWithLoc(trenutnaPozicija) {

	var trenutna_pozicija = {lat: trenutnaPozicija.coords.latitude, lng: trenutnaPozicija.coords.longitude};

	var mapOptions = {
		zoom: 14,
		center: pozicija,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	map = new google.maps.Map(document.getElementById("mapWrapper"), mapOptions);

	/*var marker_current = new google.maps.Marker({
			map: map,
			position: trenutna_pozicija,
			title: "Moja pozicija je tu!"
		});*/

	idBroj = myStorage.getItem('idBroj');

	var check = makeRequest('getUserLocation.php', function(data){
		data = JSON.parse(data.responseText);

		for(var i = 0; i < data.length; i++){
			displayLocations(data[i]);
		}
	});
}


function makeRequest(url, callback){
	var request;

	if(window.XMLHttpRequest){
		request = new XMLHttpRequest();
	} else { request = new ActiveXObject("Microsoft.XMLHTTP"); }

	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			callback(request);
		}
	}

	request.open("GET", url, true);
	request.send();

	return 1;
}

function displayLocations(location){

	if(idBroj != location.id) return;
	else if(location.zahtjev == 0) return;
	else {
		
		var content =   '<div id="acceptOrDeny"> '
                    + '<input id="doYou" type="button" value="Prihvati" onclick="iAccept()">'
                    + '<input id="doYouNot" type="button" value="Odbij" onclick="iDeny()">' + '</div>';


		var position = new google.maps.LatLng(parseFloat(location.lat_korisnik), parseFloat(location.lng_korisnik));

		marker = new google.maps.Marker({
			map: map,
			position: position,
			title: "Korisnik je tu!"
		});

		var infowindow = new google.maps.InfoWindow({
	 	});

		google.maps.event.addListener(marker, 'click', function() {
	        infowindow.setContent(content);
			infowindow.open(map,marker);
			idBroj = location.id;
	    });
	}
}

/* prihvatanje zahtjeva promijeni varijablu zahtjev_check u bazi korisnika */
function iAccept(){
	var check = prihvatiZahtjev('handleRequest/acceptRequest.php', function(data){
		data = JSON.parse(data.responseText);
		for(var i = 0; i < data.length; i++){
			sendID(data[i]);
		}
	});
}
function prihvatiZahtjev(url, callback){
	var request;
	if(window.XMLHttpRequest){ request = new XMLHttpRequest(); }
	else { request = new ActiveXObject("Microsoft.XMLHTTP"); }

	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			callback(request);
		}
	}
	request.open("GET", url, true);
	request.send();

	return 1;
}

function sendID(data){
	var xml = new XMLHttpRequest();

	xml.open('POST', 'handleRequest/acceptRequestUserSide.php', true);
	xml.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var response = this.responseText;
			alert("Prihvatili ste zahtjev.");
		}
	};

	xml.setRequestHeader('Cache-Control', 'no-cache');
	xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xml.send("idBroj="+data.idBrojKorisnika);
}


/* odbijanje zahtjeva ponisti varijablu zahtjev u bazi */
function iDeny(){
	var xml = new XMLHttpRequest();

	xml.open('POST', 'handleRequest/denyRequest.php', true);
	xml.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var response = this.responseText;
			marker.setMap(null);
			alert("Odbili ste zahtjev, marker korisnika će biti uklonjen.");
		}
	};

	xml.setRequestHeader('Cache-Control', 'no-cache');
	xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xml.send("idBroj="+idBroj);
}


/*login dio*/

function logujMe(){
	var check = posaljiZahtjev('loginTaksi/checkTaxiLog.php', function(data){
		data = JSON.parse(data.responseText);
		for(var i = 0; i < data.length; i++){
			checkData(data[i]);
		}
	});
}

function posaljiZahtjev(url, callback){
	var request;
	if(window.XMLHttpRequest){ request = new XMLHttpRequest(); }
	else { request = new ActiveXObject("Microsoft.XMLHTTP"); }

	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			callback(request);
		}
	}
	request.open("GET", url, true);
	request.send();

	return 1;
}
/* dio za provjeru podataka i prelazak na mapu ako su podaci ispravni */
function checkData(podaci){
	var imeiprezimeForm = document.getElementById('imeIprezime').value;
	var passwordForm = document.getElementById('password').value;

	if(podaci.imeIprezime == imeiprezimeForm && podaci.password == passwordForm){
		myStorage.setItem('idBroj', podaci.id);
		window.location = 'taksiSide.php';
		return;
	}
}























