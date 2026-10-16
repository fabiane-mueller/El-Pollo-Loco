/**
 * Represents Endboss.
 * Inherits functionality from MovableObjects.
 */
class Endboss extends MovableObjects {
  height = 500;
  width = 250;
  y = -20;
  currentImages = 0;
  energy = 100;

  offset = {
    top: 50,
    right: 10,
    bottom: 10,
    left: 10,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Initializes the object and its properties.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.animate();
    this.getRealFrame();
  }

 /**
  * Applies damage to the object.
  */
 hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
      AudioHub.playOne(AudioHub.ENDBOSS);
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Starts or updates the object animations.
   */
  animate() {
  setStoppableInterval(() => {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      setTimeout(winning, 1000);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }, 50);
}
}
