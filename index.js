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

let angle = 0;
const  vs = [
    {x:0.25,y:0.25,z:0.25},
    {x:-0.25,y:0.25,z:0.25},
    {x:0.25,y:-0.25,z:0.25},
    {x:-0.25,y:-0.25,z:0.25},

    {x:0.25,y:0.25,z:-0.25},
    {x:-0.25,y:0.25,z:-0.25},
    {x:0.25,y:-0.25,z:-0.25},
    {x:-0.25,y:-0.25,z:-0.25},
]

function translate_z({x,y,z},dz){
    return {x:x,y:y,z:z+dz}
}
function frame(){
    const dt = 1 / FPS;
    dz += 1 * dt

    angle += 2 * Math.PI * dt
    clear();
    
    for(const v of vs){
        point(screen(project(translate_z(rotate_xz(v,angle),dz))));
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

function rotate_xz({x,y,z},angle){
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return{
        x: x*c - z*s,
        y,
        z: x*s + z*c,
    }
}



