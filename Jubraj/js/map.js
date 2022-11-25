let fire=document.querySelector('#one');
let hospital=document.querySelector('#second');
let police=document.querySelector('#third');


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
        let browserPosition = {lat:position.coords.latitude,lng:position.coords.longitude};
        hospital.addEventListener('click',()=>{
            map.removeObjects(map.getObjects());
            var posIcon = new H.map.Icon('img/genmark.png',{size: {w:45,h:45}});
            var marker = new H.map.Marker(browserPosition,{icon: posIcon});
            map.addObject(marker);
            var hospital_url = new URL(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${browserPosition.lat},${browserPosition.lng}&q=hospital&apiKey=${window.hereCreds.JS_KEY}`);
            fetch(hospital_url).then(response => response.json()).then(data => {
                for(var i=0;i<data.results.length;i++)
                {
                    if(data.results[i].position!=undefined)
                    {
                        var latitude = data.results[i].position[0];
                        var longitude = data.results[i].position[1];
                        let hosp_position = {lat:latitude,lng:longitude};
                        var hospicon= new H.map.Icon('img/hospmark.png',{size: {w:32,h:32}});
                        var hosp_marker = new H.map.Marker(hosp_position,{icon: hospicon});
                        var distance = data.results[i].distance/1000;
                        hosp_marker.setData(`Hospital Name: ${data.results[i].title}.
                        Distance: ${distance}km`);
                        map.addObject(hosp_marker);
                    }
                }}).catch(err => console.log(err));
        })
        // var hospital_url = new URL(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${browserPosition.lat},${browserPosition.lng}&q=hospital&apiKey=${window.hereCreds.JS_KEY}`);
        // fetch(hospital_url).then(response => response.json()).then(data => {
        //     for(var i=0;i<data.results.length;i++)
        //     {
        //         if(data.results[i].position!=undefined)
        //         {
        //             var latitude = data.results[i].position[0];
        //             var longitude = data.results[i].position[1];
        //             let hosp_position = {lat:latitude,lng:longitude};
        //             var hospicon= new H.map.Icon('img/hospmark.png',{size: {w:32,h:32}});
        //             var hosp_marker = new H.map.Marker(hosp_position,{icon: hospicon});
        //             map.addObject(hosp_marker);
        //         }
        //     }}).catch(err => console.log(err));
        police.addEventListener('click',()=>{
            map.removeObjects(map.getObjects());
            var posIcon = new H.map.Icon('img/genmark.png',{size: {w:45,h:45}});
            var marker = new H.map.Marker(browserPosition,{icon: posIcon});
            map.addObject(marker);
            // markers.forEach(marker => marker.remove());
            var police_url = new URL(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${browserPosition.lat},${browserPosition.lng}&q=police&apiKey=${window.hereCreds.JS_KEY}`);
            fetch(police_url).then(response => response.json()).then(data => {
                console.log(data);
                for(var i=0;i<data.results.length;i++)
                {
                    if(data.results[i].position!=undefined)
                    {
                        var latitude = data.results[i].position[0];
                        var longitude = data.results[i].position[1];
                        let pol_position = {lat:latitude,lng:longitude};
                        var policon= new H.map.Icon('img/polmark.png',{size: {w:32,h:32}});
                        var pol_marker = new H.map.Marker(pol_position,{icon: policon});
                        var distance = data.results[i].distance/1000;
                        pol_marker.setData(`Police Station Name: ${data.results[i].title}.
                        Distance: ${distance}km`);
                        map.addObject(pol_marker);
                    }
                }}).catch(err => console.log(err));
        })
        // var police_url = new URL(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${browserPosition.lat},${browserPosition.lng}&q=police&apiKey=${window.hereCreds.JS_KEY}`);
        // fetch(police_url).then(response => response.json()).then(data => {
        //     for(var i=0;i<data.results.length;i++)
        //     {
        //         if(data.results[i].position!=undefined)
        //         {
        //             var latitude = data.results[i].position[0];
        //             var longitude = data.results[i].position[1];
        //             let pol_position = {lat:latitude,lng:longitude};
        //             var policon= new H.map.Icon('img/polmark.png',{size: {w:32,h:32}});
        //             var pol_marker = new H.map.Marker(pol_position,{icon: policon});
        //             map.addObject(pol_marker);
        //         }
        //     }}).catch(err => console.log(err));
        fire.addEventListener('click',()=>{
            map.removeObjects(map.getObjects());
            var posIcon = new H.map.Icon('img/genmark.png',{size: {w:45,h:45}});
            var marker = new H.map.Marker(browserPosition,{icon: posIcon});
            map.addObject(marker);
            var fire_url = new URL(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${browserPosition.lat},${browserPosition.lng}&q=fire&apiKey=${window.hereCreds.JS_KEY}`);
            fetch(fire_url).then(response => response.json()).then(data => {
            console.log(data);
            for(var i=0;i<data.results.length;i++)
            {
                if(data.results[i].position!=undefined)
                {
                    var latitude = data.results[i].position[0];
                    var longitude = data.results[i].position[1];
                    let fire_position = {lat:latitude,lng:longitude};
                    var fireicon= new H.map.Icon('img/firmark.png',{size: {w:32,h:32}});
                    var fire_marker = new H.map.Marker(fire_position,{icon: fireicon});
                    var distance = data.results[i].distance/1000;
                    fire_marker.setData(`Fire Station Name: ${data.results[i].title}.
                    Distance: ${distance}km`);
                    map.addObject(fire_marker);
                }
            }}).catch(err => console.log(err));
        })
        // var fire_url = new URL(`https://places.ls.hereapi.com/places/v1/autosuggest?at=${browserPosition.lat},${browserPosition.lng}&q=fire&apiKey=${window.hereCreds.JS_KEY}`);
        // fetch(fire_url).then(response => response.json()).then(data => {
        //     for(var i=0;i<data.results.length;i++)
        //     {
        //         if(data.results[i].position!=undefined)
        //         {
        //             var latitude = data.results[i].position[0];
        //             var longitude = data.results[i].position[1];
        //             let fire_position = {lat:latitude,lng:longitude};
        //             var fireicon= new H.map.Icon('img/firmark.png',{size: {w:32,h:32}});
        //             var fire_marker = new H.map.Marker(fire_position,{icon: fireicon});
        //             map.addObject(fire_marker);
        //         }
        //     }}).catch(err => console.log(err));
        var posIcon = new H.map.Icon('img/genmark.png',{size: {w:45,h:45}});
        var marker = new H.map.Marker(browserPosition,{icon: posIcon});
        map.addObject(marker);
    });
} else{
    alert("Geolocation not supported");
}

map.addEventListener('tap', function(evt){
    if(evt.target instanceof H.map.Marker){
        var bubble = new H.ui.InfoBubble(evt.target.getGeometry(),{
            content:evt.target.getData()
        });
        ui.addBubble(bubble);
    }
});
