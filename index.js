

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
var canvas = document.getElementById('canvas')
const WIDTH = 0.99*window.innerWidth;
const HEIGHT = 0.99*window.innerHeight;
const MAXSPEED = 10;
const MINSPEED = -10;
const SPEEDRANGE = MAXSPEED - MINSPEED;
const MINRADIUS = 25;
const MAXRADIUS = 100;
const RADIUSRANGE = MAXRADIUS - MINRADIUS;

canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext('2d');
var raf;
var running;

class Ball {
    constructor(x,y,vx,vy,radius, color = 'rgba(0,255,255,0.8)'){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y + this.vy > HEIGHT || this.y + this.vy < 0){
            this.vy = -this.vy;
        }
    
        if (this.x + this.vx > WIDTH || this.x + this.vx < 0){
            this.vx = -this.vx;
        }
    }

    testContact(other){
        if ((other.x - this.x)*(other.x - this.x) + (other.y - this.y)*(other.y - this.y) <= (this.radius + other.radius)*(this.radius + other.radius)){
            return true;
        } else {
            return false;
        }
    }

    flipDirection(){
        this.vx = - this.vx;
        this.vy = -this.vy;
    }
};

let ballList = [];
for (let i=0; i < 5 ; i++){
    ballList.push(new Ball(
        Math.floor(Math.random() * WIDTH),
         Math.floor(Math.random() * HEIGHT),
          Math.floor(Math.random() * SPEEDRANGE + MINSPEED),
           Math.floor(Math.random() * SPEEDRANGE + MINSPEED),
            Math.floor(Math.random() * RADIUSRANGE + MINRADIUS)
            ));
}

function draw(){
    ctx.clearRect(0,0, WIDTH, HEIGHT);

    // draw the balls
    ballList.forEach((ball) => {
        ball.draw(ctx);
    });

    // move the balls
    ballList.forEach((ball) => {
        ball.move();
    });

    // filter the balls that are in contact with another
    for (let j=0 ; j < ballList.length ; j++){
        let theBall = ballList[j];
        for (let i=0; i < ballList.length; i++){
            let other = ballList[i]
            if (theBall != other && theBall.testContact(other)){
                theBall.flipDirection();
            }
        }
    }

    

    /*
    ball.vy *= 0.99
    ball.vy += 0.25
    */
    raf = window.requestAnimationFrame(draw);
}

raf = window.requestAnimationFrame(draw);
