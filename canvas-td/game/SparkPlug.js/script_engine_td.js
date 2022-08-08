if (typeof dubrowgn.math == "undefined")
	document.write("<p><b>Error:</b> script_engine_td requires dubrowgn.math"
		+ ", but it is undefined</p>");
if (typeof dubrowgn.graphics == "undefined")
	document.write("<p><b>Error:</b> script_engine_td requires dubrowgn.graphics"
		+ ", but it is undefined</p>");
if (typeof dubrowgn.mouse == "undefined")
	document.write("<p><b>Error:</b> script_engine_td requires dubrowgn.mouse"
		+ ", but it is undefined</p>");

var ScriptEngine = (function(){

// Imports //
this.math = dubrowgn.math;
this.Rect = dubrowgn.math.Rect
this.Vec2 = dubrowgn.math.Vec2;
this.graphics = dubrowgn.graphics;
this.Renderable = dubrowgn.graphics.Renderable;
this.StaticEntity = dubrowgn.graphics.StaticEntity;
this.MobileEntity = dubrowgn.graphics.MobileEntity;
this.mouse = dubrowgn.mouse;

this.Map = dubrowgn.types.Map;
this.Wave = dubrowgn.types.Wave;

// -------------------------------------

this.buildNum = "dev 07042011.8";

this.canvas = null;
this.ctx2d = null;
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

this.wayPoints = new Array();

this.img_btn = new Image();
this.img_map = new Image();
this.img_mobs = new Image();
this.img_towers = new Image();
this.img_ui = new Image();
this.mobTypes = new Array();
this.mobs = new Array();
this.waves = new Array();
this.buildable = new Array();
this.towerTypes = new Array();
this.towers = new Array();
this.towerBeingBuilt = null;
this.btns = new Array();

this.money = 40;
this.lives = 50;
this.wave = 0;

// -------------------------------------

function Setup(_canvas) {
	canvas = _canvas;
	ctx2d = _canvas.getContext("2d");
	
	//canvas.width = width;
	//canvas.height = height;
	canvas.onmousedown = mouse.OnMouseDown;
	canvas.onmouseup = mouse.OnMouseUp;
	canvas.onmousemove = mouse.OnMouseMove;
	
	mouse.AddDownHandler(OnMouseDownUI);

	img_btn.src = "img/btn.png";
	img_map.src = "img/map.png";
	img_mobs.src = "img/mobs.png";
	img_towers.src = "img/towers.png";
	img_ui.src = "img/ui.png";
	
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
	//document.getElementById("text").innerHTML = JSON.stringify(map);

	// Towers
	var rend_blue = new Renderable(img_towers, new Rect(0, 0, 22, 24));
	var rend_green = new Renderable(img_towers, new Rect(22, 0, 22, 24));
	var rend_red = new Renderable(img_towers, new Rect(44, 0, 22, 24));
	var rend_black = new Renderable(img_towers, new Rect(66, 0, 22, 24));
	var rend_white = new Renderable(img_towers, new Rect(88, 0, 22, 24));
	
	var ttype_green = new TowerType(rend_green, 20, 2, 155, "#0f0", 1);
	var ttype_blue = new TowerType(rend_blue, 40, 4, 170, "#0080ff", 1);
	var ttype_red = new TowerType(rend_red, 80, 8, 185, "#f00", 1);
	var ttype_black = new TowerType(rend_black, 320, 32, 200, "#000", 1);
	var ttype_white = new TowerType(rend_white, 320, 8, 400, "#fff", 2);
	
	towerTypes.push(ttype_blue);
	towerTypes.push(ttype_green);
	towerTypes.push(ttype_red);
	towerTypes.push(ttype_black);
	towerTypes.push(ttype_white);
	
	// Way Points
	wayPoints.push(new Vec2(-312, 192));
	wayPoints.push(new Vec2(-312, 96));
	wayPoints.push(new Vec2(312, 96));
	wayPoints.push(new Vec2(312, 0));
	wayPoints.push(new Vec2(-312, 0));
	wayPoints.push(new Vec2(-312, -96));
	wayPoints.push(new Vec2(312, -96));
	wayPoints.push(new Vec2(312, -192));
	wayPoints.push(new Vec2(-391, -192));
	
	// Mobs
	var rend_mob_purple = new Renderable(img_mobs, new Rect(0, 0, 14, 15));
	
	// Waves
	for (var i = 1; i < 41; i++) {
		waves.push(new Wave(
			new MobType(rend_mob_purple, 80 + 2*i, i*i, (1.10 - 0.01 * i) * i),
			3*i, 80-i
		));
	} // for( i )
	
	// Buttons
	var rend_btn_blue_norm = new Renderable(img_btn, new Rect(0, 0, 40, 40));
	var rend_btn_blue_press = new Renderable(img_btn, new Rect(0, 40, 40, 40));
	var rend_btn_green_norm = new Renderable(img_btn, new Rect(40, 0, 40, 40));
	var rend_btn_green_press = new Renderable(img_btn, new Rect(40, 40, 40, 40));
	var rend_btn_red_norm = new Renderable(img_btn, new Rect(80, 0, 40, 40));
	var rend_btn_red_press = new Renderable(img_btn, new Rect(80, 40, 40, 40));
	var rend_btn_black_norm = new Renderable(img_btn, new Rect(120, 0, 40, 40));
	var rend_btn_black_press = new Renderable(img_btn, new Rect(120, 40, 40, 40));
	var rend_btn_white_norm = new Renderable(img_btn, new Rect(160, 0, 40, 40));
	var rend_btn_white_press = new Renderable(img_btn, new Rect(160, 40, 40, 40));
	
	// green
	var btn_green = new Button(rend_btn_green_norm, rend_btn_green_press,
		new Vec2(-264, -240), 38, 38);
	btn_green.Click = function() { BuildTower(ttype_green); };
	// blue
	var btn_blue = new Button(rend_btn_blue_norm, rend_btn_blue_press,
		new Vec2(-216, -240), 38, 38);
	btn_blue.Click = function() { BuildTower(ttype_blue); };
	// red
	var btn_red = new Button(rend_btn_red_norm, rend_btn_red_press,
		new Vec2(-168, -240), 38, 38);
	btn_red.Click = function() { BuildTower(ttype_red); };
	// black
	var btn_black = new Button(rend_btn_black_norm, rend_btn_black_press,
		new Vec2(-120, -240), 38, 38);
	btn_black.Click = function() { BuildTower(ttype_black); };
	// white
	var btn_white = new Button(rend_btn_white_norm, rend_btn_white_press,
		new Vec2(-72, -240), 38, 38);
	btn_white.Click = function() { BuildTower(ttype_white); };

	btns.push(btn_blue);
	btns.push(btn_green);
	btns.push(btn_red);
	btns.push(btn_black);
	btns.push(btn_white);

	Pause(false);
} // Setup( )

// -------------------------------------

function Pause(_pause) {
	if (typeof _pause == "undefined" || _pause) {
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

		Move(sec);
		Draw(sec);

		isInGameLoop = false;
	} // if
} // GameLoop( )

// -------------------------------------

function Move(_sec) {
	var mob = null;

	var lng = mobs.length;
	for (var i = 0; i < lng; i++) {
		mob = mobs[i];
		mob.Move(mob.speed * _sec);
		if (mob.dest == null) {
			mobs.splice(i, 1);
			i--;
			lng--;
			lives--;
			if (lives <= 0)
				OnLose();
		} // if
	} // for( i )
} // Move( )

// -------------------------------------

function Draw(_sec) {
	var obj = null;
	var rect = null;
	var dest = null;

	ctx2d.drawImage(img_map, 0, 0, canvas.width, canvas.height);
	ctx2d.drawImage(img_btn, 200, 0, 40, 40, 724, 436, 40, 40);
	
	// draw towers
	var lng = towers.length;
	for (var i = 0; i < lng; i++) {
		obj = towers[i];
		rect = obj.renderable.spriteRect;
		dest = T_WorldToScreen(obj.pos).TranslateXY(-rect.w / 2, -rect.h / 2);
		ctx2d.drawImage(
			obj.renderable.img, // img
			rect.x, rect.y, rect.w, rect.h, // sx, sy, sW, sH
			dest.x, dest.y, rect.w, rect.h  // dx, dy, dW, dH
		);
	} // for( i )
	
	// draw tower being built
	if (towerBeingBuilt != null) {
		obj = towerBeingBuilt;
		rect = obj.renderable.spriteRect;
		dest = T_WorldToScreen(obj.pos).TranslateXY(-rect.w / 2, -rect.h / 2);
		ctx2d.globalAlpha = 0.5;
		ctx2d.drawImage(
			obj.renderable.img, // img
			rect.x, rect.y, rect.w, rect.h, // sx, sy, sW, sH
			dest.x, dest.y, rect.w, rect.h  // dx, dy, dW, dH
		);
		ctx2d.globalAlpha = 1.0;
	} // if

	// draw mobs
	var lng = mobs.length;
	for (var i = 0; i < lng; i++) {
		obj = mobs[i];
		rect = obj.renderable.spriteRect;
		dest = T_WorldToScreen(obj.pos);
	
		ctx2d.save();
		ctx2d.translate(dest.x, dest.y);
		ctx2d.rotate(-Math.atan2(obj.face.y, obj.face.x) + (Math.PI / 2));
		ctx2d.drawImage(
			obj.renderable.img, // img
			rect.x, rect.y, rect.w, rect.h, // sx, sy, sW, sH
			-rect.w / 2, -rect.h / 2, rect.w, rect.h  // dx, dy, dW, dH
		);
		ctx2d.restore();
	} // for( i )
	
	// draw projectiles
	var tower = null;
	var mob = null;
	var rangeSq = 0;
	var screenFromPt = null;
	var screenToPt = null;
	
	var lngTowers = towers.length;
	var lngMobs = mobs.length;
	for (var i = 0; i < lngTowers; i++) {
		tower = towers[i];
		if (tower.maxTargets <= 0)
			continue;
		tower.targets = 0;
		rangeSq = tower.range * tower.range;
		for (var j = 0; j < lngMobs; j++) {
			mob = mobs[j];
			if (tower.pos.DistanceSq(mob.pos) <= rangeSq) {
				tower.targets++;

				mob.hp -= tower.dps * _sec;
				if (mob.hp <= 0) {
					money += mob.money;
					mobs.splice(j, 1);
					lngMobs--;
				} // if

				screenFromPt = T_WorldToScreen(tower.pos.TranslateXY(0, 8));
				screenToPt = T_WorldToScreen(mob.pos);
				ctx2d.strokeStyle = tower.laserColor;
				ctx2d.lineWidth = 2;
				ctx2d.beginPath();  
				ctx2d.moveTo(screenFromPt.x, screenFromPt.y);  
				ctx2d.lineTo(screenToPt.x, screenToPt.y);
				ctx2d.stroke();

				if (tower.targets >= tower.maxTargets)
					break;
			} // if
		} // for( j )
	} // for( i )
	
	// draw UI
	ctx2d.drawImage(img_ui, 0, 432);

	// draw btns
	var lng = btns.length;
	for (var i = 0; i < lng; i++) {
		obj = btns[i];
		rect = obj.renderable.spriteRect;
		dest = T_WorldToScreen(obj.pos).TranslateXY(-rect.w / 2, -rect.h / 2);
		ctx2d.drawImage(
			obj.renderable.img, // img
			rect.x, rect.y, rect.w, rect.h, // sx, sy, sW, sH
			dest.x, dest.y, rect.w, rect.h  // dx, dy, dW, dH
		);
	} // for( i )

	// draw build number
	ctx2d.fillStyle = "#fff";
	ctx2d.font = "bold 7pt Arial";
	ctx2d.fillText("Build: " + buildNum, 4, 12);

	// draw fps
	ctx2d.fillStyle = "#fff";
	ctx2d.font = "bold 7pt Arial";
	ctx2d.fillText("fps: " + (1/_sec).toFixed(0), 4, 26);

	// draw window dimensions
	ctx2d.fillStyle = "#fff";
	ctx2d.font = "bold 7pt Arial";
	ctx2d.fillText(canvas.width + " x " + canvas.height, 4, 40);
	
	// draw money
	ctx2d.fillStyle = "#ffd700";
	ctx2d.font = "bold 8pt Arial";
	ctx2d.fillText("$" + money.toFixed(2), 4, 446);
	
	// draw lives
	ctx2d.fillStyle = "#f00";
	ctx2d.font = "bold 8pt Arial";
	ctx2d.fillText(lives + " lives", 4, 460);

	// draw wave
	ctx2d.fillStyle = "#000";
	ctx2d.font = "bold 8pt Arial";
	ctx2d.fillText("wave: " + wave, 4, 474);
} // Draw( )

// -------------------------------------

function SpawnWave(_wave) {
	wave++;

	var count = _wave.count;
	var SpawnMob = function() {
		var mob = new Mob(_wave.mobType, new Vec2(391, 192));
		mob.SetDestinationQueue(wayPoints);
		mobs.push(mob);
		count--;
		if (count <= 0)
			clearInterval(inter);
	};
	SpawnMob();
	var inter = setInterval(SpawnMob, _wave.interval / speedFactor);
} // SpawnMob

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

function OnMouseDownUI(_e) {
	if (_e.offsetY <= mapHeight)
		return;

	var btn_pressed;
	var cursor = T_ScreenToWorld(_e.offsetX, _e.offsetY);
	
	var lng = btns.length;
	for (var i = 0; i < lng; i++) {
		if (btns[i].clickRect.Contains(cursor)) {
			btn_pressed = btns[i];
			btns[i].SetVisualState("pressed");
			
			var down = function() {
				mouse.RemoveDownHandler(down);
				mouse.RemoveMoveHandler(move);
				mouse.RemoveUpHandler(up);
			}; // down( )
			
			var move = function(_e2) {
				var contains = btn_pressed.clickRect.Contains(
					T_ScreenToWorld(_e2.offsetX, _e2.offsetY) );
				var state = btn_pressed.GetVisualState();
				if (state == "pressed" && !contains) {
					btn_pressed.SetVisualState("normal");
				} else if (state == "normal" && contains) {
					btn_pressed.SetVisualState("pressed");
				} // if/else
			}; // move( )
			
			var up = function(_e2) {
				down();

				var contains = btn_pressed.clickRect.Contains(
					T_ScreenToWorld(_e2.offsetX, _e2.offsetY) );
				
				if (contains) {
					btn_pressed.SetVisualState("normal");
					btn_pressed.Click(_e2);	
				} // if
			};
			
			mouse.AddDownHandler(down);
			mouse.AddMoveHandler(move);
			mouse.AddUpHandler(up);
		} // if
	} // for( i )
} // OnMouseDown( )

// -------------------------------------

function BuildTower(_ttype) {
	if (_ttype.cost > money || towerBeingBuilt != null)
		return;
		
	towerBeingBuilt = new Tower(_ttype, new Vec2(0, -240));

	var move = function(_e) {
		if (_e.offsetY >= mapHeight)
			return;

		var pos = T_ScreenToWorld(_e.offsetX - (_e.offsetX % 24) + 12,
			_e.offsetY - (_e.offsetY % 24) + 12);

		towerBeingBuilt.pos = pos;
	}; // move( )
	
	var up = function(_e) {
		var grid = T_ScreenToGrid(_e.offsetX, _e.offsetY);
		if (_e.offsetY >= mapHeight || !buildable[grid.y][grid.x])
			return;

		mouse.RemoveMoveHandler(move);
		mouse.RemoveUpHandler(up);
		money -= _ttype.cost;
		towers.push(towerBeingBuilt);
		towerBeingBuilt = null;
	}; // up( )
	
	document.onkeyup = function(_e) {
		if (_e.keyCode == 27) {// ESC Key
			document.onkeyup = function() {};
			towerBeingBuilt = null;
			mouse.RemoveMoveHandler(move);
			mouse.RemoveUpHandler(up);
		} // if
	}; // keyup( )
	
	mouse.AddMoveHandler(move);
	mouse.AddUpHandler(up);
} // BuildTower( )

// -------------------------------------

function T_WorldToScreen(_vec2) {
	return new Vec2((mapWidth / 2) + _vec2.x, (mapHeight / 2) - _vec2.y);
} // T_ObjectToWorld( )

// -------------------------------------

function T_ScreenToWorld(_x, _y) {
	return new Vec2(_x - (mapWidth / 2), -_y + (mapHeight / 2));
} // T_ObjectToWorld( )

// -------------------------------------

function T_ScreenToGrid(_x, _y) {
	return new Vec2(_x / 24 | 0, _y / 24 | 0);
} // T_ObjectToWorld( )

// -------------------------------------

// =============================================================================
//	CLASS:	TowerType
// =============================================================================

function TowerType(_renderable, _cost, _dps, _range, _laserColor, _maxTargets) {
	this.cost = _cost;
	this.dps = _dps;
	this.laserColor = _laserColor;
	this.maxTargets = _maxTargets;
	this.range = _range;
	this.renderable = _renderable;
} // class TowerType

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

TowerType.prototype.cost;
TowerType.prototype.dps;
TowerType.prototype.laserColor;
TowerType.prototype.maxTargets;
TowerType.prototype.range;
TowerType.prototype.renderable;

// =============================================================================
//	CLASS:	Tower
// =============================================================================

function Tower(_towerType, _pos) {
	StaticEntity.call(this, _towerType.renderable, _pos);
	this.maxTargets = _towerType.maxTargets;
	this.dps = _towerType.dps;
	this.laserColor = _towerType.laserColor;
	this.range = _towerType.range;
	this.targets = 0;
} // class Tower

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

// inherit StaticEntity
Tower.prototype = new StaticEntity();
Tower.prototype.dps;
Tower.prototype.laserColor;
Tower.prototype.maxTargets;
Tower.prototype.range;
Tower.prototype.targets;

// =============================================================================
//	CLASS:	MobType
// =============================================================================

function MobType(_renderable, _speed, _hp, _money) {
	this.baseHp = _hp;
	this.money = _money;
	this.renderable = _renderable;
	this.speed = _speed;
} // class MobType

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

MobType.prototype.baseHp;
MobType.prototype.money;
MobType.prototype.renderable;
MobType.prototype.speed;

// =============================================================================
//	CLASS:	Mob
// =============================================================================

function Mob(_mobType, _pos) {
	MobileEntity.call(this, _mobType.renderable, _pos, _mobType.speed);
	this.baseHp = this.hp = _mobType.baseHp;
	this.money = _mobType.money;
} // class Mob

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

// inherit StaticEntity
Mob.prototype = new MobileEntity();
Mob.prototype.baseHp;
Mob.prototype.hp;
Mob.prototype.money;

// =============================================================================
//	CLASS:	Button
// =============================================================================

function Button(_rendNorm, _rendPress, _pos, _w, _h) {
	StaticEntity.call(this, _rendNorm, _pos);

	this.clickRect = new Rect(_pos.x - _w / 2, _pos.y + _h / 2, _w, _h);
	this.rendNorm = _rendNorm;
	this.rendPress = _rendPress;
	this.SetVisualState("normal");
} // class Button

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

// inherit StaticEntity
Button.prototype = new StaticEntity();
Button.prototype.clickRect;
Button.prototype.rendNorm;
Button.prototype.rendPress;
Button.prototype.visualState;

// -----------------------------------------------------------------------------
//	class functions
// -----------------------------------------------------------------------------

Button.prototype.SetVisualState = function(_state) {
	this.visualState = _state;
	switch(_state) {
		case "pressed": this.renderable = this.rendPress; break;
		case "normal": // fall through
		default: this.renderable = this.rendNorm; break;
	} // switch
} // SetVisualState( )

// -------------------------------------

Button.prototype.GetVisualState = function() {
	return this.visualState;
} // SetVisualState( )

// -------------------------------------

// Public Members
return {
	Setup:Setup
}; // public members

})();

