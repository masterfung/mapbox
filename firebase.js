var myFirebaseRef = new Firebase("https://dronecentral.firebaseio.com/");

var drone = myFirebaseRef.child("drone");

drone.set({
  coordinate: {
    lat: 37.77906506406423,
    lon: -122.39044204830788
  }
});
