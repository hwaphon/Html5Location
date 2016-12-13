/*
 * @Author: hwaphon
 * @Date:   2016-12-13 18:28:41
 * @Last Modified by:   hwaphon
 * @Last Modified time: 2016-12-13 20:13:17
 */

'use strict';

window.onload = getLocation;

function getLocation() {
	var locationElement = document.getElementById("location");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 60000
		});

	} else {
		location.innerHTML = "No geolocation support";
	}
}

function successHandler(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	document.getElementById("location").innerHTML = "Latitude: " + latitude +
		", Longitude: " + longitude;

	showMap(latitude, longitude);
}

function showMap(latitude, longitude) {
	var googleLatAndLong = new google.maps.LatLng(latitude, longitude);

	var mapOptions = {
		zoom: 15,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var element = document.getElementById("map");
	var map = new google.maps.Map(element, mapOptions);

	addMarker(map, googleLatAndLong, "Your Location", "It's here.");
}

function addMarker(map, latlong, title, content) {
	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true
	};

	var marker = new google.maps.Marker(markerOptions);

	var infoWindowOptions = {
		content: content,
		position: latlong
	};

	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

	google.maps.event.addListener(marker, "click", function() {
		infoWindow.open(map);
	});
}

function errorHandler(error) {
	var errorTypes = {
		0: "Unkown error",
		1: "Permission denied by user",
		2: "Position is not avaliable",
		3: "Request time out"
	};

	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}

	document.getElementById("location")
		.innerHTML = errorMessage;
}
