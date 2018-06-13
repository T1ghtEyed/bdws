var gulp = require('gulp');
var browserSync = require('browser-sync');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//Запускаем сервер для BrowserSync
gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'src',
      index: 'main.html'
    },
    notify: false
  })
});

//Компилируем Pug в Html
gulp.task('pug', function() {
  return gulp.src('src/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('src'))
    .pipe(browserSync.reload({stream: true}));
});

//Компилируем Sass в CSS
gulp.task('sass', function(){
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}));
});

//Висит в процессах и дергает нужные таски
gulp.task('watch', function() {
  gulp.watch('src/templates/*.pug', ['pug']);
  gulp.watch('src/sass/**/*.sass', ['sass']);
});

//Вызывается при запуске Gulp
gulp.task('default', ['pug', 'sass', 'browser-sync', 'watch']);