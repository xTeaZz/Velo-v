//Tableau des textes et images
var picArray = ["images/tuto1.png", "images/tuto2.png", "images/tuto3.png"];
var textArray = ["Sélectionnez une station à l'aide de la carte ci-dessous","A droite s'affichent les informations de la stations ainsi que le formulaire de réservation", "Signez pour valider votre réservation, elle expirera dans 20 minutes"];

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
  context.clearRect(0, 0, canvas.width, canvas.height);
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

var myName = localStorage.getItem("nom");
var myFirstName = localStorage.getItem("prenom");

//Action lorsqu'on appuie sur valider
var valider = document.getElementById("valider");
valider.addEventListener("click", function() {
  var name = document.getElementById("stationName");
  var monTexte = name.textContent;
  document.getElementById("signature").style.display = "none";
  document.getElementById("reservationText").textContent = "Vélo réservé à la station " + monTexte + " par " + myName + " " + myFirstName;
  document.getElementById("decompte").textContent = "Temps restant"
  document.getElementById("compteur").style.visibility = "visible";
  sessionStorage.setItem("stationName", monTexte);
  timer.stopTimer();
  timer.startTimer(0, 20);
  console.log(document.getElementById("canvas"));
});

if (sessionStorage.getItem("second")) {
  var monTexte = sessionStorage.getItem("stationName");
  document.getElementById("compteur").textContent = sessionStorage.getItem("minute")+ " : " +sessionStorage.getItem("second");
  document.getElementById("reservationText").textContent = "Vélo réservé à la station " + monTexte + " par " + myName + " " + myFirstName;
  document.getElementById("decompte").textContent = "Temps restant"
  document.getElementById("compteur").style.visibility = "visible";
  timer.startTimer(sessionStorage.getItem("second"), sessionStorage.getItem("minute"));
}

 var canvas = document.getElementById('canvas');
 var context = canvas.getContext('2d');
 var radius = 5;
 var dragging = false;
 context.lineWidth = radius*2;

  function putPoint(e) {
    if(dragging){
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      context.beginPath();
      context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
      context.fill();
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
    }
 }

 function engage(e) {
   dragging = true;
   putPoint(e);
 }

 function disengage() {
  dragging = false;
  context.beginPath();
}

 canvas.addEventListener('mousedown', engage);
 canvas.addEventListener('mousemove', putPoint);
 canvas.addEventListener('mouseup', disengage);
 canvas.addEventListener('mouseout', disengage);

//initialisation de la googleMap
function initMap() {
  GoogleMap.initBikeMap();
};