var gulp = require('gulp');//js插件
//gulp -sass,gulp-less,gulp-clean-css//css插件
//gulp js-hint gulp-concat gulp-uglify;
var hint = require('gulp-jshint')
var concat = require('gulp-concat')//也可以使用webpack,文件连接;
var uglify = require('gulp-uglify')
var insert = require('gulp-insert')//避免全局污染
//css
var sass = require('gulp-sass');
var cssMinify  = require('gulp-minify-css')
//browser-sync
var browserSync = require('browser-sync').create();
var sourceMaps = require('gulp-sourcemaps')


gulp.task('default',['script','css'],function(){
   browserSync.init({
       server:{
           baseDir:"./",
       },
       port:8080,
       open:false
   })
   gulp.watch('./css/**/*.scss',['css']);
   gulp.watch('./script/**/*.js',['script']);
   gulp.watch('./*.html').on('change',browserSync.reload);
})

gulp.task('css',function(){
    return gulp.src(['./css/**/*.scss'])
                .pipe(sass())
                .pipe(concat('index.min.css'))
                .pipe(cssMinify())
                .pipe(gulp.dest('./dest'))
                .pipe((browserSync.stream()))
})

gulp.task('script',function(){
    return gulp.src('./script/**/*.js')
                .pipe(insert.transform(function(contents, file){
                    var path = file.relative;
                    if(path != "index.js"){
                        var prepend = 'registJS.add("' + path.replace("\\","/") + '", function(){\n';
                        var append = '\n});';
                        return prepend + contents + append;
                    }
                    return contents
                }))
                .pipe(hint())
                .pipe(hint.reporter('default'))
                .pipe(hint.reporter('fail'))//遇到错误直接fail
                .pipe(concat('index.js'))
                .pipe(uglify())
                .pipe(gulp.dest('./dest'))
                .pipe((browserSync.stream()))
})
//through2插件开发必备
//var through = require('through2');

gulp.task('default:dev',['script:dev','css:dev'],function(){
    browserSync.init({
        server:{
            baseDir:"./",
        },
        port:8080,
        open:false
    })
    gulp.watch('./css/**/*.scss',['css']);
    gulp.watch('./script/**/*.js',['script']);
    gulp.watch('./*.html').on('change',browserSync.reload);
 })

 
gulp.task('css:dev',function(){
    return gulp.src(['./css/**/*.scss'])
                .pipe(sass())
                .pipe(sourceMaps.init())
                .pipe(concat('index.min.css'))
                .pipe(sourceMaps.write())
                .pipe(gulp.dest('./dest'))
                .pipe((browserSync.stream()))
})

gulp.task('script:dev',function(){
    return gulp.src('./script/**/*.js')
                .pipe(insert.transform(function(contents, file){
                    var path = file.relative;
                    if(path != "index.js"){
                        var prepend = 'registJS.add("' + path.replace("\\","/") + '", function(){\n';
                        var append = '\n});';
                        return prepend + contents + append;
                    }
                    return contents
                }))
                // .pipe(hint())
                // .pipe(hint.reporter('default'))
                // .pipe(hint.reporter('fail'))//遇到错误直接fail
                .pipe(sourceMaps.init())
                .pipe(concat('index.js'))
                .pipe(sourceMaps.write())
                .pipe(gulp.dest('./dest'))
                .pipe((browserSync.stream()))
})