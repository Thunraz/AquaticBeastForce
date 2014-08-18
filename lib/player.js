function Player(x, y) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.bitmap = new Bitmap('assets/player.png', 16, 16, 4);
    this.animationTimer = 1/24;
    this.shootTimer = 0.25;
    this.shots = 50;
    this.CIRCLE = Math.PI * 2;
}

Player.prototype.update = function(controls, deltaT) {
    if(controls.left) {
        this.rotation = (this.rotation + deltaT * -Math.PI) % this.CIRCLE;
    }

    if(controls.right) {
        this.rotation = (this.rotation + deltaT * Math.PI) % this.CIRCLE;
    }

    if(controls.up) {
        this.move(40 * deltaT);
    }

    if(controls.down) {
        this.move(-40 * deltaT);
    }

    if(controls.shoot) {
        this.shoot(deltaT);
    }

    if(this.animationTimer <= 0.0) {
        this.animationTimer += 1/24;

        this.bitmap.currentFrame = (this.bitmap.currentFrame + 1) % this.bitmap.numberOfFrames;
    }

    this.animationTimer -= deltaT;

    if(this.shootTimer > 0) {
        this.shootTimer -= deltaT
    }
};

Player.prototype.move = function(distance) {
    var dx = Math.cos(this.rotation) * distance;
    var dy = Math.sin(this.rotation) * distance;
    this.x += dx;
    this.y += dy;
}

Player.prototype.shoot = function(deltaT) {
    if(this.shootTimer <= 0.0 && this.shots > 0) {
        this.shootTimer += 0.25;

        // Shoot maybe?
        new Projectile(this.x, this.y, this.rotation);

        this.shots--;
    }
}