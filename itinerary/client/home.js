Template.home.events({
    "click button": function(event, template) {
        var city = template.find("input").value;
        Router.go('/plan/' + city);
    }

});