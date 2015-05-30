var gulp        = require('gulp');
var browserSync = require('browser-sync');
var notify      = require('gulp-notify');
var _           = require('underscore');
var elixir      = require('laravel-elixir');
var config      = elixir.config;
var inSequence = require('run-sequence');

var initializePlugin = function(){
    function notify_message(title, subtitle, message, icon){
        gulp.src('').pipe(notify({
            title: title,
            subtitle: subtitle,
            icon: __dirname + icon,
            message: message
        }));
    }

    elixir.extend("BrowserSync",  function(options, src){


        var defaultSrc = [
            "app/**/*",
            "public/**/*",
            "resources/views/**/*"
        ];

        options = _.extend({
            proxy           : "homestead.app",
            logPrefix       : "Laravel Elixir BrowserSync",
            logConnections  : true,
            reloadOnRestart : true,
            notify          : true
        }, options);

        src = src || defaultSrc;

        gulp.task("BrowserSync", function(){
            var onError = function(err){
                notify.onError({
                    title       : "BrowserSync",
                    subtitule   : "BrowserSync Failed!",
                    message     : "Error : <%= error.message %>",
                    icon        : __dirname + '/../laravel-elixir/icons/fail.png'
                })(err);

                this.emit('end');
            }

            if(config.watchers.default.BrowserSync._runing === true){
                if(browserSync.active === true){
                    browserSync.reload();
                } else {
                    browserSync(options);
                }
            }
        });


        this.registerWatcher('BrowserSync', src);

        return this.queueTask("BrowserSync");
    });

    var srcPaths;
    var tasksToRun;

    gulp.task('watch', function(){

        config.watchers.default.BrowserSync._runing = true;
        srcPaths = config.watchers.default;
        tasksToRun = _.intersection(config.tasks, _.keys(srcPaths).concat('copy'));

        inSequence.apply(this, tasksToRun.concat('watch-assets'));
    });

    gulp.task('watch-assets', function() {
        for (var task in srcPaths) {
            if (_.isFunction(srcPaths[task])) {
                srcPaths[task].apply(this);
            } else {
                gulp.watch(srcPaths[task], [task]);
            }
        }
    });
}

module.exports = {
    init: initializePlugin
};