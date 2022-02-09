$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!

    $.mobile.allowCrossDomainPages = true;
	$.support.cors = true;
});
zatoken=localStorage.getItem("token");
	console.log("za token iz: "+zatoken);
	
if (localStorage.getItem("token") !== null) {
	var savedtoken = localStorage.getItem("token");
	var dataString = 'savedtoken=' + savedtoken;
	// get user id
	$.ajax({
		beforeSend: function() { $('.spinner').show(); },
		complete: function(){ $('.spinner').fadeOut(); },
		type: "GET",
		url: "https://rovingcare.com/appajax/getdata.php",
		data: dataString, // send token to grab data
		success: function(data) {
		   var obj = JSON.parse(data);
		   localStorage.setItem("firstname",obj[0].firstname);
		   localStorage.setItem("lastname",obj[0].lastname);
		   localStorage.setItem("gender",obj[0].gender);
		   localStorage.setItem("email",obj[0].email);
		   localStorage.setItem("mobile",obj[0].mobile);
		   localStorage.setItem("mobileint",obj[0].mobileint);
		   localStorage.setItem("areaid",obj[0].areaid);
		   localStorage.setItem("area",obj[0].areaname);
		   localStorage.setItem("address",obj[0].address);
		   localStorage.setItem("bloodgroup",obj[0].bloodgroup);
		   localStorage.setItem("weight",obj[0].weight);
		   localStorage.setItem("height",obj[0].height);
		   localStorage.setItem("dob",obj[0].dob);
		   localStorage.setItem("photo",obj[0].photo);
		   localStorage.setItem("added",obj[0].added);
		   
			// get photo
			if (obj[0].photo==""){
			   if (obj[0].gender==1) {
					photo="avatar-male.png";
			   } else {
					photo="avatar-female.png";
			   }
			} else {
				photo=obj[0].photo;
			}
			
			localStorage.setItem("photo",photo);
			
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			var errormsg=XMLHttpRequest.responseText;
			console.log("errorz: "+errormsg);
			localStorage.removeItem("token");
			window.location.replace("login.html");
		}
	});
} else {
	console.log("no token");
	window.location.replace("signup.html");
}