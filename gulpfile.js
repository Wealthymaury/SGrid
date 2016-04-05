var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var nib = require('nib');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

var config = {
	stylus: {
		main: './src/stylus/master.styl',
		watch: './src/stylus/**/*.styl',
		output: './dist/css'
	},
	scripts: {
		main: './src/scripts/master.js',
		watch: './src/scripts/**/*.js',
		output: './dist/js'
	}
};

gulp.task('server', function() {
	gulp.src('./dist')
		.pipe(webserver({
			host: '0.0.0.0',
			port: '8000',
			livereload: true
		}));
});

gulp.task('build:css', function() {
	gulp.src(config.stylus.main)
		.pipe(stylus({
			use: nib(),
			'include css': true
		}))
		.pipe(minifyCSS())
		.pipe(rename('sgrid.min.css'))
		.pipe(gulp.dest(config.stylus.output));
});

gulp.task('watch', function() {
	gulp.watch(config.stylus.watch, ['build:css']);
});

gulp.task('default', ['server', 'watch', 'build:css']);
