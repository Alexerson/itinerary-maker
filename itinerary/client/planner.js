Template.planner.helpers({
  itinerary: function() {
    return Itineraries.findOne(Session.get("currentItineraryID"));
  },
  route: function() {
    return Itineraries.findOne(Session.get("currentItineraryID")).route;
  },
  routeTime: function() {
    return Itineraries.findOne(Session.get("currentItineraryID")).routeTime;
  },
  totalTime: function() {
    var totalTime = 0;
    var itinerary = Itineraries.findOne(Session.get("currentItineraryID"));
    totalTime += itinerary.routeTime;
    _.each(itinerary.destinations, function(destination){
      totalTime += parseInt(destination.duration);
    });
    if (totalTime <= 0) {
      return 0;
    }
    return totalTime.toFixed(1);
  }
});