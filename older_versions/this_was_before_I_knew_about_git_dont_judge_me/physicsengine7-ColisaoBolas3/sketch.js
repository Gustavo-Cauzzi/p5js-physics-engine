let bolas = [];
let caixas = [];
let novo;
let vezes = 1.00;
let contador = 0;

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    bolas.push(new bola(width/2, height/2, 1));
    caixas.push(new caixa(100,100,150,50,5));
    caixas.push(new caixa(125,175,50,150,5));
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
        //bola.update();
        //bola.applyWeight();
        //bola.edges();
        caixa.show();
    }
    
    let x = 0;
    let y = 0;
    
    while(x < bolas.length){
        while(y < bolas.length){
            //console.log("x: ",x);
            //console.log("y: ",y);
            if(bolas[x].pos.x <= bolas[y].pos.x){
                if(bolas[x].intersects(bolas[y])){
                    //bolas[y].calculateColision(bolas[x]);
                    console.log("-");
                }    
            }else{
                if(bolas[y].intersects(bolas[x])){
                    //bolas[y].calculateColision(bolas[x]);
                    console.log("-");
                }    
            }
            
            y++;
        }   
        y = 0;
        x++;
    }
    stroke(255);
    strokeWeight(1);
    fill(255);
    textSize(16);
    round(vezes,2);
    text("x"+vezes,width-50,30);
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
        vezes = 1;
    }else if(keyCode === 87){//w
        for (let bola of bolas) {
            bola.vel.mult(0.80);
        }
        vezes *= 0.8;
    }else if(keyCode === 69){//e
        for (let bola of bolas) {
            bola.vel.mult(1.20);
        }
        vezes *= 1.2;
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
    }
    
}





function colision(){
    /*contador = 0;   
    console.log("aaaaaaaaaaa");
    for(let x=0; x <= bolas.lenght-1; x++){
        console.log("bbbbbbbbbbb");
        for(let y=0; y <= bolas.lenght-1; y++){
            
            if(x == y){
                return
            }
            
            if(contador == 0){
                console.log(bolas[x]);
                console.log(bolas[y]);
            }            
            contador++;
            
            let colisionx = false;
            let colisiony = false;
            let colisionFinal = false;
            
            let bxx = bolas[x].pos.x;
            let bxy = bolas[x].pos.y;
            let bxr = bolas[x].pos.r;
            
            let byx = bolas[y].pos.x;
            let byy = bolas[y].pos.y;
            let byr = bolas[y].pos.r;
            if(bxx - bxr <= byx + byr && bxx + bxr >= byx - byr){
                colisionx = true;
                console.log("colisao x");
            }
            if(bxy - bxr <= byy + byr && bxy + bxr >= byy - byr){
                colisiony = true;
                console.log("colisao y");
            }
            if(colisionx && colisiony){
                colisionFinal = true;
                console.log("COLIDIU");
            }else{
                console.log("NAO COLIDIU");
            }
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    for(let x of bolas){
        for(let y of bolas){
            
            console.log(x.pos.x);
            console.log(y.pos.x);
            console.log("-=-=-=-");
            console.log(x.pos.y);
            console.log(y.pos.y);
            if(x.pos.x == y.pos.x && x.pos.y == y.pos.y){
                console.log("retornou");
                return;
            }
            console.log("NAOOOOOOOO RETORNOUUUU");
            let d = x.pos.dist(y.pos);
            console.log(d);
            
        }
    
    
    
    
    
    */
    
    
    
    
    
}