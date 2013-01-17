var glob = require('glob')
  , path = require('path')
  , fs = require('fs')
  , async = require('async')

module.exports = function(opts, done) {
  if (!opts.dir) throw new Error('opts.dir is required')

  var dir = opts.dir
    , contents = ''


  async.waterfall([findFiles, concatFiles], done)


  function findFiles(done) {
    glob('**/*.html', {cwd: dir}, done)
  }




  function concatFiles(files, done) {
    async.forEach(files, concatFile, function(err) {
      done(err, contents)
    })
  }



  function concatFile(file, done) {
    var id = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.html'))
    file = path.join(dir, file)
    fs.readFile(file, 'utf8', function(err, data) {
      contents += '\n\n\n<script type="text/ng-template" id="' + id + '">' + data + '</script>\n\n\n'
      done(err)
    })
  }
}
