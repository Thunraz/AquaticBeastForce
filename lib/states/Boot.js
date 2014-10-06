var AbfGame = {};

AbfGame.Boot = function(game) {

};

AbfGame.Boot.prototype = {

    init: function() {
        // Add states
        this.state.add('Preloader', AbfGame.Preloader);
        this.state.add('MainMenu', AbfGame.MainMenu);
        this.state.add('Game', AbfGame.Game);

         //  Hide the un-scaled game canvas
        this.game.canvas.style['display'] = 'none';

        //  Create our scaled canvas. It will be the size of the game * whatever scale value you've set
        AbfGame.pixel.canvas = Phaser.Canvas.create(this.game.width * AbfGame.pixel.scale, this.game.height * AbfGame.pixel.scale);

        //  Store a reference to the Canvas Context
        AbfGame.pixel.context = AbfGame.pixel.canvas.getContext('2d');

        //  Add the scaled canvas to the DOM
        Phaser.Canvas.addToDOM(AbfGame.pixel.canvas);

        //  Disable smoothing on the scaled canvas
        Phaser.Canvas.setSmoothingEnabled(AbfGame.pixel.context, false);

        //  Cache the width/height to avoid looking it up every render
        AbfGame.pixel.width = AbfGame.pixel.canvas.width;
        AbfGame.pixel.height = AbfGame.pixel.canvas.height;

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