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
                player.health = player.health > 10 ? player.health - 10 : 0;
                that.lifeTime = 0;
                return;
            } else if(!that.isHostile && entity.type == 'enemy') {
                that.lifeTime = 0;
                new Explosion(that.x, that.y, 0);
                player.shots += Math.round(Math.random() * 7 + 3);
                player.shots = player.shots > 99 ? 99 : player.shots;
                entity.kill();
            }
        }
    });

    if(this.lifeTime <= 0.0) {
        // If dead remove itself from entities array
        entities.splice(entities.indexOf(this), 1);
    }

    var dx = Math.cos(this.direction) * 5;
    var dy = Math.sin(this.direction) * 5;
    this.x += dx;
    this.y += dy;
};