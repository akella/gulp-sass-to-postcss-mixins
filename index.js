'use strict';

var Transform = require('readable-stream/transform');
var rs = require('replacestream');
var istextorbinary = require('istextorbinary');

module.exports = function(options) {
// module.exports = function(search, replacement, options) {
  return new Transform({
    objectMode: true,
    transform: function(file, enc, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }

      // finding valid sass syntax mixins, check testcase here http://regexr.com/3e1hf
      var sassregexp = new RegExp(/(^([ \t]|)+)[+][\w.\-\_]*($|[ \t]+|[(]([^)]|)+[)]([ \t]+|))$/gm);

      // fixing each of them
      function fixFoundMixins(match){
        return match.replace(/[()]/g,' ').replace(/(^([ \t]|)+)[+]/g,'$1@mixin ');
      }

      function doReplace() {
        if (file.isStream()) {
          file.contents = file.contents.pipe(rs(sassregexp, fixFoundMixins));
          return callback(null, file);
        }

        if (file.isBuffer()) {
            file.contents = new Buffer(String(file.contents).replace(sassregexp, fixFoundMixins));
          return callback(null, file);
        }

        callback(null, file);
      }

      doReplace();
    }
  });
};