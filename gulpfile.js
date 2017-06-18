/**
 * Created by renminghe on 2017/3/30.
 */

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-minify-css');


// 合并，压缩css文件
gulp.task('minCss', function() {
    gulp.src('css-dev/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'));

});


// 合并，压缩js文件
gulp.task('minJs', function() {
    gulp.src('js-dev/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('javascripts'));
});


// 默认任务
gulp.task('default', function(){
    gulp.run('minCss','minJs');

    // 监听文件变化
    gulp.watch('css-dev/*.css', function(){
        gulp.run('minCss');
    });
    gulp.watch('js-dev/*.js', function(){
        gulp.run('minJs');
    });
});