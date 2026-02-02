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


clear();
point(screen({x:-1,y:1}));


function screen(p){
    // -1...1  + 1 => 0..2  / 2 => 0..1 x Width => 0..w
    return {
        x: (p.x + 1) / 2 * game.width,
        y: (1-(p.y + 1)/2) * game.height,
    }

}

