let b;
function setup(){
    createCanvas(windowWidth, windowHeight);
    b = new bola;
}

function draw(){
    background(0);
    b.show();
    b.move();
    b.bounce();
}
