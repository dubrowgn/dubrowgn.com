<?php

require('_include/api.php');

// HEAD
$head = new BasicHead();
$head->title("Image Gallery | A Performant Image Gallery in JavaScript - DuBrowgn.com");
$head->description("A JavaScript proof-of-concept image gallery, designed for high performance, even on slow connections.");
$head->canonicalUrl("http://www.dubrowgn.com/image_gallery.php");
$head->keywords('dubrowgn, web programming, web development, image gallery, wallpaper, javascript, proof-of-concept');
$head->embedCssFile("styles.css");
$head->embedCssFile("image_gallery/image_gallery.css");
$head->linkJs("image_gallery/image_gallery.js");
$head->output();

// BODY
body::open();

// CONTENT
$cb = new BasicContentBlock("blue", "right");
$cb->open();
$cb->h1("Image Gallery", "Wallpapers");
?>
			<table class="gallery">
				<tr>
					<td><span id="loadView" class="load lg">Loading...</span><a id="anchor" href=""><img id="picView" class="lg tall" src="" alt="Click to View Full Size" title="Click to View Full Size"/></a></td>
					<td class="td-seek">
						<span id="loadBack" class="load sm">Loading...</span><img id="picBack" class="sm short" src="" alt="Click to Enlarge" title="Click to Enlarge" onclick="advance(-1)"/>
						<p>Viewing: <span id="index"></span></p>
						<p><a href="" onclick="return advance(-3)">&lt;&lt;--</a> Seek 3 <a href="" onclick="return advance(3)">--&gt;&gt;</a></p>
						<span id="loadNext" class="load sm">Loading...</span><img id="picNext" class="sm short" src="" alt="Click to Enlarge" title="Click to Enlarge" onclick="advance(1)"/>
					</td>
				</tr>
			</table>
			<img id="picBuffer" class="hide" src="" alt=""/>
			<noscript>
				<p>A browser supporting JavaScript is required to use the Image Gallery.</p>
			</noscript>
			<script type="text/javascript"><!--
				Init();
			// --></script>
<?php
$cb->close();
$cb->open();
$cb->h1("About the Image Gallery");
?>
			<p>The primary goals during development of this image gallery were high performance and ease of use. The gallery implements image pre-caching to keep transition times as close to instant as possible, even on low bandwidth connections.</p>
			<h2>Download the Entire High Resolution Set</h2>
			<p><a href="/media/image-gallery/High Resolution Photo Set.zip">High Resolution Photo Set.zip</a> (34.0MB) - Jul / 08 / 2009</p>
<?php
$cb->close();

// FOOTER
BasicFooter::generic();

// close body
body::close();

?>
