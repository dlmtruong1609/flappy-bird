export default class MySprite {
  constructor(ctx, cvs) {
    this.ctx = ctx;
    this.cvs = cvs;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.incrY = 0;
    this.MyImg = new Image();
    this.MyImg.src = require("./assets/images/bird.png");
    this.timeLine = 0;
    this.defaultTime = 1000 / 60;
  }
  Do_Frame_Things() {
    this.ctx.save();
    this.ctx.translate(this.x + this.cvs.width / 2, this.y + this.cvs.height / 2);
    this.ctx.rotate(this.angle * Math.PI / 180);
    this.ctx.drawImage(this.MyImg, -this.MyImg.width / 2, -this.MyImg.height / 2);
    this.ctx.restore();
  }
  moveTo(cPos, time, pointtime) {
    let run = () => {
      this.angle = -20;
      if (!pointtime) {
        pointtime = Date.now();
      }
      var starttime = Date.now();
      this.timeline = starttime - pointtime;
      if (this.timeline / time > 0.3) return;
      var per = this.timeline / 2000;
      this.y = cPos - 500 * per;
      var endtime = Date.now();
      var waittime = Math.max(this.defaultTime - (endtime - starttime), 0);
      setTimeout(run, waittime, pointtime);
    };
    run();
  }
}