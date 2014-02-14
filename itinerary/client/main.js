
$.ajax({
  type:'GET',
  url:'https://api.foursquare.com/v2/venues/explore?near=Abu%20Dhabi,UAE&radius=10000&openNow=0&limit=50&offset=50&oauth_token=RHMIYACS3LTQKAFD0TFFD4EQXYO3L4PVWMWJ5CVQ1PKOLDSC&v=20140214',
  success:function(data){

    console.log(data);
    var venues = _.map(data.response.groups[0].items, function(item){
      item = item.venue;
      item.source = "foursquare";
      item._id = item.id;
      return item;
    });

    _.each(venues, function(venue) {
      Destinations.insert(venue);
    });
    
  }
});