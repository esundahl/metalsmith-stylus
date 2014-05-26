
var stylus = require('stylus');
var minimatch = require('minimatch');
var join = require('path').join;
var glob = require('glob');
var fs = require('fs');

function plugin (opts) {
  var opts = opts || {};
  opts.paths = (opts.paths || []).map(absPath);

  return function (files, metalsmith, done) {
    var destination = metalsmith.destination();
    var source;

    // read source from content folder (default)
    if (!opts.src) {
      source = metalsmith.source();
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

    // read source from custom folder
    } else {
      source = absPath(opts.src);
      // retrieve all stylus files at location
      glob("**/*.+(styl|stylus)", { cwd: source }, function(err, stylusFiles) {

        // make paths absolute
        var paths = stylusFiles.map(function(file) {
          return join(source, file);
        });

        // add additional paths
        paths = paths.concat(opts.paths)

        // loop and process
        paths.forEach(function (path, index, arr) {
          var file = require('path').relative(source, path);

          // replace .styl extension by .css
          var out = file.split('.');
          out.pop();
          out = out.join('.') + '.css';

          // render
          stylus(fs.readFileSync(path).toString('utf8'))
            .set('filename', file)
            .set('paths', paths)
            .render(function (err, css) {
              if (err) throw err;
              files[out] = { contents: new Buffer(css) };
            })
        })
        done();
      });
    }
  }
}

module.exports = plugin;

function absPath(relative) {
  return join(process.cwd(), relative);
}
