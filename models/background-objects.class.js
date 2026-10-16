/**
 * Represents a background object in the game.
 * Inherits movement and image functionality from MovableObjects.
 */
class BackgroundObject extends MovableObjects {
  width = 720;
  height = 480;

  /**
   * Creates a background object and positions it at the bottom of the canvas.
   * @param {string} imagePath - The path to the background image.
   * @param {number} _x - The horizontal position of the background object.
   */
  constructor(imagePath, _x) {
    super().loadImage(imagePath);
    this.x = _x;
    this.y = 480 - this.height;
  }
}