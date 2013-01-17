var glob = require('glob')
  , path = require('path')
  , fs = require('fs')
  , async = require('async')

var cachedContents

module.exports = function(opts, callback) {
  if (!opts.dir) throw new Error('opts.dir is required')

  var dir = opts.dir
    , contents = ''


  if (process.env.NODE_ENV === 'production' && cachedContents) {
    return callback(null, cachedContents)
  }



  async.waterfall([findFiles, handleIndex, concatFiles], jobsDone)


  function findFiles(done) {
    glob('**/*.js', {cwd: dir}, done)
  }



  function handleIndex(files, done) {
    var indexIndex = files.indexOf('index.js')
    if (indexIndex > -1) {
      files.splice(indexIndex, 1)
      concatFile('index.js', function(err) {
        done(err, files)
      })
    }
    else {
      done(null, files)
    }
  }



  function concatFiles(files, done) {
    async.forEach(files, concatFile, function(err) {
      done(err, contents)
    })
  }

  function jobsDone(err) {
    cachedContents = contents
    callback(err, contents)
  }



  function concatFile(file, done) {
    file = path.join(dir, file)
    fs.readFile(file, 'utf8', function(err, data) {
      contents += data
      done(err)
    })
  }
}
