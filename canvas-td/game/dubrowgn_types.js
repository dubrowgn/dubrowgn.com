if (typeof dubrowgn == "undefined")
	document.write("<p><b>Error:</b> dubrowgn_types requires dubrowgn"
		+ ", but it is undefined</p>");

dubrowgn.types = (function() {

// =============================================================================
//	CLASS:	Wave
// =============================================================================

function Wave(_mobType, _count, _spread) {
	this.interval = (_spread * 1000) / _mobType.speed;
	this.mobType = _mobType;
	this.count = _count;
} // class Wave
dubrowgn.Wave = Wave;

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

Wave.prototype.count;
Wave.prototype.interval;
Wave.prototype.mobType;


// =============================================================================
//	CLASS:	ToolTip
// =============================================================================

function Text(_color, _text) {
	this.color = _color;
	this.text = _text;
} // class ToolTip
dubrowgn.Text = Text;

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

Text.prototype.color;
Text.prototype.text;



// =============================================================================
//	CLASS:	Map
// =============================================================================

function Map( _img, _width, _height) {
	this.buildable = new Array;
	this.height = _height;
	this.width = _width;
	this.img = _img;
} // class Map
dubrowgn.Map = Map;

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

Map.prototype.buildable;
Map.prototype.height;
Map.prototype.img;
Map.prototype.width;

// -------------------------------------

// Public Members
return {
	Map:Map,
	Wave:Wave
}; // public members

})();

