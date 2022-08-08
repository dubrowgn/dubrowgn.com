<?php

require($_SERVER['DOCUMENT_ROOT'] . '/_include/api.php');

// HEAD
$head = new BasicHead();
$head->title("Canvas TD | A Native JavaScript Tower Defense Game - DuBrowgn.com");
$head->description("Canvas TD is a native JavaScript game, belonging to the tower defense genre, that is very simple and unbalanced, but fun to play regardless. Play now!");
$head->canonicalUrl("http://www.dubrowgn.com/canvas-td/");
$head->keywords('dubrowgn, web programming, web development, html canvas, canvase td, game engine, javascript, html, html5');
$head->embedCssFile("styles.css");
$head->output();

// BODY
body::open();
$cb = new BasicContentBlock("blue", "ltb");
$cb->open();
$cb->h1('Canvas TD');
?>
							<p>Canvas TD is a native JavaScript game, belonging to the tower defense genre. The original goal of Canvas TD was to be the first fully playable JavaScript game I had ever written. It is no surprise that Canvas TD is very simple and unbalanced, but it is fun to play regardless.</p>
							<p><a href="/canvas-td/game/">Play Canvas TD</a></p>
							<div class="img-box">
								<a href="/canvas-td/game/"><img src="/media/canvas-td/canvas-td.jpg" title="Click to play Canvas TD!" alt="Canvas TD running in Google Chrome under CrunchBang Linux"></a>
								<p>Canvas TD running in Google Chrome under CrunchBang Linux</p>
							</div>
							<h2>How to Play</h2>
							<p>Build defensive towers to keep the bad guys from reaching the end of the road. Each tower has its own unique capabilities, so plan your tower organization wisely!</p>
							<p><span class="leadin">Note:</span> The <span style="color:red">red</span> towers are broken in this version. It's best to avoid them.</p>
							<h3>Key Bindings</h3>
							<ul>
								<li>q,w,e,r,t &mdash; hot keys for building towers</li>
								<li>esc &mdash; cancel tower build</li>
								<li>space &mdash; pause / resume</li>
								<li>F11 &mdash; fullscreen</li>
							</ul>
							<h2>About the Game</h2>
							<p>The original implementation was written almost entirely on university time, in an effort to stay productive in a particularly underwhelming class. There were plans to port Canvas TD to the <a href="http://impulsejs.com">Impulse.js</a> engine (a later project of mine), but they have yet to be realized. Due to the lack of progess, I decided to post the project as is.</p>
<?php
$cb->close();

// FOOTER
BasicFooter::generic();

// close body
body::close();

?>