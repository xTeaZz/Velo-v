//Tableau des textes et images
picArray = ["images/velov1.jpg", "images/velov2.jpg", "images/velov3.jpg"];
textArray = ["test1","test2", "test3"];

//initialisation des objets
var map = Object.create(GoogleMap);
var slideShow = Object.create(Diaporama);

//initialisation du diaporama avec les textes et images en parametre
slideShow.init(picArray, textArray);

//Ecoute l'utilisation des fleches directionnel du clavier pour changer le diaporama
document.addEventListener("keydown", function(e) {
  if (e.keyCode == '37') {
    slideShow.transition(-1)
  } else if (e.keyCode == '39') {
    slideShow.transition(1)
  }
});

//Action Diaporama lorsqu'on appuie sur le bouton gauche
var buttonleft = document.getElementById("buttonleft");
buttonleft.addEventListener("click", function() {
  slideShow.transition(-1)
});

//Action Diaporama lorsqu'on appuie sur le bouton droite
var buttonright = document.getElementById("buttonright");
buttonright.addEventListener("click", function() {
  slideShow.transition(1)
});

//Affiche le panneau de signature et de validation avec le bouton reservation
var reservation = document.getElementById("reservationButton");
reservation.addEventListener("click", function() {
  document.getElementById("signature").style.display = "block";
});

//Annule la reservation
var annuler = document.getElementById("annuler");
annuler.addEventListener("click", function() {
  document.getElementById("signature").style.display = "none";
});

//Action lorsqu'on appuie sur valider
var valider = document.getElementById("valider");
valider.addEventListener("click", function() {
  var name = document.getElementById("stationName");
  var monTexte = name.innerText || name.textContent;
  document.getElementById("reservationText").textContent = "Vélo réservé à la station " + monTexte + " par";
  document.getElementById("decompte").textContent = "Temps restant"
});

//Sauvegarde en sessionStorage du prenom
var prenomSave = document.getElementById("prenom");
if (sessionStorage.getItem("autosave")) {
  prenomSave.value = sessionStorage.getItem("autosave");
}
prenomSave.addEventListener("change", function() {
  sessionStorage.setItem("autosave", prenomSave.value);
});

//Sauvegarde en sessionStorage du nom
var nomSave = document.getElementById("nom");
if (sessionStorage.getItem("autosave")) {
  nomSave.value = sessionStorage.getItem("autosave");
}
nomSave.addEventListener("change", function() {
  sessionStorage.setItem("autosave", nomSave.value);
});

var compteurElt = document.getElementById("compteur");
// Diminue le compteur jusqu'à 0
function diminuerCompteur() {
    // Conversion en nombre du texte du compteur
    var compteur = Number(compteurElt.textContent);
    if (compteur > 1) {
        compteurElt.textContent = compteur - 1;
    } else {
        // Annule l'exécution répétée
        clearInterval(intervalId);
        // Modifie le titre de la page
        var titre = document.getElementById("titre");
        titre.textContent = "BOUM !!!";
    }
}
// Appelle la fonction diminuerCompteur toutes les secondes (1000 millisecondes)
var intervalId = setInterval(diminuerCompteur, 1000);

//initialisation de la googleMap
function initMap() {
  GoogleMap.initBikeMap();
}
