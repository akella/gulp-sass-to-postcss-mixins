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
var sugarss    = require('sugarss');
var precss     = require('precss');

gulp.task('css', function(){
  gulp.src(['source/style.sass'])
    .pipe(sassmixins())
	// running postcss-mixins plugin here, or [PreCSS](https://github.com/jonathantneal/precss)
    .pipe(postcss([precss],{ parser: sugarss }))
    .pipe(gulp.dest('build/'));
});
```


### What it does
It takes valid sass-syntax mixins like this:
```sass
.box
	+test($var1)
	+responsive(300)
		display: none
	+responsive
		display: block
```
And converts them to this (this is [postcss-mixins](https://github.com/postcss/postcss-mixins) syntax):
```sass
.box
	@mixin test $var1 
	@mixin responsive 300 
		display: none
	@mixin responsive
		display: block
```
Which is then transformed with PreCSS to this CSS:
```css
.box {
    /* test mixin, width-height */
    width: 12px;
    height: 12px;
}
.box div {
    display: block;
}
/* responsive mixin, with default argument 200px */
@media (max-width: 300px) {
    .box {
        display: none;
    }
}
@media (max-width: 200px) {
    .box {
        display: block;
    }
}
```

[travis-url]: http://travis-ci.org/akella/gulp-sass-to-postcss-mixins
[travis-image]: https://secure.travis-ci.org/akella/gulp-sass-to-postcss-mixins.svg?branch=master
[npm-url]: https://npmjs.org/package/gulp-sass-to-postcss-mixins
[npm-image]: https://badge.fury.io/js/gulp-sass-to-postcss-mixins.svg