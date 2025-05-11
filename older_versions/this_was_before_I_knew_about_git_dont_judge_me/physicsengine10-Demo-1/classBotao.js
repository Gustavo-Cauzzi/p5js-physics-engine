class botao{
    constructor(x,y,w,h,text,stroke,fill){
        this.visible = true;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
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
        this.text = text;
        this.textX = this.x+this.w*3/32;
        this.textY = this.y+this.h*7/12;
        
    }
    setTextCoord(x,y){
        if(x != undefined){
            this.textX = x;
        }
        if(y != undefined){
            this.textY = y;
        }
    }
    setVisible(a){
        this.visible = a;
    }
    setText(a){
        this.text = a;
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
            if(this.text != undefined){
                text(this.text,this.textX,this.textY);
            }      
    }
    
    isPressed(){
        if (!this.visible) return false;
        if(mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h){
            return true;
        }else{
            return false;
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
}