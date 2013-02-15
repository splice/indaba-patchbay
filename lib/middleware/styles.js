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


