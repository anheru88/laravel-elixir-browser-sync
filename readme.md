## Install


```sh
$ npm install anheru/laravel-elixir-browser-sync --save-dev
```

## Usage

This is a simple wrapper around Laravel Elixir. Add it to your Elixir-enhanced Gulpfile, like so:

```
var elixir = require('laravel-elixir');

require('laravel-elixir-browser-sync');

elixir(function(mix) {
	mix.BrowserSync();
});
```