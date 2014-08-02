var compass 	= require('gulp-compass');
var livereload 	= require('gulp-livereload');
var gulp 		= require('gulp');
var folder 		= './public/';

gulp.task('compass', function() {
	gulp.src( folder + 'sass/*.scss' )
	.pipe(compass({
		config_file: './config.rb',
		css: folder + 'css',
		sass: folder + 'sass'
	}))
	.pipe(livereload(1337))
});

gulp.task('watch', function() {
	gulp.watch(folder + 'sass/**/*.scss', ['compass']);
})


gulp.task('default', ['compass','watch']);