













//Google Maps API
//Andrew's Key: AIzaSyB-advEZHzPU9oDy_THa6VyYKawF7ndVtQ
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}
//End of Google Maps API