let bolas = [];
let caixas = [];

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
        for (let caixa of caixas){
            caixa.applyForce(wind);
        }
    }
    
    for (let bola of bolas) {
        bola.update();
        bola.applyWeight();
        bola.edges();
        bola.show();
    }
    for (let caixa of caixas){
        caixa.update();
        caixa.applyWeight();
        caixa.edges();
        caixa.show();
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
    }else if(keyCode === UP_ARROW){
        caixas.push(new Caixa(width/2,height/2,3));
    }
}