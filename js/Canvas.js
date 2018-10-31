var Canvas = {
  canvas : document.getElementById('canvas'),
  context : canvas.getContext('2d'),
  radius : 5,
  dragging : false,
 
  putPoint(e) {
    if(this.dragging){
      this.context.lineWidth = radius*2
      this.context.lineTo(e.offsetX, e.offsetY);
      this.context.stroke();
      this.context.beginPath();
      this.context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
      this.context.fill();
      this.context.beginPath();
      this.context.moveTo(e.offsetX, e.offsetY);
    }
  },
 
  engage(e) {
    this.dragging = true;
    this.putPoint(e);
  },
 
  disengage() {
    this.dragging = false;
    this.context.beginPath();
  }
 
}
