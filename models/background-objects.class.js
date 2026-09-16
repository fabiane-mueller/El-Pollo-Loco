class BackgroundObject extends MovableObjects{
    width = 720;
    height = 480;

    constructor(imagePath, _x){
        super().loadImage(imagePath);
        this.x = _x;
        this.y = 480 - this.height;
    }
}