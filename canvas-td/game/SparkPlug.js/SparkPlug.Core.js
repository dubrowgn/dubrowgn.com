// Requires SparkPlug.Base.js
// Requires SparkPlug.Graphics.js
// Requires SparkPlug.Audio.js

SparkPlug.Core = (function() {

// Imports //
this.Abstract = SparkPlug.Abstract;
this.Circle = SparkPlug.Abstract.Circle;
this.Matrix2D = SparkPlug.Abstract.Matrix2D;
this.Vector2D = SparkPlug.Abstract.Vector2D;
this.Rect = SparkPlug.Abstract.Rect;
this.Graphics = SparkPlug.Graphics;
this.Animation = SparkPlug.Graphics.Animation;

// -----------------------------------------------------------------------------
//	static members
// -----------------------------------------------------------------------------
this.cammeraBuffer = 0;

// -----------------------------------------------------------------------------
//	static functions
// -----------------------------------------------------------------------------

// void ClearCamera(Camera);
this.ClearCamera = function(_camera) {
	var canvas = _camera.GetCanvas();
	var context = _camera.GetContext();

	context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.restore();
} // ClearCamera( )

// --------------------------------------

// void DrawLine(Vector2D, Vector2D, number, string, Camera);
this.DrawLine = function(_from, _to, _width, _color, _camera) {
	var context = _camera.GetContext();
	var m = _camera.GetMatrix();

	context.save();
	context.setTransform(m.a, m.b, m.c, m.d, m.e, m.f);
	context.strokeStyle = _color;
	context.lineWidth = _width;
	context.beginPath();  
	context.moveTo(_from.x, _from.y);  
	context.lineTo(_to.x, _to.y);
	context.stroke();
	context.restore();
} // DrawLine( )

// --------------------------------------

// void RenderEntity(Entity, Camera);
this.RenderEntity = function(_ent, _camera) {
	var context = _camera.GetContext();
	var rect = _ent.GetFrameRect(new Date() | 0);
	var matrix = _ent.GetRenderMatrix();

	context.save();
	if (rect != undefined && matrix != undefined)
		Graphics.RenderImageSprite(
			_ent.GetModelImage(),
			rect,
			matrix.combine(_camera.GetMatrix()),
			context);
	context.restore();
} // RenderEntity( )

// --------------------------------------

// void RenderEntity(Entity, Camera);
this.RenderEntity = function(_ent, _camera) {
	var context = _camera.GetContext();
	var rect = _ent.GetFrameRect(new Date() | 0);
	var matrix = _ent.GetRenderMatrix();

	context.save();
	if (rect != undefined && matrix != undefined)
		Graphics.RenderImageSprite(
			_ent.GetModelImage(),
			rect,
			matrix.combine(_camera.GetMatrix()),
			context);
	context.restore();
} // RenderEntity( )

// --------------------------------------

// void RenderImage(HTMLImageElement, Matrix2D, Camera);
this.RenderImage = function(_img, _transformMatrix, _camera) {
	var context = _camera.GetContext();
	context.save();
	Graphics.RenderImage(
		_img,
		_transformMatrix.combine(_camera.GetMatrix()),
		context);
	context.restore();
} // RenderImage( )

// --------------------------------------

// void RenderImageSprite(HTMLImageElement, Rect, Matrix2D, Camera)
this.RenderImageSprite = function(_img, _sourceRect, _transformMatrix, _camera)
{
	var context = _camera.GetContext();
	context.save();
	Graphics.RenderImageSprite(
		_img,
		_sourceRect,
		_transformMatrix.combine(_camera.GetMatrix()),
		context);
	context.restore();
} // RenderImageSprite( )

// --------------------------------------

// void RenderSceneGraph(SceneGraph, Camera);
this.RenderSceneGraph = function(_sceneGraph, _camera) {
	var ents = _sceneGraph.EntitiesIntersectingRect(
		_camera.GetViewport(this.cammeraBuffer));
	var timeMs = new Date() | 0;
	var context = _camera.GetContext();
	var camMatrix = _camera.GetMatrix();
	
	var rect;
	var matrix;

	context.save();
	var lng = ents.length;
	for(var i = 0; i < lng; i++) {
		rect = ents[i].GetFrameRect(timeMs);
		matrix = ents[i].GetRenderMatrix();

		if (rect != undefined && matrix != undefined)
			Graphics.RenderImageSprite(
				ents[i].GetModelImage(),
				rect,
				matrix.combine(camMatrix),
				context);
	} // for( i )
	context.restore();
} // RenderSceneGraph( )



// =============================================================================
//	INTERFACE:	ISceneGraph
// =============================================================================

// +void AddEntity(Entity);
// +Array<Entity> EntitiesInRect(Rect, number = 0);
// +Array<Entity> EntitiesInCircle(Circle, number = 0);
// +Array<Entity> EntitiesInNaaRect(NaaRect?, number = 0);
// +Array<Entity> EntitiesIntersectingRect(Rect, number = 0);
// +Array<Entity> EntitiesIntersectingCircle(Circle, number = 0);
// +Array<Entity> EntitiesIntersectingRay(Ray?, number = 0);
// +Array<Entity> EntitiesIntersectingNaaRect(NaaRect?, number = 0);
// +void RemoveEntity(Entity);



// =============================================================================
//	CLASS:	Camera
// =============================================================================

function Camera(_x, _y, _desiredWidth, _desiredHeight, _canvas) {
	this.m_x = _x;
	this.m_y = _y;
	this.m_desiredWidth = _desiredWidth;
	this.m_desiredHeight = _desiredHeight;
	this.m_canvas = _canvas;
	this.m_context = _canvas.getContext("2d");

	// setup window resize event handler
	// will probably need to adjusted for multiple cameras...
	var thisCamera = this;
	this.m_resizeHandler = function() { thisCamera.M_UpdateCanvasValues(); };
	window.addEventListener('resize', this.m_resizeHandler, false);

	// init the canvas related values for the camera
	this.M_UpdateCanvasValues();
} // class Camera

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

Camera.prototype.m_x;
Camera.prototype.m_y;
Camera.prototype.m_width;
Camera.prototype.m_height;
Camera.prototype.m_canvas;
Camera.prototype.m_context;
Camera.prototype.m_scalar;
Camera.prototype.m_desiredWidth;
Camera.prototype.m_desiredHeight;
Camera.prototype.m_resizeHandler;

// -----------------------------------------------------------------------------
//	class functions
// -----------------------------------------------------------------------------

// void Destroy();
Camera.prototype.Destroy = function() {
	window.removeEventListener("resize", this.m_resizeHandler, false);
} // Destroy( )

// -------------------------------------

// HTMLCanvas GetCanvas();
Camera.prototype.GetCanvas = function() {
	return this.m_canvas;
} // GetCanvas( )

// -------------------------------------

// CanvasRenderingContext2D GetContext();
Camera.prototype.GetContext = function() {
	return this.m_context;
} // GetContext( )

// -------------------------------------

// Matrix2D GetMatrix();
Camera.prototype.GetMatrix = function() {
	var m = new Matrix2D();
	m.preTranslate(-this.m_x + this.m_width / 2, -this.m_y + this.m_height / 2);
	m.scale(this.m_scalar);
	return m;
} // GetMatrix( )

// -------------------------------------

// Vector2D GetPosition();
Camera.prototype.GetPosition = function() {
	return new Vector2D(this.m_x, this.m_y);
} // GetPosition( )

// -------------------------------------

// Rect GetViewport(number = 0);
Camera.prototype.GetViewport = function(_buffer) {
	if (_buffer == undefined)
		_buffer = 0;
		
	return new Rect(
		this.m_x - this.m_width / 2 - _buffer,
		this.m_y - this.m_height / 2 - _buffer,
		this.m_width + _buffer * 2,
		this.m_height + _buffer * 2);
} // GetViewport( )

// -------------------------------------

// Vector2D ConvertScreenToWorld(Vector2D);
Camera.prototype.ConvertScreenToWorld = function(_pnt) {
	return new Vector2D(
		this.m_x - (this.m_canvas.width / this.m_scalar / 2) + (_pnt.x / this.m_scalar),
		this.m_y - (this.m_canvas.height / this.m_scalar / 2) + (_pnt.y / this.m_scalar));
} // ConvertScreenToWorld( )

// -------------------------------------

// void M_UpdateCanvasValues();
Camera.prototype.M_UpdateCanvasValues = function() {
	this.m_scalar = Math.min(this.m_canvas.width / this.m_desiredWidth,
		this.m_canvas.height / this.m_desiredHeight);
	this.m_width = this.m_canvas.width / this.m_scalar;
	this.m_height = this.m_canvas.height / this.m_scalar;
} // M_UpdateCanvasValues( )

// -------------------------------------

// Camera SetPosition(number, number);
Camera.prototype.SetPosition = function(_x, _y) {
	this.m_x = _x;
	this.m_y = _y;
	return this;
} // SetPosition( )



// =============================================================================
//	CLASS:	Entity (implements IGraphicEntity, ISoundEntity)
// =============================================================================

// Entity Entity(Model, Vector2D, number);
Entity = function(_model, _position, _radius) {
	this.radius = _radius;
	
	this.SetModel(_model);
	this.m_matrix = new Matrix2D();
	this.m_matrix.preTranslate(_position);
} // class Entity

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

Entity.prototype.flags = 0;
Entity.prototype.m_animation;
Entity.prototype.m_animationPaused;
Entity.prototype.m_animationStart;
Entity.prototype.m_animationTime;
Entity.prototype.m_model;
Entity.prototype.m_matrix;
Entity.prototype.m_scale = 1;
Entity.prototype.radius;

// -----------------------------------------------------------------------------
//	class functions
// -----------------------------------------------------------------------------

// void FacePosition(Vector2D);
Entity.prototype.FacePosition = function(_pnt) {
	this.SetRotation(this.GetPosition().angleTo(_pnt));
} // FacePosition( )

// --------------------------------------

// Circle GetBoundingCircle(number);
Entity.prototype.GetBoundingCircle = function() {
	return new Circle(this.m_matrix.e, this.m_matrix.f, this.radius);
} // GetBoundingCircle( )

// --------------------------------------

// Rect GetFrameRect(number);
Entity.prototype.GetFrameRect = function(_timeMs) {
	if (this.m_animation == undefined)
		return undefined;
	
	if (this.m_animationPaused == true)
		return this.m_animation.GetFrameRect(this.m_animationTime);
	return this.m_animation.GetFrameRect(_timeMs - this.m_animationStart);
} // GetFrameRect( )

// --------------------------------------

// Image GetModelImage();
Entity.prototype.GetModelImage = function() {
	return this.model.image;
} // GetRenderMatrix( )

// --------------------------------------

// Vector2D GetPosition();
Entity.prototype.GetPosition = function() {
	return new Vector2D(this.m_matrix.e, this.m_matrix.f);
} // GetPosition( )

// --------------------------------------

// Matrix2D GetRenderMatrix();
Entity.prototype.GetRenderMatrix = function() {
	if (this.m_animation == undefined)
		return undefined
	return this.m_animation.matrix.clone().combine(this.m_matrix);
} // GetRenderMatrix( )

// --------------------------------------

// bool IsPaused();
Entity.prototype.IsAnimationPaused = function() {
	return this.m_animationPaused;
} // IsPaused( )

// --------------------------------------

// void MoveForward(number);
Entity.prototype.MoveForward = function(_distance) {
	this.m_matrix.e += (this.m_matrix.d / this.m_scale) * _distance;
	this.m_matrix.f += (this.m_matrix.b / this.m_scale) * _distance;
} // MoveForward( )

// --------------------------------------

// void PauseAnimation();
Entity.prototype.PauseAnimation = function() {
	this.m_animationTime = (new Date() | 0) - this.m_animationStart;
	this.m_animationPaused = true;
} // PauseAnimation( )

// --------------------------------------

// void ResumeAnimation();
Entity.prototype.ResumeAnimation = function() {
	this.m_animationStart = (new Date() | 0) - this.m_animationTime;
	this.m_animationPaused = false;
} // ResumeAnimation( )

// --------------------------------------

// void Rotate(number);
Entity.prototype.Rotate = function(_rads) {
	this.m_matrix.PreRotate(_rads);
} // Rotate( )

// --------------------------------------

// void SetAnimation(AnimationType);
Entity.prototype.SetAnimation = function(_animType) {
	this.m_animation = this.model.animations[_animType];
	this.m_animationStart = new Date() | 0;
} // SetAnimation( )

// --------------------------------------

// void SetModel(Model);
Entity.prototype.SetModel = function(_model) {
	this.model = _model;
} // setModel( )

// --------------------------------------

// void SetPosition(Vector2D);
Entity.prototype.SetPosition = function(_pnt) {
	this.m_matrix.e = _pnt.x;
	this.m_matrix.f = _pnt.y;
} // SetPosition( );

// --------------------------------------

// void SetPositionXY(number, number);
Entity.prototype.SetPositionXY = function(_x, _y) {
	this.m_matrix.e = _x;
	this.m_matrix.f = _y;
} // SetPositionXY( );

// --------------------------------------

// void SetRotation(number);
Entity.prototype.SetRotation = function(_rads) {
	var A = Math.cos(_rads);
	var B = Math.sin(_rads);
	
	this.m_matrix.a = A * this.m_scale;
	this.m_matrix.b = B * this.m_scale;
	this.m_matrix.c = -B * this.m_scale;
	this.m_matrix.d = A * this.m_scale;
} // SetRotation( )

// --------------------------------------

// void SetScale(number);
Entity.prototype.SetScale = function(_scale) {
	this.m_matrix.PreScale(_scale / this.m_scale);
	this.m_scale = _scale;
} // SetScale( )

// --------------------------------------

// void StrafeRight(number);
Entity.prototype.StrafeRight = function(_distance) {
	this.m_matrix.e -= (this.m_matrix.b / this.m_scale) * _distance;
	this.m_matrix.f += (this.m_matrix.d / this.m_scale) * _distance;
} // StrafeRight( )

// --------------------------------------

// Public Members
return {
	Camera:Camera,
	ClearCamera:ClearCamera,
	DrawLine:DrawLine,
	Entity:Entity,
	RenderEntity:RenderEntity,
	RenderImage:RenderImage,
	RenderImageSprite:RenderImageSprite,
	RenderSceneGraph:RenderSceneGraph
}; // public members

})();
