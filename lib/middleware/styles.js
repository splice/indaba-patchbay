var styles = require('../util/styles')


module.exports = function(opts) {

  var cachedContents
  if (process.env.NODE_ENV === 'production') {
    // cache contents
    styles(opts, function(err, data) {
      if (err) throw err
      cachedContents = data
    })
  }

  return function(req, resp, next) {
    resp.set('Content-Type', 'text/css')
    if (cachedContents) {
      resp.send(cachedContents)
    }
    else {
      styles(opts, function(err, data) {
        if (err) return next(err)
        resp.send(data)
      })
    }
  }

}


/*
module.exports = function(opts) {

  var app = express()
  app.use(express.static(path.join(__dirname,'../public')))

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

*/

