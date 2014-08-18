function Camera(canvas, scale) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.scale = scale;

    this.hud = new Bitmap('assets/hud.png', 160, 16, 1);
    this.numbers = new Bitmap('assets/font.png', 4, 6, 10);

    // Don't smooth images when scaling up
    this.ctx.imageSmoothingEnabled = false;
}

Camera.prototype.render = function(entities) {
    // Clear the frame
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw all entities
    var that = this;
    entities.forEach(function(entity) {
        that.draw(entity.bitmap, entity.x, entity.y, entity.direction);
    });

    // Draw HUD bitmap
    this.draw(this.hud, 80, 136);
    this.drawNum(player.shots.toString(), 53, 138);
};

Camera.prototype.draw = function(bitmap, xPos, yPos, rotation) {
    this.ctx.save();

    // Move to the sprite's center
    this.ctx.translate(xPos * this.scale, yPos * this.scale);

    // Rotate the context by the given amount
    this.ctx.rotate(rotation + Math.PI / 2);

    // Draw the image
    this.ctx.drawImage(
        bitmap.image,
        bitmap.currentFrame * bitmap.width,
        0,
        bitmap.width,
        bitmap.height,
        -bitmap.width / 2 * this.scale,
        -bitmap.height / 2 * this.scale,
        bitmap.width * this.scale,
        bitmap.height * this.scale
    );

    this.ctx.restore();
};

Camera.prototype.reposition = function() {
    console.log(this.width);
};

Camera.prototype.drawNum = function(str, xPos, yPos) {
    var xOffset = 0;
    for(var i = 0; i < str.length; i++) {
        this.numbers.currentFrame = str[i];
        this.draw(this.numbers, xPos + xOffset * 4, yPos);
        xOffset++;
    }
};