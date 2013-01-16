var express = require('express')
  , less = require('less')
  , fs = require('fs')
  , path = require('path')
  , glob = require('glob')
  , async = require('async')



module.exports = function(lessDir) {


  // less compiler

  var parser = new(less.Parser)({
    paths: [__dirname + '/less']
  });

  function makeCss(done) {

    // glob lessDir for input less
    // start with @import "chinstrap";
    // concat all globbed less
    var lessSrc = '@import "chinstrap";'

    if (lessDir)
      glob('**/*.less', {cwd: lessDir}, concatFiles)
    else
      jobsDone()

    function concatFiles(err, files) {
      async.forEach(files, concatFile, jobsDone)
    }

    function concatFile(file, done) {
      file = path.join(lessDir, file)
      fs.readFile(file, 'utf8', function(err, contents) {
        lessSrc += contents
        done(err)
      })
    }

    function jobsDone(err) {
      parser.parse(lessSrc, function (err, tree) {
        if (err) return done(err)
        done(null, tree.toCSS())
      });
    }

  }


  // express middleware

  var app = express()
  app.use(express.static(__dirname + '/public'))

  app.configure('development', function() {
    app.get('/chinstrap.css', function(req, resp, next) {
      makeCss(function(err, css) {
        if (err) return next(err)
        resp.set('Content-Type', 'text/css')
        resp.send(css)
      })
    })
  })

  app.configure('production', function() {
    var cached
    makeCss(function(err, css) {
      if (err) throw err
      cached = css
    })
    app.get('/chinstrap.css', function(req, resp) {
      resp.set('Content-Type', 'text/css')
      resp.send(cached)
    })
  })

  return app
}


