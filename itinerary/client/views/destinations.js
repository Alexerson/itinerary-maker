Template.destinations.events({
    "change input[type=checkbox]": function(event, template) {
        var checked = event.target.checked;
        var currentItineraryID = Session.get("currentItineraryID");

        if (checked) {
          Itineraries.update(currentItineraryID, { $push: { destinations: this }});
        } else {
          Itineraries.update(currentItineraryID, { $pull: { destinations: this }});
        }
    },
});