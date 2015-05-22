window.onload = function() {
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

  map.setView([37.7833, -122.4167], 12);

};
