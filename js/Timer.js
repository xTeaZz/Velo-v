var Timer = {

    stopTimer() {
      clearInterval(this.decompte);
    },
  
    startTimer() {
      var second = Math.floor(0);
      var minute = Math.floor(20);
      var titre = document.getElementById("compteur");
      this.decompte = setInterval( () => {
        if (second === 0 && minute !== 0) {
          minute--;
          second = 59;
        } else if (second <= 0 && minute <= 0) {
          titre.textContent = "Location vélo expirée";
          this.stopTimer();
        } else {
          second--;
          document.getElementById("compteur").textContent = minute + " : " + second;
        }
      }, 1000);
    },
  
  }