var map = L.map('map').setView([51.505, -0.09], 13);
// locate user functions
function onLocationFound(e) {
    var radius = e.accuracy / 10;
    console.log(e.latlng);

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
// leaflet map
// use setView to center on current user location
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
// warnings
function showMapWarnings() {
    db.collection("reports").doc(reports.uid).get().then(function (doc) {
        // for report in reports, get lat and lng:


        // console.log(doc.data().home_lat);
        // console.log(doc.data().home_lng);
        warning_lat = doc.data().report_lat
        warning_lng = doc.data().report_lng
        var warningIcon = L.icon({
            // reference html file for icon image
            iconUrl: 'images/image.jpg',
            // iconUrl: '.text/map_warning.html',
            shadowUrl: './images/image.jpg',

            iconSize: [38, 95], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        var warning = L.marker([user_home_lat, user_home_lng], { icon: warningIcon }).addTo(map);
        warning.bindPopup("A warning!").openPopup();
    });
}
var warningIcon = L.icon({
    // reference html file for icon image
    iconUrl: 'images/image.jpg',
    // iconUrl: '.text/map_warning.html',
    shadowUrl: './images/image.jpg',

    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var warning = L.marker([51.5, -0.09], { icon: warningIcon }).addTo(map);
warning.bindPopup("<b>Hello world!</b><br>I am a warning!.").openPopup();
// home location marker function
function showHomeCoordinates() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var user = firebase.auth().currentUser;
            db.collection("users").doc(user.uid).get().then(function (doc) {
                // console.log(doc.data().home_lat);
                // console.log(doc.data().home_lng);
                user_home_lat = doc.data().home_lat
                var homeIcon = L.icon({
                    // reference html file for icon image
                    iconUrl: 'images/drink3.png',
                    // iconUrl: '.text/map_warning.html',
                    shadowUrl: './images/drink1.png',

                    iconSize: [38, 95], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
                user_home_lng = doc.data().home_lng
                // map.removeLayer();

                var home = L.marker([user_home_lat, user_home_lng], { icon: homeIcon }).addTo(map);
                home.bindPopup("Home!").openPopup();
            });
        }
    });
}
showHomeCoordinates();

// user pins
var popup = L.popup();

function onMapClick(e) {
    var user = firebase.auth().currentUser;
    popup
        .setLatLng(e.latlng)
        .setContent("https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-16-28668.png"+ "You clicked the map at " + e.latlng.toString())
        .openOn(map);
    console.log(e.latlng);
    console.log(e.latlng["lat"]);
    console.log(e.latlng["lng"]);
    var x = e.latlng["lat"];
    var y = e.latlng["lng"];
    // set home coordinates to user pin
    $("#home").click(function () {
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
map.on('click', onMapClick);