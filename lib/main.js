var CIRCLE = Math.PI * 2;
var canvas = document.getElementById('g');
var controls = new Controls();
var player = new Player(32, 32);
var camera = new Camera(canvas, 3.0);
var entities = [player];

var loop = new GameLoop();

loop.start(function frame(deltaT) {
    player.update(controls.states, deltaT);

    camera.render(entities);
});