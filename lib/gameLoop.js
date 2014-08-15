function GameLoop() {
    this.frame = this.frame.bind(this);
    this.lastTime = 0;
    this.callback = function() {};
}

GameLoop.prototype.start = function(callback) {
    this.callback = callback;
    requestAnimationFrame(this.frame);
};

GameLoop.prototype.frame = function(time) {
    var deltaT = (time - this.lastTime) / 1000;
    this.lastTime = time;
    
    if(deltaT < 0.2) {
        this.callback(deltaT);
    }

    requestAnimationFrame(this.frame);
};