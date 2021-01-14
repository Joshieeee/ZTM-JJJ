var map;
var mapArray = [];

function createMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 45.5811,
            lng: -122.3538
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
        console.log(results.length);
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            mapArray[i] = results[i].name;
            console.log(mapArray[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name
    })
}