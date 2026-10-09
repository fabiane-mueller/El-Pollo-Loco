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
    this.checkCollisionChickenIntervall();
    this.checkCollisionEndbossIntervall();
    this.checkCollisionBottlesIntervall();
    this.checkCollisionCoinsIntervall();
    this.checkBottleCollisionWithEnemiesIntervall();
    this.checkBottleCollisionWithEndbossIntervall();
    this.checkThrowObjectsIntervall();
    this.checkFlyingObjectsIntervall();
  }

  // Prüfen, ob D gedrückt ist UND ob Pepe mindestens eine Flasche hat
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

  // jede Flasche, die fliegt überprüfen, ob sie nicht mehr auf dem Boden ist. Die Flasche aus dem Array der fliegenden Flaschen entfernen
  checkFlyingObjects() {
    this.flyingObjects.forEach((bottle) => {
      if (!bottle.isAboveGround()) {
        let index = this.flyingObjects.indexOf(bottle);
        this.flyingObjects.splice(index, 1);
      }
    });
  }

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

  checkCollisionWithEndboss() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionWithBottles() {
    this.collectedBottles();
  }

  checkCollisionWithCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.collectedCoins++;
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

  checkBottleCollisionWithEnemies() {
    this.flyingObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.energy = 0;
        }
      });
    });
  }

  checkBottleCollisionWithEndboss() {
    this.flyingObjects.forEach((bottle) => {
      this.level.endboss.forEach((endboss) => {
        if (bottle.isColliding(endboss)) {
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
    this.addToMap(this.statusBarBottles);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.flyingObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.endboss);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);

    mo.draw(this.ctx);

    if (mo.otherDirection) this.flipImageBack(mo);

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

  collectedBottles() {
    // Flaschen einsammeln
    // gehe alle Flaschen im Level durch
    this.level.bottles.forEach((bottle) => {
      if (
        // wenn Pepe eine Flasche berührt
        this.character.isColliding(bottle) &&
        // und im throwableObject-Array weniger als 5 Flaschen vorhanden sind
        this.throwableObjects.length < 5
      ) {
        this.createThrowableBottle();

        // ermittle den Index der eingesammelten Flasche im bottles-Array
        let index = this.level.bottles.indexOf(bottle);

        // entferne die eingesammelte Flasche aus dem bottles-Array
        this.level.bottles.splice(index, 1);

        // erhöhe die Prozentanzeige der gesammelten Flaschen um 20
        this.statusBarBottles.setPercentage(
          this.statusBarBottles.percentage + 20,
        );
      }
    });
  }

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

  createThrowableBottle() {
    // erstelle eine neue Instanz der Klasse ThrowableObjects
    // und weise sie der Variablen throwableBottle zu
    let throwableBottle = new ThrowableObjects(
      this.character.x + 100,
      this.character.y + 100,
    );
    // füge die neue Flasche zum throwableObjects-Array hinzu
    this.throwableObjects.push(throwableBottle);
  }

  checkCollisionChickenIntervall() {
    setStoppableInterval(() => {
      this.checkCollisionWithEnemies();
    }, 50);
  }

  checkCollisionEndbossIntervall() {
    setStoppableInterval(() => {
      this.checkCollisionWithEndboss();
    }, 200);
  }

  checkCollisionBottlesIntervall() {
    setStoppableInterval(() => {
      this.checkCollisionWithBottles();
    }, 50);
  }

  checkCollisionCoinsIntervall() {
    setStoppableInterval(() => {
      this.checkCollisionWithCoins();
    }, 200);
  }

  checkBottleCollisionWithEnemiesIntervall() {
    setStoppableInterval(() => {
      this.checkBottleCollisionWithEnemies();
    }, 200);
  }

  checkBottleCollisionWithEndbossIntervall() {
    setStoppableInterval(() => {
      this.checkBottleCollisionWithEndboss();
    }, 200);
  }

  checkThrowObjectsIntervall() {
    setStoppableInterval(() => {
      this.checkThrowObjects();
    }, 200);
  }

  checkFlyingObjectsIntervall() {
    setStoppableInterval(() => {
      this.checkFlyingObjects();
    }, 200);
  }

  isCharacterJumpingOnEnemy(enemy) {
    return (
      this.character.isColliding(enemy) &&
      this.character.speedY < 0 &&
      !enemy.isDead()
    );
  }

  enemyIsHeadjumpedDead(enemy) {
    enemy.energy = 0;
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      this.level.enemies.splice(index, 1);
    }, 500);
  }

  isCharacterIsCollidingEnemy(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !(this.character.speedY < 0) &&
      !this.character.isHurt() &&
      enemy.isDead() === false
    );
  }
} // Ende der Klasse
