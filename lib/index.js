
var stylus = require('stylus');
var minimatch = require('minimatch');


function plugin (opts) {
  var opts = opts || {};
  return function (files, metalsmith, done) {
    var destination = metalsmith.destination();
    var source = metalsmith.source();
    var styles = Object.keys(files).filter(minimatch.filter("*.+(styl|stylus)", {matchBase: true}));
    styles.forEach(function (path, index, arr) {
      var out = path.split('.');
      out.pop();
      out = out.join('.') + '.css';
      stylus(files[path].contents.toString());
        .set('filename', path);
        .set('paths', [source]);
        .render(function (err, css) {
          if (err) throw err;
          delete files[path];
          files[out] = { contents: new Buffer(css) };
        })
    })
    done();
  }
}

module.exports = plugin;
