var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    filesize = require('gulp-filesize'),
    zip = require('gulp-zip'),
    htmlmin = require('gulp-htmlmin');

gulp.task('default', function() {
    gulp.src('lib/*.js')
        .pipe(concat('g.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));

    gulp.src(['g.js', 'index.html', 'assets/*'], { base: './' })
        .pipe(zip('AquaticBeastForce.zip'))
        .pipe(filesize())
        .pipe(gulp.dest('dist'));
});