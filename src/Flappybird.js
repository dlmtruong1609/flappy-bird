export default class Flappybird {
  constructor(context, canvas) {
    this.ctx = context;
    this.cvs = canvas;

    this.bird = new Image();
    this.bg = new Image();
    this.fg = new Image();
    this.sewerPipesNorth = new Image();
    this.sewerPipesSouth = new Image();

    this.bird.src = require("./assets/images/bird.png");
    this.bg.src = require("./assets/images/bg.png");
    this.fg.src = require("./assets/images/fg.png");
    this.sewerPipesNorth.src = require("./assets/images/sewerpipesNorth.png");
    this.sewerPipesSouth.src = require("./assets/images/sewerpipesSouth.png");

    this.pos = [
      {
        x: this.fg.width,
        y: 0
      }
    ];
    this.space = 300;
  }
  getHeight() {
    return this.cvs.height;
  }

  getWidth() {
    return this.cvs.width;
  }

  drawBird() {
    this.ctx.drawImage(this.bird, this.getWidth() / 2, this.getHeight() / 2);
  }

  drawBg() {
    this.ctx.drawImage(this.bg, 0, 0, this.fg.width, this.getHeight());
  }

  drawFg() {
    this.ctx.drawImage(this.fg, 0, this.getHeight() - 100);
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

      this.drawFg();

      this.drawPipes();

      requestAnimationFrame(run);
    };

    run();
  }

  drawPipes() {
    for (let i = 0; i < 1; i++) {
      this.drawSewerPipesNorth(this.pos[i].x, this.pos[i].y);
      this.drawSewerPipesSouth(this.pos[i].x, this.pos[i].y + this.space);

      this.pos[i].x--;

      if (this.pos[i].x == 50) {
        this.pos[i].x = 300;
      }
    }
  }
}