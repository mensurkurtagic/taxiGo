function saveData() {
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(dajLokaciju);
	}
	else {
		alert("Ne valja ti browser");
	}
}


function dajLokaciju(position){

	var imeIprezime = document.getElementById("imeIprezime").value;
	var password = document.getElementById("password").value;
	var telefon = document.getElementById("telefon").value;
	var adresa = document.getElementById("adresa").value;
	var latituda = position.coords.latitude;
	var longituda = position.coords.longitude;

	if(imeIprezime == ""){
		alert("Niste unijeli ime i prezime!");
	} else if(password == ""){
		alert("Niste unijeli password!");
	} else if(telefon == ""){
		alert("Niste unijeli broj telefona!");
	} else if(adresa == ""){
		alert("Niste unijeli adresu!");
	} else{
		console.log(imeIprezime);
		console.log(password);
		console.log(telefon);
		console.log(adresa);
		console.log(latituda);
		console.log(longituda);

		var xml = new XMLHttpRequest();
		xml.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				console.log(this.responseText);
				window.location = 'login.php';
				alert("Uspjesno ste se registrovali");
			}
		};

		xml.open('POST', 'registracija/register.php', true);
		xml.setRequestHeader('Cache-Control', 'no-cache');
		xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xml.send("imeIprezime="+imeIprezime+"&password="+password+"&telefon="+telefon+"&adresa="+adresa+"&latituda="+latituda+"&longituda="+longituda);
	}    
}