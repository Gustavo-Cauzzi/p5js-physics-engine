class caixa{
    constructor(x,y,w,h,m,cor){
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.m = m;
        this.w = w;
        this.h = h;
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
        this.corner1 = createVector(this.pos.x,this.pos.y);
        this.corner2 = createVector(0,0);
        this.corner3 = createVector(0,0);
        this.corner4 = createVector(0,0);
    }
    
    setAngle(a){
        this.ang = a;
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
        rect(0,0,this.w,this.h);
        stroke(255,0,0);
        circle(0,0,2);
        circle(this.w,0,2);
        circle(this.w,this.h,2);
        circle(0,this.h,2);
        
        pop();
    }

    update(){

    }
    
    intersects(other){
        if(this == other){
            return;
        }
            this.calculateCorners(other);
        push();
            rotate(-this.ang,this.pos);
            this.show();
            other.show();
        pop();
    }
    
    calculateCorners(other){
        let c = cos(this.ang);
        let s = sin(this.ang);
        //rotate(-this.ang);
        stroke(0,255,0);
        this.corner1.x = this.pos.x;
        this.corner1.y = this.pos.y;
        circle(this.corner1.x,this.corner1.y,2);
        
        //        
        this.corner2.x = this.w * c + this.pos.x;
        this.corner2.y = this.w * s + this.pos.y;
        circle(this.corner2.x,this.corner2.y,2);       
        
        stroke(172,100,250);
        this.corner2.x = this.corner2.x * c - this.corner2.y * (-s);
        this.corner2.y = this.corner2.y * c + this.corner2.x * s;
        circle(this.corner2.x,this.corner2.y,2);       
        stroke(0,255,0);
        
        
        //
        this.corner3.x = this.w * cos(this.ang)-sin(this.ang)*this.h+this.pos.x;
        this.corner3.y = this.w * sin(this.ang) + cos(this.ang)*this.h+this.pos.y;
        circle(this.corner3.x,this.corner3.y,2);
        //
        this.corner4.x = -sin(this.ang) * this.h + this.pos.x;
        this.corner4.y = cos(this.ang) * this.h + this.pos.y;
        circle(this.corner4.x,this.corner4.y,2);
        
        //
        
        stroke(0,0,255);
        other.corner1.x = other.pos.x;
        other.corner1.y = other.pos.y;
        circle(other.corner1.x,other.corner1.y,2);
        //
        other.corner2.x = other.w * cos(other.ang)+other.pos.x;
        other.corner2.y = other.w * sin(other.ang)+other.pos.y;
        circle(other.corner2.x,other.corner2.y,2);
        //
        other.corner3.x = other.w * cos(other.ang)-sin(other.ang)*other.h+other.pos.x;
        other.corner3.y = other.w * sin(other.ang) + cos(other.ang)*other.h+other.pos.y;
        circle(other.corner3.x,other.corner3.y,2);
        //
        other.corner4.x = -sin(other.ang) * other.h + other.pos.x;
        other.corner4.y = cos(other.ang) * other.h + other.pos.y;
        circle(other.corner4.x,other.corner4.y,2);
        
    }
}