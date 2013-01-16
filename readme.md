# Chinstrap

Indaba's baseline styles.

These styles should be general enough to be shared between all Indaba projects.



## Example Usage

* Add `@import "chinstrap";` to the top of your less file

* Implicate `chinstrap/less` in the lessc include-path

```
lessc --include-path="less" examples/basic.less
```



## Integration tutorial


* Add chinstrap as a submodule

```
git submodule add git@github.com:indabamusic/chinstrap.git chinstrap
```


* For font-awesome, ensure chinstrap/public is being served by your app.

```js
app.use(express.static(path.join(__dirname, 'chinstrap/public')));
```


* Install lessc

```
npm install less --save-dev
```


* Add the following to the makefile

```
LESSC=./node_modules/.bin/lessc
OUT=./public/compiled
CHINSTRAP=./chinstrap/less
STYLE_FILES=$(shell find app -name "*.less" -type f)
STYLE_TMP=${OUT}/build.less
STYLE_OUT=${OUT}/build.css

${STYLE_OUT}: $(STYLE_FILES)
	rm -f ${STYLE_OUT} ${STYLE_TMP}
	cat ${CHINSTRAP}/chinstrap.less >> ${STYLE_TMP}
	cat ${STYLE_FILES} >> ${STYLE_TMP}
	${LESSC} ${STYLE_TMP} ${STYLE_OUT} --include-path="${CHINSTRAP}" --line-numbers="comments"
```

* Make sure you have at least one less file in your app dir
* Be sure to add `${STYLE_OUT}` to your default make target
* Run `make` and ensure `public/compiled` contains `build.less` and `build.css`
* Add `<link rel='stylesheet' href='/compiled/build.css' />` to your HTML template

