Template.home.events({
    "click button": function(event, template) {
        var city = template.find("input").value;
        Itineraries.insert({user: Meteor.user(), city: city, destinations: []}, function(error, id) {
          Session.set("currentItineraryID", id);
          Router.go('/planner/' + city + '/' + Session.get("currentItineraryID"));
        });
    }

});