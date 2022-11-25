var platform = new H.service.Platform({
    'apikey': window.hereCreds.JS_KEY
  });

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 11,
      center: { lat: 28.438881, lng: 77.574222 }
    });

// Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        let browserPosition = {lat:position.coords.latitude,lng:position.coords.longitude};
        // var posIcon = new H.map.Icon('img/marker_icon.png');
        let marker = new H.map.Marker(browserPosition);
        map.addObject(marker);
        // var router = platform.getRoutingService(),
        // routeRequestParams = {
        //     mode: 'fastest;car',
        //     representation: 'display',
        //     routeattributes: 'waypoints,summary,shape,legs',
        //     maneuverattributes: 'direction,action',
        //     waypoint0: '28.4506,77.5842', // Brandenburg Gate
        //     waypoint1: '29.1245,78.3862'  // Friedrichstraße Railway Station
        // };


        // router.calculateRoute(
        // routeRequestParams,
        // onSuccess,
        // onError
        // );
    });
} else{
    alert("Geolocation not supported");
}