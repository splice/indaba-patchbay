var express = require('express')
  , patchbay = require('./')
  , fs = require('fs')

var app = express()
  , appDir = __dirname + '/demo'

app.use(express.static(patchbay.staticDir))

app.get('/app.css', patchbay.middleware.styles({
  dir: appDir
}))

app.get('/', function(req, resp) {
  fs.createReadStream(appDir + '/index.html').pipe(resp)
})

var port = 4444
app.listen(port);
console.log("listening on " + port)
