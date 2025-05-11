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
    }else if(keyCode === 49){// 1
        let forca = createVector(20,10);
        bolas.push(new bola(50,100,2,"#FF0000"))
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode === 50){ //2
        let forca = createVector(-10,10);
        bolas.push(new bola(width-50,100,5,"#0000FF"));
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode === 51){//3
        let forca = createVector(-1,3);
        bolas.push(new bola(width-100,height-200,5,"#b4d455"));
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode === 52){//4
        let forca = createVector(1,3);
        bolas.push(new bola(width-170,height-200,5,"#f42069"));
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode === 53){//5
        let forca = createVector(0.2,0);
        bolas.push(new bola(10,height,2,"#00A648"));
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode === 54){//6
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
    }else if(keyCode == 55){//7
        let forca = createVector(-10,0);
        bolas.push(new bola(width-100,height/2,3,"#00D86C"));
        let i = bolas.length;
        bolas[i-1].applyForce(forca);
    }else if(keyCode == 56){//8
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
    }else if(keyCode === 48){ // 0
        if(fps){
            fps = false;
        }else{
            fps = true;
        }
    }
}