var Canvas = {

    area : document.getElementById('canvas'),
    context : canvas.getContext('2d'),
    var canvas = document.getElementById('canvas');
 var context = canvas.getContext('2d');
 var radius = 5;
 var dragging = false;
 context.lineWidth = radius*2;

  function putPoint(e) {
    if(dragging){
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      context.beginPath();
      context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
      context.fill();
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
    }
 }

 function engage(e) {
   dragging = true;
   putPoint(e);
 }

 function disengage() {
  dragging = false;
  context.beginPath();
}

 canvas.addEventListener('mousedown', engage);
 canvas.addEventListener('mousemove', putPoint);
 canvas.addEventListener('mouseup', disengage);


};

