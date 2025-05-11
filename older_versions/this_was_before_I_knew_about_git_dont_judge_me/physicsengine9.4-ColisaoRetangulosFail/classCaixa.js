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
        this.ang = 1;
        this.angVelocity = 0;
        this.angAceleration = createVector(0,0);
        this.centerOfMass = createVector(this.pos.x + this.w/2, this.pos.y + this.h/2);
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
    
    setAngVel(a){
        this.angVelocity = a;
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
            rectMode(CENTER);
            rect(0,0,this.w,this.h);
            stroke(255,0,0);
            circle(-this.w/2,-this.h/2,2);
            circle(this.w/2,-this.h/2,2);
            circle(this.w/2,this.h/2,2);
            circle(-this.w/2,this.h/2,2);
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
        this.vel.limit(10);
        this.pos.add(this.vel);
        this.ang += this.angVelocity;
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
        
        let sobreposicaoEmX = false;
        let sobreposicaoEmY = false;
        if(minXb <= maxXa && maxXb > minXa){
            sobreposicaoEmX = true;
        }
        
        if(minYb <= maxYa && maxYb > minYa){
            sobreposicaoEmY = true;
        }
        
        if(sobreposicaoEmX && sobreposicaoEmY){
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
            if(me2 > me){
                achouB = false;
                break;
            }
            me2 += meAdd;
        } 
        if(other.pointP.x != 0 && other.pointP.y != 0){
            this.pointP = other.pointP;
            noStroke();
            fill(255);
            text("this.pointP"+this.pointP,10,225);
            this.pointPEgdeInfo = undefined;
        }else if(this.pointP.x != 0 && this.pointP.y != 0){
            other.pointP = this.pointP;
            noStroke();
            fill(255);
            text("other.pointP"+other.pointP,10,225);
            other.pointPEgdeInfo = undefined;
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
    
    calculateCorners(other){
        let c = cos(this.ang);
        let s = sin(this.ang);
        let c2 = cos(other.ang);
        let s2 = sin(other.ang);
        let nc = cos(-this.ang);
        let ns = sin(-this.ang);
        let nc2 = cos(-other.ang);
        let ns2 = sin(-other.ang);
        stroke(0,255,0);
    
        this.corner1.x = this.pos.x - this.w/2;
        this.corner1.y = this.pos.y - this.h/2;
        this.corner2.x = this.pos.x + this.w/2;
        this.corner2.y = this.pos.y - this.h/2;
        this.corner3.x = this.pos.x + this.w/2;
        this.corner3.y = this.pos.y + this.h/2;
        this.corner4.x = this.pos.x - this.w/2;
        this.corner4.y = this.pos.y + this.h/2;
        let a = 0;
        for(let corner of this.corners){
            let aux1 = corner.x;
            corner.x = (corner.x - this.pos.x) * nc - (corner.y - this.pos.y) * (-ns) + this.pos.x;
            corner.y = (aux1 - this.pos.x) * (-ns) + (corner.y - this.pos.y) * nc + this.pos.y;
            if(a == 0){
                stroke(255,100,255);
                circle(this.corner1.x,this.corner1.y,2);
                a++
                stroke(0,100,255);
            }else{
                circle(corner.x,corner.y,2);
            }
            

            let aux2 = corner.x
            corner.x = corner.x * c - corner.y * -s;
            corner.y = corner.y * c - aux2 * s;
            circle(corner.x,corner.y,2);
            
        }
        
        other.corner1.x = other.pos.x - other.w/2;
        other.corner1.y = other.pos.y - other.h/2;
        other.corner2.x = other.pos.x + other.w/2;
        other.corner2.y = other.pos.y - other.h/2;
        other.corner3.x = other.pos.x + other.w/2;
        other.corner3.y = other.pos.y + other.h/2;
        other.corner4.x = other.pos.x - other.w/2;
        other.corner4.y = other.pos.y + other.h/2;
        let b = 0;
        stroke(0,100,255);
        for(let corner of other.corners){
            let aux1 = corner.x;
            corner.x = (corner.x - other.pos.x) * nc2 - (corner.y - other.pos.y) * (-ns2) + other.pos.x;
            corner.y = (aux1 - other.pos.x) * (-ns2) + (corner.y - other.pos.y) * nc2 + other.pos.y;
            circle(corner.x,corner.y,2);
            if(b == 0){
                stroke(255,100,255);
                circle(corner.x,corner.y,2);
                b++;
                stroke(0,100,255);
            }
            let aux2 = corner.x
            corner.x = corner.x * c - corner.y * -s;
            corner.y = corner.y * c - aux2 * s;
            
        }
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
            return false;
        }
        if(other.SAT(this) && this.SAT(other)){
            //COLIDIU
            this.pointPEgdeInfo = undefined;
            other.pointPEgdeInfo = undefined;
            this.resetBothPointP(other);
            this.findPointP(other);
            this.calculateColision(other);
            //line(a,a,a,a);
            return true;
        }

    }

    calculateColision(other){
        if(!this.calculateNormal(other)){
            return;
        }
        let ma = this.m;
        let mb = other.m;
        let rap = createVector(0,0,0);
        let rbp = createVector(0,0,0);
        if(this.pointP == undefined){
            rap = p5.Vector.sub (other.pointP,this.centerOfMass);
            rbp = p5.Vector.sub (other.pointP,other.centerOfMass);
        }else{
            rap = p5.Vector.sub (this.pointP,this.centerOfMass);
            rbp = p5.Vector.sub (this.pointP,other.centerOfMass);
        }
        let wa1 = this.angVelocity;
        let wb1 = other.angVelocity;
        let va1 = this.vel;
        let vb1 = other.vel;
        let vap1 = createVector(0,0);
        let vbp1 = createVector(0,0);
        let normal = this.n;
        let e = 1;
        let i = 1;
        let angLokoA = createVector (0,0,this.angVelocity);
        let angLokoB = createVector (0,0,-other.angVelocity);
        
        let vab1 = createVector(0,0);
        
        let aux1 = createVector(0,0,0);
        aux1 = p5.Vector.cross(angLokoA,rap);
        vap1 = p5.Vector.add(va1,aux1);
        
        let aux2;
        aux2 = p5.Vector.cross(angLokoB,rbp);
        vbp1 = p5.Vector.sub(aux2,-vb1);
        
        vab1 = p5.Vector.add(vap1,vbp1);
        
        let RelativeNormalVelocity = p5.Vector.dot(vab1,normal);
        
        let aux3 = -(1+e)*RelativeNormalVelocity;//
        let aux4 = p5.Vector.cross(rap,normal);
        let aux5 = (1/ma) + (1/mb) + (aux4.z*aux4.z);//
        let aux6 = p5.Vector.cross(rbp,this.n);
        let aux7 = (aux6.z*aux6.z)/i;//
        let impulse = aux3 / (aux5*0.00001 + aux7*0.00001);
        console.log(aux3+"  /  "+aux5*0.00001+"  +  "+aux7*0.00001);
        console.log("impulse:",impulse);
        
        let va2 = createVector(0,0);
        va2 = p5.Vector.mult(normal,impulse);
        va2 = va2.div(ma);
        va2 = va2.add(va1);
        
        let vb2 = createVector(0,0);
        vb2 = p5.Vector.mult(normal,impulse);
        vb2 = vb2.div(mb);
        vb2 = p5.Vector.sub(vb1,vb2);
        
        this.setVel(va2);
        other.setVel(vb2);
    }   
    
    calculateNormal(other){
        this.calculateRealCorners(other);
        if(this.pointPEgdeInfo == undefined){
            other.calculateColision(this);
            return false;
        }else if(this.pointPEgdeInfo == "Horizontal-1_2"){
            this.n = p5.Vector.sub(this.corner1,this.corner4);
            this.n.normalize();
            return true;
        }else if(this.pointPEgdeInfo == "Horizontal-3_4"){
            this.n = p5.Vector.sub(this.corner4,this.corner1);
            this.n.normalize();
            return true;
        }else if(this.pointPEgdeInfo == "Vertical-1_4"){
            this.n = p5.Vector.sub(this.corner2,this.corner1);
            this.n.normalize();
            return true;
        }else if(this.pointPEgdeInfo == "Vertical-3_4"){
            this.n = p5.Vector.sub(this.corner1,this.corner2);
            this.n.normalize();
            return true;
        }else{
            //console.log("ERRO NO CALCULO DA FORÇA NORMAL");
            return false;
        }
        
    }
    calculateRealCorners(other){
        let nc = cos(-this.ang);
        let ns = sin(-this.ang);

        this.corner1.x = this.pos.x - this.w/2;
        this.corner1.y = this.pos.y - this.h/2;
        this.corner2.x = this.pos.x + this.w/2;
        this.corner2.y = this.pos.y - this.h/2;
        this.corner3.x = this.pos.x + this.w/2;
        this.corner3.y = this.pos.y + this.h/2;
        this.corner4.x = this.pos.x - this.w/2;
        this.corner4.y = this.pos.y + this.h/2;
        let a = 0;
        for(let corner of this.corners){
            let aux1 = corner.x;
            corner.x = (corner.x - this.pos.x) * nc - (corner.y - this.pos.y) * (-ns) + this.pos.x;
            corner.y = (aux1 - this.pos.x) * (-ns) + (corner.y - this.pos.y) * nc + this.pos.y;
        }
    }

    calculateColisionOposite(other){

    }

    bagulholoko(other){
        this.pos.x += -this.vel.x;
        this.pos.y += -this.vel.y;
        other.pos.x += -other.vel.x;
        other.pos.y += -other.vel.y;
    }
}