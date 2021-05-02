// Create the map with our layers
var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12
});

// Create the tile layer that will be the background of our map
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var earthData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  // D3 Function
  d3.json(earthData, function(data) {
      // Color Function
  function whichColor(magnitude) {
    switch (true) {
      case magnitude > 9:
       return "#260301";
      case magnitude > 8:
       return "#350602";
      case magnitude > 7:
        return "#4B0803";
      case magnitude > 6:
        return "#6B0B03";
      case magnitude > 5:
        return "#920C02";
      case magnitude > 4:
        return "#B50F01";
      case magnitude > 3:
        return "#FB4D3F";
      case magnitude > 2:
        return "#FB9289";
      case magnitude > 1:
        return "#FBB8B2";
      default:
        return "#FFD3CF";
    }
  }
    