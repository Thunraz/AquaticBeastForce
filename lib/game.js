function Game(canvas) {
    console.log('Game constructor');
    this.canvas = canvas;
    this.controls = new Controls();
    this.camera = new Camera(this.canvas, 0, 0, 3.0);
    
    this.backgroundLayer = [];
    this.entities = [];
    
    this.player = new Player(0, 0, this);
    this.entities.push(this.player);
    
    this.enemyTimer = 0;
    this.healthTimer = 0;
    this.gameOverTimer = 0.5;
    this.enemyCountdown = 10;

    this.shootSound = null;
    this.explosionSound = null;
    this.audioContext = null;

    this.preloader = null;
    this.preload(this.start);

    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.loadSounds();
    } catch(e) {}
}

Game.prototype.preload = function(callback) {
    console.log('Game preloading');
    this.preloader = new html5Preloader();

    this.preloader.addFiles('mysound*:assets/explosion.wav||assets/explosion.mp3');

    this.preloader.on('finish', callback);
};

Game.prototype.reset = function() {
    this.backgroundLayer = [];
    this.entities = [];
    this.player = new Player(0, 0);
    this.enemyTimer = 0;
    this.healthTimer = 0;
    this.gameOverTimer = 0.5;
    this.enemyCountdown = 10;

    this.entities.push(player);
    this.placeRandomEnemy();
};

Game.prototype.start = function() {
    console.log('Starting game');

    var loop = new GameLoop();
    var that = this;

    loop.start(function frame(deltaT) {
        that.enemyTimer += deltaT;
        that.healthTimer += deltaT;

        if(Math.round(that.enemyTimer) >= that.enemyCountdown) {
            that.placeRandomEnemy();
            that.enemyTimer -= that.enemyCountdown;

            if(that.enemyCountdown > 1)
                that.enemyCountdown--;
        }

        if(that.healthTimer >= 1 && that.player.health > 0) {
            that.healthTimer--;

            if(that.player.health >= 100) {
                that.player.health = 100;
            } else {
                that.player.health++;
            }
        }

        if(that.player.health <= 0) {
            if(that.controls.states.shoot && that.gameOverTimer <= 0) {
                that.resetGame();
            }

            that.gameOverTimer -= deltaT;
        }

        that.backgroundLayer.forEach(function(entity) {
            if(entity.update)
                entity.update(controls.states, deltaT);
        });

        that.entities.forEach(function(entity) {
            entity.update(controls.states, deltaT);
        });

        that.camera.render(this.backgroundLayer, entities);
    });
};

// Start the game!
document.addEventListener('DOMContentLoaded', function() {
    var game = new Game(document.getElementById('gameCanvas'));
}, false);