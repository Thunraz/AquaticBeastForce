function Bitmap(src, width, height, numberOfFrames) {
    this.image = new Image();
    this.image.src = src;
    this.width = width;
    this.height = height;
    this.numberOfFrames = numberOfFrames || 0;
    this.currentFrame = 0;
}