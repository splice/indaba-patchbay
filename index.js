module.exports = {
  staticDir: __dirname + '/public'
, middleware: {
      scripts: require('./lib/middleware/scripts')
    , templates: require('./lib/middleware/templates')
    , styles: require('./lib/middleware/styles')
    , core: require('./lib/middleware/core')
  }
}
