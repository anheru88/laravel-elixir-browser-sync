## Laravel Elixir BrowserSync

![Version](https://img.shields.io/npm/v/laravel-elixir-browsersync.svg?style=flat-square)

## Install


```sh
$ npm install laravel-elixir-browsersync --save-dev
```

## Usage

This is a simple wrapper around Laravel Elixir. Add it to your Elixir-enhanced Gulpfile. You need using Homestead, and configure your virtual machine and the domain `homestead.app`, like so: 

```
var elixir = require('laravel-elixir');

require('laravel-elixir-browsersync');

elixir(function(mix) {
	mix.BrowserSync();
});
```

The second use is passing options to BrowserSync, acording the documentation of [BrowserSync.io](http://www.browsersync.io/docs/options/), like the next example:

```
var elixir = require('laravel-elixir');

require('laravel-elixir-browsersync');

elixir(function(mix) {
	mix.BrowserSync(
	{
		proxy 			: "domain.app",
        logPrefix		: "Laravel Eixir BrowserSync",
        logConnections	: false,
        reloadOnRestart : false,
        notify 			: false
	});
});
```