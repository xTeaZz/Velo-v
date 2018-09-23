picArray = ["images/velov1.jpg", "images/velov2.jpg", "images/velov3.jpg"];
textArray = ["test1","test2", "test3"];
var map = Object.create(GoogleMap);
var slideShow = Object.create(Diaporama);
slideShow.init(picArray, textArray);
interval = setInterval(slideShow.transition(1), 5000);
slideShow.initInterval(interval);
/*slideShow.automatic();*/
document.addEventListener("keydown", function(e) {
  if (e.keyCode == '37') {
    slideShow.transition(-1)
  } else if (e.keyCode == '39') {
    slideShow.transition(1)
  }
});

var buttonleft = document.getElementById("buttonleft");
var buttonright = document.getElementById("buttonright");

buttonleft.addEventListener("click", function() {
  slideShow.transition(-1)
});
buttonright.addEventListener("click", function() {
  slideShow.transition(1)
});

function initMap() {
  GoogleMap.initBikeMap();
}
