Template.home.events(
{
  'click .destination-btn': function (event, templ) {
    Session.set('userDestination', templ.find('.destination-input').value);
  }
});

Template.planner.userDestination = function(){
	console.log(Session.get('userDestination'));
	return Session.get('userDestination');
};