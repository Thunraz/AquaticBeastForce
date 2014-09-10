function Shadow(x, y, bitmap, parent, dx, dy) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.bitmap = bitmap;
    this.animationTimer = 1/12;
    this.parent = parent;
    this.dx = dx;
    this.dy = dy;
}

Shadow.prototype.update = function(controls, deltaT) {
    this.x = this.parent.x + (this.dx);
    this.y = this.parent.y + (this.dy);

    this.rotation = this.parent.rotation;

    if(this.animationTimer <= 0.0) {
        this.animationTimer += 1/12;

        this.bitmap.currentFrame = (this.bitmap.currentFrame + 1) % this.bitmap.numberOfFrames;
    }

    this.animationTimer -= deltaT;

    if(this.shootTimer > 0) {
        this.shootTimer -= deltaT
    }
};