var canvas = document.getElementById('g');
var controls = new Controls();
var camera = new Camera(canvas, 0, 0, 3.0);
var entities = [];
var player = new Player(0, 0);

entities.push(player);
var loop = new GameLoop();

loop.start(function frame(deltaT) {
    entities.forEach(function(entity) {
        entity.update(controls.states, deltaT);
    });

    camera.render(entities);
});