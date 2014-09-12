var canvas = document.getElementById('g');
var controls = new Controls();
var camera = new Camera(canvas, 0, 0, 3.0);
var backgroundLayer = [];
var entities = [];
var player = new Player(0, 0);
var timer = 0;
var enemyCountdown = 10;

entities.push(player);
placeRandomEnemy();

var loop = new GameLoop();

loop.start(function frame(deltaT) {
    timer += deltaT;

    if(Math.round(timer) >= enemyCountdown) {
        placeRandomEnemy();
        timer -= enemyCountdown;

        if(enemyCountdown > 1)
            enemyCountdown--;
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
    var x = player.x + Math.sign(Math.random() - 0.5) * 100;
    var y = player.y + Math.sign(Math.random() - 0.5) * 100;

    console.log('Placing enemy at (' + x + ', ' + y + ')');

    entities.push(new Enemy(x, y));
}