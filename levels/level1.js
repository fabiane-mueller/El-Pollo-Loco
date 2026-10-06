const backgroundObjects = [];

function loadBackgroundGroup() {
  backgroundObjects.push(
  new BackgroundObject("img/5_background/layers/air.png", -720),
  new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -720),
  new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -720),
  new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -720)
);
  for (let index = 0; index < 5; index++) {
    let x = index * 720;

if (index == 0 || index == 2 || index == 4) {
   backgroundObjects.push(
      new BackgroundObject("img/5_background/layers/air.png", x),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", x),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", x),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", x)
    );
} else {
   backgroundObjects.push(
      new BackgroundObject("img/5_background/layers/air.png", x),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", x),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", x),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", x)
    );
}

   
  }
}

loadBackgroundGroup();

const level1 = new Level(
  [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),

  ],
  [
    new Endboss()
  ],
  [new Cloud()],
  backgroundObjects,
  [
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
  ],
  [
    new Bottles(),
    new Bottles(),
    new Bottles(),
    new Bottles(),
    new Bottles(),
    new Bottles(),
    new Bottles(),
    new Bottles(),
    new Bottles(),
    new Bottles(),
  ],
);


