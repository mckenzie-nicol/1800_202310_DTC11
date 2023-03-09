// // MAPBOX DISPLAY
// function showEventsOnMap() {
//     // Defines basic mapbox data
//     mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';
//     const map = new mapboxgl.Map({
//         container: 'map', // Container ID
//         style: 'mapbox://styles/mapbox/streets-v11', // Styling URL
//         center: [-122.964274, 49.236082], // Starting position
//         zoom: 8 // Starting zoom
//     });

//     // Add user controls to map
//     map.addControl(new mapboxgl.NavigationControl());

//     // Adds map features
//     map.on('load', () => {
//         const features = []; // Defines an empty array for information to be added to

//         // Defines map pin icon
//         map.loadImage(
//             'https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-16-28668.png',
//             (error, image) => {
//                 if (error) throw error;

//                 // Add the image to the map style.
//                 map.addImage('eventpin', image); // Pin Icon

//                 // READING information from "events" collection in Firestore
//                 db.collection("hikes").get().then(allEvents => {
//                     allEvents.forEach(doc => {
//                         // get hike Coordinates
//                         lat = doc.data().lat;
//                         lng = doc.data().lng;
//                         console.log(lat, lng);
//                         coordinates = [lng, lat];
//                         console.log(coordinates);
//                         //read name and the details of hike
//                         event_name = doc.data().name; // Event Name
//                         preview = doc.data().details; // Text Preview


//                         // Pushes information into the features array
//                         features.push({
//                             'type': 'Feature',
//                             'properties': {
//                                 'description': `<strong>${event_name}</strong><p>${preview}</p> <br> <a href="/hike.html?id=${doc.id}" target="_blank" title="Opens in a new window">Read more</a>`
//                             },
//                             'geometry': {
//                                 'type': 'Point',
//                                 'coordinates': coordinates
//                             }
//                         });
//                     })

//                     // Adds features as a source to the map
//                     map.addSource('places', {
//                         'type': 'geojson',
//                         'data': {
//                             'type': 'FeatureCollection',
//                             'features': features
//                         }
//                     });

//                     // Creates a layer above the map displaying the pins
//                     map.addLayer({
//                         'id': 'places',
//                         'type': 'symbol',
//                         'source': 'places',
//                         'layout': {
//                             '/text/map_report.html': 'eventpin', // Pin Icon
//                             'icon-size': 0.1, // Pin Size
//                             'icon-allow-overlap': true // Allows icons to overlap
//                         }
//                     });

//                     // Map On Click function that creates a popup, displaying previously defined information from "events" collection in Firestore
//                     map.on('click', 'places', (e) => {
//                         // Copy coordinates array.
//                         const coordinates = e.features[0].geometry.coordinates.slice();
//                         const description = e.features[0].properties.description;

//                         // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
//                         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//                             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//                         }

//                         new mapboxgl.Popup()
//                             .setLngLat(coordinates)
//                             .setHTML(description)
//                             .addTo(map);
//                     });

//                     // Change the cursor to a pointer when the mouse is over the places layer.
//                     map.on('mouseenter', 'places', () => {
//                         map.getCanvas().style.cursor = 'pointer';
//                     });

//                     // Defaults cursor when not hovering over the places layer
//                     map.on('mouseleave', 'places', () => {
//                         map.getCanvas().style.cursor = '';
//                     });
//                 })

//             });
//     })
// }

// showEventsOnMap()

// leaflet map
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
// warnings
var warningIcon = L.icon({
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
var warning = L.marker([51.5, -0.09], {icon: warningIcon}).addTo(map);
warning.bindPopup("<b>Hello world!</b><br>I am a warning!.").openPopup();
// home
// function getHomeCoordinates() {
//     var user = firebase.auth().currentUser;
//     var homeCoordinates = [];
//     db.collection("users").doc(user.uid).get().then(function(doc) {
//         console.log(home_lat);
//         console.log(home_lng);
//     });
//     return homeCoordinates;
// }
// getHomeCoordinates();
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
var home = L.marker([50, -0.12], {icon: homeIcon}).addTo(map);
home.bindPopup("Home!").openPopup();
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
    });
}

map.on('click', onMapClick);