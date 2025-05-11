function menuCaixas(){
    const w4 = width/4;
    const h4 = height/4;
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
    text("As colisões das caixas estão destivadas por tempo indeterminado!",w4+50,3*h4+20);
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
    text("Diametro:",w4+20,h4+50);
    text("Massa: "+ round(pow((sliders[2].val/30),2),2) , width/2-115, h4*3-35);
    text(""+sliders[2].val,w4+165,h4+50);
    textSize(15);
    text("Min:",w4+15,h4+70);
    text("25",w4+19,h4+90);
    text("Max:",width*3/4-45,h4+70);
    text("80",width*3/4-43,h4+90);
    strokeWeight(5);
    stroke("#337636");
    fill("#7CCB7C");
    circle(width/2,height/2,sliders[2].val)
    drawGui();
}

function atalhos(){
    strokeWeight(5);
    stroke(200);
    fill("#FF0000");
    circle(50,50,sqrt(2) * 30);
    fill("#0000FF");
    circle(150,50,sqrt(5) * 30);
    fill("#b4d455");
    circle(250,50,sqrt(5) * 30);
    fill("#f42069");
    circle(350,50,sqrt(5) * 30);
    fill("#00A648");
    circle(450,50,sqrt(2) * 30);
    fill("#D1CA00");
    circle(550,50,sqrt(1) * 30);
    fill("#00D86C");
    circle(650,50,sqrt(3) * 30);
    fill("#D800AD");
    circle(750,50,sqrt(3) * 30);
    strokeWeight(3);
    stroke(100);
    fill(230);
    rectMode(CORNER);
    rect(60,63,32,32,4);//1
    rect(173,63,32,32,4);//2
    rect(273,63,32,32,4);//3
    rect(373,63,32,32,4);//4
    rect(463,63,32,32,4);//5
    rect(553,63,32,32,4);//6
    rect(660,63,32,32,4);//7
    rect(760,63,32,32,4);//8
    noStroke();
    fill(0);
    textSize(32);
    text("1",65,90);
    text("2",180,90);
    text("3",280,90);
    text("4",380,90);
    text("5",470,90);
    text("6",560,90);
    text("7",668,90);
    text("8",768,90);
}

function mostrarFps(){
    fill(0);
    stroke(0);
    rect(width/2-50,0,100,50);
    fill(255);
    noStroke();
    textSize(15);
    text("FPS: "+round(frameRate(),2),width/2-40,15);
    text("Bolas: "+bolas.length,width/2-40,40);
}

function menuConfig(){
    let w4 = width/4;
    let h4 = height/4;
    stroke("#767432");
    fill("#ECE87D");
    strokeWeight(3);
    rectMode(CORNER);
    rect(w4,h4,width/2,height/2,30);
    textSize(32);
    noStroke();
    fill("#767432");
    text("Configurações:",w4+10,h4-10);
    text("Gravidade:",w4+20,h4+50);
    if(round(sliders[3].val,1) == 0.2){
        text(""+round(sliders[3].val,1)+"(Padrão)",w4+180,h4+50);
    }else{
        text(""+round(sliders[3].val,1),w4+180,h4+50);
    }
    
    textSize(15);
    text("Min:",w4+15,h4+70);
    text("0",w4+23,h4+90);
    text("Max:",width*3/4-45,h4+70);
    text("5",width*3/4-35,h4+90);
    text("pixels/frame",width*3/4-125,h4+110);
    
    textSize(20);
    text("Mostrar Velocidade",checkboxes[0].x+32,checkboxes[0].y+20);
    drawGui();
}