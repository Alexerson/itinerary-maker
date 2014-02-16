Template.planner.helpers({
  itinerary: function() {
    return Itineraries.findOne(Session.get("currentItineraryID"));
  },
  route: function() {
    return Itineraries.findOne(Session.get("currentItineraryID")).route;
  }
});