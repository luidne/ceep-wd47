const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber'); // trata erros de pipe
const htmlnin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');

function defaultTask(cb) {
    // place code for your default task here
//    gulp.task('default', () =>
    cb();
}

gulp.task('prod', function(callback){    
    gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(htmlnin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
    
    gulp.src('src/assets/css/**')
    .pipe(concat('ceep.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/assets/css'))
    
    gulp.src('src/assets/img/**')
    .pipe(gulp.dest('dist/assets/img'))
    
    gulp.src('src/assets/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('ceep.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    
    callback();
});

gulp.task('dev', function(callback){
    gulp.src('src/css/**')
        .pipe(concat('ceep.css'))
        .pipe(gulp.dest('src/assets/css/'));

    gulp.src('src/js/*.js')
        .pipe(concat('ceep.js'))
        .pipe(gulp.dest('src/assets/js/'));

    callback();
});
  
exports.default = defaultTask;
