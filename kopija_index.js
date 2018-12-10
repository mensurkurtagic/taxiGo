function getLocation() {
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(initMap);
	}
	else {
		alert("Ne valja ti browser");
	}
}

function initMap(position) {
	/*
	//console.log("nesto");
	var pozicija = {lat: position.coords.latitude, lng: position.coords.longitude};
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);
	var pozicija1 = { lat: position.coords.latitude+0.0002, lng: position.coords.longitude+0.003 };
	var pozicija2 = { lat: position.coords.latitude+0.003, lng: position.coords.longitude+0.002 };

	//console.log(position.coords.latitude);

	var map = new google.maps.Map(document.getElementById("mapWrapper"), {
		zoom: 16,
		center: pozicija
	});
	var marker = new google.maps.Marker({
		position: pozicija,
		map: map,
		title: 'You are here'
	});

	var infoContent = document.getElementById("infoData");

	var info = new google.maps.InfoWindow({
		content: document.getElementById("data")
	});
	
	var marker1 = new google.maps.Marker({
		position: pozicija1,
		map: map
	});

	var marker2 = new google.maps.Marker({
		position: pozicija2,
		map: map
	});

	marker.addListener('click', function(){
		infoContent.style.background = "red";
		infoContent.style.display = "block";
	});

	marker1.addListener('click', function(){
		infoContent.style.background = "red";
		infoContent.style.display = "block";
	});
	*/
	console.log("ovdje");
	var baza = require('mysql');
	var konekcija = baza.CreateConnection({
		host: "localhost",
		user: "root",
		password: ""
	});

	konekcija.connect(function(err) {
		if (err) throw err;
  		console.log("Connected!");
	});

}


function makeRequest(url, callback){
	var request;

	if(window.XMLHttpRequest){
		request = new XMLHttpRequest();
	} else { request = new ActiveXObject("Microsoft.XMLHTTP"); }

	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.Status == 200){
			callback(request);
		}
	}

	request.open("GET", url, true);
	request.send();
}
