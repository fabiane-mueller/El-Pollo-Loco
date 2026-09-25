class MovableObjects extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObjects) {  // throwableobjects should always fall
      return true;
    } else {
      return this.y < 180;
    }
  }

 

isColliding(mO) {
  return (
    this.x + this.offset.left + this.width - this.offset.right - this.offset.left >
      mO.x + mO.offset.left &&
    this.y + this.offset.top + this.height - this.offset.top - this.offset.bottom >
      mO.y + mO.offset.top &&
    this.x + this.offset.left <
      mO.x + mO.offset.left + mO.width - mO.offset.left - mO.offset.right &&
    this.y + this.offset.top <
      mO.y + mO.offset.top + mO.height - mO.offset.top - mO.offset.bottom
  );
}

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
    
  }

  playAnimation(images) {
    let i = this.currentImages % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImages++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
