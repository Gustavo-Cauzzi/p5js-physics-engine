class bola{
    constructor(x,y){
        this.pos = createVector(x,y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
    }
    
    show(){
        strokeWeight(10);
        stroke(200);
        fill(100);
        ellipse(this.pos.x, this.pos.y, 50, 50);
    }
    
    update(){
        let mouse = createVector(mouseX,mouseY);
        this.acc = p5.Vector.sub(mouse,this.pos);
        this.acc.setMag(1);
        this.vel.limit(20);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }
}