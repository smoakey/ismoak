# ismoak

iSmoak is an attempt to make have a multiselect select box in a dropdown. Currently it depents on Angular 1.x and UI Bootstrap. Named iSmoak because all the developers at NextGear Capital with so frustrated with the comparable library being used.

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

| Param | Description |
| --- | --- |
| items | List of dropdown items |
| options | Options that override defaults |
| disabled | Expression that determines if input is disabled  |
| onBlur | Function that gets called after every selection change |

### Options

| Option | Description | Default |
| --- | --- | --- |
| groupBy | Group items by property | null |
| groupsOpen | Are the groups open | false |
| orderBy | Property items are ordered by | 'name' |
| searchable | Is a search box displayed | true |
| displayProp | Property of each item used for displaying in list | 'name' |
| maxDisplayed | Number of items displayed in input before changing to "X selected" | 3 |
| noneMessage | Text displayed in input when no items are selected | 'None Selected' |
| allMessage | Text displayed in input when all items are selected | 'All Selected' |
| partialMessage | Partial message template. Num selected is passed as ${count} param | '${count} selected' |
| labelBuilder | When the none, all, and parital message strings dont quite meet your requirements. Function that takes selected items as first parameter and all items as second. Must return a string to be used as label. | null |
| selectAllBtnText | Text displayed in select all button | 'Select All' |
| selectNoneBtnText | Text displayed in select none button  | 'Select None' |
| searchNoResultsText | Text displayed when no items are returned with search | 'No items matching your search query.' |
