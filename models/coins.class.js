let currentCoinPosition = 0;

class Coins extends DrawableObject {
   y = 150;
  height = 100;
  width = 100;

  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  };

    constructor() {
        super().loadImage("img/8_coin/coin_1.png");
        this.setXPosition();
        this.y = 200 + Math.random() * 100;
    }

    setXPosition() {
        this.x = currentCoinPosition + 200;
        currentCoinPosition = this.x;
    }
}
