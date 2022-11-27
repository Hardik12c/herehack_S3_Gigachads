let fire = document.querySelector('#one');
let hospital = document.querySelector('#second');
let police = document.querySelector('#third');
const TIEbtn = document.querySelector('.btn');
// import { PTCmobile } from "../login";
// console.log(window.mobilenumber.mobile);
var max = Number.MAX_SAFE_INTEGER;
var minHospDist = max, minPolDist = max, minFireDist = max, minHospPos = {}, minPolPos, minFirePos;
var platform = new H.service.Platform({
    'apikey': window.hereCreds.JS_KEY
});



if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        function route(Pos) {
            // Create the parameters for the routing request:
            var routingParameters = {
                'routingMode': 'fast',
                'transportMode': 'car',
                // The start point of the route:
                'origin': `${browserPosition.lat},${browserPosition.lng}`,
                // The end point of the route:
                'destination': `${Pos.lat},${Pos.lng}`,
                // Include the route shape in the response
                'return': 'polyline'
            };

            // Define a callback function to process the routing response:
            var onResult = function (result) {
                // ensure that at least one route was found
                if (result.routes.length) {
                    result.routes[0].sections.forEach((section) => {
                        // Create a linestring to use as a point source for the route line
                        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

                        // Create a polyline to display the route:
                        let routeLine = new H.map.Polyline(linestring, {
                            style: { strokeColor: 'blue', lineWidth: 3 }
                        });

                        // Create a marker for the start point:
                        let startMarker = new H.map.Marker(section.departure.place.location);

                        // Create a marker for the end point:
                        let endMarker = new H.map.Marker(section.arrival.place.location);

                        // Add the route polyline and the two markers to the map:
                        map.addObjects([routeLine]);

                        // Set the map's viewport to make the whole route visible:
                        map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
                    });
                }
            };

            // Get an instance of the routing service version 8:
            var router = platform.getRoutingService(null, 8);

            // Call calculateRoute() with the routing parameters,
            // the callback and an error callback function (called if a
            // communication error occurs):
            router.calculateRoute(routingParameters, onResult,
                function (error) {
                    alert(error.message);
                });
        }
        let browserPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
        // Obtain the default map types from the platform object:
        var defaultLayers = platform.createDefaultLayers();
        var map = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
                zoom: 11,
                center: browserPosition
            });

        // Create the default UI:
        var ui = H.ui.UI.createDefault(map, defaultLayers);

        // Enable the event system on the map instance:
        var mapEvents = new H.mapevents.MapEvents(map);

        // Instantiate the default behavior, providing the mapEvents object:
        var behavior = new H.mapevents.Behavior(mapEvents);
        function addCircleToMap(map) {
            map.addObject(new H.map.Circle(
                // The central point of the circle
                browserPosition,
                // The radius of the circle in meters
                10000,
                {
                    style: {
                        strokeColor: 'rgba(0, 0, 0, 0.6)', // Color of the perimeter
                        lineWidth: 2,
                        fillColor: 'rgba(0, 0, 200, 0.2)'  // Color of the circle
                    }
                }
            ));
        }
        hospital.addEventListener('click', () => {
            map.removeObjects(map.getObjects());
            addCircleToMap(map);
            var posIcon = new H.map.Icon('img/genmark.png', { size: { w: 45, h: 45 } });
            var marker = new H.map.Marker(browserPosition, { icon: posIcon });
            marker.setData("You are currently here");
            map.addObject(marker);
            var hospital_url = new URL(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${browserPosition.lat},${browserPosition.lng}&q=hospital&apiKey=${window.hereCreds.JS_KEY}`);
            fetch(hospital_url).then(response => response.json()).then(data => {
                for (var i = 0; i < data.results.length; i++) {
                    if (data.results[i].position != undefined) {
                        var latitude = data.results[i].position[0];
                        var longitude = data.results[i].position[1];
                        let hosp_position = { lat: latitude, lng: longitude };
                        var hospicon = new H.map.Icon('img/hospmark.png', { size: { w: 32, h: 32 } });
                        var hosp_marker = new H.map.Marker(hosp_position, { icon: hospicon });
                        var distance = data.results[i].distance / 1000;
                        if (minHospDist > distance) {
                            minHospDist = distance;
                            minHospPos = hosp_position;
                        }
                        hosp_marker.setData(`Hospital Name: ${data.results[i].title}.
                        Distance: ${distance}km`);
                        map.addObject(hosp_marker);
                    }
                }
                route(minHospPos);
            }).catch(err => console.log(err));
        })

        police.addEventListener('click', () => {
            map.removeObjects(map.getObjects());
            addCircleToMap(map);
            var posIcon = new H.map.Icon('img/genmark.png', { size: { w: 45, h: 45 } });
            var marker = new H.map.Marker(browserPosition, { icon: posIcon });
            marker.setData("You are currently here");
            map.addObject(marker);
            // markers.forEach(marker => marker.remove());
            var police_url = new URL(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${browserPosition.lat},${browserPosition.lng}&q=police&apiKey=${window.hereCreds.JS_KEY}`);
            fetch(police_url).then(response => response.json()).then(data => {
                console.log(data);
                for (var i = 0; i < data.results.length; i++) {
                    if (data.results[i].position != undefined) {
                        var latitude = data.results[i].position[0];
                        var longitude = data.results[i].position[1];
                        let pol_position = { lat: latitude, lng: longitude };
                        var policon = new H.map.Icon('img/polmark.png', { size: { w: 32, h: 32 } });
                        var pol_marker = new H.map.Marker(pol_position, { icon: policon });
                        var distance = data.results[i].distance / 1000;
                        if (minPolDist > distance) {
                            minPolDist = distance;
                            minPolPos = pol_position;
                        }
                        pol_marker.setData(`Police Station Name: ${data.results[i].title}.
                        Distance: ${distance}km`);
                        map.addObject(pol_marker);
                    }
                }
                route(minPolPos);
            }).catch(err => console.log(err));
        })

        fire.addEventListener('click', () => {
            map.removeObjects(map.getObjects());
            addCircleToMap(map);
            var posIcon = new H.map.Icon('img/genmark.png', { size: { w: 45, h: 45 } });
            var marker = new H.map.Marker(browserPosition, { icon: posIcon });
            marker.setData("You are currently here");
            map.addObject(marker);
            var fire_url = new URL(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${browserPosition.lat},${browserPosition.lng}&q=fire&apiKey=${window.hereCreds.JS_KEY}`);
            fetch(fire_url).then(response => response.json()).then(data => {
                for (var i = 0; i < data.results.length; i++) {
                    if (data.results[i].position != undefined) {
                        var latitude = data.results[i].position[0];
                        var longitude = data.results[i].position[1];
                        let fire_position = { lat: latitude, lng: longitude };
                        var fireicon = new H.map.Icon('img/firmark.png', { size: { w: 32, h: 32 } });
                        var fire_marker = new H.map.Marker(fire_position, { icon: fireicon });
                        var distance = data.results[i].distance / 1000;
                        if (minFireDist > distance) {
                            minFireDist = distance;
                            minFirePos = fire_position;
                        }
                        fire_marker.setData(`Fire Station Name: ${data.results[i].title}.
                        Distance: ${distance}km`);
                        map.addObject(fire_marker);
                    }
                }
                route(minFirePos);
            }).catch(err => console.log(err));
        })

        addCircleToMap(map);
        // var posIcon = new H.map.Icon('img/genmark.png', { size: { w: 45, h: 45 } });
        // var marker = new H.map.Marker(browserPosition, { icon: posIcon });
        // marker.setData("You are currently here");
        // map.addObject(marker);
        TIEbtn.addEventListener('click', () => {
            var number = new URL('http://localhost:3000/sendmess');
            fetch(number).then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err));
            var hospital_url = new URL(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${browserPosition.lat},${browserPosition.lng}&q=hospital&apiKey=${window.hereCreds.JS_KEY}`);
            fetch(hospital_url).then(response => response.json()).then(data => {
                for (var i = 0; i < data.results.length; i++) {
                    if (data.results[i].position != undefined) {
                        var latitude = data.results[i].position[0];
                        var longitude = data.results[i].position[1];
                        let hosp_position = { lat: latitude, lng: longitude };
                        var hospicon = new H.map.Icon('img/hospmark.png', { size: { w: 32, h: 32 } });
                        var hosp_marker = new H.map.Marker(hosp_position, { icon: hospicon });
                        var distance = data.results[i].distance / 1000;
                        hosp_marker.setData(`Hospital Name: ${data.results[i].title}.
                        Distance: ${distance}km`);
                        map.addObject(hosp_marker);
                    }
                }
            }).catch(err => console.log(err));

            var police_url = new URL(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${browserPosition.lat},${browserPosition.lng}&q=police&apiKey=${window.hereCreds.JS_KEY}`);
            fetch(police_url).then(response => response.json()).then(data => {
                for (var i = 0; i < data.results.length; i++) {
                    if (data.results[i].position != undefined) {
                        var latitude = data.results[i].position[0];
                        var longitude = data.results[i].position[1];
                        let pol_position = { lat: latitude, lng: longitude };
                        var policon = new H.map.Icon('img/polmark.png', { size: { w: 32, h: 32 } });
                        var pol_marker = new H.map.Marker(pol_position, { icon: policon });
                        var distance = data.results[i].distance / 1000;
                        pol_marker.setData(`Police Station Name: ${data.results[i].title}.
                        Distance: ${distance}km`);
                        map.addObject(pol_marker);
                    }
                }
            }).catch(err => console.log(err));

            var fire_url = new URL(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${browserPosition.lat},${browserPosition.lng}&q=fire&apiKey=${window.hereCreds.JS_KEY}`);
            fetch(fire_url).then(response => response.json()).then(data => {
                for (var i = 0; i < data.results.length; i++) {
                    if (data.results[i].position != undefined) {
                        var latitude = data.results[i].position[0];
                        var longitude = data.results[i].position[1];
                        let fire_position = { lat: latitude, lng: longitude };
                        var fireicon = new H.map.Icon('img/firmark.png', { size: { w: 32, h: 32 } });
                        var fire_marker = new H.map.Marker(fire_position, { icon: fireicon });
                        var distance = data.results[i].distance / 1000;
                        fire_marker.setData(`Fire Station Name: ${data.results[i].title}.
                        Distance: ${distance}km`);
                        map.addObject(fire_marker);
                    }
                }
            }).catch(err => console.log(err));
        })
        var posIcon = new H.map.Icon('img/genmark.png', { size: { w: 45, h: 45 } });
        var marker = new H.map.Marker(browserPosition, { icon: posIcon });
        marker.setData("You are currently here");
        map.addObject(marker);
        map.addEventListener('tap', function (evt) {
            if (evt.target instanceof H.map.Marker) {
                var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
                    content: evt.target.getData()
                });
                ui.addBubble(bubble);
            }
        });
    });
} else {
    alert("Geolocation not supported");
}