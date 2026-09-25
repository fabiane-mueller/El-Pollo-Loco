class Level{
    enemies;
    endboss;
    clouds;
    coins;
    backgroundObjects;
    level_end_x = 1500;

    constructor(enemies,endboss, clouds, backgroundObjects, coins){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
    }


}