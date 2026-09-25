class World {
  character = new Character();
  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarEndboss = new StatusBarEndboss();
  statusBarCoins = new StatusBarCoins();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObjects(
        this.character.x + 100,
        this.character.y + 100,
      );
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    //check Collisions

    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        console.log("von huhn getroffen");

        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        if (this.character.isDead()) {
          console.log("game over");
          
        }
      }
    });
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        console.log("von endboss getroffen");

        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        if (this.character.isDead()) {
          console.log("game over");
        }
      }
    });

    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        console.log("münze getroffen");
      }
    });

    this.throwableObjects.forEach((bottle) => {
      this.level.endboss.forEach((endboss) => {
        if (bottle.isColliding(endboss)) {
          console.log("Endboss getroffen");

          endboss.hit();
          this.statusBarEndboss.setPercentage(endboss.energy);
        }
      });
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarEndboss);
    this.addToMap(this.statusBarCoins);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.throwableObjects);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.endboss);
    
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
    mo.drawFrame(this.ctx);
  }
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
