Template.destination_entry.events({
    "click #submit": function(event, template) {
    	var name = template.find("#Name").value;
    	console.log(name);
    	var contact = template.find("#Contact").value;
    	console.log(contact);
    	var address = template.find("#Address").value;
    	console.log(address);
        var city = template.find("#City").value;
        console.log(city);
        var section = template.find("#Section").value;
        console.log(section);
        
      	Destinations.insert({
                name: name, 
                phone: contact,
                address: address,
                city: city,
                lat:"",
                lng:"",
                checkincount:"",
                userscount:"",
                tipcount:"",
                likescount:"",
                rating:"",
                duration:"",
                localscore:"",
                section:section,
                source:"local",
                foursquare_id:"local",
                photo:""
                });      
      console.log(Destinations);  
      }
	});