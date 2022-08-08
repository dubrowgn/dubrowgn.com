<?php

require('_include/api.php');

// HEAD
$head = new BasicHead();
$head->title("Script Engine | A Game Engine Experiment for the Web - DuBrowgn.com");
$head->description("Script Engine is being developed as a fully featured game engine for internet browsers.");
$head->canonicalUrl("http://www.dubrowgn.com/renamer.php");
$head->keywords('dubrowgn, web programming, web development, script engine, game engine, javascript, html, html5');
$head->embedCssFile("styles.css");
$head->embedCssFile("script_engine/script_engine.css");
$head->output();

// BODY
body::open();

$page = "";
if (isset($_GET['about']))
	$page = "about";
else if (isset($_GET['dev']))
	$page = "dev";

$cb = new BasicContentBlock("white");
$cb->open();
$lb = new BasicLinkBar();
switch($page) {
case "about":
	$lb->center("<a href=\"./script_engine.php\">Release (v0.1)</a>");
	$lb->center("<a href=\"./script_engine.php?dev\">Development (v0.2)</a>");
	$lb->center("About Script Engine");
	break;
case "dev":
	$lb->center("<a href=\"./script_engine.php\">Release (v0.1)</a>");
	$lb->center("Development (v0.2)");
	$lb->center("<a href=\"./script_engine.php?about\">About Script Engine</a>");
	break;
default:
	$lb->center("Release (v0.1)");
	$lb->center("<a href=\"./script_engine.php?dev\">Development (v0.2)</a>");
	$lb->center("<a href=\"./script_engine.php?about\">About Script Engine</a>");
} // switch( $page )
$lb->output();
$cb->close();

$cb = new BasicContentBlock("blue", "right");
$cb->open();
switch($page) {
case "about":
	$cb->h1("About Script Engine");
?>
			<p>Script Engine is being developed as a fully featured game engine for internet browsers. The goal is to use only built-in browser technologies such as JavaScript and HTML DOM, to provide a complete and consistent cross-platform experience.</p>
<?php
	$cb->close();
	$cb->open();
	$cb->h1("Roadmap");
?>
			<h2>Initial Technology and Performance Evaluation <span class="subhead">(Version 0.1)</span></h2>
			<ul>
				<li>Frame based animations are possible</li>
				<li>Frame based animations are smooth</li>
				<li>Sufficient JavaScript performance available</li>
				<li>Sufficient user input hooks available</li>
				<li>Test various rendering methodologies</li>
			</ul>
			<h2>Pathfinding and Obstacle Avoidance <span class="subhead">(Current Development)</span></h2>
			<ul>
				<li>Macro-node based pathfinding</li>
				<li>Attraction/repulsion based path-traversal</li>
				<li>Spacial partitioning system</li>
			</ul>
			<p><span class="leadin">Note:</span> These points are subject to change as development progresses.</p>
			<h2>Short Term Goals <span class="subhead">(Future Development)</span></h2>
			<ul>
				<li>Evaluate CSS sprites for use in animations</li>
			</ul>
			<h2>Long Term Goals <span class="subhead">(Mostly Speculation)</span></h2>
			<ul>
				<li>User interface</li>
				<li>Audio</li>
				<li>Worker threads</li>
				<li>Off-line storage</li>
				<li>Network sockets</li>
			</ul>
<?php
	$cb->close();
	break;
case "dev":
	$cb->h1("Script Engine", "Development");
?>
			<h2>Canvas TD</h2>
			<ul>
				<li><a href="script_engine/CanvasTD/learn.html">Canvas TD</a> (Apr / 9 / 2011)</li>
			</ul>
			<h2>Sub-System Tests</h2>
			<ul>
				<li><a href="script_engine/development/pathfinding.html">Pathfinding</a> (Apr / 24 / 2010)</li>
				<li><a href="script_engine/development/scenemanager/quadtree_driver.html">Quadtree Driver</a> (Apr / 24 / 2010)</li>
				<li><a href="script_engine/development/scenemanager/scenemanager_driver.html">SceneManager Driver</a> (May / 15 / 2010)</li>
				<li><a href="script_engine/development/entity/entity_driver.html">Entity Driver</a> (Apr / 24 / 2010)</li>
			</ul>
			<h2>Benchmarks</h2>
			<ul>
				<li><a href="script_engine/development/benchmarks/array vs switch vs associative array.html">Array vs Switch vs Associative Array</a> (May / 15 / 2010)</li>
				<li><a href="script_engine/development/benchmarks/check for undefined vs null.html">Check Undefined vs Null</a> (Sept / 24 / 2011)</li>
				<li><a href="script_engine/development/benchmarks/functions.html">Functions</a> (May / 15 / 2010)</li>
			</ul>
<?php
	break;
default:
	$cb->h1("Script Engine", "Release");
	echo "$const_tabs<p><iframe id=\"gameframe\" class=\"game-window\" src=\"script_engine/0.1/start.html\" scrolling=\"no\" frameborder=\"0\" onclick=\"Init()\"></iframe></p>\n";
} // switch( $page )
$cb->close();

// FOOTER
BasicFooter::generic();

// close body
body::close();

?>
