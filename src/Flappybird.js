import MySprite from "./objBird";

export default class Flappybird {
  constructor(context, canvas) {
    this.ctx = context;
    this.cvs = canvas;

    this.bg = new Image();
    this.fg = new Image();
    this.sewerPipesNorth = new Image();
    this.sewerPipesSouth = new Image();
    // vẽ các đối tượng
    this.bg.src = require("./assets/images/bg.png");
    this.fg.src = require("./assets/images/fg.png");
    this.sewerPipesNorth.src = require("./assets/images/sewerpipesNorth.png");
    this.sewerPipesSouth.src = require("./assets/images/sewerpipesSouth.png");
    this.bird = new MySprite(this.ctx, this.cvs);
    // cài đặt thông số ở đây
    this.fps = 60;
    this.defaultWaittime = 1000 / this.fps;
    this.gap = 110; // khoảng cách giữa cột trên và dưới
    this.jump = 55; // lực nhảy
    this.fall = 0; // tốc độ rơi
    this.space = 200; // khoảng cách xuất hiện cột
    this.gameover = false; // check game over
    //mảng các cột
    this.pipes = [
      {
        x: canvas.width,
        y: 0
      }
    ];
    this.startPipe = false;
    this.scores = 0;
    this.flag = 1;
    this.pos = 0;
  }
  getHeight() {
    return this.cvs.height;
  }

  getWidth() {
    return this.cvs.width;
  }

  drawBird() {
    this.bird.Do_Frame_Things();
  }

  drawBg() {
    this.ctx.drawImage(this.bg, 0, 0, this.getWidth(), this.getHeight());
  }

  drawFg(x = 0) {
    this.ctx.drawImage(this.fg, x, this.getHeight() - this.fg.height, this.getWidth(), this.fg.height);
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
  drawNotify() {
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "40px Times New Romans";
    this.ctx.fillText("Tiếp tục", this.getWidth() / 3, this.getHeight() / 2);
  }
  draw() {
    let run = () => {
      if (!this.pointtime) {
        this.pointtime = Date.now();
      }

      this.starttime = Date.now();
      var timeline = this.starttime - this.pointtime;

      this.drawBg();
      this.drawBird();
      this.bird.y += (this.pos * 2);
      // bắt đầu xoay
      // for (let index = 0; index < 100; index++) {
      //   console.log("OK");
      // }
      this.bird.angle += 4;
      // giữ nguyên góc
      if (this.bird.angle > 70) {
        this.bird.angle = 70;
      }

      this.drawPipes(timeline);
      this.drawScro();
      this.endtime = Date.now();
      this.waittime = Math.max(this.defaultWaittime - (this.endtime - this.starttime), 0);
      if (this.gameover != true) {
        setTimeout(run, this.waittime);
      }
    };
    run();
  }
  wait(ms) {
    return new Promise(r => setTimeout(r, ms))
  }
  async drawPipes(timeline) {
    this.drawFg(0);
    for (let i = 0; i < this.pipes.length; i++) {
      this.drawSewerPipesNorth(this.pipes[i].x, this.pipes[i].y);
      this.drawSewerPipesSouth(this.pipes[i].x, this.pipes[i].y + this.sewerPipesNorth.height + this.gap);
      this.drawFg(this.pipes[i].x);
      this.flag++;
      if (this.flag == 3) {
        this.pos = Math.round(timeline / 10);
      }
      this.pipes[i].x -= this.pos;
      this.collision(this.pipes[i].x, this.pipes[i].y);
      // đánh dấu xuất hiện cột mới
      if (this.pipes[i].x <= Math.floor(this.getWidth() - this.space + this.pos / 3) &&
        this.pipes[i].x >= Math.floor(this.getWidth() - this.space - this.pos / 3)) {
        this.pipes.push({
          x: this.cvs.width,
          y: Math.random() * -200
        });
      }
    }
  }
  bird_Fly() {
    if (this.gameover != false) {
      location.reload();
    }
    this.bird.moveTo(this.bird.y, 1000);
  }
  collision(x, y) {
    this.hookLeft = this.getWidth() / 2 + this.bird.MyImg.height / 2;
    this.hookRight = this.hookLeft - this.sewerPipesNorth.width - this.bird.MyImg.width / 2;

    if (x == this.hookLeft - 1) {
      this.scores++;
    }
    if (x <= this.hookLeft && x >= this.hookRight) {
      if ((this.bird.y + this.getHeight() / 2 <= y + this.sewerPipesNorth.height + this.bird.MyImg.height / 2)
      || (this.bird.y + this.getHeight() / 2 >= y + this.sewerPipesNorth.height - this.bird.MyImg.height / 2 + this.gap)) {
        this.drawNotify();
        this.gameover = true;
      }
    }
    if (this.bird.y >= this.getHeight() / 2 - this.fg.height - 10) {
      this.drawNotify();
      this.gameover = true;
    }
  }
}
