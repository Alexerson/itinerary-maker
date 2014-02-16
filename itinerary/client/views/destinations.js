Template.destinations.events({
  "keyup input": function (event) {
      var text = event.target.value;
      Session.set("searchText", text);
    },

	"change input[type=checkbox]" : function(event, template) {
		var checked = event.target.checked;
		var currentItineraryID = Session.get("currentItineraryID");

		if (checked) {
			Itineraries.update(currentItineraryID, {
				$push : {
					destinations : this
				}
			});

			var myLatlng = new google.maps.LatLng(this.lat, this.lng);
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

		if (data[0].destinations.length >= 2) {
			var directionsDisplay = new google.maps.DirectionsRenderer();
			var directionsService = new google.maps.DirectionsService();
			var map;

			var start = new google.maps.LatLng(data[0].destinations[0].lat, data[0].destinations[0].lng);
			var pos = data[0].destinations.length - 1;
			var end = new google.maps.LatLng(data[0].destinations[pos].lat, data[0].destinations[pos].lng);

			var points = [];

			for ( i = 1; i < data[0].destinations.length - 1; i++) {
				var dest = new google.maps.LatLng(data[0].destinations[i].lat, data[0].destinations[i].lng);
				points.push({
					location : dest
				});
			}

			var initialize = function() {
				var mapOptions = {
					zoom : 15,
					center : start,
				};
				map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
				directionsDisplay.setMap(map);

			};
			var calcRoute = function() {
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

Template.destinations.helpers({
  destinations: function () {
    return Destinations.find({city: Session.get("currentCity")});
  },
  itinerary: function() {
    return Itineraries.findOne(Session.get("currentItineraryID"));
  },
  destinationInItinerary: function(destination) {
    var itinerary = Itineraries.findOne(Session.get("currentItineraryID"));
    unique_ids = _.map(itinerary.destinations, function(item) {return item._id; });
    if (unique_ids.indexOf(destination._id) >= 0) {
      return true;
    } else {
      return false;
    }
  },
  filteredDestinations: function () {
      var itinerary = Itineraries.findOne(Session.get("currentItineraryID"));
      var city = itinerary.city;

      var searchText = Session.get("searchText");
      if (!searchText || searchText.length < 3) {
        console.log(Destinations.find());
        return Destinations.find({city: city}, {sort: {section: -1}});
      }
      var regex = new RegExp(searchText, "i");
      console.log(regex);
      return Destinations.find({name: regex, city: city}, {sort:{section: -1}});
    },
});
