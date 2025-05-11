
let bola1;
let bola2;

function setup(){
    createCanvas(windowWidth, windowHeight);
    bola1 = new bola(windowWidth/2, windowHeight/2);
}

function draw(){
    background(0);
    bola1.show();
    bola1.update();
    
}