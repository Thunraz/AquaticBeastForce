function Shadow(x, y) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.bitmap = new Bitmap('assets/shadow.png', 16, 16, 2);
    this.animationTimer = 1/12;
}

Shadow.prototype.update = function(controls, deltaT) {
    this.x = player.x + (5 * Math.sin(player.rotation));
    this.y = player.y + (5 * Math.cos(player.rotation));

    this.rotation = player.rotation;

    if(this.animationTimer <= 0.0) {
        this.animationTimer += 1/12;

        this.bitmap.currentFrame = (this.bitmap.currentFrame + 1) % this.bitmap.numberOfFrames;
    }

    this.animationTimer -= deltaT;

    if(this.shootTimer > 0) {
        this.shootTimer -= deltaT
    }
};