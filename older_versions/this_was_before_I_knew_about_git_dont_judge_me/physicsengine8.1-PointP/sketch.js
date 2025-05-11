let bolas = [];
let caixas = [];
let novo;
let contador = 0;
let x1,y1,x2,y2;
let ang;
function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    bolas.push(new bola(width/2, height/2, 1));
    /*caixas.push(new caixa 
                (random(100,500),
                 random(100,500),
                 random(0,200),
                 random(0,200),
                 5));*/
    caixas.push(new caixa 
                (100,
                 100,
                 100,
                 100,
                 5));
    caixas[0].setAngle(PI/3);
    /*caixas.push(new caixa 
                (random(100,500),
                 random(100,500),
                 random(0,200),
                 random(0,200),
                 5));*/
    caixas.push(new caixa 
                (200,
                 150,
                 200,
                 50,
                 5));
    caixas[1].setAngle(0);
    caixas.pop();
    caixas.pop();
}

function draw(){
    background(0);
    
    if(mouseIsPressed){
        let wind = createVector(0.2,0);
        for(let bola of bolas){
            bola.applyForce(wind);
        }
    }
    
    let abacate = new bola(50,50,3);
    
    for (let bola of bolas) {
        bola.update();
        bola.applyWeight();
        bola.edges();
        bola.show();
    }
    for (let caixa of caixas) {
        caixa.update();
        //bola.applyWeight();
        //bola.edges();
        caixa.show();
    }

    let x = 0;
    let y = 0;
    
   for (let caixa1 of caixas) {
        for (let caixa2 of caixas) {
            caixa1.intersects(caixa2);
        }
    }
    /*while(x < caixas.length){
        while(y < caixas.length){
            caixas[x].intersects(caixas[y]);
            y++;
        }   
        x++;
    }*/
    
    x = 0;
    y = 0;
    while(x < bolas.length){
        while(y < bolas.length){
            //console.log("x: ",x);
            //console.log("y: ",y);
            if(bolas[x].pos.x <= bolas[y].pos.x){
                if(bolas[x].intersects(bolas[y])){
                    
                    //console.log("-");
                }    
            }else{
                if(bolas[y].intersects(bolas[x])){
                    
                    //console.log("-");
                }    
            }
            
            y++;
        }   
        y = 0;
        x++;
    }
    if(caixas[1] != undefined){
        caixas[1].addAngle(0.1); 
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
        for(let bola of bolas){
            let praCima = createVector(random(1*bola.m,5*bola.m),random(5*bola.m,20*bola.m));
            bola.applyForce(praCima);
        }
    }else if(keyCode === 79){//o
        let forca = createVector(20,10);
        novo = new bola(50,100,2,"#FF0000")
        novo.applyForce(forca);
        bolas.push(novo);
    }else if(keyCode === 80){   //p
        let forca = createVector(-10,10);
        novo = new bola(width-50,100,5,"#0000FF");
        novo.applyForce(forca);
        bolas.push(novo);
    }else if(keyCode === 73){//i
        let forca = createVector(-1,3);
        novo = new bola(width-100,height-200,5,"#b4d455");
        novo.applyForce(forca);
        bolas.push(novo);
    }else if(keyCode === 85){//u
        let forca = createVector(1,3);
        novo = new bola(width-170,height-200,5,"#f42069");
        novo.applyForce(forca);
        bolas.push(novo);
    }else if(keyCode === 75){//k
        let forca = createVector(0.2,0);
        novo = new bola(10,height,1,"#00A648");
        novo.applyForce(forca);
        bolas.push(novo);
    }else if(keyCode === 76){//l
        let forca = createVector(-0.2,0);
        novo = new bola(75,height,1,"#D1CA00");
        novo.applyForce(forca);
        bolas.push(novo);
    }else if(keyCode === 81){//q
        for (let bola of bolas) {
            bola.vel.mult(0);
        }
    }else if(keyCode === 87){//w
        for (let bola of bolas) {
            bola.vel.mult(0.80);
        }
    }else if(keyCode === 69){//e
        for (let bola of bolas) {
            bola.vel.mult(1.20);
        }
    }else if(keyCode == 78){//n
        let forca = createVector(-10,0);
        novo = new bola(width-100,height/2,3,"#00D86C");
        novo.applyForce(forca);
        bolas.push(novo);
    }else if(keyCode == 77){//m
        let forca = createVector(10,0);
        novo = new bola(100,height/2,3,"#D800AD");
        novo.applyForce(forca);
        bolas.push(novo);
    }else if(keyCode == 90){//z
        caixas[caixas.length-1].addAngle(PI/6)         ;
    }else if(keyCode == 88){//x
        caixas[caixas.length-2].addAngle(PI/6)         ;
    }else if(keyCode == 187){// =
        caixas.pop();
    }
    
}

function mousePressed(){
    if(x1 == undefined || x1 == 0){
        x1 = mouseX;
        y1 = mouseY;
    }else{
        x2 = mouseX - x1;
        y2 = mouseY - y1;
        caixas.push(new caixa(x1,y1,x2,y2,5));
        x1 = 0;
    }
    
}