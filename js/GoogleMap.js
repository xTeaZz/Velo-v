var GoogleMap = {

  initBikeMap: function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.750000, lng: 4.850000},
      zoom: 13});
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=65af477a79c3c0eca50cdd4a95bac21e8e17095b", function(reponse) {
      var stations = JSON.parse(reponse);
      stations.forEach(function (station) {
        var marker = new google.maps.Marker({
          position: station.position,
          title: station.name,
          map: map
        });
        var markers = [];
        markers.push(marker);
        var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      });
    });
  },

};
