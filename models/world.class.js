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
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkFlyingObjects();
    }, 200);
  }

checkThrowObjects() {
  // Prüfen, ob D gedrückt ist UND ob Pepe mindestens eine Flasche hat
  if (this.keyboard.D && this.throwableObjects.length > 0) {

    // Die letzte Flasche aus dem Inventar nehmen
    // pop() entfernt die Flasche aus throwableObjects
    let bottle = this.throwableObjects.pop();
    console.log("Flasche geworfen:", bottle);
console.log("Inventar:", this.throwableObjects.length);

    // Die Flaschenanzeige um 20 % reduzieren
    this.statusBarBottles.setPercentage(
      this.statusBarBottles.percentage - 20,
    );

    // Die Flasche zu den fliegenden Flaschen hinzufügen
    this.flyingObjects.push(bottle);

    // Die Wurfbewegung der Flasche starten
    bottle.throw(this.character);
  }
}

checkFlyingObjects() {
  // jede Flasche, die fliegt überprüfen
  this.flyingObjects.forEach((bottle) => {
    // ob sie nicht mehr auf dem Boden ist
    if (!bottle.isAboveGround()) {
      let index = this.flyingObjects.indexOf(bottle);
      // Die Flasche aus dem Array der fliegenden Flaschen entfernen
      this.flyingObjects.splice(index, 1);
    }
  });
}

  checkCollisions() {
    this.collectedBottles();
  

    // Flaschen treffen Endboss
    this.flyingObjects.forEach((bottle) => {
      this.level.endboss.forEach((endboss) => {
        if (bottle.isColliding(endboss)) {
          endboss.hit();
          this.statusBarEndboss.setPercentage(endboss.energy);
        }
      });
    });

    // Flaschen treffen Chicken
this.flyingObjects.forEach((bottle) => {
  this.level.enemies.forEach((enemy) => {
    if (bottle.isColliding(enemy)) {
      enemy.energy = 0;
    }
  });
});

   
// wenn Pepe auf Chicken springt
this.level.enemies.forEach((enemy) => {
  if (
    this.character.isColliding(enemy) &&
  this.character.speedY < 0 &&
  !enemy.isDead()
  ) {
    enemy.energy = 0;

    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      console.log("index"+index);
      
      this.level.enemies.splice(index, 1);
    }, 500);
  }
});
    // wenn endboss  Pepe berühren
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });

     // wenn chicken  Pepe berühren
    this.level.enemies.forEach((enemy) => {
      console.log("Pepe Y:", this.character.y, "Chicken Y:", enemy.y);
      if (this.character.isColliding(enemy) && !this.isFalling) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });

    // Münzen einsammeln
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.collectedCoins++;
        if (this.collectedCoins === 5) {
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
        } else {
          this.statusBarCoins.setPercentage(this.collectedCoins * 20);
        }
        let index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index, 1);
      }
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


collectedBottles(){
  // Flaschen einsammeln
    this.level.bottles.forEach((bottle) => {
      if (
        this.character.isColliding(bottle) &&
        this.throwableObjects.length < 5
      ) {
        let throwableBottle = new ThrowableObjects(
          this.character.x + 100,
          this.character.y + 100,
        );

        this.throwableObjects.push(throwableBottle);

        let index = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(index, 1);

        this.statusBarBottles.setPercentage(
          this.statusBarBottles.percentage + 20,
        );
      }
    });
}



}
