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
        this.ang = PI/4;
        this.angVelocity = 1;
        this.angAceleration = createVector(0,0);
        this.centerOfMass = createVector(this.pos.x+this.w/2,this.pos.y+this.h/2);
        this.currentColision = createVector(0,0);
        this.angCurrentColision = 0;
        this.finalColVel = createVector(0,0);
        this.finalColAngVel = createVector(0,0);
        this.distColisionP = createVector(0,0);
        this.impulse = 0;
        this.e = 1;
        this.n = createVector(0,0);
        this.i = 1;
        this.connectedPoints = [];
        this.corner1=createVector(0,0);
        this.corner2=createVector(0,0);
        this.corner3=createVector(0,0);
        this.corner4=createVector(0,0);
    }
    
    generateConnectedPoints(){
        let a1 = this.pos.x;
        let a2 = this.pos.y;
        let point = [];
        for(a1 ; a1 < this.w+this.pos.x; a1+=50){
            point = [a1,a2];
            this.connectedPoints.push(point);
        }
        for(a2 ; a2 <= this.pos.y+this.h; a2+=50){
            point = [a1,a2];
            this.connectedPoints.push(point);
        }
        for(a1 ; a1 >= this.pos.x; a1-=50){
            point = [a1,a2];
            this.connectedPoints.push(point);
        }
        for(a2 ; a2 >= this.pos.y; a2-=50){
            point = [a1,a2];
            this.connectedPoints.push(point);
        }
        if(this.ang!=0){
            for(let p of this.connectedPoints){
            p[0] = (p[0]-this.pos.x)*cos(this.ang)-(p[1]-this.pos.y)*sin(this.ang)+this.pos.x;
            p[1] = (p[0]-this.pos.x)*sin(this.ang)-(p[1]-this.pos.y)*cos(this.ang)+this.pos.y;
                fill(0,255,0);
                stroke(0,255,0);
                circle(p[0],p[1],1);
            }
            
        }else{
            return;
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
            rectMode(CORNERS);
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
    
    
    doPolygonsIntersect(other){
    let a = this.connectedPoints;
    let b = other.connectedPoints;
    var polygons = [a, b];
    var minA, maxA, projected, i, i1, j, minB, maxB;

    for (i = 0; i < polygons.length; i++) {

        // for each polygon, look at each edge of the polygon, and determine if it separates
        // the two shapes
        var polygon = polygons[i];
        for (i1 = 0; i1 < polygon.length; i1++) {

            // grab 2 vertices to create an edge
            var i2 = (i1 + 1) % polygon.length;
            var p1 = polygon[i1];
            var p2 = polygon[i2];

            // find the line perpendicular to this edge
            var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

            minA = maxA = undefined;
            // for each vertex in the first shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            for (j = 0; j < a.length; j++) {
                projected = normal.x * a[j].x + normal.y * a[j].y;
                if (minA == undefined || projected < minA) {
                    minA = projected;
                }
                if (maxA == undefined || projected > maxA) {
                    maxA = projected;
                }
            }

            // for each vertex in the second shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            minB = maxB = undefined;
            for (j = 0; j < b.length; j++) {
                projected = normal.x * b[j].x + normal.y * b[j].y;
                if (minB == undefined || projected < minB) {
                    minB = projected;
                }
                if (maxB == undefined || projected > maxB) {
                    maxB = projected;
                }
            }

            // if there is no overlap between the projects, the edge we are looking at separates the two
            // polygons, and we know there is no overlap
            if (maxA < minB || maxB < minA) {
                CONSOLE("polygons don't intersect!");
                return false;
            }
        }
    }
    return true;
    }
    
    intersects(other){
        if(this.pos.equals(other.pos.x,other.pos.y)){
            return false;
        }
            
    }
}