var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Watch
gulp.task('watch', ['browserSync'], function() {
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('./*.js', browserSync.reload);
    gulp.watch('./*.css', browserSync.reload);
});

gulp.task('serve', ['watch']);