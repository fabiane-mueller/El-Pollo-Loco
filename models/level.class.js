/**
 * Represents Level.
 */
class Level{
    enemies;
    endboss;
    clouds;
    coins;
    backgroundObjects;
    level_end_x = 2800;

    /**
     * Initializes the object and its properties.
     * @param {*} enemies - Input used by this method.
     * @param {*} endboss - Input used by this method.
     * @param {*} clouds - Input used by this method.
     * @param {*} backgroundObjects - Input used by this method.
     * @param {*} coins - Input used by this method.
     * @param {*} bottles - Input used by this method.
     */
    constructor(enemies,endboss, clouds, backgroundObjects, coins, bottles){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }

}
