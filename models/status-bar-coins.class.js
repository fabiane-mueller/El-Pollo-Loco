/**
 * Represents StatusBarCoins.
 * Inherits functionality from StatusBar.
 */
class StatusBarCoins extends StatusBar {
  percentage = 0;
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  /**
   * Initializes the object and its properties.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 460;
    this.setPercentage(0);

    this.y = 2;
  }

  /**
   * Updates the status bar percentage.
   * @param {*} percentage - Input used by this method.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];

  }
}
