var Engine = Matter.Engine,
//    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
let caixa;
let contador = 0;
function setup(){
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;
    caixa = Bodies.rectangle(400,200,50,50);
    world = World.add(engine.world,caixa);
    Engine.run(engine);
    
}

function draw(){
    stroke(255);
    fill(255);
    background(0);
    rect(caixa.position.x,caixa.position.y,50,50);
    contador++;
    if(contador <= 30){
        console.log(caixa);
    }

}
