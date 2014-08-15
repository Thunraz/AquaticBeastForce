var Explosion = function(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = 3 / 2 * Math.PI; // always 0
    this.bitmap = new Bitmap('assets/explosion.png', 32, 32, 8);
    this.frameTimer = 1/12;

    entities.push(this);
}

Explosion.prototype.update = function(controls, deltaT) {
    if(this.frameTimer <= 0.0) {
        this.frameTimer += 1/12;
        this.bitmap.currentFrame = (this.bitmap.currentFrame + 1);

        if(this.bitmap.currentFrame > 8) {
            entities.splice(entities.indexOf(this), 1);
        }
    }

    this.frameTimer -= deltaT;
};