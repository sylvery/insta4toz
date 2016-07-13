var gulp 	= require('gulp'),
		spawn	= require('child_process').spawn,
		node;

gulp.task('server', function() {
	if (node) node.kill();
	node = spawn('node', ['server.js'], {stdio: 'inherit'});
	node.on('close', function(code) {
		if (code === 8) gulp.log('Error detected, waiting for changes...');
	})
});

gulp.task('default', function() {
	gulp.run('server')

	gulp.watch(['./server.js','./views/pages/*.ejs','./views/partials/*.ejs','./weather-forecast/*.js'], function() {
		gulp.run('server');
	})
});

process.on('exit', function() {
	if (node) node.kill();
})