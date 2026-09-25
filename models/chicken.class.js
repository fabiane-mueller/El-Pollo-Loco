class Chicken extends MovableObjects {
  y = 360;
  height = 55;
  width = 60;

  offset = {
    top:5,
    right: 5,
    bottom : 5,
    left:5
  }


  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  currentImages = 0;

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 300 + Math.random() * 1800;
    this.speed = 0.15 +  Math.random() * 0.5 ;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    setInterval(() => {
    this.getRealFrame();
  }, 1000 / 60);
  }

  animate() {
     setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
