function random(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function Player(x, y) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.bitmap = new Bitmap('assets/player.png', 16, 16, 4);
    this.animationTimer = 1/24;
    this.shootTimer = 0.25;
    this.shots = 50;
    this.CIRCLE = Math.PI * 2;

    this.createTiles(0, 0);
    entities.push(new Shadow(x, y, new Bitmap('assets/shadow_player.png', 16, 16, 2), this, 3, 3));
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

Player.prototype.createTiles = function(x, y) {
    x = Math.floor((x - 80) / 16) * 16;
    y = Math.floor((y - 72) / 16) * 16;

    for(var i = 0; i <= (canvas.width / camera.scale / 16) + 1; i++) {
        for(var j = 0; j <= (canvas.height / camera.scale / 16) + 1; j++) {
            var gx = Math.floor((x + i * 16) / 16) * 16;
            var gy = Math.floor((y + j * 16) / 16) * 16;

            if((random(gx) * random(gy)) > 0.5) {
                new GroundTile(gx, gy, Math.round(Math.random() * 3));
            }
        }
    }
};

Player.prototype.move = function(distance) {
    var dx = Math.cos(this.rotation + Math.PI * 3/2) * distance;
    var dy = Math.sin(this.rotation + Math.PI * 3/2) * distance;
    this.x += dx;
    this.y += dy;

    this.createTiles(this.x, this.y);
}

Player.prototype.shoot = function(deltaT) {
    if(this.shootTimer <= 0.0 && this.shots > 0) {
        this.shootTimer += 0.25;

        // Shoot maybe?
        new Projectile(this.x, this.y, this.rotation + Math.PI * 3/2);

        this.shots--;
    }
}