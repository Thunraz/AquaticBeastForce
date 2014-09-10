function Enemy(x, y) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.bitmap = new Bitmap('assets/enemy.png', 16, 16, 2);
    this.animationTimer = 1/12;
    this.shootTimer = 0.25;
    this.CIRCLE = Math.PI * 2;
    this.type = 'enemy';

    entities.push(new Shadow(x, y, new Bitmap('assets/shadow_enemy.png', 16, 16, 1), this, 1, 1));
}

Enemy.prototype.update = function(controls, deltaT) {
    var movement = false;
    this.rotation = Math.atan2(player.x - this.x, this.y - player.y);

    if(Math.abs(player.x - this.x) > 10 && Math.abs(this.y - player.y) > 10) {
        movement = true;
        this.x += Math.cos(this.rotation + Math.PI * 3/2) * deltaT * 10;
        this.y += Math.sin(this.rotation + Math.PI * 3/2) * deltaT * 10;
    }

    if(movement) {
        if(this.animationTimer <= 0.0) {
            this.animationTimer += 1/12;

            this.bitmap.currentFrame = (this.bitmap.currentFrame + 1) % this.bitmap.numberOfFrames;
        }

        this.animationTimer -= deltaT;
    }
}