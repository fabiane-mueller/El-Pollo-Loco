let currentCoinPosition = 0;

/**
 * Represents Coins.
 * Inherits functionality from DrawableObject.
 */
class Coins extends DrawableObject {
   currentCoinPosition = 0;
  y = 150;
  height = 100;
  width = 100;
  energy = 0;

  offset = {
    top: 35,
    right: 35,
    bottom: 35,
    left: 35,
  };

  /**
   * Initializes the object and its properties.
   * @param {*} position - Input used by this method.
   */
  constructor(position) {
  super().loadImage("img/8_coin/coin_1.png");
  this.x = position + 200;
  this.y = 200 + Math.random() * 100;
  this.getRealFrame();
}

  /**
   * Handles the setXPosition operation.
   */
  setXPosition() {
    this.x = currentCoinPosition + 200;
    currentCoinPosition = this.x;
  }
}
