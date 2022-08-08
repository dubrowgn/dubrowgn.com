
UIFactory = (function() {

// HTMLDivElement CreateButton(string, number, number, number);
function CreateButton(_imgPath, _w, _h, _dx) {
	if (_dx == undefined)
		_dx = 0;
	var imgPath = _imgPath;
	var div = document.createElement("div");
	div.style.background = "url('" + imgPath + "') no-repeat 0px -" + _dx + "px";
	div.style.width = _w + "px";
	div.style.height = _h + "px";
	div.style.margin = "2px";
	div.style.cursor = "pointer";
	div.style.display = "inline-block";
	div.isEnabled = true;
	div.onmouseover = function() {
		if (div.isEnabled == true)
			div.style.background = "url('" + imgPath + "') no-repeat " + (-_w) + "px -" + _dx + "px";
	}
	div.onmouseout = function() {
		if (div.isEnabled == true)
			div.style.background = "url('" + imgPath + "') no-repeat 0px -" + _dx + "px";
	}
	div.onmousedown = function() {
		if (div.isEnabled == true)
			div.style.background = "url('" + imgPath + "') no-repeat " + (-2 * _w) + "px -" + _dx + "px";
	}
	div.onmouseup = function() {
		if (div.isEnabled == true)
			div.style.background = "url('" + imgPath + "') no-repeat " + (-_w) + "px -" + _dx + "px";
	}
	return div;
} // CreateButton( )

// public members
return {
	CreateButton:CreateButton
};

})(); // namespace
