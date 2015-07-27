# sweet-material-table

A material design table implementation. Based on http://www.google.com/design/spec/components/data-tables.html

### Demo

[Demos!](http://pdelanauze.github.io/sweet-material-table/bower_components/sweet-material-table/demo/)

```
<sweet-material-table
        id="table"
        title="Normal demo"
        columns="[[columns]]"
        available-columns="[[availableColumns]]"
        data="[[data]]"
        start="{{start}}"
        per-page="{{perPage}}"
        total="{{total}}" />
```

Look inside the `demo` folder for code examples.

## Important notes

### Data manipulation

When manipulating data of this element , make sure to use Polymer's methods and not native Array / Object types.. For 
example, do 
`tableElement.push('availableColumns', {key: 'c', title: 'Column'});` 
and NOT 
`tableElement.availableColumns.push({key: 'c', title: 'Column'})`

### Schema changes

A change to the schema will force the regeneration of *availableColumns* (columns will stay as is), so if you have your 
own set of columns assigned make sure you reset them after changing the schema.

## Development

To get started , first `npm install && ./node_modules/.bin/bower install`

To test out the app locally , create a symlink to this component inside the bower_components folder.

`cd bower_components && ln -s ../ sweet-material-table && cd ..`

To run

`python -m SimpleHTTPServer && open http://localhost:8000/bower_components/sweet-material-table/test/index.html`

To reach the demo page

`python -m SimpleHTTPServer && open http://localhost:8000/bower_components/sweet-material-table/demo/index.html`

### gh-pages update

`git fetch && git branch -D gh-pages && git rm .gitignore && git checkout -b gh-pages && ./node_modules/.bin/bower install 'git://github.com/pdelanauze/sweet-material-table#master' && git add bower_components && git commit -m "Regenerating gh-pages" && git push origin gh-pages -f`
