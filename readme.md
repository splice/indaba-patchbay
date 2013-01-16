# Chinstrap

> Reusable styles for Indaba Music projects!

## Features

* Integrates font-awesome
* Can be easily extended with app specific styles
* In dev mode, recompiles less at request time - no more busted CSS when waiting for the watcher / makefile to compile
* In production mode, compiles once on startup and serves a cached version - app will crash if you have an error in your less files!


## Drop it in!

```js
app.use(require('chinstrap')())
```

Now if you request `/chinstrap.css` you should get the compiled CSS




## Extend

If you specify a path, chinstrap will glob the directory for less files and include them in the compiled output:

```js
app.use(require('chinstrap')(__dirname + '/app'))
```

now create a file `app/layout.less` with the contents:

```css

body {
  background: @red;
}
a {
  color: @blue;
}
```

And you will get a supremely ugly site!
