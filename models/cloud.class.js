/**
 * Represents Cloud.
 * Inherits functionality from MovableObjects.
 */
class Cloud extends MovableObjects {
  y = 20;
  height = 250;
  width = 500;

  /**
   * Initializes the object and its properties.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.animate();
  }

  /**
   * Starts or updates the object animations.
   */
  animate() {
    setStoppableInterval(() => {
      this.x -= 0.15;
    }, 1000 / 60);
  }
}
