# gulp-sass-to-postcss-mixins [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]
> Plugin to replace sass-syntax mixins with PostCSS mixins. Intended to be used *before* running PreCSS plugin for PostCSS with [SugarSS](https://github.com/postcss/sugarss) parser. 

TL;DR: Helps PostCSS behave almost like .sass files.

## Usage

First, install `gulp-sass-to-postcss-mixins` as a development dependency:

```shell
npm install --save-dev gulp-sass-to-postcss-mixins
```

Then, add it to your `gulpfile.js`:

### Example usage
```javascript
var sassmixins = require('gulp-sass-to-postcss-mixins');

gulp.task(‘css’, function(){
  gulp.src([’source/style.sass’])
    .pipe(sassmixins())
		// running postcss-mixins plugin here, or [PreCSS](https://github.com/jonathantneal/precss)
    .pipe(gulp.dest('build/'));
});
```


### What it does
It takes valid sass-syntax mixins like this:
```css
.box
	+test($var1)
	+r(300)
		display: none
	+r
		display: block
```
And converts them to this (this is [postcss-mixins](https://github.com/postcss/postcss-mixins) syntax):
```css
.box
	@mixin test $var1 
	@mixin r 300 
		display: none
	@mixin r
		display: block
```
