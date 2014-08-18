var canvas = document.getElementById('g');
var controls = new Controls();
var player = new Player(canvas.width / 2, canvas.height / 2);
var camera = new Camera(canvas, 0, 0, 3.0);

var entities = [player];
var loop = new GameLoop();

loop.start(function frame(deltaT) {
    entities.forEach(function(entity) {
        entity.update(controls.states, deltaT);
    });

    camera.render(entities);
});