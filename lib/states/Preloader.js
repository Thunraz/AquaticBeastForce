AbfGame.Preloader = function(game) {
    this.background = null;
    this.preloadBar = null;

    this.ready = false;
};

AbfGame.Preloader.prototype = {

    preload: function() {
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite(0, 57, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);

        AbfGame.pixel.context.drawImage(this.game.canvas, 0, 0, this.game.width, this.game.height, 0, 0, AbfGame.pixel.width, AbfGame.pixel.height);

        this.load.image('logo', './assets/images/logo.png');
        this.load.audio('shootSound', './assets/sounds/shoot.mp3');
        this.load.audio('explosionSound', './assets/sounds/explosion.mp3');
        this.load.audio('titleMusic', './assets/sounds/Asgard.mp3');
    },

    create: function() {
        this.preloadBar.cropEnabled = false;
    },

    render: function() {
        AbfGame.pixel.context.drawImage(this.game.canvas, 0, 0, this.game.width, this.game.height, 0, 0, AbfGame.pixel.width, AbfGame.pixel.height);
    },

    update: function() {
        
        if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {
            this.ready = true;
            this.state.start('MainMenu');
        }

    }

};