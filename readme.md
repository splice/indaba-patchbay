# patchbay

> Replaces make: builds javascripts, templates, styles

```js
var patchbay = require('patchbay')
  , appDir = __dirname + '/app'
```




## Chinstrap Middleware

* Integrates font-awesome
* Can be easily extended with app specific styles
* Caches compiled less in production


```js
app.use(patchbay.middleware.chinstrap({
  dir: appDir
}))
```




## Templates

* Wraps html in `<script type="text/ng-template" id="xxx"> </script>` block
* id is set to the filename with `.html` removed
* Removes need to make separate requests to load templates
* Allows you to move templates around without changing `templateUrl` (of course, renaming the file will require editing `templateUrl`)
* Caches compiled html in production


```js
app.get('/', function(req, resp, next) {
  patchbay.templates({
    dir: __dirname + '/app'
  }, onHtml)
  function onHtml(err, html) {
    if (err) return next(err)
    resp.render('index', {templates: html})
  }
})
```






## JS

* Finds and concats all the javascript
* Ensures that `index.js` is the first file in the output by convention
* Caches compiled js in production


```js
app.get('/app.js', function(req, resp) {
  patchbay.javascripts({
    dir: __dirname + '/app'
  }, onJs)
  function onJs(err, js) {
    if (err) throw err
    resp.set('Content-Type', 'application/javascript')
    resp.send(js)
  }
})
```


