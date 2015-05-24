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

  var droneIcon = {
    "iconUrl": "../images/drone.png",
    "iconSize": [50, 50], // size of the icon
    "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
    "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
    "className": "dot"
  }

  var myLayer = L.mapbox.featureLayer().addTo(map);

  myLayer.on('layeradd', function (e) {
    var marker = e.layer,
        feature = marker.feature;

    marker.setIcon(L.icon(droneIcon));
  });

  myLayer.setGeoJSON(markers);

  // var marker = L.marker(markers.features[0].geometry.coordinates, {
  //   title: markers.features[0].properties.description
  // });
  //
  // marker.addTo(map);

  // window.watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
  //   maximumAge: 0,
  //   timeout: 60000,
  //   enableHighAccuracy: true
  // })
};
