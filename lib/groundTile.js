var GroundTile = function(x, y, tileNum) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.bitmap = new Bitmap('assets/ground.png', 16, 16, 1);
    this.bitmap.currentFrame = tileNum;
    this.isGroundTile = true;

    var alreadyPresent = false;

    entities.forEach(function(entity) {
        if(entity.isGroundTile && entity.x == x && entity.y == y) {
            alreadyPresent = true;
            return;
        }
    });

    if(!alreadyPresent) {
        entities.unshift(this);
    }
}

GroundTile.prototype.update = function() {
    
};