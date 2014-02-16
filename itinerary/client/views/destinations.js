/*
**function PlanPath(arrayOfObjects){} returns arrayOfObjects
**using .lat .lng .duration ._id
*/
function Point(lat, lon, time, id){
    this.id = id;
    this.lat = lat;
    this.lon = lon;
    this.time = time;
    this.n = 0;
    this.getId = function(){
        return this.id;
    };
    this.setN = function(n){
        this.n = n;
    };
    this.getN = function(){
        return this.n;
    };
    this.getLat = function(){
        return this.lat;
    };
    this.getLon = function(){
        return this.lon;
    };
}
function Pair(a, b){
    this.a = a;
    this.b = b;
    this.dist = function(){
        return Math.sqrt(Math.pow(this.a.getLat() - this.b.getLat(), 2) + Math.pow(this.a.getLon() - this.b.getLon(), 2));
    };
    this.n = 0;
    this.setN = function(n){
        this.n = n;
    };
    this.getN = function(){
        return this.n;
    };
    this.d = this.dist();
    this.getD = function(){
        return this.d;
    };
    this.getA = function(){
        return this.a;
    };
    this.getB = function(){
        return this.b;
    };
}
function PreparePoints(objects){
    var points = [];
    for(var i=0;i<objects.length;i++){
        var point = new Point(objects[i].lat, objects[i].lng, objects[i].duration, objects[i]._id);
        points.push(point);
    }
    return points;
}
function PairsToObjects(pairs, objects){
    var array = [];
    for(var i=0;i<pairs.length;i++){
        var pointN = pairs[i].getA();
        for(var j=0;j<objects.length;j++){
            if(pointN.getId() == objects[j]._id){
                array.push(objects[j]);
            }
        }
    }
    var point = pairs[pairs.length-1].getB();
    for(var k=0; k < objects.length; k++){
        if(point.getId() == objects[k]._id){
            array.push(objects[k]);
        }
    }
    return array;
}
function PreparePairs(points){
    var pairs = [];
    for(var i=0;i<points.length;i++){
        console.log(points[i]);
        points[i].setN(i);
        for(var j=i+1;j<points.length;j++){
            var pair = new Pair(points[i], points[j]);
            pairs.push(pair);
        }
    }
    return pairs;
}
function DistanceSort(a, b){
    if(a.getD() > b.getD()){
        return 1;
    }
    if(a.getD() < b.getD()){
        return -1;
    }
    return 0;
}
function SortPairsByDistance(pairs){
    return pairs.sort(DistanceSort);
}
function GetStartEnd(points, pairs){
    var map = {};
    for(var j=0;j<points.length;j++){
        map[j] = 0;
    }
    for(var i=0;i<pairs.length;i++){
        var a = pairs[i].getA().getN();
        var b = pairs[i].getB().getN();
        map[a]++;
        map[b]++;
    }
    var output = [];
    for(var k=0;k<points.length;k++){
        if(map[k] == 1){
            output.push(points[k]);
        }
    }
    return output;
}
function SortPairsByOrder(pairs, start, end){
    var map = {};
    var newPairs = [];
    var old = null;
    for(var i=0;i<pairs.length;i++){
        if(!map[pairs[i].getA().getN()]){
            map[pairs[i].getA().getN()] = [];
        }
        if(!map[pairs[i].getB().getN()]){
            map[pairs[i].getB().getN()] = [];
        }
        map[pairs[i].getA().getN()].push(pairs[i]);
        map[pairs[i].getB().getN()].push(pairs[i]);
    }
    while(start != end){
        var connections = map[start.getN()];
        for(var j=0;j<connections.length;j++){
            var pair = connections[j];
            if(pair.getA() != old && pair.getB() != old){
                if(pair.getA() != start){
                    var newPair = new Pair(start, pair.getA());
                    newPairs.push(newPair);
                    old = start;
                    start = pair.getA();
                }
                else{
                    var otherNewPair = new Pair(start, pair.getB());
                    newPairs.push(otherNewPair);
                    old = start;
                    start = pair.getB();
                }
            }
        }
    }
    return newPairs;
}
function Contains(x, y, z){
    var xx = x.getLat();
    var xy = x.getLon();
    var yx = y.getLat();
    var yy = y.getLon();
    var zx = z.getLat();
    var zy = z.getLon();
    var det = xx*yy+yx*zy+zx*xy-zx*yy-xx*zy-yx*xy;
    if(det!== 0){
        return 0;
    }
    if((Math.min(xx,yx)<=zx)&&(zx<=Math.max(xx,yx)) && (Math.min(xy,yy)<=zy)&&(zy<=Math.max(xy,yy))){
        return 1;
    }
    return 0;
}
function DetMatrix(x, y, z){
    var xx = x.getLat();
    var xy = x.getLon();
    var yx = y.getLat();
    var yy = y.getLon();
    var zx = z.getLat();
    var zy = z.getLon();
    return(xx*yy+yx*zy+zx*xy-zx*yy-xx*zy-yx*xy);
}
function CheckIntersection(a, b){
    var aa = a.getA();
    var ab = a.getB();
    var ba = b.getA();
    var bb = b.getB();
    if(Contains(aa, ab, ba) == 1){
        return true;
    }
    if(Contains(aa, ab, bb) == 1){
        return true;
    }
    if(Contains(ba, bb, aa) == 1){
        return true;
    }
    if(Contains(ba, bb, ab) == 1){
        return true;
    }
    if((DetMatrix(aa, ab, ba)) * (DetMatrix(aa, ab, bb))>=0){
        return false;
    }
    if((DetMatrix(ba, bb, aa)) * (DetMatrix(ba, bb, ab))>=0){
        return false;
    }
    return true;
}
function RefineRoute(pairs){
    for(var i=0;i<pairs.length;i++){
        var pairA = pairs[i];
        for(var j=i+2;j<pairs.length;j++){
            var pairB = pairs[j];
            if(CheckIntersection(pairA, pairB)){
                var pairC = new Pair(pairA.getA(), pairB.getA());
                var pairD = new Pair(pairA.getB(), pairB.getB());
                pairs[i] = pairC;
                pairs[j] = pairD;
                for(var k=1;k<(j-i)/2;k++){
                    var pairE = new Pair(pairs[i+k].getA(), pairs[i+k].getB());
                    var pairF = new Pair(pairs[j-k].getA(), pairs[j-k].getB());
                    pairs[i+k] = pairF;
                    pairs[j-k] = pairE;
                }
                for(var l=1;l<j-i;l++){
                    pairs[i+l] = new Pair(pairs[i+l].getB(), pairs[i+l].getA());
                }
            }
        }
    }
    return pairs;
}
function GenerateRoute(points, days, time){
    this.time = time;
    this.days = days;
    this.points = points;
    this.pairs = PreparePairs(points);
    this.dPairs = SortPairsByDistance(this.pairs);
    this.sPairs = [];
    this.oPairs = [];
    this.rank = [];
    this.parent = [];
    this.degree = [];
    this.initialise = function(){
        for(var i=0;i<this.dPairs.length;i++){
            this.rank.push(1);
            this.parent.push(i);
            this.degree.push(0);
        }
    };
    this.find = function(n){
        if(this.parent[n] != n){
            this.parent[n] = this.find(this.parent[n]);
            return this.parent[n];
        }
        return n;
    };
    this.union = function(a, b){
        var rootA = this.find(a);
        var rootB = this.find(b);
        if(this.rank[rootA] < this.rank[rootB]){
            this.parent[rootA] = rootB;
            this.rank[rootB] += this.rank[rootA];
        }
        else{
            this.parent[rootB] = rootA;
            this.rank[rootA] += this.rank[rootB];
        }
    };
    this.selectPairs = function(){
        for(var i=0;i<this.dPairs.length;i++){
            var pair = this.dPairs[i];
            var pointA = pair.getA();
            var pointB = pair.getB();
            if(this.find(pointA.getN()) != this.find(pointB.getN()) && this.degree[pointA.getN()] != 2 && this.degree[pointB.getN()] != 2){
                this.degree[pointA.getN()]++;
                this.degree[pointB.getN()]++;
                this.union(pointA.getN(), pointB.getN());
                this.sPairs.push(pair);
            }
        }
    };
    this.getSPairs = function(){
        return this.sPairs;
    };
    this.getDPairs = function(){
        return this.dPairs;
    };
    this.refine = function(){
        var startend = GetStartEnd(this.points,this.sPairs);
        this.oPairs = SortPairsByOrder(this.sPairs, startend[0], startend[1]);
        this.oPairs = RefineRoute(this.oPairs);
        return this.oPairs;
    };
    this.getOPairs = function(){
        return this.oPairs;
    };
}
var PlanPath = function (arrayOfObjects) {
    var points = PreparePoints(arrayOfObjects);
    var gr = new GenerateRoute(points, 3, 8);//3 - number of days, 8 - time per day;not used now
    gr.initialise();
    gr.selectPairs();
    gr.refine();
    return PairsToObjects(gr.getOPairs(), arrayOfObjects);
};


Template.destinations.events({
  "keyup input": function (event) {
      var text = event.target.value;
      Session.set("searchText", text);
    },

	"change input[type=checkbox]" : function(event, template) {
    var _this = this;
		var checked = event.target.checked;
		var currentItineraryID = Session.get("currentItineraryID");

		if (checked) {

      Session.set("mapLat", this.lat);
      Session.set("mapLng", this.lng);
      Session.set("mapLoc", this.name);
      
			Itineraries.update(currentItineraryID, {
				$push : {
					destinations : this
				}
			});

		} else {
			Itineraries.update(currentItineraryID, {
				$pull : {
					destinations : this
				}
			});

		}
	},
	'click #btn-generate' : function(event, template) {
		var data = Itineraries.findOne(Session.get("currentItineraryID"));
    var destinations = PlanPath(data.destinations);

		if (destinations.length >= 2) {
			var directionsDisplay = new google.maps.DirectionsRenderer();
			var directionsService = new google.maps.DirectionsService();
			var map;

			var start = new google.maps.LatLng(destinations[0].lat, destinations[0].lng);
			var pos = destinations.length - 1;
			var end = new google.maps.LatLng(destinations[pos].lat, destinations[pos].lng);

			var points = [];

			for ( i = 1; i < destinations.length - 1; i++) {
				var dest = new google.maps.LatLng(destinations[i].lat, destinations[i].lng);
				points.push({
					location : dest
				});
			}

			var initialize = function() {
				var mapOptions = {
					zoom : 15,
					center : start,
				};
				map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
				directionsDisplay.setMap(map);

			};
			var calcRoute = function() {
				var request = {
					origin : start,
					destination : end,
					waypoints : points,
					travelMode : google.maps.TravelMode.DRIVING
				};
				function computeTravelTime(result) {
					var total = 0;
					var mins = 0;
					var hours = 0;
					var myroute = result.routes[0];
					for (var i = 0; i < myroute.legs.length; i++) {
						total += myroute.legs[i].duration.value;
					}
					hours = Math.floor(total / 3600.0);
					mins = Math.round(total / 60.0 - hours * 60);
					console.log(hours + " hours " + mins + " mins");
				}


				directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
						computeTravelTime(response);
					}
				});
			};
			initialize();
			calcRoute();

			google.maps.event.addDomListener(window, 'load', initialize);
		} else {
			alert("Please select at least two destinations!");
		}
	}
});

Template.destinations.helpers({
  destinations: function () {
    return Destinations.find({city: Session.get("currentCity")});
  },
  itinerary: function() {
    return Itineraries.findOne(Session.get("currentItineraryID"));
  },
  destinationInItinerary: function(destination) {
    var itinerary = Itineraries.findOne(Session.get("currentItineraryID"));
    unique_ids = _.map(itinerary.destinations, function(item) {return item._id; });
    if (unique_ids.indexOf(destination._id) >= 0) {
      return true;
    } else {
      return false;
    }
  },
  filteredDestinations: function () {
      var itinerary = Itineraries.findOne(Session.get("currentItineraryID"));
      var city = itinerary.city;

      var searchText = Session.get("searchText");
      if (!searchText || searchText.length < 3) {
        console.log(Destinations.find());
        return Destinations.find({city: city}, {sort: {section: -1}});
      }
      var regex = new RegExp(searchText, "i");
      console.log(regex);
      return Destinations.find({name: regex, city: city}, {sort:{section: -1}});
    },
});
