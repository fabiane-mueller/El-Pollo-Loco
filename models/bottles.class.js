class Bottles extends DrawableObject {
  y = 380;
  height = 50;
  width = 50;

  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 18,
  };

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 300 + Math.random() * 1800;
    this.getRealFrame();
  }
}
