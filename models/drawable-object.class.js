class DrawableObject {
  img;
  imageCache = {};
  currentImages = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  currentX = 0;
  rX;
  rY;
  rW;
  rH;

  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rW = this.width - this.offset.left - this.offset.right;
    this.rH = this.height - this.offset.top - this.offset.bottom;
  }

  isColliding(mO) {
    return (
      this.rX + this.rW > mO.rX &&
      this.rY + this.rH > mO.rY &&
      this.rX < mO.rX + mO.rW &&
      this.rY < mO.rY + mO.rH
    );
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof Endboss || this instanceof Bottles) 
       {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.rX, this.rY, this.rW, this.rH);
      ctx.stroke();
    }
  }




  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
