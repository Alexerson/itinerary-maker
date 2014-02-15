Template.admin.events({
    "click button": function() {
        Meteor.call("updateDestinationsData");
    }

});
