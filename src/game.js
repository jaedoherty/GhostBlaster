import Level from "./level";
import Shooter from "./shooter";
import Bullet from "./bullet";
import Ghost from "./ghost";

export default class GhostBlasters {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.interval = 2000;
        this.bullets = [];
        this.ghosts = [];
        this.score = 0;
        this.creepster = new FontFace(
            "Creepster",
            "url(images/Creepster-Regular.ttf)"
        )
        this.registerEvents();
        this.restart();
    }
    
    registerEvents() {
        this.boundClickHandler = this.click.bind(this);
        document.addEventListener("keydown", this.boundClickHandler);
        this.boundShootHandler = this.shoot.bind(this);
        this.canvas.addEventListener("mousedown", this.boundShootHandler);
    }

    restart() {
        this.running = false;
        this.level = new Level(this.dimensions);
        this.shooter = new Shooter (this.dimensions);
        this.bullet = new Bullet(this.dimensions);
        // this.ghost = new Ghost(this.dimensions);
 
        this.animate(); 
    }

    play() {
       this.running = true;
       this.animate(); 
    }

    click(e) {
        if (!this.running) {
            this.play();
        }

        this.level.moveHouse();
        this.ghostInterval();
         
    }

    shoot(e) {
        if (!this.running) {
            this.play();
        }
        console.log(this.bullets.length);
        if (this.bullets.length > 15) {
            this.bullets.shift();
        }
        
        const bullet = new Bullet();
        this.bullets.push(bullet);

 
        const x = e.clientX - this.canvas.offsetLeft;
        const y = e.clientY - this.canvas.offsetTop;
        debugger
        bullet.moveBullet(x, y); 
    }

    ghostInterval() {
        if (this.ghosts.length % 10 === 0) {
            this.ghosts.shift();
            this.interval -= 500;
        }

        setInterval(this.addGhost.bind(this), this.interval)
        


    }

    addGhost(count) {
        for (let ghost = 0; ghost < count; ghost++) {
            const ghost = new Ghost(this.dimensions)
            this.ghosts.push(ghost)
            
        }
        const ghost = new Ghost(this.dimensions) 
        this.ghosts.push(ghost);
        ghost.animate(this.ctx);
        console.log(this.ghosts);
        
    }


    drawSparkles(ctx) {
        var sparkles = new Image();
        sparkles.src = './images/stars.png';
        ctx.drawImage(sparkles, 180, 725  , 100, 100)
        sparkles.onload = function () {

            ctx.drawImage(sparkles, 180, 725, 100, 100)
        }
    }
 
    animate() {
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        this.level.animate(this.ctx);
        this.shooter.animate(this.ctx);
        // this.ghost.animate(this.ctx);
        
        
        if (!this.running) {
            this.howToPlay();
            this.instructions();
            this.highScore();
            this.startGame();
        }
        if (this.running) {
            // this.ghostInterval();
            this.bullets.forEach(bullet => bullet.animate(this.ctx));
            this.ghosts.forEach(ghost => ghost.animate(this.ctx));
            this.hitGhost(this.ctx);
            requestAnimationFrame(this.animate.bind(this));
            this.drawSparkles(this.ctx);
            this.drawScore();
            this.gameOver();
            
        }
    }

    hitGhost(ctx) {
        this.ghosts.forEach((ghost, i) => {
            if (this.collidesWith(ghost)) {
                ghost.velocity = 0;
                // ghost.deadGhost(ctx);
                this.score += 1;
                ghost.dead = true;
                setTimeout(() => this.ghosts.splice(i, 1), 3000)
;
            }
        })
    }

    collidesWith(ghost) {
 
        const _overlap = (bullet, ghost) => {
            if (ghost.dead) {
                return false;
            }
            if (bullet.position[0] > ghost.x + 63 || bullet.position[0]+ 100 < ghost.x) {
                return false;
            }
            if (bullet.position[1] > ghost.y + 70 || bullet.position[1] + 100 < ghost.y) {
                return false;
            }
            return true;
        };
        let collision = false;
        this.bullets.forEach((bullet, j) => {
            if (

                _overlap(bullet, ghost)
            ) { collision = true; 
                bullet.speed = [0, 0];
                this.bullets.splice(j, j+1)
            }
        });
        return collision;
    }



    startGame() {
        this.creepster.load().then((font) => {

            this.ctx.font = "20pt Creepster";
            this.ctx.fillStyle = "#b30000";
            this.ctx.fillText("Press any key to start", 365, 350);
        })
    }

    instructions() {
        this.creepster.load().then((font) => {
            this.ctx.font = "20pt Creepster";
            this.ctx.fillStyle = "#b30000";
            this.ctx.fillText("Click on ghosts to shoot them.", 315, 250);
        })
    }

    highScore() {
        this.creepster.load().then((font) => {

            this.ctx.font = "20pt Creepster";
            this.ctx.fillStyle = "#b30000";
            this.ctx.fillText("Shoot as many ghosts as possible to get a high score!", 225, 300);
        })
    }

    howToPlay() {
        this.creepster.load().then((font) => {

            this.ctx.font = "30pt Creepster";
            this.ctx.fillStyle = "#b30000";
            this.ctx.fillText("How to play:", 395, 200);
        })
    }

    drawScore() {
        //loc will be the location 
        // const loc = { x: this.dimensions.width / 2, y: this.dimensions.height / 4 }
        this.ctx.font = "30pt Creepster";
        this.ctx.fillStyle = "#b30000";
        this.ctx.fillText(this.score, 10, 790);
    }

    gameOver() {
        this.ghosts.forEach(ghost => {
            if (ghost.x + 63 <= 0) {
                alert("game over")
            }
        })
    }
}