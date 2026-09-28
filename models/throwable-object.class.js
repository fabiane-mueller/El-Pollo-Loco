class ThrowableObjects extends MovableObjects {

  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );

    this.x = x;
    this.y = y;

    this.height = 50;
    this.width = 50;

    this.getRealFrame();
  }

  throw() {
    this.speedY = 30;

    setInterval(() => {
      this.x += 10;
    }, 25);

    this.applyGravity();
  }
}