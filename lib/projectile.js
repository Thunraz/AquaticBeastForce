function Projectile(x, y, direction, hostile) {
    this.x = x;
    this.y = y;
    this.direction = direction + Math.PI * 3/2;
    this.bitmap = new Bitmap('assets/projectile.png', 16, 16, 1);
    this.lifeTime = hostile ? .15 : .25;
    this.isHostile = hostile;
    this.type = 'projectile';

    entities.push(this);
}

Projectile.prototype.update = function(controls, deltaT) {
    this.lifeTime -= deltaT;
    var that = this;

    entities.forEach(function(entity) {
        if(entity.type != 'projectile'
            && Math.abs(entity.x - that.x) <= 8
            && Math.abs(entity.y - that.y) <= 8) {

            if(that.isHostile && entity.type == 'player') {
                player.health -= 1;
                that.lifeTime = 0;
            } else if(!that.isHostile && entity.type == 'enemy') {
                console.log('Hit enemy');
                that.lifeTime = 0;
            }
        }
    });

    if(this.lifeTime <= 0.0) {
        // If dead remove itself from entities array
        entities.splice(entities.indexOf(this), 1);

        // And show our super cool explosion animation
        if(!this.isHostile)
            new Explosion(this.x, this.y, 0);
    }

    var dx = Math.cos(this.direction) * 5;
    var dy = Math.sin(this.direction) * 5;
    this.x += dx;
    this.y += dy;
};