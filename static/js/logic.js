// Create the map with our layers
var map = L.map("mapid", {
  center: [40.73, -74.0059],
  zoom: 12
});

// Create the tile layer that will be the background of our map
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11.html?title=true&access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var earthData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  // D3 Function
  d3.json(earthData, function(data) {
//combines color and radius features
    function ColorRadius(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: colorMag(feature.properties.mag),
            color: "#000000",
            radius: radiusMag(feature.properties.mag),
            stroke: true,
            weight: 0.7
        };
        }
        // radius
    function radiusMag(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 5;
        }
        // color 
    function colorMag(magnitude) {
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

    L.geoJson(data, {

        pointToLayer: function (feature, latlong) {
          return L.circleMarker(latlong);
        },
    
        style: ColorRadius,
    
        onEachFeature: function (feature, layer) {
    
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location:<br>" + feature.properties.place);
        }
      }).addTo(map);
    
      // Adding Legend
      var legend = L.control({ position: 'bottomright' });
    
      legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
        // Legend Label
        div.innerHTML = 'Past<br>Seven<br>Days<br>of<br>Earthquakes<br>by<br>Magnitude<br><hr>'
    
        // Loop through density intervals
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + colorMag(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
      };
      //Adds Legend
      legend.addTo(map);
    
    }); 
   