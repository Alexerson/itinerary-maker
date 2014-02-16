Template.home.events({
    "click button": function(event, template) {
        var city = template.find("input").value;
        HTTP.call("GET", 'http://maps.googleapis.com/maps/api/geocode/json?',
          {
            params: {
              address: city,
              sensor:true
            }
          },
          function(error, response){
            Session.set("mapLat", response.data.results[0].geometry.location.lat);
            Session.set("mapLng", response.data.results[0].geometry.location.lng);
            Session.set("mapLoc", city);
          }
        );
        Itineraries.insert({user: Meteor.user(), routeTime: 0, city: city, destinations: []}, function(error, id) {
          Session.set("currentItineraryID", id);
          Router.go('/planner/' + city + '/' + Session.get("currentItineraryID"));
        });
    }

});