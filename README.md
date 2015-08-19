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

To run

`npm start`

Links

 - [Index](http://localhost:8081/components/sweet-material-table/)
 - [Demo](http://localhost:8081/components/sweet-material-table/demo/)
 - [Test](http://localhost:8081/components/sweet-material-table/test/)

### gh-pages update

`source .aliases && update-gh-pages`
