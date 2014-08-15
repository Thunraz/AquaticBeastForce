function Camera(canvas, scale) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.scale = scale;

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
}