var map;
var mapArray = [];
var trailNumber = 0;
var randomHike = "";
var userLat = 0;
var userLng = 0;

var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;
    console.log(userLat, userLng);
    createMap();
}

getLocation();

function createMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: userLat,
            lng: userLng,
        },
        zoom: 10
    });

    var request = {
        location: map.getCenter(),
        radius: 80047,
        // types: ['campground'],
        keyword: ['trails']
    }

    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        trailNumber = results.length;
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            mapArray[i] = results[i].name;
            console.log(mapArray[i]);
        }
    }

}

function randomTrail() {
    randomHike = mapArray[Math.floor(Math.random() * Math.floor(trailNumber))];
    document.getElementById('hikingTrail').value = randomHike;
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name
    })
}

document.getElementById("hikeButton").addEventListener("click", randomTrail.bind());