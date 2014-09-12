function Enemy(x, y) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.bitmap = new Bitmap('assets/enemy.png', 16, 16, 2);
    this.animationTimer = 1/12;
    this.shootTimer = 0;
    this.CIRCLE = Math.PI * 2;
    this.type = 'enemy';
    this.shadow = new Shadow(x, y, new Bitmap('assets/shadow_enemy.png', 16, 16, 1), this, 1, 1);

    backgroundLayer.push(this.shadow);
}

Enemy.prototype.update = function(controls, deltaT) {
    var movement = false;
    this.rotation = Math.atan2(player.x - this.x, this.y - player.y);

    if(Math.abs(this.x - player.x) > 10) {
        movement = true;
        this.x += Math.cos(this.rotation + Math.PI * 3/2) * deltaT * 10;
    }
    if(Math.abs(this.y - player.y) > 10) {
        movement = true;
        this.y += Math.sin(this.rotation + Math.PI * 3/2) * deltaT * 10;
    }

    var distanceToPlayer = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));
    if(distanceToPlayer <= 70) {
        if(this.shootTimer <= 0.0) {
            new Projectile(this.x, this.y, this.rotation, true);
            this.shootTimer += 0.5;
        }

        this.shootTimer -= deltaT;
    }


    if(movement) {
        if(this.animationTimer <= 0.0) {
            this.animationTimer += 1/12;

            this.bitmap.currentFrame = (this.bitmap.currentFrame + 1) % this.bitmap.numberOfFrames;
        }

        this.animationTimer -= deltaT;
    }
}

Enemy.prototype.kill = function() {
    entities.splice(entities.indexOf(this), 1);
    backgroundLayer.splice(backgroundLayer.indexOf(this.shadow), 1);
};