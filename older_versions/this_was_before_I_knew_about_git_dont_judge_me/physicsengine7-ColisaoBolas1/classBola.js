class bola{
    constructor(x,y,m,cor){
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.m = m;
        this.r = sqrt(m) * 15;
        this.gravity = createVector(0,0.2);
        this.cor = cor;
        this.ang = 0;
        this.angVelocity = 0;
        this.angAceleration = 0;
        this.centerOfMass = createVector(this.pos.x,this.pos.y);
        this.currentColision = createVector(0,0);
        this.angCurrentColision = 0;
        this.preRelVel = 0;
        this.finalColVel = 0;
        this.finalColAngVel = 0;
        this.distColisionP = 0;
        this.impulse = 0;
        this.e = 1;
        this.n = 1;
        this.i = 1;
    }
    
    show(){
        strokeWeight(5);
        stroke(200);
        if(this.cor == undefined){
            fill(100);
        }else{
            fill(this.cor);     
        }
        push();
        translate(this.pos.x,this.pos.y);
        rotate(this.ang);
        ellipse(0,0, this.r*2);
        line(0,0,this.r,0);
        pop();
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
        
        //this.angAceleration += 0.00001;
        //this.angVelocity += this.angAceleration;
        //this.ang += this.angVelocity;
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
    
    intersects(other) {
        if(this.pos.equals(other.pos.x,other.pos.y)){
            return false;
        }
        var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
        if (d < this.r + other.r) {
            //console.log(this.pos.x);
            //console.log(other.pos.x);
            //stroke(0,255 ,0);
            this.angCurrentColision=(this.pos.y - other.pos.y)/(this.pos.x - other.pos.x)
            this.angCurrentColision=(atan(this.angCurrentColision));
            
            other.angCurrentColision = this.angCurrentColision+PI;
            
            this.currentColision.x = this.pos.x + this.r * cos(this.angCurrentColision);
            this.currentColision.y = this.pos.y + this.r * sin(this.angCurrentColision);
            other.currentColision.x = other.pos.x + other.r * cos(other.angCurrentColision);
            other.currentColision.y = other.pos.y + other.r * sin(other.angCurrentColision);
            this.distColisionP = this.r;
            other.distColisionP = other.r;
            //console.log("this.angCurrentColision: ",this.angCurrentColision);
            
            //console.log("this.currentColision.x: ",this.currentColision.x);
            //console.log("this.currentColision.y: ",this.currentColision.y);
            
            
            this.calculateColision(other);
            
            
            stroke(0,255,255);
            line(0,this.currentColision.y,width,this.currentColision.y);
            stroke(255,0,255);
            line(this.currentColision.x,0,this.currentColision.x,height);
            stroke(0,255,0);
            line(this.pos.x,this.pos.y,other.pos.x,other.pos.y);
            //line(a,a,a,a);
            return true;
        } else {
          return false;
        }
    }
    
    calculateColision(other){
        this.preRelVel = (this.vel+this.angVelocity*this.distColisionP) - (other.vel-other.angVelocity*this.distColisionP);
        let equacao1 = -(1 + this.e)*this.preRelVel*this.n;
        let equacao2 = (1/this.m) + (1/other.m) + pow((this.distColisionP * this.n),2);
        let equacao3 = this.i + pow((other.distColisionP * this.n),2)/other.i;
        
        this.impulse=equacao1/(equacao2/equacao3)
        
        this.finalColVel = this.vel + this.impulse*this.n/this.m;
        console.log("this.finalColVel: ", this.finalColVel);
        this.finalColAngVel = this.angVelocity + (this.distColisionP * this.impulse * this.n)/this.i;
        console.log("this.finalColAngVel: ", this.finalColAngVel);
        console.log("A");
        
        this.changeVel();
        this.changeAngVel();
        
    }
    
    changeVel(){
        this.vel = this.vel.mult(this.finalColVel);
        console.log("this.vel: ",this.vel);
    }
    
    changeAngVel(){
        this.angVelocity = this.finalColAngVel;
        console.log("this.angVelocity: ",this.angVelocity);
    }
}