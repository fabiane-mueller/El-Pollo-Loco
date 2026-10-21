/**
 * Represents Endboss.
 * Inherits functionality from MovableObjects.
 */
class Endboss extends MovableObjects {
  height = 450;
  width = 200;
  y = 10;
  currentImages = 0;
  energy = 100;
  enbossVisible = false;

  offset = {
    top: 50,
    right: 10,
    bottom: 10,
    left: 50,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
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
    this.speed = 2 + Math.random() * 1;
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
      
      
      // this.level.endboss.unshift(endboss);
    } else {
      this.lastHit = new Date().getTime();
    }
  }


 isDead() {
    return this.energy == 0;
    
  }




  /**
   * Starts or updates the object animations.
   */
  animate() {
    setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 30);
  setStoppableInterval(() => {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      setTimeout(winning, 1000);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }, 100);
}
}
