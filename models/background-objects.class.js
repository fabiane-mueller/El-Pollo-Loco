/**
 * Represents BackgroundObject.
 * Inherits functionality from MovableObjects.
 */
class BackgroundObject extends MovableObjects {
  width = 720;
  height = 480;

  /**
   * Initializes the object and its properties.
   * @param {*} imagePath - Input used by this method.
   * @param {*} _x - Input used by this method.
   */
  constructor(imagePath, _x) {
    super().loadImage(imagePath);
    this.x = _x;
    this.y = 480 - this.height;
  }
}
