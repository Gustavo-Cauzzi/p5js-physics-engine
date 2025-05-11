let bolas = [];
let novo;
let contador = 0;

function setup(){
    createCanvas(windowWidth, windowHeight);
    bolas.push(new bola(width/2, height/2, 1));
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
    
    let x = 0;
    let y = 0;
    
    while(x < bolas.length){
        while(y < bolas.length){
            //console.log("x: ",x);
            //console.log("y: ",y);
            if(bolas[x].pos.x <= bolas[y].pos.x){
                if(bolas[x].intersects(bolas[y])){
                    console.log("COLIDIU");
                    console.log("-");
                    bolas[x].vel.mult(-1);
                    bolas[x].acc.mult(-1);
                }    
            }else{
                if(bolas[y].intersects(bolas[x])){
                    console.log("COLIDIU");
                    console.log("-");
                    bolas[x].vel.mult(-1);
                    bolas[x].acc.mult(-1);
                }    
            }
            // if (bolas[y].pos.x > bolas[x].pos.x)
    
            
            
            
            y++;
        }   
        y = 0;
        x++;
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
    }else if(keyCode === 79){
        let forca = createVector(20,10);
        novo = new bola(50,100,2,"#FF0000")
        novo.applyForce(forca);
        bolas.push(novo);
        
    }else if(keyCode === 80){   
        let forca = createVector(-10,10);
        novo = new bola(width-50,100,5,"#0000FF");
        novo.applyForce(forca)
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