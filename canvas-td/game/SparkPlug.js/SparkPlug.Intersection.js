// Requires SparkPlug.Base.js

SparkPlug.Intersection = (function() {

// Imports //
this.Abstract = SparkPlug.Abstract;
this.Matrix = SparkPlug.Abstract.Matrix;
this.Point = SparkPlug.Abstract.Point;
this.Rect = SparkPlug.Abstract.Rect;

// -----------------------------------------------------------------------------
//	static functions
// -----------------------------------------------------------------------------

// bool CircleIntersectsCircle(Circle, Circle);
this.CircleIntersectsCircle = function(cir1, _cir2) {
	return (_cir2.x - _cir1.x) * (_cir2.x - _cir1.x) +
		(_cir2.y - _cir1.y) * (_cir2.y - _cir1.y) <=
		(_cir1.r + _cir2.r) * (_cir1.r + _cir2.r);
} // CircleIntersectsCircle( )

// --------------------------------------

// bool CircleIntersectsPoint(Circle, Point);
this.CircleIntersectsPoint = function(_cir, _pnt) {
	return (_pnt.x - _cir.x) * (_pnt.x - _cir.x) +
		(_pnt.y - _cir.y) * (_pnt.y - _cir.y) <=
		_cir.r * _cir.r;
} // CircleIntersectsPoint( )

// --------------------------------------

// bool CircleIntersectsRay(Circle, Ray?);
this.CircleIntersectsRay = function(_cir, _ray) {
	throw "CircleIntersectsRay() has not be implemented!";
} // CircleIntersectsRay( )

// --------------------------------------

// bool CircleIntersectsRect(Circle, Rect);
this.CircleIntersectsRect = function(_cir, _rect) {
	// re-orient rect with respect to _cir, thus _cir is the new origin
	var l = _rect.x - _cir.x;
	var t = _rect.y - _cir.y;
	var r = l + _rect.w;
	var b = t + _rect.h;

	if (r < 0) // _rect to left of circle center
		if (t > 0) // _rect to lower left
			return (r * r + t * t) < _cir.r * _cir.r;
		else if (b < 0) // _rect to upper left
			return (r * r + b * b) < _cir.r * _cir.r;
		else // directly left of circle center
			return Math.abs(r) < _cir.r;
	else if (l > 0) // _rect to the right of circle center
		if (t > 0) // _rect to lower right
			return (l * l + t * t) < _cir.r * _cir.r;
		else if (b < 0) // _rect to upper right
			return (l * l + b * b) < _cir.r * _cir.r;
		else // directly right of circle center
			return Math.abs(l) < _cir.r;
	else // _rect intersects with y-axis
		if (t > 0) // directly down from circle center
			return Math.abs(t) < _cir.r;
		else if (b < 0) // directly up from circle center
			return Math.abs(b) < _cir.r;
		else // _rect contains circle center
			return true;
} // CircleIntersectsRect( )

// --------------------------------------

// bool PointIntersectsRect(Point, Rect);
this.PointIntersectsRect = function(_pnt, _rect) {
	return _pnt.x >= _rect.x && _pnt.x <= _rect.x + _rect.w &&
		_pnt.y >= _rect.y && _pnt.y <= _rect.y + _rect.h;
} // PointIntersectsRect( )

// --------------------------------------

// bool RayIntersectsRect(Ray?, Rect);
this.RayIntersectsRect = function(_ray, _rect) {
	throw "RayIntersectsRect() has not be implemented!";
} // RayIntersectsRect( )

// --------------------------------------

// bool RectIntersectsRect(Rect, Rect);
this.RectIntersectsRect = function(_rect1, _rect2) {
	if (_rect1.x < _rect2.x + _rect2.w &&
		_rect1.x + _rect1.w > _rect2.x &&
		_rect1.y + _rect1.h < _rect2.y &&
		_rect1.y > _rect2.y + _rect2.h)
		return true;
	return false;
} // RectIntersectsRect( )

// --------------------------------------

// Public Members
return {
	CircleIntersectsCircle:CircleIntersectsCircle,
	CircleIntersectsPoint:CircleIntersectsPoint,
	CircleIntersectsRay:CircleIntersectsRay,
	CircleIntersectsRect:CircleIntersectsRect,
	PointIntersectsRect:PointIntersectsRect,
	RayIntersectsRect:RayIntersectsRect,
	RectIntersectsRect:RectIntersectsRect
}; // public members

})();
