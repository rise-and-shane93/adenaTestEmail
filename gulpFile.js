'use strict';

const gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssnano = require('gulp-cssnano'),
browserSync = require('browser-sync');

const server = browserSync.create();

const paths = {
	style: {
		src: './app/scss/*.scss',
		dest: './app/css'
	},
	html: {
		src: './app/*.html'
	}
};

function styleStream() {
	return gulp.src(paths.style.src)
	.pipe(sass())
	.pipe(cssnano())
	.pipe(autoprefixer({
		grid: true,
		browsers: ['last 5 versions'],
		cascade: false
	}))
	.pipe(gulp.dest(paths.style.dest))
	.pipe(browserSync.reload({
		stream: true
	}));
}

// gulp.task('sass', function(){
// 	return gulp.src('./app/scss/*.scss')
// 	  .pipe(sass()) 
// 	  .pipe(gulp.dest('./app/css'))
//   });

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './app'
    }
  });
  done();
}

function watchFile() {
	gulp.watch(paths.style.src, gulp.series(styleStream, reload));
	gulp.watch(paths.html.src, gulp.series(reload));
}

gulp.task('default', gulp.series(serve, watchFile));