# Patchbay



```js

var patchbay = require('patchbay')
  , appDir = __dirname + '/app'


// patchbay.javascript will conatinate all the javascript in the app dir

app.get('/my-app-javascript.js', patchbay.javascript({
  dir: appDir,
  before: 'angular("my-app")'
})



app.get('/my-app-style.css', patchbay.bootstrap({
  dir: appDir
})



app.get('/', function(req, resp) {

  patchbay.compile.html({
    dir: appDir,
    inlineNgTemplates: true
  })

})

```
