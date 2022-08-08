var TD = new Object();

// requires SparkPlug.Core

TD.Entity = (function() {

// imports
var Circle = SparkPlug.Abstract.Circle;
var Vector2D = SparkPlug.Abstract.Vector2D;

// =============================================================================
//	ENUM:	AnimationType
// =============================================================================

this.AnimationType = {
	Stand:		0,
	Buildable:	1,
	Impact:		2,
	Move:		3,
	Unbuildable:4
}; // Enum AnimationType



// =============================================================================
//	ENUM:	EntityFlag
// =============================================================================

this.EntityFlag = {
	None:		0,
	Mob:		1,
	Projectile:	2,
	Tower:		4
}; // Enum EntityFlag



// =============================================================================
//	CLASS:	AttackMethod
// =============================================================================

function AttackMethod(_cooldown, _dmg, _mdl, _rng, _speed, _targets) {
	this.cooldown = _cooldown;
	this.damage = _dmg;
	this.model = _mdl;
	this.projectileSpeed = _speed;
	this.range = _rng;
	this.targetFlags = _targets;
} // class AttackMethod

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

AttackMethod.prototype.aoeRadius;
AttackMethod.prototype.cooldown;
AttackMethod.prototype.damage;
AttackMethod.prototype.isTracking = true;
AttackMethod.prototype.model;
AttackMethod.prototype.projectileSpeed;
AttackMethod.prototype.range;
AttackMethod.prototype.targetFlags;
AttackMethod.prototype.onImpact;


// =============================================================================
//	CLASS:	Mob
// =============================================================================

function Mob(_mobType, _position) {
	Entity.call(this, _mobType.model, _position, 1);
	this.SetAnimation(AnimationType.Stand);
	this.flags = EntityFlag.Mob;
	this.baseHp = this.hp = _mobType.baseHp;
	this.dest = null;
	this.destQueue = new Array();
	this.money = _mobType.money;
	this.speed = _mobType.speed;
	this.statusEffects = new StatusCollection();
	this.type = _mobType;
} // class Mob

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

// inherit Entity
Mob.prototype = new Entity(undefined, 0, 0);
Mob.prototype.baseHp;
Mob.prototype.dest;
Mob.prototype.destQueue;
Mob.prototype.hp;
Mob.prototype.money;
Mob.prototype.speed;
Mob.prototype.statusEffects;
Mob.prototype.type;

// -----------------------------------------------------------------------------
//	class functions
// -----------------------------------------------------------------------------

Mob.prototype.SetDestination = function(_pnt) {
	this.dest = new Vector2D(_pnt.x, _pnt.y);
	this.FacePosition(this.dest);
} // SetDestination( )

// -------------------------------------

Mob.prototype.PopDestinationQueue = function() {
	if (this.destQueue.length > 0)
		this.SetDestination(this.destQueue.shift());
	else
		this.dest = null;
} // PopDestinationQueue( )

// -------------------------------------

Mob.prototype.QueueDestination = function(_pnt) {
	this.destQueue.push(_pnt);
	if (this.dest == null)
		this.SetDestination(_pnt);
} // QueueDestination( )

// -------------------------------------

Mob.prototype.SetDestinationQueue = function(_pntArray) {
	this.destQueue = new Array();
	
	var lng = _pntArray.length;
	for (var i = 0; i < lng; i++) {
		this.destQueue.push(_pntArray[i]);
	} // for( i )
	
	this.SetDestination(this.destQueue[0]);
} // SetDestinationQueue( )

// -------------------------------------

Mob.prototype.RangeToDestination = function() {
	if (this.dest == null)
		return 0;

	return this.dest.distance(this.GetPosition());
} // RangeToDestination( )

// -------------------------------------

Mob.prototype.Move = function(_distToMove) {
	if (this.dest == null)
		return;

	var distToDest = this.RangeToDestination();
	if (_distToMove < distToDest) {
		this.MoveForward(_distToMove);
	} else {
		this.SetPosition(this.dest);
		this.PopDestinationQueue();
		this.Move(_distToMove - distToDest);
	} // if/else
} // Move( )



// =============================================================================
//	CLASS:	MobType
// =============================================================================

function MobType(_model, _speed, _hp, _money) {
	this.baseHp = _hp;
	this.model = _model;
	this.money = _money;
	this.speed = _speed;
} // class MobType

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

MobType.prototype.baseHp;
MobType.prototype.model;
MobType.prototype.money;
MobType.prototype.speed;



// =============================================================================
//	CLASS:	Projectile
// =============================================================================

function Projectile(_attackMethod, _position, _targetEntity) {
	Entity.call(this, _attackMethod.model, _position, 1);
	this.attackMethod = _attackMethod;
	this.speed = _attackMethod.projectileSpeed;
	if (_attackMethod.isTracking)
		this.targetEntity = _targetEntity;
	else
		this.targetPoint = _targetEntity.GetPosition();
	this.flags = EntityFlag.Projectile;
	this.SetAnimation(AnimationType.Move);
} // class Projectile

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

// inherit Entity
Projectile.prototype = new Entity(undefined, 0, 0);
Projectile.prototype.attackMethod;
Projectile.prototype.isDying = false;
Projectile.prototype.speed;
Projectile.prototype.targetEntity;
Projectile.prototype.targetPoint;



// =============================================================================
//	CLASS:	StatusCollection
// =============================================================================

function StatusCollection() {
} // StatusCollection( )

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

StatusCollection.prototype = new Array();

// -----------------------------------------------------------------------------
//	class functions
// -----------------------------------------------------------------------------

StatusCollection.prototype.Add = StatusCollection.prototype.push;

StatusCollection.prototype.Remove = function(_item) {
	var index = this.indexOf(_item);
	if (index >= 0)
		this.splice(index, 1);
} // Remove( )

StatusCollection.prototype.FirstOfType = function(_type) {
	for (var i = 0; i < this.length; i ++) {
		if (this[i].type == _type)
			return this[i];
	} // for( i )
	return undefined;
} // FirstOfType( )

StatusCollection.prototype.ContainsType = function(_type) {
	var lng = this.items.length;
	for (var i = 0; i < lng; i ++) {
		if (this[i].type == _type)
			return true;
	} // for( i )
	return false;
} // ContainsType( )


// =============================================================================
//	CLASS:	StatusEffect
// =============================================================================

function StatusEffect(_type) {
	this.type = _type;
	this.start = new Date() | 0;
	this.lastTick = this.start;
} // class StatusEffect

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

StatusEffect.prototype.lastTick;
StatusEffect.prototype.start;
StatusEffect.prototype.type;



// =============================================================================
//	CLASS:	StatusEffectType
// =============================================================================

/**
 *	Does stuff...
 */
function StatusEffectType(_name, _duration) {
	this.name = _name;
	this.duration = _duration;
} // class StatusEffectType

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

StatusEffectType.prototype.duration;
StatusEffectType.prototype.isRefreshable = false;
StatusEffectType.prototype.name;
StatusEffectType.prototype.onAdd;
StatusEffectType.prototype.onRemove;
StatusEffectType.prototype.onTick;



// =============================================================================
//	CLASS:	Tower
// =============================================================================

function Tower(_towerType, _position) {
	Entity.call(this, _towerType.model, _position, 1);
	this.attackMethod = _towerType.attackMethod;
	this.SetAnimation(AnimationType.Stand);
	this.flags = EntityFlag.Tower;
} // class Tower

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

// inherit StaticEntity
Tower.prototype = new Entity(undefined, 0, 0);
Tower.prototype.attackMethod;
Tower.prototype.cooldown = 0;

// -----------------------------------------------------------------------------
//	class functions
// -----------------------------------------------------------------------------

// Circle GetAttackCircle();
Tower.prototype.GetAttackCircle = function() {
	return new Circle(this.m_matrix.e, this.m_matrix.f, this.attackMethod.range);
} // GetAttackCircle( )

// --------------------------------------

// Vector2D GetAttackOrigin();
Tower.prototype.GetAttackOrigin = function() {
	return this.GetPosition().clone().translate(0, -20);
} // GetAttackOrigin( )



// =============================================================================
//	CLASS:	TowerType
// =============================================================================

function TowerType(_model, _cost, _attackMethod) {
	this.attackMethod = _attackMethod;
	this.cost = _cost;
	this.model = _model;
} // class TowerType

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

TowerType.prototype.attackMethod;
TowerType.prototype.cost;
TowerType.prototype.model;

// -------------------------------------

// public members
return {
	AnimationType:AnimationType,
	AttackMethod:AttackMethod,
	EntityFlag:EntityFlag,
	Mob:Mob,
	MobType:MobType,
	Projectile:Projectile,
	StatusEffect:StatusEffect,
	StatusEffectType:StatusEffectType,
	Tower:Tower,
	TowerType:TowerType
};

})();
