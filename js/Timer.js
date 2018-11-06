var Timer = {

    //Reset le compte a rebours
    stopTimer() {
      clearInterval(this.decompte);
    },
  
    //Lance le compte a rebours
    startTimer(second, minute) {
      var titre = document.getElementById("compteur");
      this.decompte = setInterval( () => {
        if (second <= 0 && minute !== 0) {
          minute--;
          second = 59;
        } else if (second <= 0 && minute <= 0) {
          sessionStorage.clear();
          this.stopTimer();
          document.getElementById("reservationText").textContent = "";
          titre.textContent = "Réservation vélo expirée";
        } else {
          second--;
          titre.textContent = minute + " : " + second;
          sessionStorage.setItem("minute", minute);
          sessionStorage.setItem("second", second);
        }
      }, 1000);
    },
  
  }
