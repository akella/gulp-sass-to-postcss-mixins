'use strict';

var concatStream = require('concat-stream');
var sassmixins = require('../');
var fs = require('fs');
var should = require('should');
var File = require('vinyl');

describe('gulp-sass-to-postcss-mixins', function() {
  describe('sassmixins()', function() {
    var replacements;

    beforeEach(function () {
      replacements = [
        'cow',
        'chicken',
        'duck',
        'person'
      ];
    });

    describe('buffered input', function () {
      var file, check;

      beforeEach(function () {
        file = new File({
          path: 'test/fixtures/sugar.sass',
          contents: fs.readFileSync('test/fixtures/sugar.sass')
        });

        check = function (stream, done, cb) {
          stream.on('data', function (newFile) {
            cb(newFile);
            done();
          });

          stream.write(file);
          stream.end();
        };
      });

      it('should replace sass mixins on a buffer', function(done) {
        var stream = sassmixins();

        check(stream, done, function (newFile) {
          String(newFile.contents).should.equal(fs.readFileSync('test/expected/sugar.sass', 'utf8'));
        });
      });

      it('should trigger events on a buffer', function(done) {
        var stream = sassmixins();
        stream.on('finish', function() {
          // No assertion required, we should end up here, if we don't the test will time out
          done();
        });

        stream.write(file);
        stream.end();
      });
    });

    describe('streamed input', function () {
      var file, check;

      beforeEach(function () {
        file = new File({
          path: 'test/fixtures/sugar.sass',
          contents: fs.createReadStream('test/fixtures/sugar.sass')
        });

        check = function (stream, done, cb) {
          stream.on('data', function(newFile) {
            newFile.contents.pipe(concatStream({encoding: 'string'}, function(data) {
              cb(data);
              done();
            }));
          });

          stream.write(file);
          stream.end();
        };
      });

      it('should replace string on a stream', function(done) {
        var stream = sassmixins();
        check(stream, done, function (data) {
          data.should.equal(fs.readFileSync('test/expected/sugar.sass', 'utf8'));
        });
      });

    });


  });
});
