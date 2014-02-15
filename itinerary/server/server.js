var saveFourSquareVenuesData = function(offset, city) {
  HTTP.call("GET", 'https://api.foursquare.com/v2/venues/explore',
  {
    params: {
      near: city,
      radius: 10000,
      openNow: 0,
      limit: 50,
      offset: offset,
      client_id: "51XBG4ZZKGBB0AMTUABMF4X33GHZZUGSOP4Z3JTHADXC5GBO",
      client_secret: "PQHIJKTN5CDGYYNAT5DN5YY4F2O5OHWZTCRLMXGGSTFX2DPE",
      v: "20140214"
    }
  },
  function(error, result){
    var data = result.data;
    var venues = _.map(data.response.groups[0].items, function(item){
      item = item.venue;
      item.source = "foursquare";
      item.city = city;
      item._id = item.id;
      return item;
    });

    _.each(venues, function(venue) {
      Destinations.insert(venue);
    });

    if (offset + venues.length < data.response.totalResults) {
        saveFourSquareVenuesData(offset + venues.length, city);
    }
  });
};

Meteor.methods({
  updateDestinationsData: function () {
    Destinations.remove({});
    _.each(["Abu Dhabi, UAE", "Dubai, UAE"], function(city) {
      saveFourSquareVenuesData(0, city);
    });
  },
});