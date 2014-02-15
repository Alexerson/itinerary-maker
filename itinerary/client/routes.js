Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {

  this.route('home', {
    path: '/',
    template: 'home'
  });

  this.route('admin', {
    path: '/admin',
    template: 'admin'
  });

  this.route('destination_entry', {
    path: '/destination_entry',
    template: 'destination_entry'
  });

  this.route('planner', {
    path: '/planner/:city/:itineraryID?',
    data: function() {
      Session.set("currentCity", this.params.city);

      if (this.params.itineraryID && Itineraries.findOne(this.params.itineraryID)) {
        Session.set("currentItineraryID", this.params.itineraryID);
      } else {
        Itineraries.insert({user: Meteor.user(), city: this.params.city, destinations: []}, function(error, id) {
          Session.set("currentItineraryID", id);
        });
      }
      var destinations = Destinations.find({city: this.params.city});
      var itinerary = Itineraries.findOne(Session.get("currentItineraryID"));
      var result = {};
      result.destinations = destinations;
      result.city = this.params.city;
      result.itinerary = itinerary;
      return result;
    },
    template: 'planner'
  });

});