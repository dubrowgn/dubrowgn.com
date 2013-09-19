<?php

require('_include/api.php');

// HEAD
$head = new BasicHead();
$head->title("About | An Explanation for DuBrowgn.com - DuBrowgn.com");
$head->description("DuBrowgn.com is a portfolio and test bed for web development and other programming experiments. Check out cool projects on the site, or read the blog.");
$head->canonicalUrl("http://www.dubrowgn.com/about.php");
$head->keywords('dubrowgn, about the site, web programming, web development, php, javascript, dustin brown, experiments, portfolio');
$head->embedCssFile("styles.css");
$head->embedCssFile("about/about.css");
$head->output();

// BODY
body::open();
$cb = new BasicContentBlock("blue", "ltb");
$cb->open();
$cb->h1('About DuBrowgn.com');
?>
							<p>DuBrowgn.com was originally designed as a test bed for an assortment of different web experiments, but it has since grown to encompass a simple portfolio and hosting for other projects.</p>
							<h2>Contact</h2>
							<p>Send thoughts, feedback, questions, etc to <a href="mailto:dbrown@dubrowgn.com">dbrown@dubrowgn.com</a>.</p>
							<h2>Browser Compatibility</h2>
							<p>This site is checked against the following browsers and platforms:</p>
							<div>
								<span class="ico-48"></span>
								<a class="ico-48 chrome" href="http://www.google.com/chrome" title="Google Chrome"></a>
								<a class="ico-48 firefox" href="http://www.mozilla.com" title="Firefox"></a>
								<a class="ico-48 ie" href="http://www.microsoft.com/windows/internet-explorer/default.aspx" title="Internet Explorer"></a>
								<a class="ico-48 konqueror" href="http://www.konqueror.org" title="Konqueror"></a>
								<a class="ico-48 opera" href="http://www.opera.com" title="Opera"></a>
								<a class="ico-48 safari" href="http://www.apple.com/safari" title="Safari"></a>
							</div>
							<div>
								<span class="ico-48 linux" title="Linux"></span>
								<span class="ico-48 check"></span>
								<span class="ico-48 check"></span>
								<span class="ico-48"></span>
								<span class="ico-48 check"></span>
								<span class="ico-48 check"></span>
								<span class="ico-48"></span>
							</div>
							<div>
								<span class="ico-48 windows" title="Windows"></span>
								<span class="ico-48 check"></span>
								<span class="ico-48 check"></span>
								<span class="ico-48 check"></span>
								<span class="ico-48"></span>
								<span class="ico-48 check"></span>
								<span class="ico-48 check"></span>
							</div>
							<p><span class="leadin">Note:</span> Browsers used for testing are typically the latest stable or development release. If you're having difficulties, try using the latest stable version of your browser. You can also report glitches to the email address listed under the <em>'Contact'</em> section above.</p>
							<p><span class="leadin">Note:</span> Internet Explorer versions 6 and below are technically not supported. Version 8 (or higher) is recommended.</p>
<?php
$cb->close();

// FOOTER
BasicFooter::generic();

// close body
body::close();

?>
