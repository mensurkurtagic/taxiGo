function logmein(){
	var imeIprezime = document.getElementById("imeIprezime").value;
	var password = document.getElementById("password").value;

	if(password =="" || imeIprezime == ""){
		alert("Niste unijeli potrebne podatke.");
	}else {
		
	

	var xml = new XMLHttpRequest();

	xml.open('POST', 'login/checkLog.php', true);



	xml.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			console.log("evo me ovdje sad");
			var response = this.responseText;
			console.log(response);
			if(response == "" || response == ''){
				//console.log("Dodjem li ovdje???");
				window.location = 'mapa.php';
			} else alert("Nesto ne fercera");
		}
	};

	xml.setRequestHeader('Cache-Control', 'no-cache');
	xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xml.send("imeIprezime="+imeIprezime+"&password="+password);

	//console.log("vratim se ja ovdje");
	}
}


