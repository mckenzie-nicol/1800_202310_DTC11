function initialize_map() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            map.panTo([position.coords.latitude, position.coords.longitude]);
            return [position.coords.latitude, position.coords.longitude]
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
var initial_location = initialize_map()
console.log(location)
var current_x = initial_location
console.log(current_x)
var current_y = initial_location
console.log(current_y)
var map = L.map('map').setView([0, 0], 16);

async function populate_map() {
    // await showMapWarnings();
    // await showHomeCoordinates();
    mapLocateUser();
}
populate_map();


// locate user functions
function mapLocateUser() {
    function onLocationFound(e) {
        var radius = e.accuracy / 10;
        console.log(e.latlng);
        // x = e.latlng.lat;
        // y = e.latlng.lng;
        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();
        L.circle(e.latlng, radius).addTo(map);
    }
    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    map.locate({ setView: true, maxZoom: 16 })
}
// leaflet map
// use setView to center on current user location
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
// warnings
function showMapWarnings() {
    db.collection("reports").get()
        .then(allReports => {
            reports = allReports.docs;
            console.log(reports);
            console.log("THIS IS A TEST")
            reports.forEach(doc => {
                var warning_lat = doc.data().report_lat
                var warning_lng = doc.data().report_lng
                var warning_image = doc.data().image
                var warningIcon = L.divIcon({
                    html:
                        '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16"> <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />' +
                        '</svg>'
                    ,
                    className: 'bi bi- exclamation - triangle - fill',
                    iconUrl: 'images/image.jpg',
                    shadowUrl: './images/image.jpg',
                    iconSize: [38, 95], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
                var popup = L.popup()
                    .setContent('<img src="' + warning_image + '" width="200" height="200">')
                var warning = L.marker([warning_lat, warning_lng], { icon: warningIcon }).addTo(map);
                warning.bindPopup(popup).openPopup();
            });

        });
}
showMapWarnings();
// home location marker function
function showHomeCoordinates() {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var user = firebase.auth().currentUser;
                db.collection("users").doc(user.uid).get().then(function (doc) {
                    user_home_lat = doc.data().home_lat;
                    user_home_lng = doc.data().home_lng;

                    var homeIcon = L.divIcon({
                        html:
                            '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class= "bi bi-house-door-fill" viewBox="0 0 16 16" ><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />' +
                            '</svg >',
                        className: 'bi bi-house-door-fill',
                        iconUrl: 'text/map_warning.html',
                        shadowUrl: './images/drink1.png',
                        iconSize: [38, 95],
                        shadowSize: [50, 64],
                        iconAnchor: [23.5, 25],
                        shadowAnchor: [4, 62],
                        popupAnchor: [-3, -76]
                    });
                    var home = L.marker([user_home_lat, user_home_lng], { icon: homeIcon }).addTo(map);
                    home.bindPopup("Home!").openPopup();
                    // showUserLocation();
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });
}
showHomeCoordinates();
showUserLocation();

// user pins
var popup = L.popup();

function onMapClick(e) {
    var user = firebase.auth().currentUser;
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    console.log(e.latlng);
    console.log(e.latlng["lat"]);
    console.log(e.latlng["lng"]);
    var x = e.latlng["lat"];
    var y = e.latlng["lng"];
    // set home coordinates to user pin
    $("#set_home").click(function () {
        console.log("button clicked");
        console.log(x);
        console.log(y);
        // add to database
        // add entries to firebase user document
        // modify fields in firebase user document
        db.collection("users").doc(user.uid).update({
            home_lat: x,
            home_lng: y,
        })

        showHomeCoordinates();
    });
}
// function to pan to user current location
function showUserLocation() {
    console.log("locate user button clicked");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            map.panTo([position.coords.latitude, position.coords.longitude]);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showUserHome() {
    console.log("locate home button clicked");
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var user = firebase.auth().currentUser;
            db.collection("users").doc(user.uid).get().then(function (doc) {
                map.panTo([doc.data().home_lat, doc.data().home_lng]);
            });
        }
    });
}
// go to user location button function


map.on('click', onMapClick);