var scripts = require('../util/scripts')

module.exports = function() {

  var opts = {
    dir: __dirname + '/../../core'
  }

  var cachedContents
  if (process.env.NODE_ENV === 'production') {
    // cache contents
    scripts(opts, function(err, data) {
      if (err) throw err
      cachedContents = data
    })
  }

  return function(req, resp, next) {
    resp.set('Content-Type', 'application/javascript')
    if (cachedContents) {
      resp.send(cachedContents)
    }
    else {
      scripts(opts, function(err, data) {
        if (err) return next(err)
        resp.send(data)
      })
    }
  }

}
