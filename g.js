function Controls() {
    this.codes  = { 37: 'left', 39: 'right', 38: 'up', 40: 'down' };
    this.states = { 'left': false, 'right': false, 'up': false, 'down': false };
    
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

function Bitmap(src, width, height) {
    this.image = new Image();
    this.image.src = src;
    this.width = width;
    this.height = height;
}

/*
 * ****************************************************************
*/

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

function Player(x, y) {
    this.x = x;
    this.y = y;
    this.bitmap = new Bitmap('assets/player.png', 16, 16);
}

Player.prototype.update = function(controls, deltaT) {
    if(controls.left) {
        this.x -= 1;
    }

    if(controls.right) {
        this.x += 1;
    }

    if(controls.up) {
        this.y -= 1;
    }

    if(controls.down) {
        this.y += 1;
    }
};

/*
 * ****************************************************************
*/

function Camera(canvas) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
}

Camera.prototype.render = function(player) {
    this.ctx.drawImage(player.bitmap.image, player.x, player.y, player.bitmap.width, player.bitmap.height);
};

/*
 * ****************************************************************
*/

var canvas = document.getElementById('g');
var controls = new Controls();
var player = new Player(5, 5);
var camera = new Camera(canvas);

var loop = new GameLoop();

loop.start(function frame(deltaT) {
    player.update(controls.states, deltaT);

    camera.render(player);
    //console.log(controls.states);
});