var Diaporama = {
  init: function(tableauImage, tableauTexte){
    this.tabPic = tableauImage;
    this.tabText = tableauTexte;
    this.indice = 0;
    document.getElementById('slidepic').src = this.tabPic[this.indice];
    document.getElementById('caption').textContent = this.tabText[this.indice];
  },

  initInterval: function(interval) {
    this.interval = interval;
  },

  automatic: function() {
    this.transition(+1);
    clearInterval(this.interval);
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
