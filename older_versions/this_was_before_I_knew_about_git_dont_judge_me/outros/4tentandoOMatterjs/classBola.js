class bola{
    constructor(x,y,m){
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.m = m;
        this.r = sqrt(m) * 10;
        this.gravity = createVector(0,0.2);
    }
    
    show(){
        strokeWeight(5);
        stroke(200);
        fill(100);
        ellipse(this.pos.x, this.pos.y, this.r*2);
    }
    
    edges(){
        if (this.pos.x >= width-this.r) {
            this.pos.x = width-this.r;
            this.vel.x *= -1;
        } else if (this.pos.x <= this.r) {
            this.pos.x = this.r;
            this.vel.x *= -1;
        }
        if (this.pos.y >= height-this.r) {
            this.pos.y = height-this.r;
            this.vel.y *= -1;
        }
    }
    
    update(){
        //let mouse = createVector(mouseX, mouseY);
        //this.acc = p5.Vector.sub(mouse, this.pos);
        //this.acc.setMag(0.1);

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }
    
    applyForce(force){
        let f = p5.Vector.div(force, this.m)
        this.acc.add(f);
    }
    
    applyWeight(){
        let wheight = p5.Vector.mult(this.gravity,this.m);
        this.acc.add(wheight);
    }
    
}