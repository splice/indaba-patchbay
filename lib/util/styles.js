var less = require('less')
  , fs = require('fs')
  , path = require('path')
  , glob = require('glob')
  , async = require('async')


module.exports = function(opts, callback) {


  var lessSrc = '@import "chinstrap";'

  if (opts.dir)
    glob('**/*.less', {cwd: opts.dir}, concatFiles)
  else
    jobsDone()

  function concatFiles(err, files) {
    async.forEach(files, concatFile, jobsDone)
  }

  function concatFile(file, done) {
    file = path.join(opts.dir, file)
    fs.readFile(file, 'utf8', function(err, contents) {
      lessSrc += contents
      done(err)
    })
  }

  function jobsDone(err) {
    var parser = new(less.Parser)({
      paths: [path.join(__dirname, '../../less')]
    });
    parser.parse(lessSrc, function (err, tree) {
      if (err) return callback(err)
      callback(null, tree.toCSS())
    });
  }


}
