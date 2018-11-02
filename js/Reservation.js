var Reservation = {

    cancel : function () {
        document.getElementById("reservationText").textContent = "";
        document.getElementById("decompte").textContent = "";
        document.getElementById("compteur").textContent = "Réservation annuler";
        document.getElementById("annulerReservation").style.visibility = "hidden";
        document.getElementById("map").style.width = "100%" ;
    },

    verification : function () {
        document.getElementById("compteur").textContent = sessionStorage.getItem("minute")+ " : " +sessionStorage.getItem("second");
        document.getElementById("reservationText").textContent = "Vélo réservé à la station " + monTexte + " par " + myName + " " + myFirstName;
        document.getElementById("decompte").textContent = "Temps restant"
        document.getElementById("compteur").style.visibility = "visible";
        document.getElementById("info").style.display = "none";
        document.getElementById("map").style.width = "100%" ;
    },

    validate : function () {
        document.getElementById("signature").style.display = "none";
        document.getElementById("reservationText").textContent = "Vélo réservé à la station " + name + " par " + myName + " " + myFirstName;
        document.getElementById("decompte").textContent = "Temps restant"
        document.getElementById("compteur").style.visibility = "visible";
        document.getElementById("annulerReservation").style.visibility = "visible";
        document.getElementById("info").style.display = "none";
        document.getElementById("map").style.width = "100%" ;
    }
}