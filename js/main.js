//Tableau des textes et images
var picArray = ["images/tuto1.png", "images/tuto2.png", "images/tuto3.png"];
var textArray = ["Sélectionnez une station à l'aide de la carte ci-dessous","A droite s'affichent les informations de la stations ainsi que le formulaire de réservation", "Signez pour valider votre réservation, elle expirera dans 20 minutes"];

//initialisation des objets
var map = Object.create(GoogleMap);
var slideShow = Object.create(Diaporama);
var timer = Object.create(Timer);
var canvas = Object.create(Canvas);

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

//Affiche le panneau de signature et de validation avec le bouton reservation
var reservation = document.getElementById("reservationButton");
reservation.addEventListener("click", function() {
  if ((nomSave.value == "") || (prenomSave.value == "")) {
    alert("Veuillez remplir tout les champs");
  }
  if (document.getElementById("stationBike").textContent == "0") {
  alert("Il n'y a plus de vélo disponibles dans cette station"); 
  } else {
    document.getElementById("signature").style.display = "block";
  }
});

  //Annule la reservation
  var annulerreservation = document.getElementById("annulerReservation");
  annulerreservation.addEventListener("click", function() {
  sessionStorage.clear();
  timer.stopTimer();
  document.getElementById("reservationText").textContent = "";
  document.getElementById("decompte").textContent = "";
  document.getElementById("compteur").textContent = "Réservation annuler";
  document.getElementById("annulerReservation").style.visibility = "hidden";
  document.getElementById("map").style.width = "100%" ;
  });

//Action lorsqu'on appuie sur valider
var valider = document.getElementById("valider");
valider.addEventListener("click", function() {
  var name = document.getElementById("stationName").textContent;
  document.getElementById("signature").style.display = "none";
  document.getElementById("reservationText").textContent = "Vélo réservé à la station " + name + " par " + myName + " " + myFirstName;
  document.getElementById("decompte").textContent = "Temps restant"
  document.getElementById("compteur").style.visibility = "visible";
  document.getElementById("annulerReservation").style.visibility = "visible";
  document.getElementById("info").style.display = "none";
  document.getElementById("map").style.width = "100%" ;
  sessionStorage.setItem("stationName", name);
  timer.stopTimer();
  timer.startTimer(0, 200);
});

//Verifications d'une reservation lors d'un rafraichissement
if (sessionStorage.getItem("second")) {
  var monTexte = sessionStorage.getItem("stationName");
  document.getElementById("compteur").textContent = sessionStorage.getItem("minute")+ " : " +sessionStorage.getItem("second");
  document.getElementById("reservationText").textContent = "Vélo réservé à la station " + monTexte + " par " + myName + " " + myFirstName;
  document.getElementById("decompte").textContent = "Temps restant"
  document.getElementById("compteur").style.visibility = "visible";
  document.getElementById("info").style.display = "none";
  document.getElementById("map").style.width = "100%" ;
  timer.startTimer(sessionStorage.getItem("second"), sessionStorage.getItem("minute"));
}

//Ecoute des evenement du canvas
addEventListener('mousedown', canvas.engage);
addEventListener('mousemove', canvas.putPoint);
addEventListener('mouseup', canvas.disengage);
addEventListener('mouseout', canvas.disengage);

addEventListener('touchstart', canvas.engage);
addEventListener('mousemove', canvas.putPoint);
addEventListener('touchend', canvas.disengage);
addEventListener('touchleave', canvas.disengage);

//initialisation de la googleMap
function initMap() {
  GoogleMap.initBikeMap();
};