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
        this.corners = [this.corner1,this.corner2,this.corner3,this.corner4];
        this.pointP = createVector(0,0);
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
            console.log("me:",me);
            while(!this.discoverPointP(other,me)){
                me += meAdd;
                console.log("me:",me);
                if(me >= 50){
                    achouA= false;
                    break;
                }
            }
            console.log("testando B");
            let me2 = 0;
            other.calculateCorners(this);
            //other.show2();
            //this.show2();
            while(!other.discoverPointP(this,me2)){
                me2 += meAdd;
                console.log("me:",me2);
                if(me2 > me){
                    achouB = false;
                    console.log("deu ruim");
                    break;
                }
            }    
            if(achouA && achouB){
                console.log("this.pointP = other.pointP;");
                this.pointP = other.pointP;
                stroke(255);
                line(this.pointP.x,0,this.pointP.x,height);
                line(0,this.pointP.y,width,this.pointP.y);
            }
            console.log("this.pointP: ",this.pointP);
            console.log("other.pointP: ",other.pointP);
            //////////////////////////////////////////////////////////////////////////
            /*
            let achouA = true, achouB = true;
            let meAdd = 5;
            let me = 0;// Margem de erro
            console.log("me: ",me);
            while(!this.discoverPointP(other,me)){
                me += meAdd;
                console.log("me: ",me);
                if(me >= width){
                    achouA= false;
                    break;
                }
            }
            
            let me2 = 0;
            other.calculateCorners(this);
            while(!other.discoverPointP(this,me2)){
                me2 += meAdd;
                console.log("me2: ",me2);
                if(me2 >= me){
                    achouB= false;
                    break;
                }
            }/*
            if(achouA && achouB){
                this.pointP = other.pointP;
                this.showPointP(this.pointP,true);
            }else{
                other.pointP = this.pointP;
                this.showPointP(this.pointP,false);
            }
            this.showPointP(this.pointP);
            other.showPointP(other.pointP,true);
            console.log("this.PontoP:",this.pointP);
            console.log("other.PontoP:",other.pointP);*/
        
    }
    intersects(other){
        if(this == other){
            return;
        }
        if(other.SAT(this) && this.SAT(other)){
            //COLIDIU
            this.findPointP(other);
            line(a,a,a,a);
        }
        
    }
    
    showPointP(corner,aa){
        if(aa){
            stroke(255);
            line(corner.x,0,corner.x,height);
            line(0,corner.y,width,corner.y);    
        }else{
            stroke(0,255,255);
            line(corner.x,0,corner.x,height);
            stroke(255,0,255);
            line(0,corner.y,width,corner.y);    
        }
        
    }
    savePointP(corner){
        this.pointP = corner;
        this.undoSatRotation();
    }
    undoSatRotation(){
        /*corner.x = corner.x * c - corner.y * (-s);
            corner.y = corner.y * c + aux1 * -s;  */
        let aux = this.pointP.x;
        this.pointP.x = this.pointP.x * cos(-this.ang) - this.pointP.y * (-sin(-this.ang));
        this.pointP.y = this.pointP.y * cos(-this.ang) + aux * (-sin(-this.ang));
        //this.loko(this.pointP);
    }
    
    discoverPointP(other,me){
        for(let corner of other.corners){
            if(corner.y <= this.corner1.y + me && corner.y >= this.corner1.y - me){
                if(corner.x >= this.corner1.x && corner.x <= this.corner2.x){
                    this.savePointP(corner);
                    this.showPointP(corner);
                    console.log("temos um ponto P: ",corner);
                    return true;
                }
            }else if(corner.x <= this.corner1.x + me && corner.x >= this.corner1.x - me){
                if(corner.y >= this.corner1.y && corner.y <= this.corner4.y){
                    this.savePointP(corner);
                    this.showPointP(corner);
                    console.log("temos um ponto P: ",corner);
                    return true;
                }                    
            }else if(corner.x <= this.corner2.x + me && corner.x >= this.corner2.x - me){
                if(corner.y >= this.corner2.y && corner.y <= this.corner3.y){
                    this.savePointP(corner);
                    this.showPointP(corner);
                   console.log("temos um ponto P: ",corner);
                    return true;
                }
            }else if(corner.y <= this.corner4.y + me && corner.y >= this.corner4.y - me){
                if(corner.x >= this.corner4.x && corner.x <= this.corner3.x){
                    this.savePointP(corner);
                    this.showPointP(corner);
                    console.log("temos um ponto P: ",corner);
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
}