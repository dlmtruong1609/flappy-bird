import MySprite from "./draw";

export default class Flappybird {
  constructor(context, canvas) {
    this.ctx = context;
    this.cvs = canvas;

    this.bird = new Image();
    this.bg = new Image();
    this.fg = new Image();
    this.sewerPipesNorth = new Image();
    this.sewerPipesSouth = new Image();

    this.bird.src = require("./assets/images/bird.png")
    this.bg.src = require("./assets/images/bg.png");
    this.fg.src = require("./assets/images/fg.png");
    this.sewerPipesNorth.src = require("./assets/images/sewerpipesNorth.png");
    this.sewerPipesSouth.src = require("./assets/images/sewerpipesSouth.png");

    this.gap = 350;
    this.bX = 0;
    this.bY = 0;
    this.gravity = 1;
    this.jump = 60;
    this.i = 1;
    this.pipes = [
      {
        x: canvas.width,
        y: 0
      }
    ];
    this.angle = 0;
  }
  getHeight() {
    return this.cvs.height;
  }

  getWidth() {
    return this.cvs.width;
  }

  drawBird() {
    this.run = new MySprite("http://s2js.com/img/etc/flappybird.png", this.ctx, this.cvs);
    this.run.Do_Frame_Things(this.angle, this.bX, this.bY);
  }

  drawBg() {
    this.ctx.drawImage(this.bg, 0, 0, this.getWidth(), this.getHeight());
  }

  drawFg() {
    this.ctx.drawImage(this.fg, 0, this.getHeight() - 60, this.getWidth(), 70);
  }

  drawSewerPipesNorth(x, y) {
    this.ctx.drawImage(this.sewerPipesNorth, x, y);
  }

  drawSewerPipesSouth(x, y) {
    this.ctx.drawImage(this.sewerPipesSouth, x, y);
  }

  draw() {
    let run = () => {
      this.drawBg();
      this.drawBird();
      this.angle += 2;
      if (this.angle > 0) {
        this.angle += 2;
        this.bY += 4;
      }
      if (this.bY < this.pos + 100) {
        this.angle = -30;
        this.bY += 6;
      }

      if (this.angle > 70) {
        this.angle = 70;
      }

      console.log(this.bY);
      this.drawPipes();

      this.drawFg();
      setTimeout(() => {
        requestAnimationFrame(run);
      }, 1000 / 60);
    };

    run();
  }

  drawPipes() {
    for (let i = 0; i < this.pipes.length; i++) {
      this.drawSewerPipesNorth(this.pipes[i].x, this.pipes[i].y);
      this.drawSewerPipesSouth(this.pipes[i].x, this.pipes[i].y + this.gap);

      this.pipes[i].x--;

      if (this.pipes[i].x == 100) {
        this.pipes.push({
          x: this.cvs.width,
          y: Math.floor(Math.random() * this.sewerPipesNorth.height) - this.sewerPipesNorth.height
        });
      }
    }
  }
  bird_Fly() {
    this.angle = -30;
    this.bY -= 100;
    this.pos = this.bY;
  }
}
