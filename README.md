# ismoak

iSmoak is an attempt to make have a multiselect select box in a dropdown. Currently it depents on Angular 1.x and UI Bootstrap

### How to use

First include the JS libraries (if you dont use wiredep)

```
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
<script src="bower_components/lodash/lodash.min.js"></script>
<script src="bower_components/ismoak/ismoak.min.js"></script>
```


And then the css

```
<link rel="stylesheet" href="bower_components/ismoak/ismoak.css" />
```


Then in your module include the module

```
angular.module('yourApp', ['ismoak']);
```

And finally in your html

```
<ismoak-dropdown
  items="{items}"
  options="{options}"
  disabled="{disabled}"
  on-blur="{onBlur}">
</ismoak-dropdown>
```
