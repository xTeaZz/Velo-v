picArray = ["images/velov1.jpg", "images/velov2.jpg", "images/velov3.jpg"];
textArray = ["test1","test2", "test3"]
var Diaporama = {
  init: function(tableauImage, tableauTexte){
    this.tabPic = tableauImage;
    this.tabText = tableauTexte;
    this.indice = 0;
    document.getElementById('slidepic').src = this.tabPic[this.indice];
    document.getElementById('caption').textContent = this.tabText[this.indice];
  },

   transition: function(deplacement) {
    this.indice = this.indice + deplacement;
    if (this.indice < 0) {
      this.indice = 0;
    }
    if (this.indice > (this.tabPic.length - 1)) {
      this.indice = this.tabPic.length - 1;
    }
    document.getElementById('slidepic').src = this.tabPic[this.indice];
    document.getElementById('caption').textContent = this.tabText[this.indice];
  }
};

var slideShow = Object.create(Diaporama);
slideShow.init(picArray, textArray);

document.addEventListener("keydown", function(e) {
  if (e.keyCode == '37') {
    slideShow.transition(-1)
  } else if (e.keyCode == '39') {
    slideShow.transition(1)
  }
});

/*
boutonElt.addEventListener("click", transition(img = 1));
boutonElt.addEventListener("click", transition(img = 0));
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
