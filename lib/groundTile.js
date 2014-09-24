var GroundTile = function(x, y, tileNum, game) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.bitmap = new Bitmap('assets/ground.png', 16, 16, 1);
    this.bitmap.currentFrame = tileNum;

    var alreadyPresent = false;

    game.backgroundLayer.forEach(function(entity) {
        if(entity.x == x && entity.y == y) {
            alreadyPresent = true;
            return;
        }
    });

    if(!alreadyPresent) {
        game.backgroundLayer.unshift(this);
    }
}