// Requires SparkPlug.Base.js
// Requires SparkPlug.Intersection.js

if (SparkPlug.SceneGraph == undefined)
	SparkPlug.SceneGraph = new Object();

SparkPlug.SceneGraph.SimpleSceneGraph = (function() {

// Imports //
this.Intersection = SparkPlug.Intersection;
this.CircleIntersectsCircle = SparkPlug.Intersection.CircleIntersectsCircle;
this.CircleIntersectsPoint = SparkPlug.Intersection.CircleIntersectsPoint;
this.CircleIntersectsRay = SparkPlug.Intersection.CircleIntersectsRay;
this.CircleIntersectsRect = SparkPlug.Intersection.CircleIntersectsRect;
this.PointIntersectsRect = SparkPlug.Intersection.PointIntersectsRect;
this.RayIntersectsRect = SparkPlug.Intersection.RayIntersectsRect;
this.RectIntersectsRect = SparkPlug.Intersection.RectIntersectsRect;



// =============================================================================
//	CLASS:	SimpleSceneGraph
// =============================================================================

function SimpleSceneGraph() {
	this.m_entArray = new Array();
} // class SimpleSceneGraph

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

SimpleSceneGraph.prototype.m_entArray;

// -----------------------------------------------------------------------------
//	class functions
// -----------------------------------------------------------------------------

// void AddEntity(Entity);
SimpleSceneGraph.prototype.AddEntity = function(_ent) {
	this.m_entArray.push(_ent);
} // AddEntity( )

// --------------------------------------

// Array<Entity> EntitiesInRect(Rect, number = 0);
SimpleSceneGraph.prototype.EntitiesInRect = function(_rect, _flags) {
	if (_flags == undefined)
		_flags = 0;
	
	var entArray = new Array();
	var ent;
	
	var lng = this.m_entArray.length;
	for (var i = 0; i < lng; i++) {
		ent = this.m_entArray[i];
		// test if ent.flags contain all of _flags
		if ((ent.flags | _flags) == ent.flags &&
			PointIntersectsRect(ent.GetPosition(), _rect))
		{
			entArray.push(ent);
		} // if
	} // for( i )
	
	return entArray;
} // EntitiesInRect( )

// --------------------------------------

// Array<Entity> EntitiesInCircle(Circle, number = 0);
SimpleSceneGraph.prototype.EntitiesInCircle = function(_cir, _flags) {
	if (_flags == undefined)
		_flags = 0;
	
	var entArray = new Array();
	var ent;
	
	var lng = this.m_entArray.length;
	for (var i = 0; i < lng; i++) {
		ent = this.m_entArray[i];
		// test if ent.flags contain all of _flags
		if ((ent.flags | _flags) == ent.flags &&
			CircleIntersectsPoint(_cir, ent.GetPosition()))
		{
			entArray.push(ent);
		} // if
	} // for( i )
	
	return entArray;
} // EntitiesInCircle( )

// --------------------------------------

// Array<Entity> EntitiesInNaaRect(NaaRect?, number = 0);
SimpleSceneGraph.prototype.EntitiesInNaaRect = function(_naaRect, _flags) {
	throw "Not Implemented";
} // EntitiesInNaaRect( )

// --------------------------------------

// Array<Entity> EntitiesIntersectingRect(Rect, number = 0);
SimpleSceneGraph.prototype.EntitiesIntersectingRect = function(_rect, _flags) {
	if (_flags == undefined)
		_flags = 0;
	
	var entArray = new Array();
	var ent;
	
	var lng = this.m_entArray.length;
	for (var i = 0; i < lng; i++) {
		ent = this.m_entArray[i];
		// test if ent.flags contain all of _flags
		if ((ent.flags | _flags) == ent.flags &&
			CircleIntersectsRect(ent.GetBoundingCircle(), _rect))
		{
			entArray.push(ent);
		} // if
	} // for( i )
	
	return entArray;
} // EntitiesIntersectingRect( )

// --------------------------------------

// Array<Entity> EntitiesIntersectingCircle(Circle, number = 0);
SimpleSceneGraph.prototype.EntitiesIntersectingCircle = function(_cir, _flags) {
	if (_flags == undefined)
		_flags = 0;
	
	var entArray = new Array();
	var ent;
	
	var lng = this.m_entArray.length;
	for (var i = 0; i < lng; i++) {
		ent = this.m_entArray[i];
		// test if ent.flags contain all of _flags
		if ((ent.flags | _flags) == ent.flags &&
			CircleIntersectsCircle(ent.GetBoundingCircle(), _cir))
		{
			entArray.push(ent);
		} // if
	} // for( i )
	
	return entArray;
} // EntitiesIntersectingCircle( )

// --------------------------------------

// Array<Entity> EntitiesIntersectingRay(Ray?, number = 0);
SimpleSceneGraph.prototype.EntitiesIntersectingRay = function() {
	throw "Not Implemented";
} // EntitiesIntersectingRay( )

// --------------------------------------

// Array<Entity> EntitiesIntersectingNaaRect(NaaRect?, number = 0);
SimpleSceneGraph.prototype.EntitiesIntersectingNaaRect = function() {
	throw "Not Implemented";
} // EntitiesIntersectingNaaRect( )

// --------------------------------------

// void RemoveEntity(Entity);
SimpleSceneGraph.prototype.RemoveEntity = function(_ent) {
	this.m_entArray.splice(this.m_entArray.indexOf(_ent), 1);
} // RemoveEntity( )

// --------------------------------------



// Public Members
return {
	SimpleSceneGraph:SimpleSceneGraph
}; // public members

})().SimpleSceneGraph;
