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
    console.log("routtime", totalTime);
    _.each(itinerary.destinations, function(destination){
      totalTime += parseInt(destination.duration);
      console.log("dest time", destination.duration);
    });
    console.log(totalTime);
    return totalTime.toFixed(1);
  }
});