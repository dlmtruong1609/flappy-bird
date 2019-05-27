import MySprite from "./drawBird";

export default class Flappybird {
  constructor(context, canvas) {
    this.ctx = context;
    this.cvs = canvas;

    this.bird = new Image();
    this.bg = new Image();
    this.fg = new Image();
    this.sewerPipesNorth = new Image();
    this.sewerPipesSouth = new Image();
    // vẽ các đối tượng
    this.bird.src = require("./assets/images/bird.png")
    this.bg.src = require("./assets/images/bg.png");
    this.fg.src = require("./assets/images/fg.png");
    this.sewerPipesNorth.src = require("./assets/images/sewerpipesNorth.png");
    this.sewerPipesSouth.src = require("./assets/images/sewerpipesSouth.png");

    this.gap = 105; // khoảng cách giữa cột trên và dưới
    this.bX = 0; // vt
    this.bY = 0; // vt
    this.jump = 60; // lực nhảy
    this.fall = 4;
    this.start = true;
    //mảng các cột
    this.pipes = [
      {
        x: canvas.width,
        y: 0
      }
    ];
    this.angle = 0; // góc
    this.x = 0;
    this.scores = 0;
  }
  getHeight() {
    return this.cvs.height;
  }

  getWidth() {
    return this.cvs.width;
  }

  drawBird() {
    this.run = new MySprite(this.bird.src, this.ctx, this.cvs);
    this.run.Do_Frame_Things(this.angle, this.bX, this.bY);
  }

  drawBg() {
    this.ctx.drawImage(this.bg, 0, 0, this.getWidth(), this.getHeight());
  }

  drawFg(x = 0) {
    this.ctx.drawImage(this.fg, x, this.getHeight() - 70, this.getWidth(), 70);
  }

  drawSewerPipesNorth(x, y) {
    this.ctx.drawImage(this.sewerPipesNorth, x, y);
  }

  drawSewerPipesSouth(x, y) {
    this.ctx.drawImage(this.sewerPipesSouth, x, y);
  }

  drawScro() {
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "40px Times New Romans";
    this.ctx.fillText(`${this.scores}`, this.getWidth() / 2, 60);
  }
  drawButton() {
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "40px Times New Romans";
    this.ctx.fillText("Tiếp tục", this.getWidth() / 3, this.getHeight() / 2);
  }
  draw() {
    let run = () => {
      this.drawBg();
      this.drawBird();
      this.bY += this.fall; // rơi
      // bắt đầu xoay
      if (this.bY > this.pos) {
        this.angle += 10;
      }
      if (this.bY < this.pos - 20) {
        this.angle = -20;
      }
      // giữ nguyên góc
      if (this.angle > 70) {
        this.angle = 70;
      }

      if (this.bY < this.pos - this.jump) {
        clearInterval(this.fly);
      }
      this.drawPipes();

      this.drawFg();
      this.drawScro();
      if (this.start == true) {
        requestAnimationFrame(run);
      } // tạo aminate
    };

    run();
  }

  drawPipes() {
    for (let i = 0; i < this.pipes.length; i++) {
      this.drawSewerPipesNorth(this.pipes[i].x, this.pipes[i].y);
      this.drawSewerPipesSouth(this.pipes[i].x, this.pipes[i].y + 240 + this.gap);
      this.drawFg(this.pipes[i].x);
      this.pipes[i].x--;

      this.collision(this.pipes[i].x, this.pipes[i].y);
      // đánh dấu xuất hiện cột mới
      if (this.pipes[i].x == 80) {
        this.pipes.push({
          x: this.cvs.width,
          y: Math.random() * -200
        });
      }
    }
  }
  bird_Fly() {
    if (this.start === false) {
      location.reload();
    }
    clearInterval(this.fly);
    this.angle = -20;
    this.pos = this.bY;
    this.fly = setInterval(() => {
      this.bY -= 2.5;
    }, 6);
  }
  collision(x, y) {
    this.hookLeft = this.getWidth() / 2 + 34;
    this.hookRight = this.getWidth() / 2 - 40;

    if (x == this.hookLeft) {
      this.scores++;
    }
    if (x <= this.hookLeft && x >= this.hookRight) {
      if (this.bY < y - 5 || this.bY >= y + this.gap - 28) {
        this.drawButton();
        this.start = false;
      }
    }
    if (this.bY >= 170) {
      this.drawButton();
      this.fall = 0;
      this.start = false;
    }
  }
}
