![headerimage](images/quakeheader.png)

# QuakeGeoData

This project analyses the Earthquake data from the [USGS Earthquake feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and shows interractive map visualizations for the earthquakes that have occured in the past 7 days.

## Data
### Earthquake data:
The data for the earthquakes is in the GeoJSON format retrieved from the USGS website.

### Tectonic plates data
The data for the tectonic plates/fault lines is taken from the [Fraxen Github page](https://github.com/fraxen/tectonicplates). This data is also in the GeoJSON format.

## Technology
* The project is done using D3.js, Leaflet, Javascript, and HTML. 
* All the maps are plot using the [Leaflet javascript library](https://leafletjs.com)
* The following Leaflet plugins are used:
    * [Leaflet.timeline](https://github.com/skeate/Leaflet.timeline) for the timeline map
    * [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat) for the heatmap
    * [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) for the cluster map


## Website
You can view the project on the [QuakeGeoData Girhub Page](https://rupalimayekar.github.io/QuakeGeoData/). Below are some screen shots of the project website.

### Static Map Visualization
The static map shows two layers on a base map. The earthquakes layer is plotted as circles on their point of location on the map. The size of the circles is proportionate to the magnitude of the earthquake. The circles are also color coded by magnitude. There is also the fault lines that are plotted on the map as a seperate layer that can be turned on or off using the layer control. The map layer can be selected from different map options - satellite/ourdoor/gray scale map.

![static-map-ScreenShot](images/static-map.png)

### Timeline Map Visualization
The timeline map shows the same earquake data on one of the three selected map layer, as an animated map where the circles are plotted as the earthquake occur on a timeline. The circles pop up and disappear in the order of occurrence on the timeline.

![timeline-map-ScreenShot](images/timeline-map.png)

### Heat Map Visualization
The heat map shows the concentration of points of earthquakes are heatpoints on the map. The higher the concentration, the darker the color.

![heat-map-ScreenShot](images/heatmap.png)

### Cluster Map Visualization
The cluster map shows the concentration of points of earthquakes as a cluster marker with the number of points specified inside the marker. On click upon the cluster point, you will get a drilldown of points in the next zoom level for that cluster.

![cluster-map-ScreenShot](images/clustermap.png)

