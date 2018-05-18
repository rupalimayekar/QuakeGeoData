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
        return "lightgreen";
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

