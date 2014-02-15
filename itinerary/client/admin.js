Handlebars.registerHelper("log", function(context) {
  return console.log(context);
});


Template.admin.events({
    "click button": function() {
        Meteor.call("updateDestinationsData");
    }

});

// Adding a global project's name
Session.set('projectName', 'ItineraryMaker');

Template.menu.projectName = function(){
	return Session.get('projectName');
};

Template.footer.projectName = function(){
	return Session.get('projectName');
};