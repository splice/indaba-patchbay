.filter('markdown', function() {
  var converter = new Showdown.converter()
  return function(input) {
    if (input) {
      return converter.makeHtml(input)
    }
  }
})
