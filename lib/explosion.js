var Explosion = function(x, y) {
    this.x = x;
    this.y = y;
    this.bitmap = new Bitmap('assets/explosion.png', 32, 32, 8);
    this.frameTimer = 1/12;

    backgroundLayer.push(this);
    playSound(explosionSound);
}

Explosion.prototype.update = function(controls, deltaT) {
    if(this.frameTimer <= 0.0) {
        this.frameTimer += 1/12;
        this.bitmap.currentFrame = (this.bitmap.currentFrame + 1);

        if(this.bitmap.currentFrame > 8) {
            backgroundLayer.splice(backgroundLayer.indexOf(this), 1);
        }
    }

    this.frameTimer -= deltaT;
};