var Timer = {

    stopTimer() {
      clearInterval(this.timer);
    },
  
    startTimer() {
      var second = Math.floor(60);
      var minute = Math.floor(20);
      var titre = document.getElementById("compteur");
      this.decompte = setInterval( () => {
        if (second === 0 && minute !== 0) {
          minute--;
          second = 59;
          document.getElementById("compteur").textContent = minute + " : " + second;
        } else if (second <= 0 && minute <= 0) {
          titre.textContent = "Location vélo expirée";
          this.stopTimer();
        } else {
          second--;
        }
      }, 1000);
    },
  
  }