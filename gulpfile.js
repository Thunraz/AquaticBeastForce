var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    filesize = require('gulp-filesize'),
    zip = require('gulp-zip'),
    htmlmin = require('gulp-htmlmin');

gulp.task('minify', function() {
    gulp.src([
            'lib/bitmap.js',
            'lib/camera.js',
            'lib/controls.js',
            'lib/explosion.js',
            'lib/gameLoop.js',
            'lib/player.js',
            'lib/shadow.js',
            'lib/projectile.js',
            'lib/groundTile.js',
            'lib/enemy.js',
            'lib/main.js'
        ])
        .pipe(concat('g.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('zip', function() {
    gulp.src(['g.js', 'index.html', 'assets/*.png'], { base: './' })
        .pipe(zip('AquaticBeastForce.zip'))
        .pipe(filesize())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
    gulp.start('minify');
    gulp.start('zip');
});