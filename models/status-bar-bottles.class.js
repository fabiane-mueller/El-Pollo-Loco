/**
 * Represents StatusBarBottles.
 * Inherits functionality from StatusBar.
 */
class StatusBarBottles extends StatusBar {
  percentage = 0;
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * Initializes the object and its properties.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 460;
    this.setPercentage(0);
    this.y = 50;
  }

}
