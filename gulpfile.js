'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const del = require('del');
const run = require('run-sequence');
const browserSync = require('browser-sync').create();

// Удаление каталога сборки
gulp.task('clean:build', function () {
  return del('build');
});

// Копирование файлов
gulp.task('copy:build', function () {
  console.log('Копирование файлов...');

  return gulp.src([
      'src/fonts/**/*.{woff,woff2}',
      'src/*.html'
    ], {
      base: 'src'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('copy:html', function () {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

// Линтинг в соответствии с настройками .editorconfig
gulp.task('lintspaces', function () {
  const lintspaces = require('gulp-lintspaces');

  return gulp.src([
      'src/*.html',
      '*.json',
      '*.js',
      '*.md',
      'src/**/*.js',
      'src/img/**/*.svg',
      'src/less/**/*.less'
    ])
    .pipe(lintspaces({editorconfig: '.editorconfig'}))
    .pipe(lintspaces.reporter());
});

// Компиляция стилей проекта
gulp.task('style', function () {
  const less = require('gulp-less');
  const postcss = require('gulp-postcss');
  const autoprefixer = require('autoprefixer');
  const mqpacker = require('css-mqpacker');
  const csso = require('gulp-csso');

  let plugins = [
    autoprefixer(),
    mqpacker({sort: true})
  ];

  console.log('Компиляция стилей...');

  return gulp.src('src/less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('build/css'))
    .pipe(csso({comments: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

// Минификация JS скриптов

gulp.task('js', function () {
  const uglify = require('gulp-uglify');

  console.log('Минификация JS...');

  return gulp.src('src/js/index.js')
    .pipe(gulp.dest('build/js'))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

// Оптимизация изображений
gulp.task('images', function () {
  const imagemin = require('gulp-imagemin');
  const jpegoptim = require('imagemin-jpegoptim');

  console.log('Оптимизация изображений...');

  return gulp.src('src/img/**/*.{jpg,png}')
    .pipe(imagemin([
      imagemin.optipng(),
      jpegoptim({
        max: 80,
        progressive: true
      })
    ]))
    .pipe(gulp.dest('build/img'));
});

// Локальный сервер
gulp.task('serve', function () {
  browserSync.init({
    server: 'build',
    cors: true,
    notify: false
  });

  gulp.watch('src/less/**/*.less', ['style']);
  gulp.watch('src/*.html', ['copy:html']);
  gulp.watch('src/js/*.js', ['js']);
});

// Сборка проекта
gulp.task('build', function (callback) {
  run('clean:build', 'copy:build', 'style', 'js', 'images', callback);
});
