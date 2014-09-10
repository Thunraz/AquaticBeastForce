function Enemy(x, y) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.bitmap = new Bitmap('assets/enemy.png', 16, 16, 2);
    this.animationTimer = 1/12;
    this.shootTimer = 0.25;
    this.CIRCLE = Math.PI * 2;

    entities.push(new Shadow(x, y, new Bitmap('assets/shadow_enemy.png', 16, 16, 1), this, 2, 2));
}

Enemy.prototype.update = function(controls, deltaT) {
    //this.rotation = (this.rotation + deltaT * Math.PI) % this.CIRCLE;

    if(this.animationTimer <= 0.0) {
        this.animationTimer += 1/12;

        this.bitmap.currentFrame = (this.bitmap.currentFrame + 1) % this.bitmap.numberOfFrames;
    }

    this.animationTimer -= deltaT;
}