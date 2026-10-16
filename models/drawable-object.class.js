/**
 * Represents DrawableObject.
 */
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

  /**
   * Loads an image for the object.
   * @param {*} path - Input used by this method.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Calculates the object's collision frame.
   */
  getRealFrame() {
    setStoppableInterval(() => {
      this.rX = this.x + this.offset.left;
      this.rY = this.y + this.offset.top;
      this.rW = this.width - this.offset.left - this.offset.right;
      this.rH = this.height - this.offset.top - this.offset.bottom;
    }, 1000 / 60);
  }

  /**
   * Checks whether this object collides with another object.
   * @param {*} mO - Input used by this method.
   */
  isColliding(mO) {
    return (
      this.rX + this.rW > mO.rX &&
      this.rY + this.rH > mO.rY &&
      this.rX < mO.rX + mO.rW &&
      this.rY < mO.rY + mO.rH
    );
  }

  /**
   * Draws game objects on the canvas and schedules the next frame.
   * @param {*} ctx - Input used by this method.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Handles the drawFrame operation.
   * @param {*} ctx - Input used by this method.
   */
  drawFrame(ctx) {
    if (this.checkInstances()) {
      
    }
  }

  /**
   * Loads multiple images into the image cache.
   * @param {*} arr - Input used by this method.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Handles the checkInstances operation.
   */
  checkInstances() {
    return (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Coins ||
      this instanceof Endboss ||
      this instanceof Bottles
    );
  }

  /**
   * Handles the HelpFrame operation.
   * @param {*} ctx - Input used by this method.
   */
  HelpFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "blue";
    ctx.rect(this.rX, this.rY, this.rW, this.rH);
    ctx.stroke();
  }
}
