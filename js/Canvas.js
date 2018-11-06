var Canvas = {

  init : function() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.radius = 5;
    this.dragging = false;
    this.context.lineWidth = this.radius*2;
  },
 
  //Dessine
  putPoint : function(e) {
    if(this.dragging){
      //Connecte les 2 derniers points entre eux
      this.context.lineTo(e.offsetX, e.offsetY);
      //Dessine le chemin
      this.context.stroke();
      //Permet de commencer un nouveau chemin
      this.context.beginPath();
      //Place un point 
      this.context.arc(e.offsetX, e.offsetY, this.radius, 0, Math.PI*2);
      //Remplie le point
      this.context.fill();
      this.context.beginPath();
      //Déplace les points
      this.context.moveTo(e.offsetX, e.offsetY);
    }
  },
 
  //Détecte si nous sommes entrain de dessiner
  engage : function() {
    this.dragging = true;
  },
 
  //Arrete le dessin
  disengage : function() {
    this.dragging = false;
    this.context.beginPath();
  },

  //Remet à 0 le canvas
  clearContext : function() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }
 
}
