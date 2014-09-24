function Sound(src, game) {
    this.sound = null;

    this.load(src, game);
}

Sound.prototype.load = function(src, game) {
    var request = new XMLHttpRequest();
    request.open('GET', src, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
        game.audioContext.decodeAudioData(request.response, function(buffer) {
            shootSound = buffer;
        }, function() { });
    }
    request.send();
};