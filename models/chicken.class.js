class Chicken extends MovableObjects {
  y = 360;
  height = 55;
  width = 60;

  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
  ]

  currentImages = 0;

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 300 + Math.random() * 1800;
    this.speed = 0.15 + Math.random() * 0.5;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.getRealFrame();
  }

  animate() {
    setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setStoppableInterval(() => {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    }  else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }, 50);
  }
}
