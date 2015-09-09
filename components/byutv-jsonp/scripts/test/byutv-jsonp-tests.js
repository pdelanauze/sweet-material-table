suite("<byutv-jsonp>/Byutv.behaviors.Jsonp", function () {
	var url = "http://jsonplaceholder.typicode.com/posts";

	test("The factory/constructor `Byutv.Jsonp` exists.", function () {
		assert.isDefined(Byutv.Jsonp);
	});

	test("The factory/constructor `Byutv.elements.Jsonp` exists.", function () {
		assert.isDefined(Byutv.elements.Jsonp);
	});

	test("New instances of `<byutv-jsonp>` can be created using the factory/constructor Byutv.Jsonp.", function () {
		assert.instanceOf(new Byutv.Jsonp(), Byutv.Jsonp);
	});

	test("New instances of `<byutv-jsonp>` can be created using the factory/constructor Byutv.elements.Jsonp.", function () {
		assert.instanceOf(new Byutv.elements.Jsonp(), Byutv.elements.Jsonp);
	});

	test("New instances of `<byutv-jsonp>` can be created by declaration.", function () {
		assert.instanceOf(document.querySelector("#declaration"), Byutv.Jsonp);
	});

	test("The behavior `Byutv.behaviors.Jsonp` exists.", function () {
		assert.isDefined(Byutv.behaviors.Jsonp);
	});

	test("The `activeRequests` property array has no length if no requests have been sent.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		assert.lengthOf(jsonp.activeRequests, 0);
	});

	test("The `activeRequests` property array has a length when requests have been sent.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.generateRequest();
		jsonp.setAttribute("auto", "");
		jsonp.addEventListener("sent", function () {
			assert.lengthOf(jsonp.activeRequests, 2);

			done();
		});
	});

	test("The `activeRequests` property array contains Request objects.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.addEventListener("sent", function () {
			assert.isObject(jsonp.activeRequests[0]);

			done();
		});
	});

	test("The `auto` property can be set.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("auto", "");

		assert.isBoolean(jsonp.auto);
		assert.isTrue(jsonp.auto);
		assert.isTrue(jsonp.hasAttribute("auto"));
	});

	test("The `auto` property automatically sends requests when `true`.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("url", url);
		jsonp.addEventListener("sent", function () {
			done();
		});
	});

	test("The `auto` property does not automatically sends requests when `false`.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);

		var hasSent = false;
		jsonp.addEventListener("sent", function () {
			hasSent = true;
		});


		setTimeout(function () {
			assert.isFalse(hasSent);

			done();
		}, 1000);
	});

	test("The `cache` property can be set.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("cache", "");

		assert.isBoolean(jsonp.cache);
		assert.isTrue(jsonp.cache);
		assert.isTrue(jsonp.hasAttribute("cache"));
	});

	test("The `cache` property throws an error if `callbackValue` is not set.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("cache", "");
		jsonp.setAttribute("url", url);

		assert.throws(function () {
			jsonp.generateRequest();
		}, Error, "`callback-value` must be declared or `callbackValue` set when `cache` is true.");
	});

	test("The `_={guid}` query string parameter is not added when the `cache` property is set.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("cache", "");
		jsonp.setAttribute("callback-value", "custom_callback_value");
		jsonp.addEventListener("sent", function (event) {
			assert.notMatch(event.detail.options.url, /[?&]{1}_=[0-9a-f]{32}/);
			done();
		});
	});

	test("The `callbackValue` property can be set.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("callback-value", "custom_callback_value");

		assert.isString(jsonp.callbackValue);
		assert.propertyVal(jsonp, "callbackValue", "custom_callback_value");
		assert.isTrue(jsonp.hasAttribute("callback-value"));
	});

	test("The `callbackValue` property replaces the dynamic `callbackValue` in the query string parameter.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("cache", "");
		jsonp.setAttribute("callback-value", "custom_callback_value");
		jsonp.addEventListener("sent", function (event) {
			assert.match(event.detail.options.url, /[?&]{1}callback=custom_callback_value/);
			done();
		});
	});

	test("The `callbackKey` property can be set.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("callback-key", "jsonp");

		assert.isString(jsonp.callbackKey);
		assert.propertyVal(jsonp, "callbackKey", "jsonp");
		assert.isTrue(jsonp.hasAttribute("callback-key"));
	});

	test("The `callbackKey` property replaces the `callback` string key in the query string parameter.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("callback-key", "jsonp");
		jsonp.addEventListener("sent", function (event) {
			assert.match(event.detail.options.url, /[?&]{1}jsonp=byutv_jsonp_callback_[0-9a-f]{32}/);
			assert.notMatch(event.detail.options.url, /[?&]{1}callback=byutv_jsonp_callback_[0-9a-f]{32}/);
			done();
		});
	});

	test("The `debounceDuration` property can be set.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("debounce-duration", "300");

		assert.isNumber(jsonp.debounceDuration);
		assert.propertyVal(jsonp, "debounceDuration", 300);
		assert.isTrue(jsonp.hasAttribute("debounce-duration"));
	});

	test("The `debounceDuration` prevents multiple requests from being sent when non-readOnly attributes change quickly in succession.", function (done) {
		var timesSent = 0;

		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("params", '{"userId":"1"}');

		setTimeout(function () {
			jsonp.setAttribute("params", '{"userId":"2"}');
		}, 300);

		setTimeout(function () {
			jsonp.setAttribute("params", '{"userId":"3"}');
		}, 600);

		setTimeout(function () {
			jsonp.setAttribute("params", '{"userId":"4"}');
		}, 900);

		jsonp.setAttribute("debounce-duration", "1000");

		jsonp.addEventListener("sent", function (event) {
			timesSent++;
		});

		setTimeout(function () {
			assert.strictEqual(timesSent, 1);

			done();
		}, 2000);
	});

	test("The `debounceDuration` allows multiple requests from being sent when non-readOnly attributes change quickly in succession if not set.", function (done) {
		var timesSent = 0;

		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("params", '{"userId":"1"}');

		setTimeout(function () {
			jsonp.setAttribute("params", '{"userId":"2"}');
		}, 300);

		setTimeout(function () {
			jsonp.setAttribute("params", '{"userId":"3"}');
		}, 600);

		setTimeout(function () {
			jsonp.setAttribute("params", '{"userId":"4"}');
		}, 900);

		jsonp.addEventListener("sent", function (event) {
			timesSent++;
		});

		setTimeout(function () {
			assert.strictEqual(timesSent, 4);

			done();
		}, 1000);
	});

	test("The `lastAborted` property does not exist when `abortRequest` is not called.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.generateRequest();
		assert.isFalse(jsonp.lastAborted);
	});

	test("The `lastAborted` property exists when `abortRequest` is called.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		var request = jsonp.generateRequest();
		jsonp.abortRequest();
		assert.isTrue(jsonp.lastAborted);
		assert.isTrue(jsonp.hasAttribute("last-aborted"));
	});

	test("The `lastAborted` property does not exist when aborting only the first of multiple requests.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("params", '{"userId":"1"}');
		var request = jsonp.generateRequest();
		jsonp.setAttribute("params", '{"userId":"2"}');
		jsonp.generateRequest();
		jsonp.abortRequest(request);
		assert.isFalse(jsonp.lastAborted);
	});

	test("The `lastAborted` property exists when aborting only the last of multiple requests.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("params", '{"userId":"1"}');
		jsonp.generateRequest();
		jsonp.setAttribute("params", '{"userId":"2"}');
		jsonp.generateRequest();
		jsonp.abortRequest();
		assert.isTrue(jsonp.lastAborted);
		assert.isTrue(jsonp.hasAttribute("last-aborted"));
	});

	test("The `lastError` property is undefined when no request is sent.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.addEventListener("sent", function () {
			assert.fail();
			done();
		});

		setTimeout(function () {
			assert.isUndefined(jsonp.lastError);

			done();
		}, 1000);
	});

	test("The `lastError` property is undefined when no error resulted from a request.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.addEventListener("complete", function () {
			assert.isUndefined(jsonp.lastError);

			done();
		});
	});

	test("The `lastError` property is an error event when an error resulted from a request.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("params", " ");
		jsonp.addEventListener("error", function () {
			assert.deepPropertyVal(jsonp, "lastError.type", "error");

			done();
		});
	});

	test("The `lastLoad` property is undefined when no request is sent.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.addEventListener("sent", function () {
			assert.fail();
			done();
		});

		setTimeout(function () {
			assert.isUndefined(jsonp.lastLoad);

			done();
		}, 1000);
	});

	test("The `lastLoad` property is an event that resulted from the most recent request.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.addEventListener("load", function () {
			assert.deepPropertyVal(jsonp, "lastLoad.type", "load");

			done();
		});
	});

	test("The `lastRequest` property is undefined when no request is sent.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.addEventListener("sent", function () {
			assert.fail();
			done();
		});

		setTimeout(function () {
			assert.isUndefined(jsonp.lastRequest);

			done();
		}, 1000);
	});

	test("The `lastRequest` property is a Request object that resulted from the most recent request.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.addEventListener("sent", function () {
			assert.isObject(jsonp.lastRequest);

			done();
		});
	});

	test("The `lastResponse` property is undefined when no request is sent.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.addEventListener("sent", function () {
			assert.fail();
			done();
		});

		setTimeout(function () {
			assert.isUndefined(jsonp.lastResponse);

			done();
		}, 1000);
	});

	test("The `lastResponse` property is undefined when no success response resulted from a request.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("params", " ");
		jsonp.addEventListener("complete", function () {
			assert.isUndefined(jsonp.lastResponse);

			done();
		});
	});

	test("The `lastResponse` property is a JSON array when a success response resulted from a request.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.addEventListener("complete", function () {
			assert.isArray(jsonp.lastResponse);

			done();
		});
	});

	test("The `loading` property does not exist when no requests are made.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);

		assert.isFalse(jsonp.loading);
	});

	test("The `loading` property exists when a request is loading.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("url", url);
		jsonp.addEventListener("sent", function () {
			assert.isTrue(jsonp.loading);
			assert.isTrue(jsonp.hasAttribute("loading"));

			done();
		});
	});

	test("The `loading` property does not exist when a request is done loading.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("url", url);
		jsonp.addEventListener("complete", function () {
			assert.isFalse(jsonp.loading);

			done();
		});
	});

	test("The `loading` attribute exists when the first request is aborted but another request is loading.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		var request = jsonp.generateRequest();
		jsonp.setAttribute("auto", "");
		jsonp.abortRequest(request);
		jsonp.addEventListener("sent", function () {
			assert.isTrue(jsonp.loading);
			assert.isTrue(jsonp.hasAttribute("loading"));

			done();
		});
	});

	test("The `params` property can be set.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("params", '{"userId":"1"}');

		assert.isObject(jsonp.params);
		assert.deepPropertyVal(jsonp, "params.userId", "1");
		assert.isTrue(jsonp.hasAttribute("params"));
	});

	test("The `params` property is used to retrieve the correct data.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("params", '{"userId":"1"}');
		jsonp.addEventListener("complete", function () {
			assert.deepPropertyVal(jsonp, "lastResponse.length", 10);

			done();
		});
	});

	test("The `sync` property can be set.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("sync", "");

		assert.isBoolean(jsonp.sync);
		assert.isTrue(jsonp.sync);
		assert.isTrue(jsonp.hasAttribute("sync"));
	});

	test("The `sync` property forces a request to be synchronous.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("sync", "");
		jsonp.addEventListener("sent", function () {
			assert.deepPropertyVal(jsonp, "lastRequest.script.async", false);

			done();
		});
	});

	test("The `url` property can be set.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);

		assert.isString(jsonp.url);
		assert.strictEqual(jsonp.url, url);
		assert.isTrue(jsonp.hasAttribute("url"));
	});

	test("The `url` attribute throws an error if it is not set.", function () {
		var jsonp = new Byutv.Jsonp();

		assert.throws(function () {
			jsonp.generateRequest();
		}, Error, "`url` must be declared or set in order to perform a request.");
	});

	test("The `verbose` property can be set.", function () {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("verbose", "");

		assert.isBoolean(jsonp.verbose);
		assert.isTrue(jsonp.verbose);
		assert.isTrue(jsonp.hasAttribute("verbose"));
	});

	test("`abortRequest` removes the request which prevents it from completing.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		var request = jsonp.generateRequest();
		jsonp.addEventListener("complete", function () {
			assert.fail();
			done();
		});
		jsonp.abortRequest(request);

		setTimeout(function () {
			assert.isUndefined(jsonp.lastResponse);

			done();
		}, 2000);
	});

	test("The factory/constructor method (jsonp) properly sets properties.", function () {
		var jsonp = new Byutv.Jsonp({
			url: url
		});
		assert.instanceOf(jsonp, Byutv.Jsonp);
		assert.strictEqual(jsonp.url, url);
	});

	test("`generateRequest` sends a request and returns that request.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.addEventListener("sent", function (event) {
			assert.isObject(event.detail);
			done();
		});
		jsonp.generateRequest();
	});

	test("The `complete` event fires.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.addEventListener("complete", function (event) {
			assert.deepProperty(event, "detail.script");
			done();
		});
	});

	test("The `error` event fires.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.setAttribute("params", " ");
		jsonp.addEventListener("error", function (event) {
			assert.deepPropertyVal(event, "detail.type", "error");
			done();
		});
	});

	test("The `load` event fires.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.addEventListener("load", function (event) {
			assert.deepPropertyVal(event, "detail.type", "load");
			done();
		});
	});

	test("The `response` event fires.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.addEventListener("response", function (event) {
			assert.lengthOf(event.detail, 100);
			done();
		});
	});

	test("The `sent` event fires.", function (done) {
		var jsonp = new Byutv.Jsonp();
		jsonp.setAttribute("url", url);
		jsonp.setAttribute("auto", "");
		jsonp.addEventListener("sent", function (event) {
			assert.deepProperty(event, "detail.script");
			done();
		});
	});
});