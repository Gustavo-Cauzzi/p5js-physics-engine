class checkbox{
    constructor(x,y,w,h,stroke,fill){
        this.value = false;
        this.visible = true;
        this.x = x;
        this.y = y;
        if(w == "padrao"){
            this.w = 25;    
        }else{
            this.w = w;
        }
        if(h == "padrao"){
            this.h = 25;
        }else{
            this.h = h;    
        }
        if(stroke != undefined){
            this.stroke = stroke;
            this.strokeHover = stroke;
        }else{
            this.stroke = "#8E8E8E";
            this.strokeHover = "#8E8E8E";
        }
        
        if(fill != undefined){
            this.fill = fill;
            this.fillHover = fill;
        }else{
            this.fill = "#CACACA";
            this.fillHover = "#CACACA";
        }
        this.textSize = 22;
        this.textX = this.x+this.w/2-this.textSize/3;
        this.textY = this.y+this.h/2+this.textSize/3;
        this.textAddX = 0;
        this.textAddY = 0;
    }
    setFillHover(a){
        this.fillHover = a;
    }
    setTextCoord(x,y){
        if(x != undefined){
            this.textAddX = x;
        }
        if(y != undefined){
            this.textAddY = y;
        }
    }
    setVisible(a){
        this.visible = a;
    }
    isVisible(a){
        return this.visible;
    }
    setStroke(a){
        this.stroke = a;
    }
    setFill(a){
        this.fill = a;
    }
    setStrokeHover(a){
        this.strokeHover = a;
    }
    setFillHover(a){
        this.fillHover = a;
    }
    setTextSize(a){
        this.textSize = a;
    }
    show(){
        if (!this.visible) return;
        if(this.mouseHover()){
            stroke(this.strokeHover);
            fill(this.fillHover);
        }else{
            stroke(this.stroke);
            fill(this.fill);
        }
        strokeWeight(3);
        rectMode(CORNER);
        textSize(16);
        rect(this.x,this.y,this.w,this.h,5);
        if(this.value){
            fill(this.stroke);
            strokeWeight(1);
            textSize(this.textSize);
            text("X",this.textX,this.textY);
        }      
    }
    
    mouseHover(){
        if(mouseX >= this.x && mouseX <= this.x + this.w){
            if(mouseY >= this.y && mouseY <= this.y + this.h){
                return  true;
            } 
        }
        return false;
    }
    
    wasPressed(){
        if (!this.visible) return;
        if(mouseX >= this.x && mouseX <= this.x + this.w){
            if(mouseY >= this.y && mouseY <= this.y + this.h){
                this.changeValue();
                return;
            } 
        }
        return;
    }
    
    changeValue(){
        if(this.value){
            this.value = false;
        }else{
            this.value = true;
        }
    }
}