var setupMap = function setupMap() {
  L.mapbox.accessToken = 'pk.eyJ1IjoibWFzdGVyZnVuZyIsImEiOiIzZWU3NzVmNmE2ZGY0YjZkNzRjM2YzOWViN2ZjZjhkOCJ9.jFsm55X2H78DwB7boOz0rQ';
  window.map = L.mapbox.map('map', null, { minZoom: 8});

  var layers = {
    street: L.mapbox.tileLayer("masterfung.4e74168c"),
    terrain: L.mapbox.tileLayer("masterfung.m8finakd")
  };

  L.control.scale({metric: false, position: 'bottomright'}).addTo(map);

  layers.street.addTo(map);
  L.control.layers(layers).addTo(map);

  map.attributionControl.addAttribution('Tsung Hung | 2015');

  map.setView([37.77906506406423, -122.39044204830788], 16);
};


window.onload = function() {
  setupMap();
  var visited = [];

  var droneIcon = {
    "iconUrl": "../images/drone.png",
    "iconSize": [50, 50], // size of the icon
    "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
    "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
    "className": "dot"
  }

  // var myLayer = L.mapbox.featureLayer().addTo(map);
  //
  // myLayer.on('layeradd', function (e) {
  //   var marker = e.layer,
  //       feature = marker.feature;
  //
  //   marker.setIcon(L.icon(droneIcon));
  // });
  //
  // myLayer.setGeoJSON(markers.features[0].geometry.coordinates);

  // var marker = L.marker([37.77906506406423,-122.39044204830788], {
  //   icon: L.icon(droneIcon)
  // }).addTo(map);

  var state = "not started";

  $("#btn-start").click(function() {
      $.get("/data/start", function(data) {
        console.log("Ack:", data);
        state = data;

        var fetchCoordinate = function() {
          $.get("/data/coordinate-fetch", function(coordinates, status) {

            if (state !== "started") {
              return;
            }

            // Continue polling
            setTimeout(fetchCoordinate, 2000);

            if (status === 'error') {
              console.log("Retrieval of coordianated in-error: " + status);
            }

            var marker = L.marker(JSON.parse(coordinates), {
              icon: L.icon(droneIcon)
            });

            visited.push(marker);

            marker.addTo(map);

          });
        };

        fetchCoordinate();
    });
  });

  $("#btn-pause").click(function() {
    $.get("/data/pause", function(data, status) {
      console.log("Ack:", data);
      state = data;
    })
  });

  $("#btn-restart").click(function() {
    $.get("/data/restart", function(data, status) {
      console.log("Ack:", data);
      state = data;

      // Start
      $("#btn-start").click();

      // Clear map
      for (var i = 0; i < visited.length; i++) {
        map.removeLayer(visited[i]);
      }
    })
  });

};
