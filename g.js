var CIRCLE = Math.PI * 2;

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

/*
 * ****************************************************************
*/

function Controls() {
    this.codes  = { 37: 'left', 39: 'right', 38: 'up', 40: 'down', 32: 'shoot' };
    this.states = { 'left': false, 'right': false, 'up': false, 'down': false, 'shoot': false };
    
    document.addEventListener('keydown', this.onKey.bind(this, true), false);
    document.addEventListener('keyup', this.onKey.bind(this, false), false);
}

Controls.prototype.onKey = function(val, e) {
    var state = this.codes[e.keyCode];
    if(typeof state === 'undefined') {
        return;
    }

    this.states[state] = val;
    
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
};

/*
 * ****************************************************************
*/

function Bitmap(src, width, height, numberOfFrames) {
    this.image = new Image();
    this.image.src = src;
    this.width = width;
    this.height = height;
    this.numberOfFrames = numberOfFrames || 0;
    this.currentFrame = 0;
}

/*
 * ****************************************************************
*/

function Player(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 0;
    this.bitmap = new Bitmap('assets/player.png', 16, 16, 4);
    this.animationTimer = 1/24;
}

Player.prototype.update = function(controls, deltaT) {
    if(controls.left) {
        this.rotate(deltaT * -Math.PI);
    }

    if(controls.right) {
        this.rotate(deltaT * Math.PI);
    }

    if(controls.up) {
        this.walk(40 * deltaT);
    }

    if(controls.down) {
        this.walk(-40 * deltaT);
    }

    if(this.animationTimer <= 0.0) {
        this.animationTimer += 1/24;

        this.bitmap.currentFrame = (this.bitmap.currentFrame + 1) % this.bitmap.numberOfFrames;
    }

    this.animationTimer -= deltaT;
};

Player.prototype.walk = function(distance) {
    var dx = Math.cos(this.direction) * distance;
    var dy = Math.sin(this.direction) * distance;
    this.x += dx;
    this.y += dy;
}

Player.prototype.rotate = function(angle) {
    this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
};

/*
 * ****************************************************************
*/

function Camera(canvas, scale) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.scale = scale;
}

Camera.prototype.render = function(player) {
    // Clear the frame
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Don't smooth images when scaling up
    this.ctx.imageSmoothingEnabled = false;
    
    this.draw(player.bitmap.image, player.x, player.y, player.bitmap.currentFrame, player.direction);
};

Camera.prototype.draw = function(image, xPos, yPos, currentFrame, rotation) {
    this.ctx.save();

    // Move to the sprite's center
    this.ctx.translate(xPos * this.scale, yPos * this.scale);

    // Rotate the context by the given amount
    this.ctx.rotate(rotation + Math.PI / 2);

    // Draw the image
    this.ctx.drawImage(
        image,
        currentFrame * 16,
        0,
        16,
        16,
        -8 * this.scale,
        -8 * this.scale,
        16 * this.scale,
        16 * this.scale
    );

    this.ctx.restore();
}

/*
 * ****************************************************************
*/

var canvas = document.getElementById('g');
var controls = new Controls();
var player = new Player(0, 0);
var camera = new Camera(canvas, 3.0);

var loop = new GameLoop();

loop.start(function frame(deltaT) {
    player.update(controls.states, deltaT);

    camera.render(player);
});