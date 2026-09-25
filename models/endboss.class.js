class Endboss extends MovableObjects {
 height = 500;
 width = 250;
 y = -20;
currentImages = 0;

  offset = {
    top:50,
    right: 10,
    bottom : 10,
    left:10
  }

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

    IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/Muestra_herida_y_muerte.gif",
  ];

  constructor(){
    super().loadImage(this.IMAGES_WALKING[0]); 
    this.loadImages(this.IMAGES_WALKING);
    this.x = 1300;
    this.animate();
    setInterval(() => {
    this.getRealFrame();
  }, 1000 / 60);
  }

  animate() {

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

}
