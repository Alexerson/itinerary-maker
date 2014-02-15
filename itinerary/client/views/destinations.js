Template.destinations.events({
	"change input[type=checkbox]" : function(event, template) {
		var checked = event.target.checked;
		var currentItineraryID = Session.get("currentItineraryID");

		if (checked) {
			Itineraries.update(currentItineraryID, {
				$push : {
					destinations : this
				}
			});

			// Add current location into the map
			//function initialize() {
			var myLatlng = new google.maps.LatLng(this.location.lat, this.location.lng);
			var mapOptions = {
				zoom : 15,
				center : myLatlng
			};
			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			var marker = new google.maps.Marker({
				position : myLatlng,
				map : map,
				title : 'Hello World!'
			});

			//google.maps.event.addDomListener(window, 'load', initialize);

		} else {
			Itineraries.update(currentItineraryID, {
				$pull : {
					destinations : this
				}
			});

		}
	},
	'click #btn-generate' : function(event, template) {
		var data = Itineraries.find(Session.get("currentItineraryID")).fetch();

		//console.log(data);
		//console.log(data[0].destinations[0].location.lat);
		if (data[0].destinations.length >= 2) {
			var directionsDisplay = new google.maps.DirectionsRenderer();
			var directionsService = new google.maps.DirectionsService();
			var map;

			var start = new google.maps.LatLng(data[0].destinations[0].location.lat, data[0].destinations[0].location.lng);
			var pos = data[0].destinations.length - 1;
			var end = new google.maps.LatLng(data[0].destinations[pos].location.lat, data[0].destinations[pos].location.lng);

			var points = [];

			for ( i = 1; i < data[0].destinations.length - 1; i++) {
				var dest = new google.maps.LatLng(data[0].destinations[i].location.lat, data[0].destinations[i].location.lng);
				points.push({
					location : dest
				});
			}

			//console.log(points);

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
					waypoints : points,
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
			initialize();
			calcRoute();

			google.maps.event.addDomListener(window, 'load', initialize);
		} else {
			alert("Please select at least two destinations!");
		}
	}
});
