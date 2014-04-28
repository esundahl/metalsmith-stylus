
var stylus = require('stylus');
var minimatch = require('minimatch');
var join = require('path').join;

function plugin (opts) {
  var opts = opts || {};
  opts.paths = (opts.paths || []).map(absPath);

  return function (files, metalsmith, done) {
    var destination = metalsmith.destination();
    var source = metalsmith.source();
    var styles = Object.keys(files).filter(minimatch.filter("*.+(styl|stylus)", {matchBase: true}));

    var paths = styles.map(function (path) {
      var ret = path.split('/');
      ret.pop()
      return source + '/' + ret.join('/')
    })

    paths = paths.concat(opts.paths)

    styles.forEach(function (file, index, arr) {
      var out = file.split('.');
      out.pop();
      out = out.join('.') + '.css';
      stylus(files[file].contents.toString())
        .set('filename', file)
        .set('paths', paths)
        .render(function (err, css) {
          if (err) throw err;
          delete files[file];
          files[out] = { contents: new Buffer(css) };
        })
    })
    done();
  }
}

module.exports = plugin;

function absPath(relative) {
  return join(process.cwd(), relative);
}
