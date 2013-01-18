var templates = require('../util/templates')


module.exports = function(opts) {

  var cachedContents
  if (process.env.NODE_ENV === 'production') {
    // cache contents
    templates(opts, function(err, data) {
      if (err) throw err
      cachedContents = data
    })
  }

  return function(req, resp, next) {
    if (cachedContents) {
      resp.locals.patchbayTemplates = cachedContents
      next()
    }
    else {
      templates(opts, function(err, data) {
        resp.locals.patchbayTemplates = data
        next(err)
      })
    }
  }

}
