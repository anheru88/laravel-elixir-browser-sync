var gulp        = require('gulp');
var browserSync = require('browser-sync');
var notify      = require('gulp-notify');
var _           = require('underscore');
var elixir      = require('laravel-elixir');


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


        if(browserSync.active === true){
            browserSync.reload();
        } else {
            browserSync(options);
        }
    });


    this.registerWatcher('BrowserSync', src);

    return this.queueTask("BrowserSync");
});