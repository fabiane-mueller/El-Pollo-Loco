class Character extends MovableObjects {
  height = 250;
  y = 180;
  speed = 10;
  width = 100;

  offset = {
    top: 90,
    right: 10,
    bottom: 10,
    left: 10,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_SLEEPING = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  currentImages = 0;
  deathAnimationIndex = 0;

  constructor() {
    super();
    this.loadImagesGroup();
    this.applyGravity();
    this.animate();
    this.getRealFrame();
  }

  animate() {
    this.moveIntervall();
    this.setImagesIntervall();
  }

  jump() {
    this.speedY = 30;
  }
  // lädt die jeweiligen Bildergruppen
  loadImagesGroup() {
    this.loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_SLEEPING);
  }

  // wenn eine Taste gedrückt wird, startet der SleepTimer neu
  checkSleepig() {
    if (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.SPACE ||
      this.world.keyboard.D
    ) {
      startSleepingTimer();
    }
  }

  //wenn nach rechts gedrückt wird und x kleiner als das ende der leinwand ist
  checkRightKey() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
    }
  }
  // wenn links gedrückt wird und x größer als 0 ist
  checkLeftKey() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }
  // wenn die leertaste gedrückt ist und isaboveground false ist
  checkSpaceKey() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      if (!this.isJumping) {
        this.jump();
        this.isJumping = true;
      }
    }
  }
  // die Bilder, wenn Pepe tot ist, wird nur einmal abgespielt und das letzte Bild bleibt stehen
  deathAnimation() {
    if (this.deathAnimationIndex < this.IMAGES_DEAD.length) {
      this.img = this.imageCache[this.IMAGES_DEAD[this.deathAnimationIndex]];
      this.deathAnimationIndex++;
      if (this.deathAnimationIndex === 1) {
        setTimeout(gameOver, 1000);
      }
    }
  }

  // wenn rechts oder links gedrückt und Pepe nicht stringt, werden die Walking-Bilder angespielt
  moveRightLeftAnimation() {
    this.isJumping = false;
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  moveIntervall() {
    setStoppableInterval(() => {
      this.checkSleepig();
      this.checkRightKey();
      this.checkLeftKey();
      this.checkSpaceKey();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  setImagesIntervall() {
    setStoppableInterval(() => {
      if (this.isDead()) {
        this.deathAnimation();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (sleeping) {
        this.playAnimation(this.IMAGES_SLEEPING);
      } else {
        this.moveRightLeftAnimation();
      }
    }, 50);
  }
}
