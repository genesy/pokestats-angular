var livereload 	= require('gulp-livereload');
var prefix		= require('gulp-autoprefixer');
var sass 		= require('gulp-sass');
var plumber 		= require('gulp-plumber');
var gulp 		= require('gulp');
var assets 		= './public/';
var lr = 1337;


gulp.task('sass', function() {
	gulp.src( './sass/*.scss' )
	.pipe(plumber())
	.pipe(sass())
	.pipe(prefix())
	.pipe(gulp.dest( assets + 'css'))
	.pipe(livereload(lr))
});

gulp.task('watch', function() {
	gulp.watch('./sass/**/*.scss', ['sass']);
})


gulp.task('default', ['sass','watch']);