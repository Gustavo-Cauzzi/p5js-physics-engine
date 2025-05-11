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
        this.bsStep;
        this.bsLastState;
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
        }/*
        stroke(255);
        strokeWeight(0);
        push();
            if(minXa < 0 && minYa > 0){
                text("translate ("+ (round(-minXa),2) + ",0)",width-200,height-150);
                translate(-minXa,0);
            }else if(minYa < 0 && minXa > 0){
                text("translate (0,"+round((-minYa),2)+")",width-200,height-150);
                translate(0,-minYa);
            }else if(minXa < 0 && minYa < 0){
                text("translate ("+round((-minXa),2)+","+round((-minYa),2)+")",width-200,height-150);
                translate(-minXa,-minYa);
            }*/
            //rotate(-this.ang);
            //this.show2();
            //other.show2();
        //pop();
        //this.showCalculatedCorners();
        //other.showCalculatedCorners();
       /* text("maxXa: "+round(maxXa,2),width-200,height-50);
        text("minXa: "+round(minXa,2),width-200,height-75);
        text("maxXb: "+round(maxXb,2),width-200,height-100);
        text("minXb: "+round(minXb,2),width-200,height-125);
        text("maxYa: "+round(maxYa,2),width-400,height-50);
        text("minYa: "+round(minYa,2),width-400,height-75);
        text("maxYb: "+round(maxYb,2),width-400,height-100);
        text("minYb: "+round(minYb,2),width-400,height-125);*/
        
        //strokeWeight(4);
        //stroke("#00FFAB");
       /* line(0,minYa,width,minYa);
        line(0,maxYa,width,maxYa);
        line(minXa,0,minXa,height);
        line(maxXa,0,maxXa,height);
        
        stroke("#B300FF");
        line(minXb,0,minXb,height);
        line(maxXb,0,maxXb,height);
        line(0,minYb,width,minYb);
        line(0,maxYb,width,maxYb);*/
        
        let emX = false,emY = false;
        
        if(minXb <= maxXa && maxXb > minXa){
            //console.log("X");
            emX = true;
        }
        if(minYb <= maxYa && maxYb > minYa){
            //console.log("Y");
            emY = true;
        }
        //console.log("-");
        if(emX && emY){
            return true;
        }else{
            return false;
        }
    }
    intersects(other){
        if(this == other){
            return false;
        }
        if(this.SAT(other) && other.SAT(this)){
            //COLIDIU
            fill(255);
            noStroke();
            text("Colidiu!",50,50);
        }
        
    }
    
    showCalculatedCorners(){
        for(let aa of this.corners){
            stroke("#FA8B0B");
            circle(aa.x,aa.y,2);
        }
    }
    calculateCorners(other){
        let c = cos(this.ang);
        let s = sin(this.ang);
        //rotate(-this.ang);
        stroke(0,255,0);
        
        this.corner1.x = this.pos.x;
        this.corner1.y = this.pos.y;
        circle(this.corner1.x,this.corner1.y,2);
        
        let aux = this.corner1.x;
        this.corner1.x = this.corner1.x * c - this.corner1.y * -s;
        this.corner1.y = this.corner1.y * c - aux * s;
        //CORNER1 ROTACIONADO = x: 159.1 Y: -17.67
        /*
        
        //        
        this.corner2.x = this.w * c + this.pos.x;
        this.corner2.y = this.w * s + this.pos.y;
        circle(this.corner2.x,this.corner2.y,2);     
        */
        /*
        this.corner3.x = this.w * cos(this.ang)-sin(this.ang)*this.h+this.pos.x;
        this.corner3.y = this.w * sin(this.ang) + cos(this.ang)*this.h+this.pos.y;
        circle(this.corner3.x,this.corner3.y,2);
        */
        /*
        this.corner4.x = -sin(this.ang) * this.h + this.pos.x;
        this.corner4.y = cos(this.ang) * this.h + this.pos.y;
        circle(this.corner4.x,this.corner4.y,2);
        */
        /*
        let aux = this.corner1.x;
        this.corner1.x = this.corner1.x * c - this.corner1.y * (-s);
        this.corner1.y = this.corner1.y * c + aux * s;
        stroke("#AEEEF5");
        circle(this.corner1.x,this.corner1.y,2);     
        
        stroke(172,100,250);
        this.corner2.x = this.corner2.x * c - this.corner2.y * (-s);
        this.corner2.y = this.corner2.y * c + aux * -s;
        console.log(this.corner2);
        circle(this.corner2.x,this.corner2.y,2);       
        stroke(0,255,0);
        */
        //
        
        
        strokeWeight(5);
        stroke(0,100,255);
        other.corner1.x = other.pos.x;
        other.corner1.y = other.pos.y;
        circle(other.corner1.x,other.corner1.y,2);
        //
        stroke(0,0,255);
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
        
        for(let corner of other.corners){
            let aux1 = corner.x;
            corner.x = corner.x * c - corner.y * (-s);
            corner.y = corner.y * c + aux1 * -s;  
            if(corner == other.corner1){
                stroke(255,100,100);
            }else{
                stroke(200,255,0);
            }
            //circle(corner.x,corner.y,2);
        }
        this.corner2.x = this.corner1.x + this.w;
        this.corner2.y = this.corner1.y;
        this.corner3.x = this.corner1.x + this.w;
        this.corner3.y = this.corner1.y + this.h;
        this.corner4.x = this.corner1.x;
        this.corner4.y = this.corner1.y + this.h;
    }
    
/*    binarySearch(other){
        this.posAux = p5.Vector.sub(this.pos,p5.Vector.div(this.vel,2));
        other.posAux = p5.Vector.sub(other.pos,p5.Vector.div(other.vel,2));
        this.binarySearchStep(other);
        
    }
    
    binarySearchStep(other){
        if(this.SAT2(other) && other.SAT2(this)){
           this.bsStep *= 2;
           this.posAux = p5.Vector.sub(this.pos,p5.Vector.div(this.vel,2*this.bsStep));
           other.posAux = p5.Vector.sub(other.pos,p5.Vector.div(other.vel,2*other.bsStep));
        }else{
           this.bsStep *= 0.5;
           this.posAux = p5.Vector.sub(this.pos,p5.Vector.div(this.vel,2*this.bsStep));
           other.posAux = p5.Vector.sub(other.pos,p5.Vector.div(other.vel,2*other.bsStep));
        }
    }
    sat2(other){
        this.calculateCorners2(other);
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
        let emX = false,emY = false;
        
        if(minXb <= maxXa && maxXb > minXa){
            //console.log("X");
            emX = true;
        }
        if(minYb <= maxYa && maxYb > minYa){
            //console.log("Y");
            emY = true;
        }
        //console.log("-");
        if(emX && emY){
            return true;
        }else{
            return false;
        }
    }
    
    calculateCorners2(other){
        let c = cos(this.ang);
        let s = sin(this.ang);
        //rotate(-this.ang);
        stroke(0,255,0);
        
        this.corner1.x = this.posAux.x;
        this.corner1.y = this.posAux.y;
        circle(this.corner1.x,this.corner1.y,2);
        
        let aux = this.corner1.x;
        this.corner1.x = this.corner1.x * c - this.corner1.y * -s;
        this.corner1.y = this.corner1.y * c - aux * s;
        //CORNER1 ROTACIONADO = x: 159.1 Y: -17.67
        /*
        
        //        
        this.corner2.x = this.w * c + this.pos.x;
        this.corner2.y = this.w * s + this.pos.y;
        circle(this.corner2.x,this.corner2.y,2);     
        */
        /*
        this.corner3.x = this.w * cos(this.ang)-sin(this.ang)*this.h+this.pos.x;
        this.corner3.y = this.w * sin(this.ang) + cos(this.ang)*this.h+this.pos.y;
        circle(this.corner3.x,this.corner3.y,2);
        */
        /*
        this.corner4.x = -sin(this.ang) * this.h + this.pos.x;
        this.corner4.y = cos(this.ang) * this.h + this.pos.y;
        circle(this.corner4.x,this.corner4.y,2);
        */
        /*
        let aux = this.corner1.x;
        this.corner1.x = this.corner1.x * c - this.corner1.y * (-s);
        this.corner1.y = this.corner1.y * c + aux * s;
        stroke("#AEEEF5");
        circle(this.corner1.x,this.corner1.y,2);     
        
        stroke(172,100,250);
        this.corner2.x = this.corner2.x * c - this.corner2.y * (-s);
        this.corner2.y = this.corner2.y * c + aux * -s;
        console.log(this.corner2);
        circle(this.corner2.x,this.corner2.y,2);       
        stroke(0,255,0);
     
        //
        
        
        strokeWeight(5);
        stroke(0,100,255);
        other.corner1.x = other.posAux.x;
        other.corner1.y = other.posAux.y;
        circle(other.corner1.x,other.corner1.y,2);
        //
        stroke(0,0,255);
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
        
        for(let corner of other.corners){
            let aux1 = corner.x;
            corner.x = corner.x * c - corner.y * (-s);
            corner.y = corner.y * c + aux1 * -s;  
            if(corner == other.corner1){
                stroke(255,100,100);
            }else{
                stroke(200,255,0);
            }
            //circle(corner.x,corner.y,2);
        }
        this.corner2.x = this.corner1.x + this.w;
        this.corner2.y = this.corner1.y;
        this.corner3.x = this.corner1.x + this.w;
        this.corner3.y = this.corner1.y + this.h;
        this.corner4.x = this.corner1.x;
        this.corner4.y = this.corner1.y + this.h;
    }*/
}