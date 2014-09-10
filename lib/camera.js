function Camera(canvas, x, y, scale) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.scale = scale;
    this.x = x;
    this.y = y;

    this.hud = new Bitmap('assets/hud.png', 160, 16, 1);
    this.numbers = new Bitmap('assets/font.png', 4, 6, 10);

    // Don't smooth images when scaling up
    this.ctx.imageSmoothingEnabled = false;
}

Camera.prototype.render = function(entities) {
    this.reposition();

    // Clear the frame
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.translate(canvas.width / 2, canvas.height / 2);

    // Draw all entities
    var that = this;
    entities.forEach(function(entity) {
        that.draw(entity.bitmap, entity.x, entity.y, entity.rotation, entity.fixed);
    });

    this.ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // Draw HUD bitmap
    this.draw(this.hud, 80, 136, 0, true);
    this.drawNum(player.shots.toString(), 53, 138);
};

Camera.prototype.draw = function(bitmap, xPos, yPos, rotation, fixed) {
    this.ctx.save();

    // Move to the sprite's center
    if(fixed) {
        this.ctx.translate(xPos * this.scale, yPos * this.scale);
    } else {
        //this.ctx.translate(this.offset.x, this.offset.y);
        this.ctx.translate((xPos - this.x) * this.scale, (yPos - this.y) * this.scale);
    }

    // Rotate the context by the given amount
    this.ctx.rotate(rotation);

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
    this.x = player.x;
    this.y = player.y;
};

Camera.prototype.drawNum = function(str, xPos, yPos) {
    var xOffset = 0;
    for(var i = 0; i < str.length; i++) {
        this.numbers.currentFrame = str[i];
        this.draw(this.numbers, xPos + xOffset * 4, yPos, 0, true);
        xOffset++;
    }
};