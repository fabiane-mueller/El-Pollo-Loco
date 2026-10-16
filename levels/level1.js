const backgroundObjects = [];
let level1;

function loadBackgroundGroup() {
  negativeBackgroundGroup();
  for (let index = 0; index < 7; index++) {
    let x = index * 720;
    if (index == 0 || index == 2 || index == 4) {
     backgroundGroupV1(x);
    } else {
      backgroundGroupV2(x);
    }
  }
}

loadBackgroundGroup();

function createLevel1() {
  return new Level(
    createChickens(),
    [new Endboss()],
    [new Cloud()],
    backgroundObjects,
    createCoins(),
    createBottles()
  );
}

function negativeBackgroundGroup() {
  backgroundObjects.push(
    new BackgroundObject("img/5_background/layers/air.png", -720),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -720),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -720),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -720)
  );
}

function backgroundGroupV1(x){
   backgroundObjects.push(
        new BackgroundObject("img/5_background/layers/air.png", x),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", x),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", x),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", x),
      );
}

function backgroundGroupV2(x){
backgroundObjects.push(
        new BackgroundObject("img/5_background/layers/air.png", x),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", x),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", x),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", x),
      );
}

function createChickens() {
  let chickens = [];
  for (let i = 0; i < 6; i++) {
    chickens.push(new Chicken());
  }
  return chickens;
}

function createCoins() {
  let coins = [];
  for (let i = 0; i < 15; i++) {
    coins.push(new Coins(i * 200));
  }
  return coins;
}

function createBottles() {
  let bottles = [];
  for (let i = 0; i < 10; i++) {
    bottles.push(new Bottles());
  }
  return bottles;
}
