module.exports = {
    javascripts: require('./lib/javascripts')
  , templates: require('./lib/templates')
  , middleware: {
      chinstrap: require('./lib/middleware.chinstrap')
    }
}
