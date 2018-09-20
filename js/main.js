picArray = ["images/velov1.jpg", "images/velov2.jpg", "images/velov3.jpg"];
textArray = ["test1","test2", "test3"];

var slideShow = Object.create(Diaporama);
slideShow.init(picArray, textArray);
interval = setInterval(slideShow.transition(1), 5000);
slideShow.initInterval(interval);
/*slideShow.automatic();*/
document.addEventListener("keydown", function(e) {
  if (e.keyCode == '37') {
    slideShow.transition(-1)
  } else if (e.keyCode == '39') {
    slideShow.transition(1)
  }
});

var buttonleft = document.getElementById("buttonleft");
var buttonright = document.getElementById("buttonright");

buttonleft.addEventListener("click", function() {
  slideShow.transition(-1)
});
buttonright.addEventListener("click", function() {
  slideShow.transition(1)
});

/*
var mapwindow = document.getElementById("map");
window.addEventListener("scroll", function() {
  mapwindow.scrollIntoView();
});
*/
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=65af477a79c3c0eca50cdd4a95bac21e8e17095b", function(reponse) {
  var stations = JSON.parse(reponse);

});
