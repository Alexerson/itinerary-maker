Template.destination_entry.events({
    "click button": function() {
    	var name = $("#Name");
    	var contact = $("#Contact");
    	var address = $("#Address");
        var city = $("#City");
        var description = $("#Description");
        
        
        Test.insert({
                name: name.val(), 
                contact: contact.val(),
                address: address.val(),
                city: city.val(),
                lat:"",
                lng:"",
                checkincount:"",
                userscount:"",
                tipcount:"",
                likescount:"",
                rating:"",
                duration:"",
                localscore: description.val(),
                section:"",
                source:"local"});      
        
      }

});

 'click input.save' : function() {            
        var title = $("#prayer_title");
        var prayer = $("#prayer");
        var preview_container = $("#prayer_preview");
        var currentUser = Meteor.userId();