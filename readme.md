# Chinstrap

Indaba's baseline styles.

These styles should be general enough to be shared between all Indaba projects.



## Example Usage


```
lessc --include-path="less" examples/basic.less
```



## Usage as a submodule


* Add chinstrap as a submodule
* For font-awesome, ensure chinstrap/public is being served by your app.
* Add `@import "chinstrap";` to the top of your less file
* Add the buildstep to your makefile: `lessc --include-path="./chinstrap/less" input.less output.css`

