var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

gulp.task('default', function(){
    console.log("Hello Gulp!");
});

gulp.task('serve', ['sass'], function(){
    browserSync.init({
        files:
            ['app/**/*.html', 'app/**/*.css','app/**/*.js'],
        server: {
            baseDir: "./app"
        }
    });
    gulp.watch('app/**/*.scss', ['sass']);
});

gulp.task('sass', function(){
    return sass('app/**/*.scss', {
        style: 'expanded'
    }).on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream:true}));
});

