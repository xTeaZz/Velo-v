//Tableau des textes et images
var picArray = ["images/velov1.jpg", "images/velov2.jpg", "images/velov3.jpg"];
var textArray = ["test1","test2", "test3"];

//initialisation des objets
var map = Object.create(GoogleMap);
var slideShow = Object.create(Diaporama);
var timer = Object.create(Timer);

//initialisation du diaporama avec les textes et images en parametres + automatic
slideShow.init(picArray, textArray);
slideShow.carousel();

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

//Sauvegarde en sessionStorage du prenom
var prenomSave = document.getElementById("prenom");
if (localStorage.getItem("prenom")) {
  prenomSave.value = localStorage.getItem("prenom");
}
prenomSave.addEventListener("change", function() {
  localStorage.setItem("prenom", prenomSave.value);
});

//Sauvegarde en sessionStorage du nom
var nomSave = document.getElementById("nom");
if (localStorage.getItem("nom")) {
  nomSave.value = localStorage.getItem("nom");
}
nomSave.addEventListener("change", function() {
  localStorage.setItem("nom", nomSave.value);
});

var name = document.getElementById("stationName");
var myName = localStorage.getItem("nom");
var myFirstName = localStorage.getItem("prenom");
var monTexte = name.innerText || name.textContent;

//Action lorsqu'on appuie sur valider
var valider = document.getElementById("valider");
valider.addEventListener("click", function() {
  document.getElementById("signature").style.display = "none";
  document.getElementById("reservationText").textContent = "Vélo réservé à la station " + monTexte + " par " + myName + " " + myFirstName;
  document.getElementById("decompte").textContent = "Temps restant"
  document.getElementById("compteur").style.visibility = "visible";
  timer.stopTimer();
  timer.startTimer();
});

if (sessionStorage.getItem("time")) {
  document.getElementById("compteur").textContent = sessionStorage.getItem("time");
  document.getElementById("reservationText").textContent = "Vélo réservé à la station " + monTexte + " par " + myName + " " + myFirstName;
  document.getElementById("decompte").textContent = "Temps restant"
  document.getElementById("compteur").style.visibility = "visible";
}

//initialisation de la googleMap
function initMap() {
  GoogleMap.initBikeMap();
};