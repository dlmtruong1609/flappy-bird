export default class MySprite {
  constructor(img_url, ctx, cvs) {
    this.ctx = ctx;
    this.cvs = cvs;
    this.MyImg = new Image();
    this.MyImg.src = img_url || "";
  }
  Do_Frame_Things(angle, x, y) {
    this.ctx.save();
    this.ctx.translate(x + this.MyImg.width/2 + 150,y + this.MyImg.height/2 + 250);
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.drawImage(this.MyImg, -this.MyImg.width / 2, -this.MyImg.height / 2);
    this.ctx.restore();
  }
}