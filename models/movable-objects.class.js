/**
 * Represents MovableObjects.
 * Inherits functionality from DrawableObject.
 */
class MovableObjects extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  isJumping = false;

/**
 * Applies gravity to the object.
 */
applyGravity() {
  setStoppableInterval(() => {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;

      if (this.speedY < 0) {
        if (this.world) {
          this.world.isFalling = true;
        }
      }
    } else {
      this.speedY = 0;
    }
  }, 1000 / 25);
}

  /**
   * Checks whether the object is above the ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObjects) {
      return this.y < 380;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Applies damage to the object.
   */
hit() {
  if (this.energy <= 0) return false;

  this.energy -= 5;
  this.lastHit = new Date().getTime();
  return true;
}

  /**
   * Checks whether the character is hurt.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks whether the object is dead.
   */
  isDead() {
    return this.energy == 0;
  }

/**
 * Displays the next image in the animation sequence.
 * @param {*} images - Input used by this method.
 */
playAnimation(images) {
  let i = this.currentImages % images.length;

  if (images === this.IMAGES_DEAD && this.currentImages >= images.length) {
    i = images.length - 1;
  }

  let path = images[i];
  this.img = this.imageCache[path];
  this.currentImages++;
}
  
  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }
  
  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the character jump.
   */
  jump() {
    this.speedY = 30;
  }
}
