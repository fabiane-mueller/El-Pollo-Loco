/**
 * Represents ThrowableObjects.
 * Inherits functionality from MovableObjects.
 */
class ThrowableObjects extends MovableObjects {
  IMAGES_FLYING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Initializes the object and its properties.
   * @param {*} x - Input used by this method.
   * @param {*} y - Input used by this method.
   */
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

/**
 * Handles the throw operation.
 * @param {*} character - Input used by this method.
 */
throw(character) {
  this.speedY = 10;

  this.x = character.x + 50;

  this.y = character.y + 50;

  setStoppableInterval(() => {
    this.x += 7;
  }, 1000 / 60);

  this.applyGravity();
}

  /**
   * Starts or updates the object animations.
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_FLYING);
    }, 200);
  }
}
