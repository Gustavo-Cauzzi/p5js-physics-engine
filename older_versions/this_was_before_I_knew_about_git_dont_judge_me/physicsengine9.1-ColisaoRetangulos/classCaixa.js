class caixa{
    constructor(x,y,w,h,m,cor){
        this.pos = createVector(x,y);
        this.posAux = createVector(0,0);
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
        this.centerOfMass = createVector(this.pos.x + this.w/2,
                                         this.pos.y + this.h/2);
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
        this.corners = [this.corner1,this.corner2,this.corner3,this.corner4];
        this.pointP = createVector(0,0);
        this.pointPEgdeInfo;
    }
    
    setVel(a){
        this.vel = a;
    }
    addVel(a){
        this.vel += a;
    }
    setAngle(a){
        this.ang = a;
    }    
    addAngle(a){
        this.ang += a;
        if(this.ang >= PI*2){
            this.ang -= PI*2;
        }
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
    
    show2(){
        strokeWeight(5);
        stroke(200);
        fill(255,255,0);
        push();
            translate(this.pos.x,this.pos.y);
            rotate(this.ang);
            rect(0,0,this.w,this.h);
            stroke(255,0,255);
            circle(0,0,2);
            circle(this.w,0,2);
            circle(this.w,this.h,2);
            circle(0,this.h,2);
        pop();
    }
    
    update(){
        this.vel.add(this.acc);
        this.vel.limit(2);
        this.pos.add(this.vel);
    }
    
    SAT(other){
        this.calculateCorners(other);
        let minXa,minYa,maxXa,maxYa;
        let minXb,minYb,maxXb,maxYb;
        for(let corner of this.corners){
            if(minXa == undefined){
                minXa = corner.x;
            }else if(minXa > corner.x){
                minXa = corner.x;
            }
            if(maxXa == undefined){
                maxXa = corner.x;
            }else if(maxXa < corner.x){
                maxXa = corner.x;
            }
            
            if(minYa == undefined){
                minYa = corner.y;
            }else if(minYa > corner.y){
                minYa = corner.y;
            }
            if(maxYa == undefined){
                maxYa = corner.y;
            }else if(maxYa < corner.y){
                maxYa = corner.y;
            }
        }
        for(let corner of other.corners){
            if(minXb == undefined){
                minXb = corner.x;
            }else if(minXb > corner.x){
                minXb = corner.x;
            }
            if(maxXb == undefined){
                maxXb = corner.x;
            }else if(maxXb < corner.x){
                maxXb = corner.x;
            }
            
            if(minYb == undefined){
                minYb = corner.y;
            }else if(minYb > corner.y){
                minYb = corner.y;
            }
            if(maxYb == undefined){
                maxYb = corner.y;
            }else if(maxYb < corner.y){
                maxYb = corner.y;
            }
        }
        let emX = false, emY = false;
        if(minXb <= maxXa && maxXb > minXa){
            emX = true;
        }
        if(minYb <= maxYa && maxYb > minYa){
            emY = true;
        }
        //console.log("-");
        if(emX && emY){
            return true;
        }else{
            return false;
        }
    }
    
    findPointP(other){
        let achouA = true;
        let achouB = true;
        let me = 0; //Margem de Erro
        let meAdd = 5;
        let testarOutro = false;
        while(!this.discoverPointP(other,me)){
            me += meAdd;
            if(me >= 50){
                achouA= false;
                break;
            }
        }
        let me2 = 0;
        other.calculateCorners(this);
        while(!other.discoverPointP(this,me2)){
            me2 += meAdd;
            if(me2 > me){
                achouB = false;
                break;
            }
        } 
        if(other.pointP.x != 0 && other.pointP.y != 0){
            this.pointP = other.pointP;
        }else if(other.pointP.x != 0 && other.pointP.y != 0){
            other.pointP = this.pointP;
        }        
    }    
    
    showPointP(point,aa){
        if(aa){
            stroke(255);
            line(point.x,0,point.x,height);
            line(0,point.y,width,point.y);    
        }else{
            stroke(0,255,255);
            line(point.x,0,point.x,height);
            stroke(255,0,255);
            line(0,point.y,width,point.y);    
        }
    }
    
    savePointP(corner){
        this.pointP = p5.Vector.add(corner,5);
        this.pointP = this.pointP.sub(5);
        this.undoSatRotation();
    }
    
    undoSatRotation(){
        let aux = this.pointP.x;
        this.pointP.x = this.pointP.x * cos(-this.ang) - this.pointP.y * (-sin(-this.ang));
        this.pointP.y = this.pointP.y * cos(-this.ang) + aux * (-sin(-this.ang));
    }
    
    discoverPointP(other,me){
        for(let corner of other.corners){
            if(corner.y <= this.corner1.y + me && corner.y >= this.corner1.y - me){
                if(corner.x >= this.corner1.x && corner.x <= this.corner2.x){
                    this.savePointP(corner);
                    //this.showPointP(corner);
                    this.pointPEgdeInfo = "Horizontal-1_2";
                    return true;
                }
            }else if(corner.x <= this.corner1.x + me && corner.x >= this.corner1.x - me){
                if(corner.y >= this.corner1.y && corner.y <= this.corner4.y){
                    this.savePointP(corner);
                    //this.showPointP(corner);
                    this.pointPEgdeInfo = "Vertical-1_4";
                    return true;
                }                    
            }else if(corner.x <= this.corner2.x + me && corner.x >= this.corner2.x - me){
                if(corner.y >= this.corner2.y && corner.y <= this.corner3.y){
                    this.savePointP(corner);
                    //this.showPointP(corner);
                    this.pointPEgdeInfo = "Vertical-3_2";
                    return true;
                }
            }else if(corner.y <= this.corner4.y + me && corner.y >= this.corner4.y - me){
                if(corner.x >= this.corner4.x && corner.x <= this.corner3.x){
                    this.savePointP(corner);
                    //this.showPointP(corner);
                    this.pointPEgdeInfo = "Horizontal-3_4";
                    return true;
                }
            }
        }
    }
    
    showCalculatedCorners(){
        for(let cantos of this.corners){
            stroke("#FA8B0B");
            circle(cantos.x,cantos.y,2);
        }
    }
    
    calculateCorners(other){
        let c = cos(this.ang);
        let s = sin(this.ang);
        let c2 = cos(other.ang);
        let s2 = sin(other.ang);
        stroke(0,255,0);
        
        this.corner1.x = this.pos.x;
        this.corner1.y = this.pos.y;
        circle(this.corner1.x,this.corner1.y,2);
        
        let aux = this.corner1.x;
        this.corner1.x = this.corner1.x * c - this.corner1.y * -s;
        this.corner1.y = this.corner1.y * c - aux * s;
        strokeWeight(5);
        stroke(0,100,255);
        other.corner1.x = other.pos.x;
        other.corner1.y = other.pos.y;
        circle(other.corner1.x,other.corner1.y,2);
        //
        stroke(0,0,255);
        other.corner2.x = other.w * c2 +other.pos.x;
        other.corner2.y = other.w * s2 +other.pos.y;
        circle(other.corner2.x,other.corner2.y,2);
        //
        other.corner3.x = other.w * c2 - s2 * other.h+other.pos.x;
        other.corner3.y = other.w * s2 + c2 *other.h+other.pos.y;
        circle(other.corner3.x,other.corner3.y,2);
        //
        other.corner4.x = -s2 * other.h + other.pos.x;
        other.corner4.y = c2 * other.h + other.pos.y;
        circle(other.corner4.x,other.corner4.y,2);
        
        for(let corner of other.corners){
            let aux1 = corner.x;
            corner.x = corner.x * c - corner.y * (-s);
            corner.y = corner.y * c + aux1 * -s;  
            if(corner == other.corner1){
                stroke(255,100,100);
            }else{
                stroke(200,255,0);
            }
        }
        this.corner2.x = this.corner1.x + this.w;
        this.corner2.y = this.corner1.y;
        this.corner3.x = this.corner1.x + this.w;
        this.corner3.y = this.corner1.y + this.h;
        this.corner4.x = this.corner1.x;
        this.corner4.y = this.corner1.y + this.h;
    }
    
    resetBothPointP(other){
        let resetPointP = createVector(0,0);
        this.pointP = p5.Vector.add(resetPointP,1);
        other.pointP = p5.Vector.add(resetPointP,1);
        this.pointP = this.pointP.sub(1);
        other.pointP = other.pointP.sub(1);
    }
    intersects(other){
        if(this == other){
            return;
        }
        if(other.SAT(this) && this.SAT(other)){
            //COLIDIU
            this.pointPEgdeInfo = undefined;
            other.pointPEgdeInfo = undefined;
            this.resetBothPointP(other);
            this.findPointP(other);
            this.calculateColision(other);
            //line(a,a,a,a);
        }
        
    }
    
    calculateColision(other){
        let c = cos(this.ang);
        let s = sin(this.ang);
        let c2 = cos(other.ang);
        let s2 = sin(other.ang);
        if(!this.calculateNormal(other)){
        //    return;
        }
        let aux = this.centerOfMass.x;
        this.centerOfMass.x = this.w/2 * c - s * this.h/2 + this.pos.x;
        this.centerOfMass.y = this.w/2 * s + c * this.h/2 + this.pos.y;
        aux = other.centerOfMass;
        other.centerOfMass.x = other.w/2 * c2 - s2 * other.h/2 + other.pos.x;
        other.centerOfMass.y = other.w/2 * s2 + c2 * other.h/2 + other.pos.y;
        other.distColisionP = other.centerOfMass.dist(other.pointP);
        let Vap1 = createVector(0,0);
        let Vbp1 = createVector(0,0);
        let Vap2 = createVector(0,0);
        let Vbp2 = createVector(0,0);
        let Rap = this.pointP;        
        let Rbp = other.pointP;
        let Vab1 = createVector(0,0);
        let Vab2 = createVector(0,0);
        let normal = createVector(1,1);
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
        g1_1 = p5.Vector.mult(impulse,this.n,g1_1);
        g1 = p5.Vector.div(g1_1,this.m,g1);
        Va2 = p5.Vector.add(Va1,g1);
        //
        let g2_1 = createVector(0,0);
        let g2 = createVector(0,0);
        g2_1 = p5.Vector.mult(impulse,this.n,g2_1);
        g2 = p5.Vector.div(g2_1,other.m,g2);
        Vb2 = p5.Vector.sub(Vb1,g2);        
        //
        console.log("zzzzzzzzzzzzzzzzzzzz");
        this.setVel(Va2);
        //this.changeAngVel();
        other.setVel(Vb2);
        //other.changeAngVel();
    }   
    
    calculateNormal(other){
        this.calculateRealCorners(other);
        if(this.pointPEgdeInfo == undefined){
            other.calculateColision(this);
            return false;
        }else if(this.pointPEgdeInfo == "Horizontal-1_2"){
            this.n = p5.Vector.sub(this.corner1,this.corner4);
            this.n.normalize();
        }else if(this.pointPEgdeInfo == "Horizontal-3_4"){
            this.n = p5.Vector.sub(this.corner4,this.corner1);
            this.n.normalize();
        }else if(this.pointPEgdeInfo == "Vertical-1_4"){
            this.n = p5.Vector.sub(this.corner2,this.corner1);
            this.n.normalize();
        }else if(this.pointPEgdeInfo == "Vertical-3_4"){
            this.n = p5.Vector.sub(this.corner1,this.corner2);
            this.n.normalize();
        }else{
            console.log("ERRO NO CALCULO DA FORÇA NORMAL");
        }
        
    }
    calculateRealCorners(other){
        let c = cos(this.ang);
        let s = sin(this.ang);
        this.corner1.x = this.pos.x;
        this.corner1.y = this.pos.y;
        this.corner2.x = this.w * c + this.pos.x;
        this.corner2.y = this.w * s + this.pos.y;
        this.corner3.x = this.w * c - s * this.h + this.pos.x;
        this.corner3.y = this.w * s + c * this.h + this.pos.y;
        this.corner4.x = -s * this.h + this.pos.x;
        this.corner4.y = c * this.h + this.pos.y;
    }
}