var Canvas = {

  init : function() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.radius = 5;
    this.dragging = false;
    this.context.lineWidth = this.radius*2;
  },
 
  putPoint : function(e) {
    if(this.dragging){
      this.context.lineTo(e.offsetX, e.offsetY);
      this.context.stroke();
      this.context.beginPath();
      this.context.arc(e.offsetX, e.offsetY, this.radius, 0, Math.PI*2);
      this.context.fill();
      this.context.beginPath();
      this.context.moveTo(e.offsetX, e.offsetY);
    }
  },
 
  engage : function() {
    this.dragging = true;
  },
 
  disengage : function() {
    this.dragging = false;
    this.context.beginPath();
  },

  clearContext : function() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }
 
}
