var GoogleMap = {

  //Initialise la googleMap
  initBikeMap: function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.750000, lng: 4.850000},
      zoom: 13});

    //Recupere les informations de l'api jcdecaux et cree les marqueurs
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=65af477a79c3c0eca50cdd4a95bac21e8e17095b", function(reponse) {
      var markers = [];
      var stations = JSON.parse(reponse);
      stations.forEach(function (station) {
        var marker = new google.maps.Marker({
          position: station.position,
          title: station.name,
          number: station.number,
          map: map
        });
        //Remplie les informations lorsqu'on clique sur un marqueur
        marker.addListener('click', function() {
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations/"+this.number+"?contract=Lyon&apiKey=65af477a79c3c0eca50cdd4a95bac21e8e17095b", function(reponse){
          var station = JSON.parse(reponse);
          document.getElementById("stationName").textContent = station.name;
          document.getElementById("stationBike").textContent = station.available_bikes;
          document.getElementById("stationStat").textContent = station.status;
          document.getElementById("stationSlot").textContent = station.available_bike_stands;
        })
        });
        markers.push(marker);
      });
      //Cluster
      var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    });
  },

};
