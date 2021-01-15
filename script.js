var map;
var mapArray = [];
var trailNumber = 0;
var randomHike = "";
var userLat = 0;
var userLng = 0;
var trailFound = false;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
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
}

function findTrails() {
    var request = {
        location: map.getCenter(),
        radius: document.getElementById("searchRadius").value * 1609,
        // types: ['campground'],
        keyword: "(trails) or (trailhead) or (trail)" //DOES NOT WORK, FIND FIX!
    }

    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        trailNumber = results.length;
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            mapArray[i] = results[i];
            // console.log(mapArray[i]);
        }
    }
}

function randomTrail() {
    randomHike = mapArray[Math.floor(Math.random() * Math.floor(trailNumber))];
    document.getElementById('hikingTrail').value = randomHike.name;
    trailFound = true;
    createMarker(randomHike);
}

function createMarker(place) {

    var hikingIcon = {
        url: 'https://www.campgroundsigns.com/img/lg/X/mutcd-campground-guide-sign-hiking-trail-x-rs-068.png',
        scaledSize: trailFound ? new google.maps.Size(50,50) : new google.maps.Size(25,25)
        
    }

    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
        icon: hikingIcon
    })

    console.log()
}

document.getElementById("hikeButton").addEventListener("click", randomTrail.bind());
document.getElementById("searchRadius").addEventListener("keypress", function(e) {
    if(e.key === "Enter"){
        findTrails();
    }
})