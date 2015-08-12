# sweet-material-table

A material design table implementation. Based on http://www.google.com/design/spec/components/data-tables.html

### Demo

[YQL demo](http://pdelanauze.github.io/sweet-material-table/bower_components/sweet-material-table/demo/)

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

Look inside the `demo` folder for code examples. (Be warned, this is still a work in progress)

## Development

To get started , first `npm install && ./node_modules/.bin/bower install`

To test out the app locally , create a symlink to this component inside the bower_components folder.

`cd bower_components && ln -s ../ sweet-material-table && cd ..`

To run

`python -m SimpleHTTPServer`

To reach the demo page

`open http://localhost:8000/bower_components/sweet-material-table/demo/index.html`

To reach the test suite

`open http://localhost:8000/bower_components/sweet-material-table/test/index.html`

### gh-pages update

`source .aliases && update-gh-pages`
