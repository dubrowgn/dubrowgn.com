// Requires SparkPlug.Base.js

SparkPlug.Graphics = (function() {

// Imports //
this.Abstract = SparkPlug.Abstract;
this.Matrix = SparkPlug.Abstract.Matrix;
this.Point = SparkPlug.Abstract.Point;
this.Rect = SparkPlug.Abstract.Rect;

// -----------------------------------------------------------------------------
//	static functions
// -----------------------------------------------------------------------------

// void RenderImageSprite(HTMLImage, Rect, Matrix, CanvasRenderingContext2D);
this.RenderImageSprite =
	function(_img, _sourceRect, _transformMatrix, _context)
{
	_context.setTransform(
		_transformMatrix.a, _transformMatrix.b, _transformMatrix.c,
		_transformMatrix.d, _transformMatrix.e, _transformMatrix.f);
	_context.drawImage(_img,
		_sourceRect.x, _sourceRect.y, _sourceRect.w, _sourceRect.h,
		0, 0, _sourceRect.w, _sourceRect.h);
} // RenderImageSprite( )

// --------------------------------------

// void RenderImage(HTMLImageElement, CanvasRenderingContext2D);
this.RenderImage = function(_img, _transformMatrix, _context) {
	_context.setTransform(
		_transformMatrix.a, _transformMatrix.b, _transformMatrix.c,
		_transformMatrix.d, _transformMatrix.e, _transformMatrix.f);
	_context.drawImage(_img, 0, 0);
} // RenderImage( )



// =============================================================================
//	INTERFACE:	IGraphicEntity
// =============================================================================

// +Rect GetFrameRect();
// +Image GetModelImage();
// +Matrix GetRenderMatrix();



// =============================================================================
//	CLASS:	Model
// =============================================================================

// Model Model(HTMLImage);
function Model(_img) {
	this.animations = new Array;
	this.image = _img;
} // class Model

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

Model.prototype.animations;
Model.prototype.image;

// -----------------------------------------------------------------------------
//	class functions
// -----------------------------------------------------------------------------



// =============================================================================
//	CLASS:	Animation
// =============================================================================

// Animation Animation(Rect, number, number, Matrix);
function Animation(_firstFrameRect, _numberOfFrames, _frameDuration, _matrix) {
	this.firstFrameRect = _firstFrameRect;
	this.numberOfFrames = _numberOfFrames;
	this.frameDuration = _frameDuration;
	this.matrix = _matrix;
} // class Animation

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

Animation.prototype.firstFrameRect;
Animation.prototype.frameDuration;
Animation.prototype.numberOfFrames;
Animation.prototype.matrix;

// -----------------------------------------------------------------------------
//	class functions
// -----------------------------------------------------------------------------

// Rect GetFrameRect(number);
Animation.prototype.GetFrameRect = function(_timeMs) {
	var frame = ((_timeMs / this.frameDuration) | 0) % this.numberOfFrames;
	return new Rect(
		this.firstFrameRect.x + this.firstFrameRect.w * frame,
		this.firstFrameRect.y,
		this.firstFrameRect.w,
		this.firstFrameRect.h);
} // GetFrameRect( )

// -------------------------------------

// Public Members
return {
	Animation:Animation,
	Model:Model,
	RenderImage:RenderImage,
	RenderImageSprite:RenderImageSprite
}; // public members

})();
