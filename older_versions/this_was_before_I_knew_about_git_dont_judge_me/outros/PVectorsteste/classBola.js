
class bola{
    constructor(){
        this.local = new p5.Vector(windowWidth/2,windowHeight/2);
        this.velocidade = new p5.Vector(2,2);
    }
    
    show(){
        stroke(200);
        fill(255);
        ellipse(this.local.x,this.local.y,20,20);
    }
    
    move(){
        this.local.add(this.velocidade);
    }
    
    bounce(){
        if(this.local.x >= windowWidth || this.local.x <= 0){
            this.velocidade.x = this.velocidade.x * -1;
        }else if(this.local.y >= windowHeight || this.local.y <= 0){
            this.velocidade.y = this.velocidade.y * -1;
        }
    }
}