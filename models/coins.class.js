let currentCoinPosition = 0;

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

  constructor(position) {
  super().loadImage("img/8_coin/coin_1.png");
  this.x = position + 200;
  this.y = 200 + Math.random() * 100;
  this.getRealFrame();
}

  setXPosition() {
    this.x = currentCoinPosition + 200;
    currentCoinPosition = this.x;
  }
}
