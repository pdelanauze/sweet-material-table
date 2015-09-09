byutv-jsonp
============

See [Docs](http://coderfin.github.io/byutv-jsonp/components/byutv-jsonp/) for more information.

## About

The `byutv-jsonp` element (`<byutv-jsonp>`) exposes network request functionality.
It is a Polymer v1.0+ element that facilitates making JSONP requests.
It uses Polymer behaviors (`Byutv.behaviors.Jsonp`).
It is patterned after Polymer's `iron-ajax` element (`<iron-ajax>`).
It has been tested using [unit tests](#user-content-tests).
It is part of the BYUtv Elements group of elements.

## Installation

It is recommended that you use bower to install this Polymer based web component.

`bower install --save byutv-jsonp`

## Dependencies

Polymer v1.0+ (installed when you run `bower install --save byutv-jsonp`)

## Usage

1) Add an import to your page or another web component.  Typically this import will be added to your page's `<head>` or the top of another web component.

```html
<link rel="import" href="bower_components/byutv-jsonp/byutv-jsonp.html" />
```

2) Add the `<byutv-jsonp>` with attributes to your page or another web component to easily make JSONP requests.

```html
<byutv-jsonp
		auto
		url="http://jsonplaceholder.typicode.com/posts"
		params='{"userId":"1"}'
		on-response="handleResponse"
		debounce-duration="300"></byutv-jsonp>
```

## Documentation

See [Docs](http://coderfin.github.io/byutv-jsonp/components/byutv-jsonp/).

## Demo

See [Demo](http://coderfin.github.io/byutv-jsonp/components/byutv-jsonp/demo/).

## Tests

1) To run the tests you will need to download the `web-component-tester` project.

`bower install --save web-component-tester`

2) Browse to `/bower_components/byutv-jsonp/test/`

## License

Copyright (c) 2015 [BYU Broadcasting](http://www.byub.org/). All rights reserved.
This code is licensed under the MIT style license found as part of this project.
The BYUtv Logo is trademark and copyright (c) [BYU Broadcasting](http://www.byub.org/).

## Changelog
v1.2.0
- Created the `Byutv`, `Byutv.elements`, and `Byutv.behaviors` namespaces
  - All Byutv Elements group of elements' factory/constructor methods and behaviors can be found under these namespaces.
- Removed the factory/constructor `ByutvJsonp` in favor of the namespaced versions (`Byutv.Jsonp` or `Byutv.elements.Jsonp`)
- Created a Polymer *behavior* (`Byutv.behaviors.Jsonp`)

v1.1.0
- Updated to Polymer v1.0
- Added the `activeRequests` property
- Renamed the `callbackparam` property to `callbackKey`
- Renamed the `callbackname` property to `callbackValue`
- Added the `debounceDuration` property
- Added the `lastAborted` property
- Added the `lastError` property
  - This replaces the `error` property from earlier versions
- Added the `lastLoad` property
- Added the `lastRequest` property
- Added the `lastResponse` property
  - This replaces the `response` property from earlier versions 
- Added the `sync` property
- Added the `verbose` property
- Renamed the `abort` method to `abortRequest`
- Added a factory/constructor method called `ByutvJsonp`
- Renamed the `go` method to `generateRequest`
- Added the `sent` event

v1.0.1
- Updated README and documentation
- Set `loading` to `false` before `complete` is run
- Removed the element name from the script

v1.0.0
- Initial Release