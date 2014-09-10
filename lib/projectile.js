function Projectile(x, y, direction, hostile) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.bitmap = new Bitmap('assets/projectile.png', 16, 16, 1);
    this.lifeTime = .25;
    this.hostile = hostile;

    entities.push(this);
}

Projectile.prototype.update = function(controls, deltaT) {
    this.lifeTime -= deltaT;

    if(this.lifeTime <= 0.0) {
        // If dead remove itself from entities array
        entities.splice(entities.indexOf(this), 1);

        // And show our super cool explosion animation
        if(!this.hostile)
            new Explosion(this.x, this.y, 0);
    }

    var dx = Math.cos(this.direction) * 5;
    var dy = Math.sin(this.direction) * 5;
    this.x += dx;
    this.y += dy;
};