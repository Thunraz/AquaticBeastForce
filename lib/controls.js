function Controls() {
    this.codes  = { 37: 'left', 39: 'right', 38: 'up', 40: 'down', 32: 'shoot' };
    this.states = { 'left': false, 'right': false, 'up': false, 'down': false, 'shoot': false };
    
    document.addEventListener('keydown', this.onKey.bind(this, true), false);
    document.addEventListener('keyup', this.onKey.bind(this, false), false);
}

Controls.prototype.onKey = function(val, e) {
    var state = this.codes[e.keyCode];
    if(typeof state === 'undefined') {
        return;
    }

    this.states[state] = val;
    
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
};
