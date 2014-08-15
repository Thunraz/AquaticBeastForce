function Player(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 0;
    this.bitmap = new Bitmap('assets/player.png', 16, 16, 4);
    this.animationTimer = 1/24;
    this.shootTimer = 0.25;
    this.shots = 50;
}

Player.prototype.update = function(controls, deltaT) {
    if(controls.left) {
        this.rotate(deltaT * -Math.PI);
    }

    if(controls.right) {
        this.rotate(deltaT * Math.PI);
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
    var dx = Math.cos(this.direction) * distance;
    var dy = Math.sin(this.direction) * distance;
    this.x += dx;
    this.y += dy;
}

Player.prototype.rotate = function(angle) {
    this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
};

Player.prototype.shoot = function(deltaT) {
    if(this.shootTimer <= 0.0 && this.shots > 0) {
        this.shootTimer += 0.25;

        // Shoot maybe?
        new Projectile(this.x, this.y, this.direction);

        this.shots--;
    }
}