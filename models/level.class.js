class Level{
    enemies;
    endboss;
    clouds;
    coins;
    backgroundObjects;
    level_end_x = 2800;

    constructor(enemies,endboss, clouds, backgroundObjects, coins, bottles){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }


}