let bolas = [];
let caixas = [];
let botoes = [];
let sliders = [];
let checkboxes = [];
let botoesPrincipais = [];
let slidersInfoY = [];
let abrirMenuCaixas = false;
let abrirMenuBolas = false;
let abrirMenuConfig = false;
let caixaFlutuante = false;
let bolaFlutuante = false;
let mostrarAtalhos = false;
let transicaoBotoesFeita = false;
let btnEsconderAcao = false;
let botoesEscondido = false;
let botaoEsconderFeito = false;
let showBallVel = false;
let fps = false;
let gChanged = false;
let prevBolasCount;
let countFrames = 0;
let gui;

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    prepareGui();
    g = createVector(0,0.2);
}

function draw(){
    drawBackground();
    for (let bola of bolas) {
        bola.applyWeight();
        bola.update();
        bola.edges();
        bola.show();
        if (showBallVel) bola.showVel();
    }
    for (let caixa of caixas) {
        caixa.update();
        caixa.show();
    }
    for(let x of caixas){
        for(let y of caixas){
            x.intersects(y);
        }    
    }    
    for(let x of bolas){
        for(let y of bolas){
            if(x.pos.x <= y.pos.x){
                x.intersects(y);
            }else{
                y.intersects(x);
            }
        }    
    }
    
    if(abrirMenuCaixas){
        setSliderToVisible([0,1]);
        botoes[2].setVisible(true);
        botoes[3].setVisible(true);
        menuCaixas();
    }else if(abrirMenuBolas){
        setSliderToVisible(2);
        botoes[4].setVisible(true);
        botoes[5].setVisible(true);
        menuBolas();
    }else if(abrirMenuConfig){
        botoes[9].setVisible(true);
        botoes[10].setVisible(true);
        botoes[11].setVisible(true);
        checkboxes[0].setVisible(true);
        setSliderToVisible(3);
        menuConfig();
    }
    if(caixaFlutuante){
        strokeWeight(5);
        stroke(200);
        fill(100);
        rectMode(CENTER);
        rect(mouseX, mouseY, sliders[0].val, sliders[1].val);
        countFrames++;
    }
    if(bolaFlutuante){
        stroke("#337636");
        fill("#7CCB7C");
        circle(mouseX,mouseY,sliders[2].val);    
        countFrames++;
    }
    if(mostrarAtalhos){
        atalhos();
    }
    if(fps){
        mostrarFps();
    }
    if(btnEsconderAcao){
        if (!botoesEscondido) {
            botoes[7].setText("Mostrar\n  Mais\n     \\/");
            botoes[7].setTextCoord(13);
            if(!transicaoBotoesFeita){
                for(let indice of botoesPrincipais){
                    botoes[indice].y -= 16;
                }
            }
            if(!botaoEsconderFeito){
                botoes[7].y -= 15;
            }
            if(!botaoEsconderFeito && botoes[7].y <= 10){
                transicaoBotoesFeita = true
                botaoEsconderFeito = true;
            }
            if(transicaoBotoesFeita && botaoEsconderFeito){
                botoesEscondido = true;
                btnEsconderAcao = false;
                transicaoBotoesFeita = false;
                botaoEsconderFeito = false;          
            }
        }else{
            botoes[7].setText("Mostrar\n Menos\n     /\\");
            botoes[7].setTextCoord(12,-20);
            if(!transicaoBotoesFeita){
                for(let indice of botoesPrincipais){
                    botoes[indice].y += 16;
                    botoes[indice].setVisible(true);
                }
            }
            if(!botaoEsconderFeito){
                botoes[7].y += 15;
            }
            if(!botaoEsconderFeito && botoes[7].y >= 250){
                transicaoBotoesFeita = true;
                botaoEsconderFeito = true;
            }
            if(transicaoBotoesFeita && botaoEsconderFeito){
                botoesEscondido = false;
                btnEsconderAcao = false;
                transicaoBotoesFeita = false;
                botaoEsconderFeito = false;
            }
        }
    }
    if(gChanged){
        for(let bola of bolas){
            bola.gravity = createVector(0,round(sliders[3].val,1));
        }
    }
    if(mouseIsPressed){
        let wind = createVector(0.2,0);
        for(let bola of bolas){
            bola.applyForce(wind);
        }
    }
    for(let botao of botoes){
        botao.show();
    }
    for(let checkbox of checkboxes){
        checkbox.show();
    }
    text("Version 2.1",10,height-10);
}

function prepareGui(){
    gui = createGui();
    
    sliders.push(createSlider("Slider X",50+width/4,-100,width/2-100,32,50,300));
    slidersInfoY.push(60+height/4);
    sliders.push(createSlider("Slider Y",50+width/4,-100,width/2-100,32,50,300));
    slidersInfoY.push(160+height/4);
     
    for(let s of sliders){
        s.setStyle({
            fillBg: color("#BCCEFF"),
            fillBgHover: color("#BCCEFF"),
            fillBgActive: color("#BCCEFF"),
            fillTrack: color("#617ECE"),    
            fillTrackHover: color("#7599FD"),
            fillTrackActive: color("#7599FD"),    
            fillHandle: color("#323F64"),    
            fillHandleHover: color("#7599FD"),
            fillHandleActive: color("#7599FD"),    
            strokeTrack: color("#334475"),
            strokeTrackHover: color("#656E86"),
            strokeTrackActive: color("#656E86")
        })
        s.isInteger = true;
        s.visible = false;
    }
    
    botoes.push(new botao(width-125,10,100,50,"Nova Caixa","#334475","#A5B5E1"));//0
    botoes[0].setFillHover("#B6C7F6");
    botoes.push(new botao(width-125,70,100,50,"Nova Bola","#337636","#A5E1A5"));//1
    botoes[1].setTextCoord(4); // Nova Bola
    botoes[1].setFillHover("#BBF0BB");
    botoes.push(new botao(width*3/4-155,height*3/4-70,135,50,"Adicionar Caixa","#334475","#A5B5E1"));//2
    botoes.push(new botao(width/4+25,height*3/4-70,80,50,"Cancelar","#334475","#A5B5E1"));//3
    botoes[2].setFillHover("#B6C7F6");//adicionar caixa - nova caixa menu
    botoes[3].setFillHover("#B6C7F6"); //cancelar - nova caixa menu
    
    //BOLAS ------------ \/ \/
    sliders.push(createSlider("Slider R",width/4+50,-100,width/2-100,32,25,80));
    slidersInfoY.push(60+height/4);
    sliders[2].visible = false;
    
    sliders[2].setStyle({
        fillBg: color("#BBF0BB"),
        fillBgHover: color("#BBF0BB"),
        fillBgActive: color("#BBF0BB"),
        fillTrack: color("#7CCB7C"),    
        fillTrackHover: color("#A5E1A5"),
        fillTrackActive: color("#A5E1A5"),    
        fillHandle: color("#2E6C32"),    
        fillHandleHover: color("#6BA56F"),
        fillHandleActive: color("#6BA56F"),    
        strokeTrack: color("#337636"),
        strokeTrackHover: color("#55985A"),
        strokeTrackActive: color("#55985A")
    })
    sliders[2].isInteger = true;
    sliders[2].visible = false;
    botoes.push(new botao(width/4+25,height*3/4-70,80,50,"Cancelar","#337636","#A5E1A5"));//4
    botoes[4].setFillHover("#BBF0BB");
    botoes.push(new botao(width*3/4-155,height*3/4-70,135,50,"Adicionar Bola","#337636","#A5E1A5"));//5
    botoes[5].setTextCoord(3);
    botoes[5].setFillHover("#BBF0BB");
    //BOLAS -------------- /\/\
    
    //ATALHOS ------------- \/\/
    botoes.push(new botao(width-125,130,100,50,"Atalhos","#763232","#E1A4A4"));//6
    botoes[6].setTextCoord(13);
    botoes[6].setFillHover("#F0BBBB");
    //ATALHOS ------------- /\/\
    
    //ESCONDER ------------ \/\/
    botoes.push(new botao(width-125,250,100,75,"Mostrar\n Menos\n     /\\","#444444","#CCCCCC"));//7
    botoes[7].setTextCoord(12,-20);
    botoes[7].setFillHover("#EEEEEE");
    //ESCONDER ------------ /\/\
    
    //CONFIG -------------- \/\/
    botoes.push(new botao(width-125,190,100,50,"Config.","#767432","#ECE87D"));//8
    botoes[8].setTextCoord(13);
    botoes[8].setFillHover("#F3F1BF");
    botoes.push(new botao(width/4+25,height*3/4-70,80,50,"Cancelar","#767432","#ECE87D"));//4
    botoes[9].setFillHover("#F3F1BF");
    sliders.push(createSlider("Slider Gravidade",width/4+50,-100,width/2-100,32,0,5));
    slidersInfoY.push(60+height/4);
    sliders[3].val = 0.2;
     sliders[3].setStyle({
        fillBg: color("#F3F1BF"),
        fillBgHover: color("#F3F1BF"),
        fillBgActive: color("#F3F1BF"),
        fillTrack: color("#DADA6D"),    
        fillTrackHover: color("#EDF094"),
        fillTrackActive: color("#EDF094"),    
        fillHandle: color("#6C6C2E"),    
        fillHandleHover: color("#A69F6C"),
        fillHandleActive: color("#A69F6C"),    
        strokeTrack: color("#767432"),
        strokeTrackHover: color("#9A9756"),
        strokeTrackActive: color("#9A9756")
    })
    botoes.push(new botao(width*3/4-100,height*3/4-70,80,50,"Aplicar","#767432","#ECE87D"));//5
    botoes[10].setFillHover("#F3F1BF");
    botoes[10].setTextCoord(7);
    checkboxes.push(new checkbox(width/4+30,height/4+130,"padrao","padrao","#767432","#ECE87D"));
    checkboxes[0].setFillHover("#F3F1BF"); 
    botoes.push(new botao(width/2+60,height*3/4-70,170,50,"Restaurar Padrões","#767432","#ECE87D"));//11
    botoes[11].setFillHover("#F3F1BF"); 
    //CONFIG -------------- /\/\
    
    botoesPrincipais = [0,1,6,8];
    hideAllInputs();
}

function mousePressed(){
    if(caixaFlutuante && countFrames >= frameRate()/2){
        caixas.push(new caixa(mouseX,mouseY,sliders[0].val,sliders[1].val,1));
        caixaFlutuante = false;
        countFrames = 0;
        hideAllInputs();
    }else if(bolaFlutuante && countFrames >= frameRate()/2){
        bolas.push(new bola(mouseX,mouseY,pow((sliders[2].val/30),2),"#7CCB7C","#337636"));
        bolaFlutuante = false;
        countFrames = 0;
    }
    
    if(botoes[0].wasPressed()){ //botao nova caixa
        abrirMenuCaixas = true;
        if(abrirMenuBolas || abrirMenuConfig){
            abrirMenuBolas = false;
            abrirMenuConfig = false;
            hideAllInputs();
        }
    }else if(botoes[1].wasPressed()){ // botao nova bola
        abrirMenuBolas = true;
        if(abrirMenuCaixas || abrirMenuConfig){
            abrirMenuCaixas = false;
            abrirMenuConfig = false;
            hideAllInputs();
        }
    }else if(botoes[8].wasPressed()){
        abrirMenuConfig = true;
        if(abrirMenuCaixas || abrirMenuBolas){
            abrirMenuCaixas = false;
            abrirMenuBolas = false;
            hideAllInputs();
         }
    }else if(botoes[2].wasPressed()){ // botao nova caixa - adicionar caixa
        abrirMenuCaixas = false;
        caixaFlutuante = true;
        hideAllInputs();
    }else if(botoes[3].wasPressed()){ // botao nova caixa - cancelar
        abrirMenuCaixas = false;
        hideAllInputs();
    }else if(botoes[4].wasPressed()){ // botao nova bola - cancelar
        abrirMenuBolas = false;
        hideAllInputs();
    }else if(botoes[5].wasPressed()){ // botao nova bola - cancelar
        abrirMenuBolas = false;
        bolaFlutuante = true;
        hideAllInputs();
    }else if(botoes[6].wasPressed()){ // Atalhos
        if(mostrarAtalhos){
            mostrarAtalhos = false;                      
        }else{
            mostrarAtalhos = true;            
        }
    }else if(botoes[7].wasPressed()){ //Mostrar Menos
        btnEsconderAcao = true;            
    }else if(botoes[9].wasPressed()){//Cancelar - Configurações
        abrirMenuConfig = false;
        hideAllInputs();
    }else if(botoes[10].wasPressed()){//Aplicar - Configurções
        for(let bola of bolas){
            bola.gravity = createVector(0,round(sliders[3].val,1));
        }
        if(round(sliders[3].val,1) != 0.2){
            gChanged = true;
        }else{
            gChanged = false;
        }
        showBallVel = checkboxes[0].value;
        abrirMenuConfig = false;
        hideAllInputs();
    }else if(botoes[11].wasPressed()){//Restaurar - Configurções
        sliders[3].val = 0.2;
        checkboxes[0].value = false;
        hideAllInputs();
    }else{
        for(let checkbox of checkboxes){
            checkbox.wasPressed();
        }
    }
    
}

function hideAllInputs(){
    for(let s of sliders){
        s.visible = false;
    }
    for(let x = 0; x < botoes.length; x++){
        if(x != 0 && x != 1 && x != 6 && x != 7 && x != 8){
            botoes[x].setVisible(false);
        }
    }
    for(let c of checkboxes){
        c.setVisible(false);
    }
}

function setSliderToVisible(i){
    if(i instanceof Array){
        for(let indice of i){
            sliders[indice].y = slidersInfoY[indice];
            sliders[indice].visible = true;
        }
        for(let x = 0; x < sliders.length ; x++){
            let pular = false;
            for (let indice of i) if (x == indice) pular = true;
            if (!pular){
                sliders[x].y=-100;
                sliders[x].visible = false;
            } 
        }
    }else{
        sliders[i].y = slidersInfoY[i];
        sliders[i].visible = true;
        for(let x = 0; x < sliders.length ; x++){
            let pular = false;
            if (x == i) pular = true;
            if (!pular){
                sliders[x].y = -100;
                sliders[x].visible = false;
            }
        }
    }
}


function drawBackground(){
    strokeWeight(3);
    background("#22B7FE");
    stroke(150,75,0);
    fill(150,75,0);
    rect(0,height-100,width,height-100);
    stroke("#00cc00");
    fill("#00cc00");
    rect(0,height-100,width,20);
}