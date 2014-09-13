var canvas = document.getElementById('g');
var controls = new Controls();
var camera = new Camera(canvas, 0, 0, 3.0);
var backgroundLayer = [];
var entities = [];
var player = new Player(0, 0);
var enemyTimer = 0;
var healthTimer = 0;
var gameOverTimer = 0.5;
var enemyCountdown = 10;

var shootSound;
var explosionSound;
var audioContext;

try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();
    loadSounds();
} catch(e) {}

entities.push(player);
placeRandomEnemy();

var loop = new GameLoop();

loop.start(function frame(deltaT) {
    enemyTimer += deltaT;
    healthTimer += deltaT;

    if(Math.round(enemyTimer) >= enemyCountdown) {
        placeRandomEnemy();
        enemyTimer -= enemyCountdown;

        if(enemyCountdown > 1)
            enemyCountdown--;
    }

    if(healthTimer >= 1 && player.health > 0) {
        healthTimer--;
        player.health = player.health >= 100 ? 100 : player.health + 1;
    }

    if(player.health <= 0) {
        if(controls.states.shoot && gameOverTimer <= 0) {
            resetGame();
        }

        gameOverTimer -= deltaT;
    }

    backgroundLayer.forEach(function(entity) {
        if(entity.update)
            entity.update(controls.states, deltaT);
    });

    entities.forEach(function(entity) {
        entity.update(controls.states, deltaT);
    });

    camera.render(backgroundLayer, entities);
});

function placeRandomEnemy() {
    if(player.health > 0) {
        var rad = Math.random() * 2 * Math.PI;

        var x = player.x + 100 * Math.cos(rad);
        var y = player.y + 100 * Math.sin(rad);

        entities.push(new Enemy(x, y));
    }
}

function resetGame() {
    backgroundLayer = [];
    entities = [];
    player = new Player(0, 0);
    enemyTimer = 0;
    healthTimer = 0;
    gameOverTimer = 0.5;
    enemyCountdown = 10;

    entities.push(player);
    placeRandomEnemy();
}

function loadSounds() {
    var shootRequest = new XMLHttpRequest();
    shootRequest.open('GET', 'assets/shoot.mp3', true);
    shootRequest.responseType = 'arraybuffer';

    // Decode asynchronously
    shootRequest.onload = function() {
        audioContext.decodeAudioData(shootRequest.response, function(buffer) {
            shootSound = buffer;
        }, function() { });
    }
    shootRequest.send();

    var explosionRequest = new XMLHttpRequest();
    explosionRequest.open('GET', 'assets/explosion.mp3', true);
    explosionRequest.responseType = 'arraybuffer';

    // Decode asynchronously
    explosionRequest.onload = function() {
        audioContext.decodeAudioData(explosionRequest.response, function(buffer) {
            explosionSound = buffer;
        }, function() { });
    }
    explosionRequest.send();
}

function playSound(buffer) {
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}