Template.destinations.events({
    "change input[type=checkbox]": function(event, template) {
        var checked = event.target.checked;
        var currentItineraryID = Session.get("currentItineraryID");

        if (currentItineraryID === null) {
          console.log("ITINERARY ID IS NULL");
        }

        if (checked) {
          Itineraries.update(currentItineraryID, { $push: { destinations: this }});
        } else {
          Itineraries.update(currentItineraryID, { $pull: { destinations: this }});
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
    foursquare_ids = _.map(itinerary.destinations, function(item) {return item.foursquare_id});
    if (foursquare_ids.indexOf(destination.foursquare_id) >= 0) {
      return true;
    } else {
      return false;
    }
  }
});