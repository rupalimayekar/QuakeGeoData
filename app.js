// add click event handler to the button
d3.select("#static-map-btn")
    .on("click", function(){
        d3.select("#map-container").attr("src", "staticmap.html");
    });
;

// add click event handler to the button
d3.select("#timelinemap-btn")
    .on("click", function(){
        d3.select("#map-container").attr("src", "timelinemap.html");
    });
;

// add click event handler to the button
d3.select("#heat-map-btn")
    .on("click", function(){
        d3.select("#map-container").attr("src", "heatmap.html");
    });
;

// add click event handler to the button
d3.select("#cluster-map-btn")
    .on("click", function(){
        d3.select("#map-container").attr("src", "clustermap.html");
    });
;
