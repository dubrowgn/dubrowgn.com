function initPreviewEditor(title, body, preview) {
	// create monthID->name map
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	// initialize CodeMirror editor
	var editor = CodeMirror.fromTextArea(body, {
		lineNumbers: true,
		mode: "text/html",
		matchBrackets: true,
		indentWithTabs: true,
		indentUnit: 4,
		lineWrapping: true
	});

	// define preview update logic
	function updatePreview() {
		var now = new Date();
		preview.innerHTML =
			'<h1>' + title.value + '<span class="subhead">(' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear() + ')</span></h1>' +
			editor.getValue();
	};

	// define on input changed logic
	var timeout;
	function onChanged() {
		if (timeout !== undefined)
			clearTimeout(timeout);
		timeout = setTimeout(updatePreview, 250);
	};

	// attach input changed events
	title.addEventListener('input', onChanged);
	editor.on('change', onChanged);

	// force an initial update
	updatePreview();
};
