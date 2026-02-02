console.log(game)

game.width = 800;
game.height = 800;


const BACKGROUND = "#101010";
const FOREGROUND = "#50FF50"
const ctx = game.getContext("2d")

console.log(ctx)

function clear(){
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0,0,game.width,game.height)
}

function point({x,y}){
    const s = 20;
    ctx.fillStyle=FOREGROUND
    ctx.fillRect(x - s/2,y- s/2,s,s);
}

const FPS = 60;
let dz = 1;

const  vs = [
    {x:0.5,y:0.5,z:0.5},
    {x:-0.5,y:0.5,z:0.5},
    {x:0.5,y:-0.5,z:0.5},
    {x:-0.5,y:-0.5,z:0.5},

    {x:0.5,y:0.5,z:-0.5},
    {x:-0.5,y:0.5,z:-0.5},
    {x:0.5,y:-0.5,z:-0.5},
    {x:-0.5,y:-0.5,z:-0.5},
]

function translate_z({x,y,z},dz){
    return {x:x,y:y,z:z+dz}
}
function frame(){
    const dt = 1 / FPS;
    dz += 1 * dt
    clear();
    
    for(const v of vs){
        point(screen(project(translate_z(v,dz))));
    }

    setTimeout(frame,1000/FPS);
}

setTimeout(frame,1000/FPS)

function screen(p){
    // Converting canvas to axis system
    // -1...1  + 1 => 0..2  / 2 => 0..1 x Width => 0..w
    return {
        x: (p.x + 1) / 2 * game.width,
        y: (1-(p.y + 1)/2) * game.height,
    }

}

function project({x,y,z}){
    return{
        x: x/z,
        y: y/z
    }
}



