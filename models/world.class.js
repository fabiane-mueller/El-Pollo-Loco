/**
 * Represents World.
 */
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
  statusBarBottles = new StatusBarBottles();
  collectedCoins = 0;
  throwableObjects = [];
  flyingObjects = [];

  isFalling = false;

/**
 * Initializes the object and its properties.
 * @param {*} canvas - Input used by this method.
 * @param {*} keyboard - Input used by this method.
 * @param {*} level - Input used by this method.
 */
constructor(canvas, keyboard, level) {
  this.level = level;
  this.ctx = canvas.getContext("2d");
  this.canvas = canvas;
  this.keyboard = keyboard;
  this.setWorld();
  this.draw();
  this.run();
}

  /**
   * Assigns the game world to the object.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts recurring game checks.
   */
  run() {
    this.checkCollisionChickenIntervall();
    this.checkCollisionEndbossIntervall();
    this.checkCollisionBottlesIntervall();
    this.checkCollisionCoinsIntervall();
    this.checkBottleCollisionWithEnemiesIntervall();
    this.checkBottleCollisionWithEndbossIntervall();
    this.checkThrowObjectsIntervall();
    this.checkFlyingObjectsIntervall();
  }

  /**
   * Checks whether the character can throw a bottle.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.throwableObjects.length > 0) {
      let bottle = this.throwableObjects.pop();
      this.statusBarBottles.setPercentage(
        this.statusBarBottles.percentage - 20,
      );
      this.flyingObjects.push(bottle);
      bottle.throw(this.character);
    }
  }

  /**
   * Checks the state of flying objects.
   */
  checkFlyingObjects() {
    this.flyingObjects.forEach((bottle) => {
      if (!bottle.isAboveGround()) {
        let index = this.flyingObjects.indexOf(bottle);
        this.flyingObjects.splice(index, 1);
      }
    });
  }

  /**
   * Checks collisions between the character and enemies.
   */
  checkCollisionWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (this.isCharacterJumpingOnEnemy(enemy)) {
        this.enemyIsHeadjumpedDead(enemy);
      } else if (this.isCharacterIsCollidingEnemy(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks collisions between the character and the end boss.
   */
  checkCollisionWithEndboss() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks for bottle collection collisions.
   */
  checkCollisionWithBottles() {
    this.collectedBottles();
  }

  /**
   * Checks for coin collection collisions.
   */
  checkCollisionWithCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.collectedCoins++;
        AudioHub.playOne(AudioHub.COLLECT_COIN);
        if (this.collectedCoins === 5) {
          this.fiveCoins();
        } else {
          this.statusBarCoins.setPercentage(this.collectedCoins * 20);
        }
        let index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index, 1);
      }
    });
  }

  /**
   * Handles the checkBottleCollisionWithEnemies operation.
   */
  checkBottleCollisionWithEnemies() {
    this.flyingObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.energy = 0;
        }
      });
    });
  }

  /**
   * Handles the checkBottleCollisionWithEndboss operation.
   */
  checkBottleCollisionWithEndboss() {
    this.flyingObjects.forEach((bottle) => {
      this.level.endboss.forEach((endboss) => {
        if (bottle.isColliding(endboss)) {
          endboss.hit();
          AudioHub.playOne(AudioHub.ENDBOSS);
          this.statusBarEndboss.setPercentage(endboss.energy);
        }
      });
    });
  }

  /**
   * Draws game objects on the canvas and schedules the next frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);

    this.drawStatusbars();

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMapGroup();

    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws all objects in the given array.
   * @param {*} objects - Input used by this method.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Draws an object on the canvas, accounting for its direction.
   * @param {*} mo - Input used by this method.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
    mo.drawFrame(this.ctx);
  }

  /**
   * Flips an object horizontally before drawing it.
   * @param {*} mo - Input used by this method.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the canvas state after drawing a flipped object.
   * @param {*} mo - Input used by this method.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Checks for bottle collection and updates the inventory and status bar.
   */
  collectedBottles() {

    this.level.bottles.forEach((bottle) => {
      if (
        
        this.character.isColliding(bottle) &&
        
        this.throwableObjects.length < 5
      ) {
        this.createThrowableBottle();
        AudioHub.playOne(AudioHub.COLLECT_BOTTLE);

        let index = this.level.bottles.indexOf(bottle);

        this.level.bottles.splice(index, 1);

        this.statusBarBottles.setPercentage(
          this.statusBarBottles.percentage + 20,
        );
      }
    });
  }

  /**
   * Updates the coin status and restores character energy.
   */
  fiveCoins() {
    this.statusBarCoins.setPercentage(100);
    setTimeout(() => {
      this.character.energy += 20;
      if (this.character.energy > 100) {
        this.character.energy = 100;
      }
      this.statusBar.setPercentage(this.character.energy);
      this.collectedCoins = 0;
      this.statusBarCoins.setPercentage(0);
    }, 1000);
  }

  /**
   * Creates a throwable bottle and adds it to the inventory.
   */
  createThrowableBottle() {

    let throwableBottle = new ThrowableObjects(
      this.character.x + 100,
      this.character.y + 100,
    );
    
    this.throwableObjects.push(throwableBottle);
  }

  /**
   * Handles the checkCollisionChickenIntervall operation.
   */
  checkCollisionChickenIntervall() {
    setStoppableInterval(() => {
      this.checkCollisionWithEnemies();
    }, 50);
  }

  /**
   * Handles the checkCollisionEndbossIntervall operation.
   */
  checkCollisionEndbossIntervall() {
    setStoppableInterval(() => {
      this.checkCollisionWithEndboss();
    }, 200);
  }

  /**
   * Handles the checkCollisionBottlesIntervall operation.
   */
  checkCollisionBottlesIntervall() {
    setStoppableInterval(() => {
      this.checkCollisionWithBottles();
    }, 50);
  }

  /**
   * Handles the checkCollisionCoinsIntervall operation.
   */
  checkCollisionCoinsIntervall() {
    setStoppableInterval(() => {
      this.checkCollisionWithCoins();
    }, 200);
  }

  /**
   * Handles the checkBottleCollisionWithEnemiesIntervall operation.
   */
  checkBottleCollisionWithEnemiesIntervall() {
    setStoppableInterval(() => {
      this.checkBottleCollisionWithEnemies();
    }, 200);
  }

  /**
   * Handles the checkBottleCollisionWithEndbossIntervall operation.
   */
  checkBottleCollisionWithEndbossIntervall() {
    setStoppableInterval(() => {
      this.checkBottleCollisionWithEndboss();
    }, 200);
  }

  /**
   * Handles the checkThrowObjectsIntervall operation.
   */
  checkThrowObjectsIntervall() {
    setStoppableInterval(() => {
      this.checkThrowObjects();
    }, 200);
  }

  /**
   * Handles the checkFlyingObjectsIntervall operation.
   */
  checkFlyingObjectsIntervall() {
    setStoppableInterval(() => {
      this.checkFlyingObjects();
    }, 200);
  }

  /**
   * Checks whether the character jumps on an enemy from above.
   * @param {*} enemy - Input used by this method.
   */
  isCharacterJumpingOnEnemy(enemy) {
    return (
      this.character.isColliding(enemy) &&
      this.character.speedY < 0 &&
      !enemy.isDead()
    );
  }

  /**
   * Marks an enemy as defeated after a head jump.
   * @param {*} enemy - Input used by this method.
   */
  enemyIsHeadjumpedDead(enemy) {
    enemy.energy = 0;
    AudioHub.playOne(AudioHub.CHICKEN_DEAD);
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      this.level.enemies.splice(index, 1);
    }, 500);
  }

  /**
   * Checks whether the character collides with a living enemy without jumping on it.
   * @param {*} enemy - Input used by this method.
   */
  isCharacterIsCollidingEnemy(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !(this.character.speedY < 0) &&
      !this.character.isHurt() &&
      enemy.isDead() === false
    );
  }

/**
 * Draws the game's status bars.
 */
drawStatusbars(){
  this.addToMap(this.statusBar);
    this.addToMap(this.statusBarEndboss);
    this.addToMap(this.statusBarCoins);
   this.addToMap(this.statusBarBottles);
}

/**
 * Handles the addObjectsToMapGroup operation.
 */
addObjectsToMapGroup(){
 this.addObjectsToMap(this.flyingObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.endboss);
}

}
