class ThrowableObjects extends MovableObjects {
  IMAGES_FLYING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    );

    this.x = x;
    this.y = y;

    this.height = 50;
    this.width = 50;
    this.getRealFrame();
  }

throw(character) {
  this.speedY = 10;

  // Startposition der Flasche festlegen
  this.x = character.x + 50;
  
  
  this.y = character.y + 50;

  // Flasche nach rechts bewegen
  setStoppableInterval(() => {
    this.x += 7;
  }, 1000 / 60);

  this.applyGravity();
}

  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_FLYING);
    }, 200);
  }
}
