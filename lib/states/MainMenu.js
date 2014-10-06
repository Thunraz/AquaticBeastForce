AbfGame.MainMenu = function(game) {
    this.music = null;
    this.playButton = null;
};

AbfGame.MainMenu.prototype = {

    create: function() {
        // Start playing the music
        this.music = this.add.audio('titleMusic');
        this.music.play();

        this.add.sprite(45, 0, 'logo');

    },

    render: function() {
        AbfGame.pixel.context.drawImage(this.game.canvas, 0, 0, this.game.width, this.game.height, 0, 0, AbfGame.pixel.width, AbfGame.pixel.height);
    },

    update: function() {

        //  Do some nice funky main menu effect here

    },

    startGame: function(pointer) {

        //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        this.music.stop();

        //  And start the actual game
        this.state.start('Game');

    }

};