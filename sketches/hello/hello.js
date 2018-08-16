var font;
var vehicles = [];

function preload() {
  font = loadFont('./fonts/Avenir-Black.ttf');
}

function setup() {
  //setup code
  createCanvas(windowWidth, 500);
  if (vehicles.length == 0) {
    textFont(font);
    textSize(170);

    var points = font.textToPoints('Hello', windowWidth / 2, windowHeight / 2);

    for (var i = 0; i < points.length; i++) {
      var pt = points[i];
      var v = new Vehicle(pt.x, pt.y);
      vehicles.push(v);
    }
  }
}

function draw() {
  background(255, 0, 200);
  //drawing code
   for (var i = 0; i < vehicles.length; i++) {
     var v = vehicles[i];
     v.update();
     v.steer();
     v.show();
   }
}

function windowResized() {
  resizeCanvas(windowWidth, 500);
}
