

var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

function createMap(earthquakeLayer, tectonicLayer) {

    // Create the different map options that can be displayed
    var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoicnVwYWxpbWF5ZWthciIsImEiOiJjamZvanN3d2owM3lpMndwOXh1cGRvbHV0In0.YRNJn4K6zkxPv_kORZ_TVg");
    var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoicnVwYWxpbWF5ZWthciIsImEiOiJjamZvanN3d2owM3lpMndwOXh1cGRvbHV0In0.YRNJn4K6zkxPv_kORZ_TVg");
    var outdoorMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoicnVwYWxpbWF5ZWthciIsImEiOiJjamZvanN3d2owM3lpMndwOXh1cGRvbHV0In0.YRNJn4K6zkxPv_kORZ_TVg");
    
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Satellite": satelliteMap,
      "Grayscale": grayscaleMap,
      "Outdoors": outdoorMap
    };
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakeLayer,
      FaultLines: tectonicLayer
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        //center: [40.7128, -74.0059],
        center: [43.769562, 11.255814],
        zoom: 2,
        layers: [grayscaleMap, earthquakeLayer]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }

function createFeatures(earthquakeData, tectonicData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h4>${feature.properties.title}</h4><hr> 
            mag: ${feature.properties.mag}<br>
            depth: ${feature.geometry.coordinates[2]} kms<br>
            time: ${Date(feature.properties.time)}<br>
            code: <a href="${feature.properties.url}" target="_blank">${feature.properties.code}</a>`);
    }


    // Define a markerSize function that will give each city a different radius based on its population
    function markerSize(magnitude) {
        return magnitude*5;
    };

    // This will make our marker's color according to its magnitude
    function markercolor(magnitude) {
        //0-1
        if (magnitude <= 1) {
            return "lightyellow";
        }else if (magnitude<=2) {
            return "yellow";
        }else if (magnitude<=3){
            return "gold";
        }else if (magnitude<=4){
            return "orange";
        }else if (magnitude<=5) {
            return "coral";
        }else {
            return "red";
        }
    }

    function circleMarker(feature, latlng) {
        var geojsonMarkerOptions =  {
            fillOpacity: 0.7,
            color: "black",
            weight: 1,
            fillColor: markercolor(feature.properties.mag),
            radius: markerSize(feature.properties.mag)  
        }
        
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakeLayer = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: circleMarker
    });
  
    var tectonicLayer = L.geoJSON(tectonicData, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`Plate Name: ${feature.properties.PlateName}`);
        },
        style: function (feature) {
            return {color: "orange",
                    weight: 1,
                    fillOpacity: 0
                };
        } 
    });

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakeLayer, tectonicLayer);

};
  
// Grabbing our GeoJSON data..
d3.json(earthquakeUrl, function(data) {
    console.log(data.features);

    d3.json("tectonic.json", function(json) {
        console.log("Techtonic Data: ", json);
        createFeatures(data.features, json.features);
    });
    
});

