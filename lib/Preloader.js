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

        this.load.image('logo', './assets/images/logo.png');
        this.load.audio('shootSound', './assets/sounds/shoot.mp3');
    },

    create: function() {
        this.preloadBar.cropEnabled = false;
    },

    update: function() {
        
        if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {
            this.ready = true;
            this.state.start('MainMenu');
        }

    }

};