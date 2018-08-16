function Vehicle(x, y) {
  this.position = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector();
  this.r = 8;
  this.maxspeed = 10;
  this.maxforce = 0.9;
}

Vehicle.prototype.update = function() {
  this.position.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.acceleration.mult(0);
}

Vehicle.prototype.show = function() {
  stroke(255);
  strokeWeight(8);
  point(this.position.x, this.position.y);
}

Vehicle.prototype.applyForce = function(f) {
  this.acceleration.add(f);
}

Vehicle.prototype.arrive = function(target) {
  var desiredVelocity = p5.Vector.sub(target, this.position); //streering
  var distance = desiredVelocity.mag();
  var speed = this.maxspeed;
  if (distance < 100) {
    var speed = map(distance, 0, 100, 0, this.maxspeed);
  }
  desiredVelocity.setMag(speed);
  var steer = p5.Vector.sub(desiredVelocity, this.velocity);
  steer.limit(this.maxforce);
  return steer; //steer = desired - vel
}

Vehicle.prototype.flee = function(target) {
  var desiredVelocity = p5.Vector.sub(target, this.position); //streering
  var d = desiredVelocity.mag();
  if (d < 250) {
    desiredVelocity.setMag(this.maxspeed);
    desiredVelocity.mult(-1);//go opposite direction from the target
    var steer = p5.Vector.sub(desiredVelocity, this.velocity);
    steer.limit(this.maxforce);
    if (d < 50) {
      return steer.mult(0.7); //steer = desired - vel
    } else {
      return steer.mult(0.1);
    }
  } else {
    return createVector(0,0);
  }
}

Vehicle.prototype.steer = function() {
  var arrive = this.arrive(this.target);
  arrive.mult(1);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);
  flee.mult(5); //Increase flee force relative to arrive

  this.applyForce(flee);
  this.applyForce(arrive);

}
