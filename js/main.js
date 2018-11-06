//Tableau des textes et images
var picArray = ["images/tuto1.png", "images/tuto2.png", "images/tuto3.png"];
var textArray = ["Sélectionnez une station à l'aide de la carte ci-dessous","A droite s'affichent les informations de la stations ainsi que le formulaire de réservation", "Signez pour valider votre réservation, elle expirera dans 20 minutes"];

//initialisation des objets
var map = Object.create(GoogleMap);
var slideShow = Object.create(Diaporama);
var timer = Object.create(Timer);
var canvas = Object.create(Canvas);
var reservationClass = Object.create(Reservation);

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
  canvas.clearContext();
});

//Sauvegarde en localStorage du prenom
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

var canvasTest = 0;

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
    canvas.init();
    var canvasArea = document.getElementById("canvas");
    canvasArea.addEventListener('mousedown', function(e) {
      canvasTest = 1;
      canvas.engage();
      canvas.putPoint(e);
    });
    canvasArea.addEventListener('mousemove', function(e) {
      canvas.putPoint(e);
    });
    canvasArea.addEventListener('mouseup', function() {
      canvas.disengage();
    });
    canvasArea.addEventListener('mouseout', function() {
      canvas.disengage()
    });

    canvasArea.addEventListener('touchstart', function(e) {
      canvasTest = 1;
      canvas.engage()
      canvas.putPoint(e);
    });
    canvasArea.addEventListener('touchmove', function(e) {
      canvas.putPoint(e)
    });
    canvasArea.addEventListener('touchend', function() {
      canvas.disengage()
    });
    canvasArea.addEventListener('touchleave', function() {
      canvas.disengage()
    });
  }
});

  //Annule la reservation
  var annulerreservation = document.getElementById("annulerReservation");
  annulerreservation.addEventListener("click", function() {
  sessionStorage.clear();
  timer.stopTimer();
  reservationClass.cancel();
  });

//Action lorsqu'on appuie sur valider
var valider = document.getElementById("valider");
valider.addEventListener("click", function() {
  if(canvasTest == 0) {
    alert("Veuillez signez votre réservation");
  } else {
    reservationClass.validate();
    timer.stopTimer();
    timer.startTimer(0, 20);
  }
});

//Verifications d'une reservation lors d'un rafraichissement
if (sessionStorage.getItem("second")) {
  reservationClass.verification(sessionStorage.getItem("stationName"));
  timer.startTimer(sessionStorage.getItem("second"), sessionStorage.getItem("minute"));
}

//initialisation de la googleMap
function initMap() {
  GoogleMap.initBikeMap();
};