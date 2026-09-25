class DrawableObject{
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


  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }



   draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
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