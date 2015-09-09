setTimeout(function () {
	document.querySelector("select").addEventListener("change", function () {
		document.querySelector("byutv-jsonp").setAttribute("params", this.value);
	});
}, 300);