Template.maps.rendered = function() {
	var myLatlng = new google.maps.LatLng(Session.get("mapLat"), Session.get("mapLng"));
	var mapOptions = {
		zoom : 15,
		center : myLatlng
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	var marker = new google.maps.Marker({
		position : myLatlng,
		map : map,
		title : Session.get("mapLoc")
	});
};

Template.maps.helpers({
  lat: function () {
    return Session.get("currentLat");
  },
  lng: function() {
  	return Session.get("currentLng");
  }
 });