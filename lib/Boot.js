var AbfGame = {};

AbfGame.Boot = function(game) {

};

AbfGame.Boot.prototype = {

    init: function() {
        // Add states
        this.state.add('Preloader', AbfGame.Preloader);
        this.state.add('MainMenu', AbfGame.MainMenu);
        this.state.add('Game', AbfGame.Game);

        this.canvas.style['display'] = 'none';

        // Disabled multi-touch
        this.input.maxPointers = 1;
    },

    preload: function() {
        // Load the preloader images :)
        this.load.image('preloaderBackground', './assets/images/preloaderBackground.png');
        this.load.image('preloaderBar', './assets/images/preloaderBar.png');
    },

    create: function() {
        this.state.start('Preloader');
    }
};