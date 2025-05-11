function setup(){
    createCanvas(500,500);
}

function draw() {
  background(240);

  let v0 = createVector(50, 50);
  let v1 = createVector(mouseX-50 , mouseY-50);

  drawArrow(v0, v1, 'red');
  v1.normalize();
  drawArrow(v0, v1.mult(35), 'blue');

  noFill();
  ellipse(50, 50, 35 * 2);
}

// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}