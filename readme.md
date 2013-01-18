# patchbay

> Reusable project middleware

```js
var patchbay = require('patchbay')
  , appDir = __dirname + '/app'
```




## Styles

* Finds and concatinates all the less files
* All bootstrap variables and mixins are available
* Integrates Font Awesome and serves static font files
* Caches css in production


```js
app.use(express.static(patchbay.staticDir))

app.get('/app.css', patchbay.middleware.styles({
  dir: appDir
}))
```




## Templates

* Finds all the html files
* Wraps html in `<script type="text/ng-template" id="xxx"> </script>` block
* id is set to the filename with `.html` removed
* Removes need to make separate requests to load templates
* Allows you to move templates around without changing `templateUrl` (of course, renaming the file will require editing `templateUrl`)
* Adds the concatinated templates to `resp.locals.patchbayTemplates`
* Caches compiled html in production


```js
app.get('/', patchbay.middleware.templates({dir: appDir}), function(req, resp, next) {
  resp.render('index')
})
```

In your ejs file:

```ejs
<%- patchbayTemplates %>
```






## JS

* Finds and concats all the javascript
* Ensures that `index.js` is the first file in the output by convention
* Caches compiled js in production


```js
app.get('/app.js', patchbay.middleware.scripts({
  dir: appDir
}))
```

---

# Core


## http

* Add this to your layout:

```html
<script src="/core/dorian-http.js"></script>
```
* Include `dorian-http` as a dependency in your angular module:

```js
angular.module('facebook', ['dorian-http'])
```

* Use it in your controllers!

```js
.controller('facebook', function($scope, http) {
  http.get('/opportunities').then(function(opps) {
    $scope.opps = opps
  })
})
```




## player

* Add this to your layout:

```html
  <script src="/core/dorian-http.js"></script>
  <script src="/core/dorian-player.js"></script>
  <script src="/vendor/sm2/soundmanager2.js"></script>
  <script>
    soundManager.setup({
      url: '/vendor/sm2'
    })
  </script>
```

* include `dorian-player` as a dependency:

```js
angular.module('facebook', ['dorian-player'])
```

* Use it in your controllers!

```js
.controller('listen-party', function($scope, player) {
  $scope.play = function(audio) {
    player.play(audio)
  }
})
```
