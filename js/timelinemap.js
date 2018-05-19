
// Create the different map options that can be displayed
var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoicnVwYWxpbWF5ZWthciIsImEiOiJjamZvanN3d2owM3lpMndwOXh1cGRvbHV0In0.YRNJn4K6zkxPv_kORZ_TVg");
var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoicnVwYWxpbWF5ZWthciIsImEiOiJjamZvanN3d2owM3lpMndwOXh1cGRvbHV0In0.YRNJn4K6zkxPv_kORZ_TVg");
var outdoorMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
"access_token=pk.eyJ1IjoicnVwYWxpbWF5ZWthciIsImEiOiJjamZvanN3d2owM3lpMndwOXh1cGRvbHV0In0.YRNJn4K6zkxPv_kORZ_TVg");


// eqfeed_callback is called once the earthquake geojsonp data is loaded we will get our techtonic layer data
// in this function and then proceed with creation of the map
function eqfeed_callback(data){
    //get the tectonic data
    d3.json("data/tectonic.json", function(json) {

        // create the tectonic layer 
        var tectonicLayer = L.geoJSON(json.features, {
            style: function (feature) {
                return {color: "orange",
                        weight: 1,
                        fillOpacity: 0
                    };
            } 
        });

        // Define a baseMaps object to hold our base layers
        var baseMaps = {
            "Satellite": satelliteMap,
            "Grayscale": grayscaleMap,
            "Outdoors": outdoorMap
        };

        // Create overlay object to hold our overlay layer
        var overlayMaps = {
            FaultLines: tectonicLayer
        };
        
        // create the map object
        var timelineMap = L.map('timeline-map', {
            layers: [satelliteMap, tectonicLayer],
            center: [23.113592, -82.366592],
            zoom: 3,
            maxBounds: [[90,-180], [-90, 180]]
        });

        // Create a layer control
        // Pass in our baseMaps and overlayMaps
        // Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(timelineMap);

        var getInterval = function(quake) {
            // earthquake data only has a time, so we'll use that as a "start"
            // and the "end" will be that + some value based on magnitude
            // 18000000 = 30 minutes, so a quake of magnitude 5 would show on the
            // map for 150 minutes or 2.5 hours
            return {
            start: quake.properties.time,
            end:   quake.properties.time + quake.properties.mag * 1800000
            };
        };

        // create the timeline control
        var timelineControl = L.timelineSliderControl({
            formatOutput: function(date) {
            return new Date(date).toString();
            }
        });
    
        // create the timeline object
        var timeline = L.timeline(data, {
            getInterval: getInterval,
            onEachFeature: onEachFeature,
            pointToLayer: circleMarker
        });
    
        // add the timeline control to the map
        timelineControl.addTo(timelineMap);
        timelineControl.addTimelines(timeline);
        timeline.addTo(timelineMap);

        // create the legend
        createLegend(timelineMap);

    });
};
