let bolas = [];

function setup(){
    createCanvas(windowWidth, windowHeight);
    bolas.push(new bola(random(0,width), random(0,height-100), random(1,5)));
}

function draw(){
    background(0);
    
    if(mouseIsPressed){
        let wind = createVector(0.2,0);
        for(let bola of bolas){
            bola.applyForce(wind);
        }
    }
    
    for (let bola of bolas) {
        bola.update();
        bola.applyWeight();
        bola.edges();
        bola.show();
    }

}

function keyPressed(){
    if(keyCode === DOWN_ARROW){
        bolas.push(new bola(random(0,width), random(0,height-100), random(1,5)));
    }else if(keyCode === RIGHT_ARROW){
        bolas.push(new bola(100,100,5));
    }else if(keyCode === LEFT_ARROW){
        bolas.push(new bola(200,100,2));
    }else if(keyCode === BACKSPACE){
        bolas.pop();
    }
}