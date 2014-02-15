Template.maps.rendered = function() {
	var directionsDisplay = new google.maps.DirectionsRenderer();

	var directionsService = new google.maps.DirectionsService();
	var map;
	var start = new google.maps.LatLng(24.488373734076642, 54.353069830513995);
	var end = new google.maps.LatLng(24.475685312793345, 54.32207107543945);
	var destination1 = new google.maps.LatLng(24.42542607680752, 54.56480026245117);
	var destination2 = new google.maps.LatLng(24.43196375271036, 54.43551496287372);
	var destination3 = new google.maps.LatLng(24.466030496428743, 54.60921959425285);
	function initialize() {
		var mapOptions = {
			zoom : 15,
			center : start,
		};
		map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		directionsDisplay.setMap(map);
	};
	function calcRoute() {
		var request = {
			origin : start,
			destination : end,
			waypoints : [{
				location : destination1
			}, {
				location : destination2
			}, {
				location : destination3
			}],
			travelMode : google.maps.TravelMode.DRIVING
		};
		function computeTravelTime(result) {
			var total = 0;
			var mins = 0;
			var hours = 0;
			var myroute = result.routes[0];
			for (var i = 0; i < myroute.legs.length; i++) {
				total += myroute.legs[i].duration.value;
			}
			hours = Math.floor(total / 3600.0);
			mins = Math.round(total / 60.0 - hours * 60);
			console.log(hours + " hours " + mins + " mins");
		}


		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
				computeTravelTime(response);
			}
		});
	};
	calcRoute();

	google.maps.event.addDomListener(window, 'load', initialize);
};

