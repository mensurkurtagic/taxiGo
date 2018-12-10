var map;
var pozicija = {lat: 43.855841999999996, lng: 18.407011699999998};
var data;
var idBrojKorisnika; //globalna varijabla za id broj korisnika
var idBroj;

var myStorage = window.localStorage;

function initMap(position) {

	var mapOptions = {
		zoom: 14,
		center: pozicija,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	map = new google.maps.Map(document.getElementById("mapWrapper"), mapOptions);

	var check = makeRequest('get_locations.php', function(data){
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
	var content =   '<div id="infoWindow"> Vozač: '  + location.imeIprezime + '</strong>'
                    + '<br/>' + 'Broj tablica: ' + location.tablice
                    + '<input id="sendNotification" type="button" value="Pošalji zahtjev" onclick="sendCurrLoc()">' + '</div>';
	

	//console.log(parseInt(location.id));
	var position = new google.maps.LatLng(parseFloat(location.latituda), parseFloat(location.longituda));

	var marker = new google.maps.Marker({
		map: map,
		position: position,
		title: "title"
	});

	var infowindow = new google.maps.InfoWindow({
 	});

	google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(content);
		infowindow.open(map,marker);
		idBroj = location.id;
    });

}

function sendCurrLoc(){
	//trenutna lokacija
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(sendNot);
	}
}

function sendNot(pozicija){
//dodati json objekat za provjeru da li je zahtjev vec setovan ili nije
	var xml = new XMLHttpRequest();

	xml.open('POST', 'handleNotification/handleNot.php', true);

	xml.onreadystatechange = function(){
		if(this.status == 404){
			alert("Taksi je zauzet!");
		}
		else if(this.readyState == 4 && this.status == 200){
			var response = this.responseText;
			alert("Updateovao");
		}
	};

	xml.setRequestHeader('Cache-Control', 'no-cache');
	xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xml.send("idBroj="+idBroj+"&latituda="+pozicija.coords.latitude+"&longituda="+pozicija.coords.longitude+"&idBrojKorisnika="+myStorage.getItem('idBrojKorisnika'));

}


/*login dio*/

function logmein(){
	var check = posaljiZahtjev('login/checkLog.php', function(data){
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
	if(podaci.ime == imeiprezimeForm && podaci.password == passwordForm){
		myStorage.setItem('idBrojKorisnika', podaci.id);
		window.location = 'mapa.php';
		return;
	}
}


/* provjera da li je zahtjev prihvacen ili nije */
 function checkStatus(){
 	var check = provjeriZahtjev('handleRequest/checkRequestUserSide.php', function(data){
 		data = JSON.parse(data.responseText);
 		console.log(data[0]);
 		for(var i = 0; i < data.length; i++){
			provjeriStanjePoljaZahtjev(data[i]);
		}
 	});
 }

function provjeriZahtjev(url, callback){
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


function provjeriStanjePoljaZahtjev(userData){
	var userId = myStorage.getItem('idBrojKorisnika');
	if(userData.id == userId){
		if(userData.zahtjev_check == 1){
			console.log(userData.zahtjev_check);
			alert("Vaš zahtjev je prihvaćen.");
		} else alert("Vaš zahtjev ili nije prihvaćen ili je odbijen, sačekajte još malo.");
	}

	var izmijenjeno = ponisti_Zahtjev();
}

function ponisti_Zahtjev(){
	var xml = new XMLHttpRequest();
	xml.open('POST', 'handleRequest/ponistiZahtjev.php', true);

	xml.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var response = this.responseText;
			alert("Ponistena varijabla zahtjev_check!");
		}
	};

	xml.setRequestHeader('Cache-Control', 'no-cache');
	xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xml.send("idBrojKorisnika="+myStorage.getItem('idBrojKorisnika'));

}

/* izgubljenoNadjeno slanje poruke */

function sendMessage(){
	document.getElementById("mainWrapperFormWrapper").style.display = "block";
}

function posaljiPoruku(){
	var idNum = myStorage.getItem('idBrojKorisnika');

	var xml = new XMLHttpRequest();
	xml.open('POST', 'handleRequest/handleMessage.php', true);

	xml.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			alert("Poslano");
		}
	};

	xml.setRequestHeader('Cache-Control', 'no-cache');
	xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xml.send("idNum="+idNum);
}






