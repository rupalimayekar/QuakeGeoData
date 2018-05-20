// URL for the earquake geojson data.
var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// This function is called by createFeatures() to create the map layers and controls and 
// add them to the map div in the html page.
function createMap(earthquakePoints, tectonicLayer) {

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
  
    var earthquakeLayer = L.heatLayer(earthquakePoints, {minOpacity: 0.5});
    
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("heatmap", {
        center: [23.113592, -82.366592],
        zoom: 3,
        maxBounds: [[90,-180], [-90, 180]],
        layers: [grayscaleMap, earthquakeLayer,tectonicLayer]
    });
  
    
    
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakeLayer,
        FaultLines: tectonicLayer
    };
    
      
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

  }

// This function is called once we get our earthquake and faultlines data to create the map
// and map layers.
function createFeatures(earthquakeData, tectonicData) {
    console.log("EarthquakeData:  ", earthquakeData);
    // console.log("EarthquakeData.geometry:  ", earthquakeData.geometry);
    // console.log("EarthquakeData.geometry.coor:  ", earthquakeData.geometry.coordinates);
    
    var earthquakePoints = [];
    for (var i=0; i<earthquakeData.length; i++) {
        earthquakePoints.push(earthquakeData[i].geometry.coordinates);
    }
    earthquakePoints = earthquakePoints.map(function (point) { return [point[1], point[0], point[2]]; });
  
    var tectonicLayer = L.geoJSON(tectonicData, {
        style: function (feature) {
            return {color: "orange",
                    weight: 1,
                    fillOpacity: 0
                };
        } 
    });

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakePoints, tectonicLayer);

};
  
// Grabbing our GeoJSON earthquake data..
d3.json(earthquakeUrl, function(data) {
    console.log(data.features);

    // get the tectonic plate data
    d3.json("data/tectonic.json", function(json) {
        console.log("Techtonic Data: ", json);
        createFeatures(data.features, json.features);
    });
    
});

