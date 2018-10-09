var Diaporama = {
  init(tableauImage, tableauTexte){
    this.tabPic = tableauImage;
    this.tabText = tableauTexte;
    this.indice = 0;
    document.getElementById('slidepic').src = this.tabPic[this.indice];
    document.getElementById('caption').textContent = this.tabText[this.indice];
  },

carousel() {
  setInterval(() => {
    if (this.indice >= (this.tabPic.length - 1)) {
      this.transition(-this.indice);
    } else {
      this.transition(1);
    }
  }, 5000);
},

  transition(deplacement) {
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
