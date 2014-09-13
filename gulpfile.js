var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    filesize = require('gulp-filesize'),
    zip = require('gulp-zip'),
    rimraf = require('gulp-rimraf');

gulp.task('minify', function() {
    return gulp.src([
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

gulp.task('zip', ['minify'], function() {
    return gulp.src(['g.js', 'index.html', 'assets/*.png', 'assets/*.mp3'], { base: './' })
        .pipe(zip('AquaticBeastForce.zip'))
        .pipe(filesize())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', ['zip'], function() {
    gulp.src(['g.js'], { read: false })
        .pipe(rimraf());
});

gulp.task('default', function() {
    gulp.start('minify');
    gulp.start('zip');
    gulp.start('clean');
});