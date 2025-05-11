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
        this.angVelocity = 1;
        this.angAceleration = createVector(0,0);
        this.centerOfMass = createVector(this.pos.x,this.pos.y);
        this.currentColision = createVector(0,0);
        this.angCurrentColision = 0;
        this.finalColVel = createVector(0,0);
        this.finalColAngVel = createVector(0,0);
        this.distColisionP = createVector(0,0);
        this.impulse = 0;
        this.e = 1;
        this.n = createVector(0,0);
        this.i = 1;
        //this.preRelVel = createVector(0,0);
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
        } else if (this.pos.y <= this.r) {
            this.pos.y = this.r;
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
        this.vel.limit(10*this.m);
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
        if (d <= this.r + other.r) {
            this.pos.x = this.pos.x - 5;
            this.pos.y = this.pos.y - 5;
            other.pos.x = other.pos.x + 5;
            other.pos.y = other.pos.y + 5;
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
            
            this.distColisionP = this.pos.dist(this.currentColision);
            other.distColisionP = other.pos.dist(this.currentColision);
            //console.log("this.angCurrentColision: ",this.angCurrentColision);
            
            //console.log("this.currentColision.x: ",this.currentColision.x);
            //console.log("this.currentColision.y: ",this.currentColision.y);
            
            this.calculateColision(other);
            
            stroke(0,255,255);
            //line(0,this.currentColision.y,width,this.currentColision.y);
            stroke(255,0,255);
            //line(this.currentColision.x,0,this.currentColision.x,height);
            stroke(0,255,0);
            //line(this.pos.x,this.pos.y,other.pos.x,other.pos.y);
//            line(a,a,a,a);
            return true;
        } else {
          return false;
        }
    }
    
    calculateColision(other){
        this.calculateNormal();
        let Vap1 = createVector(0,0);
        let Vbp1 = createVector(0,0);
        let Vap2 = createVector(0,0);
        let Vbp2 = createVector(0,0);
        let Rap = this.currentColision;        
        let Rbp = other.currentColision;
        let Vab1 = createVector(0,0);
        let Vab2 = createVector(0,0);
        //let normal = createVector(0,0);
        let normal = this.n;
        let Va2 = createVector(0,0);
        let Vb2 = createVector(0,0);
        let Va1 = this.vel;
        let Vb1 = other.vel;
        let AAngFinal = 0;
        let BAngFinal = 0;
        let impulse = 0;
        
        //
        let e1 = createVector(0,0);
        
        e1 = Rap.dot(this.angVelocity);
        Vap1 = Va1.add(e1);
        //
        let e2 = createVector(0,0);
        
        e2 = Rbp.dot(other.angVelocity);
        Vbp1 = Vb1.add(e2);
        //
        
        //
        Vab1 = p5.Vector.sub(Vap1,Vbp1);
        Vab2 = p5.Vector.sub(Vap2,Vbp2);
        //
        
        //
        normal = Vab1.dot(this.n);
        //
        
        //
        let f1,f2,f3;
        let f1_1;
        let f1_2 = createVector(0,0);
        let f2_1 = createVector(0,0);
        let f3_1 = createVector(0,0);
        f1_1 = -(1 + this.e);
        f1_2 = Vab1.dot(this.n);
        f1 = f1_1*f1_2
        
        f2_1 = Rap.dot(this.n);
        f2 = (1/this.m) + (1/other.m) + pow(f2_1,2)/this.i;
        
        f3_1 = Rbp.dot(this.n);
        f3 = pow(f3_1,2)/other.i;
        
        impulse = f1 / (f2 / f3);
        //
        
        //
        let g1_1 = createVector(0,0);
        let g1 = createVector(0,0);
        
        console.log("a");
        console.log(this.n);
        console.log(this.n.mag());
        g1_1 = p5.Vector.mult(impulse,this.n,g1_1);
        console.log("b");
        g1 = p5.Vector.div(g1_1,this.m,g1);
        Va2 = p5.Vector.add(Va1,g1);
        //
        let g2_1 = createVector(0,0);
        let g2 = createVector(0,0);
        g2_1 = p5.Vector.mult(impulse,this.n,g2_1);
        g2 = p5.Vector.div(g2_1,other.m,g2);
        Vb2 = p5.Vector.sub(Vb1,g2);        
        //
        
        this.changeVel(Va2);
        this.changeAngVel();
        other.changeVel(Vb2);
        other.changeAngVel();
    }
    
    changeVel(force){
        //console.log("BC // this.vel: ",this.vel);
        this.vel = force;
        //console.log("AC // this.vel: ",this.vel);
    }
    
    changeAngVel(){
        this.angVelocity = this.finalColAngVel;
        //console.log("this.angVelocity: ",this.angVelocity);
    }
    
    calculateNormal(other){
        let x,y;
        push();
            translate(this.currentColision.x,this.currentColision.y);
            x = this.pos.x;
            y = this.pos.y;
            //console.log("x - DENTRO do translate: ",x);
            //console.log("y - DENTRO do translate: ",y);
        pop();
        this.n.x = x;
        this.n.y = y;
        this.n.normalize();
        //console.log("this.n: ",this.n);
        //console.log("x - FORA do translate: ",x);
        //console.log("y - FORA do translate: ",y);
    }
}
