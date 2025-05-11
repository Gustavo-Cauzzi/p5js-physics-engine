let bolas = [];
let caixas = [];
let botoes = [];
let sliders = [];
let abrirMenuCaixas = false;
let abrirMenuBolas = false;
let caixaFlutuante = false;
let cxFltX, cxFltY;
let countFrames = 0;
let guiCaixa;
function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    prepareGui();
    //bolas.push(new bola(width/2, height/2, 1));
    /*
    {caixas.push(new caixa 
                (random(100,500),
                 random(100,500),
                 random(0,200),
                 random(0,200),
                 5));
    
    caixas.push(new caixa 
                (random(100,500),
                 random(100,500),
                 random(0,200),
                 random(0,200),
                 5));}
                 */// Aleatório
    /*
    {caixas.push(new caixa 
                (100,
                 400,
                 200,
                 100,
                 10));
     caixas.push(new caixa 
                (width-100,
                 300,
                 200,
                 50,
                 1));
    caixas[0].setVel(createVector(10,0));
    caixas[1].setVel(createVector(-1,0));
    caixas[0].setAngVel(0.001);
    caixas[1].setAngVel(-0.001);} 
    */// teste Colisão Resolução
    caixas.push(new caixa(width-200,300,100,200,5));
    caixas[0].setVel(createVector(0,2));
    //caixas[0].setAngVel(0.03);
    caixas[0].setAngle(-PI/3);
   
    
    //caixas.pop();
    //caixas.pop();
}

function draw(){
    background(0);
    drawBackground();
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
    for (let caixa of caixas) {
        //caixa.checkWall();
        caixa.update();
        caixa.show();
    }
    

    let x = 0;
    let y = 0;
    while(x < caixas.length){
        while(y < caixas.length){
            caixas[x].intersects(caixas[y]);
            y++;
        }   
        x++;
    }
    
    
    x = 0;
    y = 0;
    while(x < bolas.length){
        while(y < bolas.length){
            if(bolas[x].pos.x <= bolas[y].pos.x){
                bolas[x].intersects(bolas[y]);
            }else{
                bolas[y].intersects(bolas[x]);
            }
            y++;
        }   
        y = 0;
        x++;
    }
    if(abrirMenuCaixas){
        sliders[0].visible = true;
        sliders[1].visible = true;
        botoes[1].setVisible(true);
        botoes[2].setVisible(true);
        menuCaixas();
    }
    if(abrirMenuBolas){
        sliders[2].visible = true;
        botoes[4].setVisible(true);
        menuBolas();
    }
    if(caixaFlutuante){
        strokeWeight(5);
        stroke(200);
        fill(100);
        rectMode(CENTER);
        rect(mouseX,mouseY,cxFltX,cxFltY);
        countFrames++;
    }
    
    for(let botao of botoes){
        botao.show();
    }
}

function menuCaixas(){
    let w4 = width/4;
    let h4 = height/4;
    stroke("#334475");
    fill("#5398CD");
    strokeWeight(3);
    rectMode(CORNER);
    rect(w4,h4,width/2,height/2,30);
    noStroke();
    fill("#334475");
    textSize(32);
    text("Nova Caixa",w4+10,h4-10);
    text("Comprimento:",w4+20,h4+50);
    text(""+sliders[0].val,w4+225,h4+50);
    text("Altura:",w4+20,h4+150);
    text(""+sliders[1].val,w4+111,h4+150);
    textSize(15);
    fill("#25325A");
    //comprimento
    text("Min:",w4+15,h4+70);
    text("50",w4+19,h4+90);
    text("Max:",width*3/4-45,h4+70);
    text("300",width*3/4-43,h4+90);
    //altura
    text("Min:",w4+15,h4+170);
    text("50",w4+19,h4+190);
    text("Max:",width*3/4-45,h4+170);
    text("300",width*3/4-43,h4+190);
    drawGui();
    if(sliders[0].val != undefined && sliders[1].val != undefined){
        cxFltX = sliders[0].val;
        cxFltY = sliders[1].val;   
    }
}


function menuBolas(){
    //"#337636","#A5E1A5"
    let w4 = width/4;
    let h4 = height/4;
    stroke("#337636");
    fill("#A5E1A5");
    strokeWeight(3);
    rectMode(CORNER);
    rect(w4,h4,width/2,height/2,30);
    textSize(32);
    noStroke();
    fill("#337636");
    text("Nova Bola",w4+10,h4-10);
    drawGui();
}

function prepareGui(){
    guiCaixa = createGui();
    sliders.push(createSlider("Slider X",50+width/4,60+height/4,width/2-100,32,50,300));
    sliders.push(createSlider("Slider Y",50+width/4,160+height/4,width/2-100,32,50,300));
    
    
    for(let s of sliders){
        s.setStyle({
            fillBg: color("#BCCEFF"),
            fillBgHover: color("#BCCEFF"),
            fillBgActive: color("#BCCEFF"),
            fillTrack: color("#617ECE"),    
            fillTrackHover: color("#7599FD"),
            fillTrackActive: color("#7599FD"),    
            strokeTrack: color("#334475"),
            strokeTrackHover: color("#5269B6"),
            strokeTrackActive: color("#5269B6")
        })
        s.isInteger = true;
        s.visible = false;
    }
    
    botoes.push(new botao(width-125,10,100,50,"Nova Caixa","#334475","#A5B5E1"));//0
    botoes.push(new botao(width/4+25,height*3/4-70,135,50,"Adicionar Caixa","#334475","#A5B5E1"));//1
    botoes.push(new botao(width*3/4-100,height*3/4-70,80,50,"Cancelar","#334475","#A5B5E1"));//2
    botoes[1].setVisible(false); //adicionar caixa - nova caixa menu
    botoes[1].setFillHover("#B6C7F6");
    botoes[2].setVisible(false); //cancelar - nova caixa menu
    botoes[2].setFillHover("#B6C7F6");
    
    //BOLAS ------------ \/ \/
    sliders.push(createSlider("Slider R",50,20,width/2-100,32,50,300));
    sliders[2].visible = false;
    botoes.push(new botao(width-125,70,100,50,"Nova Bola","#337636","#A5E1A5"));//3
    botoes.push(new botao(width*3/4-100,height*3/4-70,80,50,"Cancelar","#337636","#A5E1A5"));//4
    botoes[3].setTextCoord(botoes[3].textX+4); // Nova Bola
    botoes[4].setVisible(false);
    
}

function mouseClicked(){
    if(caixaFlutuante && countFrames >= frameRate()/2){
        caixas.push(new caixa(mouseX,mouseY,cxFltX,cxFltY,1));
        caixaFlutuante = false;
        countFrames = 0;
        sliders[0].visible = false;
        sliders[1].visible = false;
    }
    
    if(botoes[0].isPressed()){ //botao nova caixa
        abrirMenuCaixas = true;
        if(abrirMenuBolas){
            abrirMenuBolas = false;
            sliders[2].visible = false;
            botoes[4].setVisible(false);
        }
    }else if(botoes[1].isPressed()){ // botao nova caixa - adicionar caixa
        abrirMenuCaixas = false;
        caixaFlutuante = true;
        botoes[1].setVisible(false);
        botoes[2].setVisible(false);
    }else if(botoes[2].isPressed()){ // botao nova caixa - cancelar
        abrirMenuCaixas = false;
        botoes[1].setVisible(false);
        botoes[2].setVisible(false);
        botoes[4].setVisible(false);
        for(let s of sliders){
            s.visible = false;
        }
    }else if(botoes[3].isPressed()){ // botao nova bola
        abrirMenuBolas = true;
        if(abrirMenuCaixas){
            abrirMenuCaixas = false;
            botoes[1].setVisible(false);
            botoes[2].setVisible(false);
            sliders[0].visible = false;
            sliders[1].visible = false;
        }
    }
}



function drawBackground(){
    background("#22B7FE");
    stroke(150,75,0);
    fill(150,75,0);
    rect(0,height-100,width,height-100);
    //stroke("#7CFC00");
    //rect(0,height-100,width,30);
    stroke("#00cc00");
    fill("#00cc00");
    rect(0,height-100,width,20);
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
        vezes = 1;
    }else if(keyCode === 79){//o
        let forca = createVector(20,10);
        bolas.push(new bola(50,100,2,"#FF0000"))
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode === 80){   //p
        let forca = createVector(-10,10);
        bolas.push(new bola(width-50,100,5,"#0000FF"));
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode === 73){//i
        let forca = createVector(-1,3);
        bolas.push(new bola(width-100,height-200,5,"#b4d455"));
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode === 85){//u
        let forca = createVector(1,3);
        bolas.push(new bola(width-170,height-200,5,"#f42069"));
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode === 75){//k
        let forca = createVector(0.2,0);
        bolas.push(new bola(10,height,1,"#00A648"));
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode === 76){//l
        let forca = createVector(-0.2,0);
        bolas.push(new bola(75,height,1,"#D1CA00"));
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
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
        bolas.push(new bola(width-100,height/2,3,"#00D86C"));
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode == 77){//m
        let forca = createVector(10,0);
        bolas.push(new bola(100,height/2,3,"#D800AD"));
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode == 90){//z
        caixas[caixas.length-1].addAngle(PI/6);
    }else if(keyCode == 88){//x
        caixas[caixas.length-2].addAngle(PI/6);
    }else if(keyCode == 187){// =
        caixas.pop();
    }else if(keyCode === 82){// r
        if(rotacionarCaixa1){
            rotacionarCaixa1 = false;
        }else{
            rotacionarCaixa1 = true;
        }
    }
}