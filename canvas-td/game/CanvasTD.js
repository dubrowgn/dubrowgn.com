if (SparkPlug == undefined || SparkPlug.Abstract == undefined)
	throw "Canvas TD.js requires SparkPlug.Abstract, but it is undefined.";
if (SparkPlug.Graphics == undefined)
	throw "Canvas TD.js requires SparkPlug.Graphics, but it is undefined.";
if (SparkPlug.Core == undefined)
	throw "Canvas TD.js requires SparkPlug.Core, but it is undefined.";
if (SparkPlug.Intersection == undefined)
	throw "Canvas TD.js requires SparkPlug.Intersection, but it is undefined.";
if (SparkPlug.SceneGraph == undefined ||
	SparkPlug.SceneGraph.SimpleSceneGraph == undefined)
	throw "Canvas TD.js requires SparkPlug.SceneGraph.SimpleSceneGraph, but " +
		"it is undefined.";
if (TD == undefined || TD.Entity == undefined)
	throw "Canvas TD.js requires TD.Entity, but it is undefined.";

var CanvasTD = (function(){

// Imports //
this.Abstract = SparkPlug.Abstract;
this.Circle = SparkPlug.Abstract.Circle;
this.Matrix2D = SparkPlug.Abstract.Matrix2D;
this.Vector2D = SparkPlug.Abstract.Vector2D;
this.Rect = SparkPlug.Abstract.Rect;

this.Graphics = SparkPlug.Graphics;
this.Animation = SparkPlug.Graphics.Animation;
this.Model = SparkPlug.Graphics.Model;

this.Core = SparkPlug.Core;
this.Camera = SparkPlug.Core.Camera;
this.Entity = SparkPlug.Core.Entity;

this.SimpleSceneGraph = SparkPlug.SceneGraph.SimpleSceneGraph;

this.AnimationType = TD.Entity.AnimationType;
this.AttackMethod = TD.Entity.AttackMethod;
this.EntityFlag = TD.Entity.EntityFlag;
this.Mob = TD.Entity.Mob;
this.MobType = TD.Entity.MobType;
this.Projectile = TD.Entity.Projectile;
this.StatusEffect = TD.Entity.StatusEffect;
this.StatusEffectType = TD.Entity.StatusEffectType;
this.Tower = TD.Entity.Tower;
this.TowerType = TD.Entity.TowerType;

this.mouse = dubrowgn.mouse;

this.Map = dubrowgn.types.Map;
this.Wave = dubrowgn.types.Wave;

// -------------------------------------

this.version = "Unstable - Jan 10, 2012";

this.camera;
this.sceneGraph;
this.fps = 60;
this.speedFactor = 1.0;
this.interval = null;
this.map = null;
this.mapWidth = 768;
this.mapHeight = 432;
this.width = 768;
this.height = 480;
this.lastNow = new Date();
this.isInGameLoop = false;
this.mousePos = new Vector2D(0, 0);

this.wayPoints = new Array();

this.img_map = new Image();
this.mobTypes = new Array();
this.mobs = new Array();
this.mobs_remove = new Array();
this.projectiles = new Array();
this.projectiles_remove = new Array();
this.waves = new Array();
this.buildable = new Array();
this.towerTypes = new Object();
this.towers = new Array();
this.towerBeingBuilt = null;
this.r = undefined;
this.m_oldTime = new Date() | 0;
this.m_frameCount = 0;

this.money = 0;
this.lives = 0;
this.wave = 0;

// -------------------------------------

function Setup(_canvas, _vpWidth, _vpHeight) {
	camera = new Camera(0, 0, _vpWidth, _vpHeight, canvas);
	sceneGraph = new SimpleSceneGraph();

	canvas.onmousedown = mouse.OnMouseDown;
	canvas.onmouseup = mouse.OnMouseUp;
	canvas.onmousemove = mouse.OnMouseMove;

	img_map.src = "img/map.png";

	map = new Map("img/map.png", mapWidth, mapHeight);

	// buildable map
	buildable.push(new Array(true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false));
	buildable.push(new Array(true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false));
	buildable.push(new Array(true, true, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true));
	buildable.push(new Array(true, true, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true));
	buildable.push(new Array(true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true));
	buildable.push(new Array(true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true));
	buildable.push(new Array(true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true));
	buildable.push(new Array(true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true));
	buildable.push(new Array(true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true));
	buildable.push(new Array(true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true));
	buildable.push(new Array(true, true, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true));
	buildable.push(new Array(true, true, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true));
	buildable.push(new Array(true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true));
	buildable.push(new Array(true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true));
	buildable.push(new Array(true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true));
	buildable.push(new Array(true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true));
	buildable.push(new Array(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true));
	buildable.push(new Array(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true));

	map.buildable = buildable;

	// status effects
	var seFrost = new StatusEffectType("Frosted", 1.25);
	seFrost.isRefreshable = true;
	seFrost.onAdd = function(_target) {
		_target.speed = _target.type.speed * 0.5;
	} // onAdd( )
	seFrost.onRemove = function(_target) {
		_target.speed = _target.type.speed;
	} // onRemove( )

	var sePoison = new StatusEffectType("Poisoned", 10);
	sePoison.isRefreshable = false;
	sePoison.onTick = function(_target) {
		var now = new Date() | 0;
		DamageMob(_target, (now - this.lastTick) * 2.5 / 1000);
	} // onTick( )

	// cache images
	var img_arrow = new Image();
	img_arrow.src = "img/arrow.png";
	var img_explosion = new Image();
	img_explosion.src = "img/explosion.png";
	var img_frost = new Image();
	img_frost.src = "img/frost.png";
	var img_mobs = new Image();
	img_mobs.src = "img/mobs.png";
	var img_poison = new Image();
	img_poison.src = "img/poison.png";
	var img_towers = new Image();
	img_towers.src = "img/mdlTowers.png";

	// attack models
	var mdlArrow = new Model(img_arrow);
	mdlArrow.animations[AnimationType.Move] = new Animation(
		new Rect(0, 0, 60, 12), 1, 1, (new Matrix2D()).translate(-30, -6).scale(0.4));

	var mdlExplosion = new Model(img_explosion);
	mdlExplosion.animations[AnimationType.Move] = new Animation(
		new Rect(0, 0, 60, 60), 6, 120, (new Matrix2D()).translate(-30, -30).scale(.3));
	mdlExplosion.animations[AnimationType.Impact] = new Animation(
		new Rect(0, 60, 60, 60), 12, 18, (new Matrix2D()).translate(-30, -30).scale(.3));

	var mdlFrost = new Model(img_frost);
	mdlFrost.animations[AnimationType.Move] = new Animation(
		new Rect(0, 0, 60, 60), 6, 120, (new Matrix2D()).translate(-30, -30).scale(.3));

	var mdlPoison = new Model(img_poison);
	mdlPoison.animations[AnimationType.Move] = new Animation(
		new Rect(0, 0, 60, 60), 6, 120, (new Matrix2D()).translate(-30, -30).scale(.3));

	// attack methods
	var amArrow = new AttackMethod(1.0, 20, mdlArrow, 160, 600, EntityFlag.Mob);
	amArrow.onImpact = function(_projectile) {
		if (_projectile.targetEntity !== undefined)
			DamageMob(_projectile.targetEntity, _projectile.attackMethod.damage);
		// else FIXME
		projectiles_remove.push(_projectile);
	} // onImpact( )

	var amExplosion = new AttackMethod(1.0, 1, mdlExplosion, 160, 350, EntityFlag.Mob);
	amExplosion.isTracking = false;
	amExplosion.onImpact = function(_proj) {
		_proj.SetAnimation(AnimationType.Impact);
		var mob = _proj.targetEntity;
		if (mob !== undefined)
		{
			//DamageMob(mob, _proj.attackMethod.damage);
			//GiveMobStatus(mob, seFrost);
		} // if
		//projectiles_remove.push(_proj);
	} // onImpact( )

	var amFrost = new AttackMethod(1.0, 1, mdlFrost, 160, 350, EntityFlag.Mob);
	amFrost.onImpact = function(_proj) {
		var mob = _proj.targetEntity;
		if (mob !== undefined)
		{
			DamageMob(mob, _proj.attackMethod.damage);
			GiveMobStatus(mob, seFrost);
		} // if
		projectiles_remove.push(_proj);
	} // onImpact( )

	var amPoison = new AttackMethod(1.0, 0, mdlPoison, 160, 350, EntityFlag.Mob);
	amPoison.onImpact = function(_proj) {
		var mob = _proj.targetEntity;
		if (mob !== undefined)
		{
			DamageMob(mob, _proj.attackMethod.damage);
			GiveMobStatus(mob, sePoison);
		} // if
		projectiles_remove.push(_proj);
	} // onImpact( )

	// tower models
	var mdlGreen = new Model(img_towers);
	mdlGreen.animations[AnimationType.Stand] = new Animation(
		new Rect(0, 0, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));
	mdlGreen.animations[AnimationType.Buildable] = new Animation(
		new Rect(22, 0, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));
	mdlGreen.animations[AnimationType.Unbuildable] = new Animation(
		new Rect(44, 0, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));

	var mdlBlue = new Model(img_towers);
	mdlBlue.animations[AnimationType.Stand] = new Animation(
		new Rect(0, 24, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));
	mdlBlue.animations[AnimationType.Buildable] = new Animation(
		new Rect(22, 24, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));
	mdlBlue.animations[AnimationType.Unbuildable] = new Animation(
		new Rect(44, 24, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));

	var mdlRed = new Model(img_towers);
	mdlRed.animations[AnimationType.Stand] = new Animation(
		new Rect(0, 48, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));
	mdlRed.animations[AnimationType.Buildable] = new Animation(
		new Rect(22, 48, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));
	mdlRed.animations[AnimationType.Unbuildable] = new Animation(
		new Rect(44, 48, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));

	var mdlBlack = new Model(img_towers);
	mdlBlack.animations[AnimationType.Stand] = new Animation(
		new Rect(0, 72, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));
	mdlBlack.animations[AnimationType.Buildable] = new Animation(
		new Rect(22, 72, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));
	mdlBlack.animations[AnimationType.Unbuildable] = new Animation(
		new Rect(44, 72, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));

	var mdlWhite = new Model(img_towers);
	mdlWhite.animations[AnimationType.Stand] = new Animation(
		new Rect(0, 96, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));
	mdlWhite.animations[AnimationType.Buildable] = new Animation(
		new Rect(22, 96, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));
	mdlWhite.animations[AnimationType.Unbuildable] = new Animation(
		new Rect(44, 96, 22, 24), 1, 1, (new Matrix2D()).translate(-11, -24));

	// tower types
	towerTypes.green = new TowerType(mdlGreen, 20, amPoison);
	towerTypes.blue = new TowerType(mdlBlue, 20, amFrost);
	towerTypes.red = new TowerType(mdlRed, 20, amExplosion);
	towerTypes.black = new TowerType(mdlBlack, 20, amArrow);
	towerTypes.white = new TowerType(mdlWhite, 20, amArrow);

	// Way Points
	wayPoints.push(new Vector2D(-312, -192));
	wayPoints.push(new Vector2D(-312, -96));
	wayPoints.push(new Vector2D(312, -96));
	wayPoints.push(new Vector2D(312, 0));
	wayPoints.push(new Vector2D(-312, 0));
	wayPoints.push(new Vector2D(-312, 96));
	wayPoints.push(new Vector2D(312, 96));
	wayPoints.push(new Vector2D(312, 192));
	wayPoints.push(new Vector2D(-391, 192));

	// mob models
	var mdlMobMagenta = new Model(img_mobs);
	mdlMobMagenta.animations[AnimationType.Stand] = new Animation(
		new Rect(0, 0, 14, 15), 1, 1, (new Matrix2D()).rotate(Math.PI / 2).translate(-7, -9));

	// Waves
	for (var i = 1; i < 41; i++) {
		waves.push(new Wave(
			new MobType(mdlMobMagenta, 80 + 2*i, i*i, (1.10 - 0.01 * i) * i),
			3*i, 80-i
		));
	} // for( i )

	// Init values
	SetMoney(40);
	SetLives(50);
	SetWave(0);

	// init mouse move event
	mouse.AddMoveHandler(function(_e) {
		mousePos.x = _e.offsetX;
		mousePos.y = _e.offsetY;
	});

	// unpause (begin) the game
	Pause(false);
} // Setup( )

// -------------------------------------

function Pause(_pause) {
	if (_pause == undefined || _pause) {
		if (interval != null) {
			clearInterval(interval);
			interval = null;
		} // if
	} else if (interval == null) {
		lastNow = new Date();
		interval = setInterval(GameLoop, 1000 / fps);
	} // if / else
} // Pause( )

// -------------------------------------

function TogglePause() {
	if (interval == null)
		Pause(false);
	else
		Pause();
} // TogglePause( )

// -------------------------------------

function DamageMob(_mob, _dmg) {
	if (_mob.hp <= 0)
		return;

	_mob.hp -= _dmg;
	if (_mob.hp <= 0)
	{
		SetMoney(money + _mob.money);
		mobs_remove.push(_mob);
	} // if
} // DamageMob( )

// -------------------------------------

function GiveMobStatus(_mob, _statusType) {
	var status = _mob.statusEffects.FirstOfType(_statusType);
	if (status !== undefined && status.type.isRefreshable)
	{
		status.start = new Date() | 0;
	} // if
	else
	{
		var se = new StatusEffect(_statusType);
		_mob.statusEffects.Add(se);
		if (se.type.onAdd !== undefined)
			se.type.onAdd(_mob);
	} // else
} // GiveMobStatus( )

// -------------------------------------

function GameLoop() {
	if (!isInGameLoop) {
		isInGameLoop = true;

		if (mobs.length <= 0) {
			if (waves.length > 0)
				SpawnWave(waves.shift());
			else
				OnWin();
		} // if

		var now = new Date();
		var sec = speedFactor * ((now - lastNow) / 1000.0);
		lastNow = now;

		// run game logic
		Move(sec);
		StatusEffects(sec);
		Attack(sec);
		Draw(sec);
		Cleanup();

		// update fps counter
		m_frameCount++;
		var newTime = new Date() | 0;
		if (newTime - m_oldTime > 768) {
			CanvasTD.FpsChanged(m_frameCount * 1000 / (newTime - m_oldTime));
			m_oldTime = newTime;
			m_frameCount = 0;
		} // if

		isInGameLoop = false;
	} // if
} // GameLoop( )

// -------------------------------------

function Move(_sec) {
	// move mobs
	var mob = null;
	var lng = mobs.length;
	for (var i = 0; i < lng; i++) {
		mob = mobs[i];
		mob.Move(mob.speed * _sec);
		if (mob.dest == null) {
			mobs_remove.push(mob);
			SetLives(lives - 1);
			if (lives <= 0)
				OnLose();
		} // if
	} // for( i )

	// move projectiles
	var proj = null;
	lng = projectiles.length;
	for (var i = 0; i < lng; i++)
	{
		proj = projectiles[i];
		var target = proj.targetPoint;
		if (proj.targetEntity !== undefined)
			target = proj.targetEntity.GetPosition();

		proj.FacePosition(target);
		var dist = proj.speed * _sec;
		if (proj.GetPosition().distanceSq(target) > dist * dist)
			proj.MoveForward(dist);
		else if (!proj.isDying) {
			proj.attackMethod.onImpact(proj);
			proj.isDying = true;
		} // else if
	} // for( i )
} // Move( )

// -------------------------------------

function StatusEffects(_sec) {
	var now = new Date() | 0;
	var lng = mobs.length;
	for (var i = 0; i < lng; i++) {
		for (var j = 0; j < mobs[i].statusEffects.length; j++)
		{
			var se = mobs[i].statusEffects[j];
			if (se.type.onTick !== undefined)
			{
				se.type.onTick.call(se, mobs[i]);
				se.lastTick = now;
			} // if
			if (now - se.start > se.type.duration * 1000)
			{
				mobs[i].statusEffects.Remove(se);
				if (se.type.onRemove !== undefined)
					se.type.onRemove(mobs[i]);
			} // if
		} // for( j )
	} // for( i )
} // StatusEffects( )

// -------------------------------------

function Attack(_sec) {
	var lngMobs;
	var lngTowers;
	var t;
	var tmpMobs;

	lngTowers = towers.length;
	for (var i = 0; i < lngTowers; i++) {
		t = towers[i];
		t.cooldown -= _sec;
		if (t.cooldown <= 0)
		{
			// get mobs within tower's attack range
			tmpMobs = sceneGraph.EntitiesInCircle(t.GetAttackCircle(), EntityFlag.Mob);
			if (tmpMobs.length > 0)
			{
				var p = new Projectile(t.attackMethod, t.GetAttackOrigin(), tmpMobs[0]);
				p.FacePosition(tmpMobs[0].GetPosition());
				projectiles.push(p);
				sceneGraph.AddEntity(p);
				t.cooldown = t.attackMethod.cooldown;
			} // if
		} // if
	} // for( i )
} // Attack( )

// -------------------------------------

function Draw(_sec) {
	// draw background map over old frame
	Core.RenderImage(img_map, (new Matrix2D()).translate(-960, -540).scale(1/2.5), camera);

	// draw towers, mobs, and projectiles
	Core.RenderSceneGraph(sceneGraph, camera);

	// draw tower being built
	if (towerBeingBuilt != null)
		Core.RenderEntity(towerBeingBuilt, camera);
} // Draw( )

// -------------------------------------

function Cleanup() {
	var i;
	var index;

	// cleanup mob cache
	var lng = mobs_remove.length;
	for (i = 0; i < lng; i++) {
		index = mobs.indexOf(mobs_remove[i]);
		if (index >= 0) {
			mobs.splice(mobs.indexOf(mobs_remove[i]), 1);
			sceneGraph.RemoveEntity(mobs_remove[i]);
		} // if
	} // for( i )
	mobs_remove = new Array();

	// cleanup projectile cache
	lng = projectiles_remove.length;
	for (i = 0; i < lng; i++) {
		index = projectiles.indexOf(projectiles_remove[i]);
		if (index >= 0) {
			projectiles.splice(projectiles.indexOf(projectiles_remove[i]), 1);
			sceneGraph.RemoveEntity(projectiles_remove[i]);
		} // if
	} // for( i )
	projectiles_remove = new Array();
} // Cleanup( )

// -------------------------------------

function SpawnWave(_wave) {
	SetWave(wave + 1);

	var count = _wave.count;
	var SpawnMob = function() {
		var mob = new Mob(_wave.mobType, new Vector2D(500, -192));
		mob.SetDestinationQueue(wayPoints);
		mobs.push(mob);
		sceneGraph.AddEntity(mob);
		count--;
		if (count <= 0)
			clearInterval(inter);
	};
	SpawnMob();
	var inter = setInterval(SpawnMob, _wave.interval / speedFactor);
} // SpawnMob

// -------------------------------------

function SetMoney(_money) {
	money = _money;
	CanvasTD.MoneyChanged(_money);
} // SetMoney( )

// -------------------------------------

function SetLives(_lives) {
	lives = _lives;
	CanvasTD.LivesChanged(_lives);
} // SetLives( )

// -------------------------------------

function SetWave(_wave) {
	wave = _wave;
	CanvasTD.WaveChanged(_wave);
} // SetWave( )

// -------------------------------------

function OnWin() {
	Pause();
	alert("You Win! Congratulations!");
} // OnWin( )

// -------------------------------------

function OnLose() {
	Pause();
	alert("You Lose! Thanks for playing!");
} // OnLose( )

// -------------------------------------

function BuildTower(_ttype) {
	if (_ttype.cost > money || towerBeingBuilt != null)
		return;

	towerBeingBuilt = new Tower(_ttype, T_ScreenToBuild(mousePos));
	var grid = T_ScreenToGrid(mousePos);
	towerBeingBuilt.SetAnimation(buildable[grid.y][grid.x] ?
		AnimationType.Buildable : AnimationType.Unbuildable);

	var move = function(_e) {
		towerBeingBuilt.SetPosition(
			T_ScreenToBuild(new Vector2D(_e.offsetX, _e.offsetY)));
		var grid = T_ScreenToGrid(new Vector2D(_e.offsetX, _e.offsetY));
		towerBeingBuilt.SetAnimation(buildable[grid.y][grid.x] ?
			AnimationType.Buildable : AnimationType.Unbuildable);
	}; // move( )

	var up = function(_e) {
		var grid = T_ScreenToGrid(new Vector2D(_e.offsetX, _e.offsetY));
		if (!buildable[grid.y][grid.x])
			return;

		m_cancelBuildFunc = undefined;
		mouse.RemoveUpHandler(up);
		mouse.RemoveMoveHandler(move);
		buildable[grid.y][grid.x] = false;
		SetMoney(money - _ttype.cost);
		towers.push(towerBeingBuilt);
		sceneGraph.AddEntity(towerBeingBuilt);
		towerBeingBuilt.SetAnimation(AnimationType.Stand);
		towerBeingBuilt = null;
	}; // up( )

	m_cancelBuildFunc = function() {
		m_cancelBuildFunc = undefined;
		towerBeingBuilt = null;
		mouse.RemoveMoveHandler(move);
		mouse.RemoveUpHandler(up);
	}; // CancelBuild( )

	mouse.AddMoveHandler(move);
	mouse.AddUpHandler(up);
} // BuildTower( )

// -------------------------------------

// build event handlers
function BuildTowerGreen() { BuildTower(towerTypes.green); };
function BuildTowerBlue() { BuildTower(towerTypes.blue); };
function BuildTowerRed() { BuildTower(towerTypes.red); };
function BuildTowerBlack() { BuildTower(towerTypes.black); };
function BuildTowerWhite() { BuildTower(towerTypes.white); };

// -------------------------------------

// cancel build event handler
function CancelBuild() {
	if (m_cancelBuildFunc != undefined)
		m_cancelBuildFunc();
};

// -------------------------------------

// ui status change event handlers
this.FpsChanged = function(_newValue) {};
this.LivesChanged = function(_newValue) {};
this.MoneyChanged = function(_newValue) {};
this.WaveChanged = function(_newValue) {};

// -------------------------------------

function T_WorldToScreen(_pnt) {
	return new Vector2D((mapWidth / 2) + _pnt.x, (mapHeight / 2) - _pnt.y);
} // T_ObjectToWorld( )

// -------------------------------------

function T_ScreenToWorld(_pnt) {
	return camera.ConvertScreenToWorld(_pnt);
} // T_ObjectToWorld( )

// -------------------------------------

function T_ScreenToGrid(_pnt) {
	var pnt = T_ScreenToBuild(_pnt);
	pnt.x = (pnt.x + 384) / 24 | 0;
	pnt.y = (pnt.y + 215) / 24 | 0;

	return pnt;
} // T_ScreenToGrid( )

// -------------------------------------

function T_ScreenToBuild(_pnt) {
	// convert to world coordinates
	var pnt = camera.ConvertScreenToWorld(_pnt);
	// bounds check
	pnt.x = Math.min(Math.max(pnt.x, -384), 360);
	pnt.y = Math.min(Math.max(pnt.y, -216), 192);
	// find center of grid cell
	pnt.x = Math.floor(pnt.x / 24) * 24 + 12;
	pnt.y = Math.floor(pnt.y / 24) * 24 + 24;

	return pnt;
} // T_ScreenToBuild( )

// -------------------------------------

// Public Members
return {
	BuildTowerBlack:BuildTowerBlack,
	BuildTowerBlue:BuildTowerBlue,
	BuildTowerGreen:BuildTowerGreen,
	BuildTowerRed:BuildTowerRed,
	BuildTowerWhite:BuildTowerWhite,
	CancelBuild:CancelBuild,
	FpsChanged:FpsChanged,
	LivesChanged:LivesChanged,
	MoneyChanged:MoneyChanged,
	Setup:Setup,
	TogglePause:TogglePause,
	version:version,
	WaveChanged:WaveChanged
}; // public members

})();
