// Store our API endpoint inside queryUrl
var queryUrl = "https://opendata.arcgis.com/datasets/10e58174831e49a2aebaa129cc1c3bd5_20.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(sexoffenderData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.FIRSTNAME + " " + feature.properties.LASTNAME +
      "</h3><hr><p>" + (feature.properties.TYPE) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the sexoffenderData object
  // Run the onEachFeature function once for each piece of data in the array
  var offenders = L.geoJSON(sexoffenderData, {
    onEachFeature: onEachFeature
  });

  // Sending our offenders layer to the createMap function
  createMap(offenders);
}

function createMap(offenders) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Sexual Offenders": offenders
  };

  // Create our map, giving it the streetmap and offenders layers to display on load
  var myMap = L.map("map", {
    center: [
      38.9072, -77.0369
    ],
    zoom: 12,
    layers: [streetmap, offenders]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
