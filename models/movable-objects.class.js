class MovableObjects extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  //wenn aktuelles objekt überhalb des Bodens ist und sich bewegt, wird 40 mal die sekunde das y minus die geschwindogkeit gerechnet
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  //wenn objekt eine instanz von throableobjects ist prüfe ob y kleiner als 380 ist, sonst prüfe ob y kleiner als 180 ist
  isAboveGround() {
    if (this instanceof ThrowableObjects) {
      return this.y < 380;
    } else {
      return this.y < 180;
    }
  }

  // die Energy des Objekts wird jedes mal um 5 verringert, wenn sie kleiner als 0 isz gib 0 zurück
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

  // die x-achse des objekts wird immer + die speed erhöht
  moveRight() {
    this.x += this.speed;
  }
  // die x-achse des objekts wird immer - die speed abgezogen
  moveLeft() {
    this.x -= this.speed;
  }


  jump() {
    this.speedY = 30;
  }
}
