function Game(canvas) {
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

    this.shootSound;
    this.explosionSound;
    this.audioContext;

    this.preload();

    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.loadSounds();
    } catch(e) {}
}

Game.prototype.preload = function() {
    this.preloader = new html5Preloader();

    this.preloader.addFiles('mysound*:assets/explosion.wav||assets/explosion.mp3');
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
    
};

// Start the game!
document.addEventListener('DOMContentLoaded', function() {
    var game = new Game(document.getElementById('gameCanvas'));
}, false);