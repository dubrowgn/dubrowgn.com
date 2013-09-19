<?php

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	PRE-INITIALIZATIONS
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

// start execution timer
$php_start_time = microtime(true);

// load server config options
require("config.php");

// define default tab depth
define('TABS', "\t\t\t\t\t\t\t");
$const_tabs = TABS;

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	STATIC CLASSES
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


// _______________________________________________________________________(_404)
class _404 {
	public static function echoContentBlock() {
		$cb = new BasicContentBlock("blue", "ltb");
		$cb->open();
		$cb->h1('The Page You Requested Could Not Be Found!','Server Error: 404');
		static::echoContent();
		$cb->close();
	} // echoContentBlock( void )
	
	public static function echoContent() {
?>
						<p>The page you tried to access does not exist on this server. This page may not exist due to the following reasons:</p>
						<ol style="margin-right:1em">
							<li>
								<p class="leadin">The URL that you have entered in your browser is incorrect.</p>
								<p>If you think the page should exist, please re-enter the URL and try again.</p>
							</li>
							<li>
								<p class="leadin">The link that you clicked on incorrectly points to a page that does not exist.</p>
								<p>If you reached this page via a link originating from <a href="http://www.dubrowgn.com">DuBrowgn.com</a>, please report it to <a href="mailto:dbrown@dubrowgn.com">dbrown@dubrowgn.com</a>.</p>
							</li>
						</ol>
						<p>If you believe you reached this page in error, please contact <a href="mailto:dbrown@dubrowgn.com">dbrown@dubrowgn.com</a>.</p>
<?php
	} // echoContent( void )
} // staic class 'comment'

// _______________________________________________________________________(body)
class body {
	public static function open($showNav = true) {
//<script>
	//var GoogleAnalyticsObject = 'ga';
	//var ga = {
		//l: 1 * new Date(),
		//q: [ ['create', 'UA-37966821-2', 'dubrowgn.com'], ['send', 'pageview'] ]
	//};
	
	//var script = document.createElement('script');
	//script.async = 1;
	//script.src = '//www.google-analytics.com/analytics.js';
//</script>
?>
	<body><div class="bg-hex">
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		
		ga('create', 'UA-37966821-2', 'dubrowgn.com');
		ga('send', 'pageview');
	</script>
	<div class="main-title"></div>
<?php
		if ($showNav) {
?>
	<!-- BEGIN NAVIGATION -->
	<table class="table-grid"><tr><td class="td-grid">
<?php static::echoNav() ?>
	</td>
	<!-- BEGIN CONTENT -->
	<td class="td-grid">
<?php
		} // if
		else {
?>
	<!-- BEGIN CONTENT -->
	<table class="table-grid"><tr><td class="td-grid">
<?php
		} // else
	} // open( [bool] )
	
	public static function close() {
?>
	</body>
</html>
<?php
	} // close( void )
	
	public static function echoNav() {
		//$menu = [
		//	"Main" => [
		//		"Home" => "/",
		//		"Blog" => "/blog.php",
		//		"About" => "/about.php"
		//	],
		//	"JavaScript" => [
		//		"Script Engine" => "/script_engine.php",
		//		"Image Gallery" => "/image_gallery.php"
		//	],
		//	"Utilities" => [
		//		"Renamer" => "/renamer.php"
		//	]
		//];

		//$nav = new BasicNavigation($menu);
		//$nav->output();

?>
		<div class="cb cb-black-white">
			<div class="bdr-tr"><div class="bdr-t"></div></div>
				<div class="bdr-r">
					<div class="content menu">
						<h3>Main</h3>
						<p>
							<a href="/">Home</a>
							<a href="/blog.php">Blog</a>
							<a href="/about.php">About</a>
						</p>
						<h3>JavaScript</h3>
						<p>
							<a href="/script_engine.php">Script Engine</a>
							<a href="/image_gallery.php">Image Gallery</a>
						</p>
						<h3>Utilities</h3>
						<p>
							<a href="/renamer.php">Renamer</a>
						</p>
					</div>					
				</div>
			<div class="bdr-br"><div class="bdr-b"></div></div>
		</div>
<?php
	} // echoNav( void )
} // static class 'body'

// ____________________________________________________________________(comment)
class comment {
	public static function echoHtml($tabs = TABS) {
		echo "$tabs<div class=\"hr-blue\"></div>\n";
		echo "$tabs<div id=\"disqus_thread\"></div>\n";
		echo "$tabs<noscript>Please enable JavaScript to view the <a href=\"http://disqus.com/?ref_noscript\">comments powered by Disqus.</a></noscript>\n";
		echo "$tabs<a href=\"http://disqus.com\" class=\"dsq-brlink\">comments powered by <span class=\"logo-disqus\">Disqus</span></a>\n";
	} // echoHtml( [string] )
	
	public static function echoJavascript($identifier, $title, $url, $tabs = "\t") {
		echo "$tabs<script type=\"text/javascript\">\n";
		echo "$tabs	var disqus_shortname = 'dubrowgn';\n";
		echo "$tabs	var disqus_identifier = '{$identifier}';\n";
		echo "$tabs	var disqus_title = '" . str_replace("'", "\'", $title) . "';\n";
		echo "$tabs	var disqus_url = '{$url}';\n";
		echo "\n";
		echo "$tabs	var dsq = document.createElement('script');\n";
		echo "$tabs	dsq.type = 'text/javascript';\n";
		echo "$tabs	dsq.async = true;\n";
		echo "$tabs	dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';\n";
		echo "$tabs	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);\n";
		echo "$tabs</script>\n";
	} // echoJavascript( [string] )
} // staic class 'comment'

// ________________________________________________________________________(url)
class url {
	public static function redirect($page) {
		$host = $_SERVER['HTTP_HOST'];
		$dir = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
		header("Location: http://{$host}{$dir}/{$page}");
		
		//exit();
	} // top( void )
} // static class 'linkBar'


/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	CLASSES
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


class BasicContentBlock {
	private $_close = "";
	private $_open = "";
	private $_tabs;

	public function __construct($color = "blue", $sides = "ltb", $tabs = "\t\t\t") {
		// cache tab depth
		$this->_tabs = $tabs;

		// generate container parts
		$top = "";
		$sidesOpen = "";
		$sidesClose = "";
		$bottom = "";

		if (strpos($sides, 't') !== false)
			$top = "<div class=\"bdr-t\"></div>";

		if (strpos($sides, 'b') !== false)
			$bottom = "<div class=\"bdr-b\"></div>";

		if (strpos($sides, 'r') !== false) {
			$top = "<div class=\"bdr-tr\">$top</div>";
			$sidesOpen = "<div class=\"bdr-r\">";
			$sidesClose = "</div>";
			$bottom = "<div class=\"bdr-br\">$bottom</div>";
		} // if

		if (strpos($sides, 'l') !== false) {
			$top = "<div class=\"bdr-tl\">$top</div>";
			$sidesOpen = "<div class=\"bdr-l\">$sidesOpen";
			$sidesClose = "</div>$sidesClose";
			$bottom = "<div class=\"bdr-bl\">$bottom</div>";
		} // if

		// generate open markup
		$this->_open .= "$tabs<div class=\"cb cb-black-{$color}\">\n";
		if (!empty($top))
			$this->_open .= "$tabs\t$top\n";
		if (!empty($sidesOpen))
			$this->_open .= "$tabs\t\t$sidesOpen\n";
		$this->_open .= "$tabs\t\t\t<div class=\"content\">\n";

		// generate close markup
		$this->_close .= "$tabs\t\t\t</div>\n";
		if (!empty($sidesClose))
			$this->_close .= "$tabs\t\t$sidesClose\n";
		if (!empty($bottom))
			$this->_close .= "$tabs\t$bottom\n";
		$this->_close .= "$tabs</div>\n";
	} // __construct( )

	public function open() {
		echo $this->_open;
	} // open( )

	public function close() {
		echo $this->_close;
	} // close( )
	
	public function h1($_header, $_subHeader = false) {
		$subHeader = $_subHeader === false ? "" : " <span class=\"subhead\">($_subHeader)</span>";
		echo "{$this->_tabs}\t\t\t\t<h1>$_header$subHeader</h1>\n";
	} //h1( )

	public function h2($_header, $_subHeader = false) {
		$subHeader = $_subHeader === false ? "" : " <span class=\"subhead\">($_subHeader)</span>";
		echo "{$this->_tabs}\t\t\t\t<h2>$_header$subHeader</h2>\n";
	} //h2( )
} // class

class BasicFooter {
	private $_cb;
	private $_lb;

	public function __construct($color = "white", $sides = "ltrb") {
		$this->_cb = new BasicContentBlock($color, $sides, "\t\t");
		$this->_lb = new BasicLinkBar("\t\t\t\t\t\t");
	} // __construct( )

	public function left($content) {
		$this->_lb->left($content);
	} // left( )

	public function center($content) {
		$this->_lb->center($content);
	} // center( )

	public function right($content) {
		$this->_lb->right($content);
	} // right( )

	public function output() {
		echo "\t\t</td></tr></table>\n";
		echo "\t\t<!-- BEGIN FOOTER -->\n";

		$this->_cb->open();
		$this->_lb->output();
		$this->_cb->close();
		echo "\t</div>\n";
	} // output( )

	public static function generic() {
		// create new basic footer
		$footer = new BasicFooter();
		
		// add server time and last updated
		$footer->center("Server Time - " . get_execution_ms() . "ms");
		$footer->center("Updated - " . date("F j, Y", filemtime($_SERVER['SCRIPT_FILENAME'])));

		// output footer
		$footer->output();
	} // generic( )
} // class

class BasicHead {
	private $_css = "";
	private $_js = "";
	private $_jss = [];
	private $_links = [ '<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />' ];
	private $_metas = [ '<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />' ];
	private $_title = "";
	
	public function linkJs($src, $async = false) {
		// normalize async attribute
		$async = empty($async) ? "" : " async";

		// append js tag
		$this->_jss[] = "<script type=\"text/javascript\" src=\"$src\"$async></script>";
	} // linkJs( )
	
	public function linkCss($href) {
		$this->_links[] = "<link rel=\"stylesheet\" type=\"text/css\" href=\"$href\" />";
	} // linkCss( )

	public function embedJs($js) {
		throw new Exception('Not implemented!');
	} // embedJs( )

	public function embedJsFile($url) {
		// normalize url
		$url = rtrim($_SERVER['DOCUMENT_ROOT'], "/") . "/" . ltrim($url, "/");

		// embed js
		$this->embedJs(file_get_contents($url));
	} // embedJsFile( )

	public function embedCss($css) {
		// minimize css and append
		$this->_css .= preg_replace("/(\/\*.*?\*\/|\n|\t|\r)/s", "", $css);
	} // embedCss( )

	public function embedCssFile($url) {
		// normalize url
		$url = rtrim($_SERVER['DOCUMENT_ROOT'], "/") . "/" . ltrim($url, "/");

		// embed css
		$this->embedCss(file_get_contents($url));
	} // embedCssFile( )

	public function title($title) {
		$this->_title = $title;
	} // title( )

	public function description($description) {
		$this->_metas[] = "<meta name=\"description\" content=\"$description\" />";
	} // description( )

	public function keywords($keywords) {
		$this->_metas[] = "<meta name=\"keywords\" content=\"$keywords\" />";
	} // keywords( string )

	public function canonicalUrl($href) {
		$this->_links[] = "<link rel=\"canonical\" href=\"$href\"/>";
	} // canonicalUrl( )

	public function link($rel, $type, $href) {
		$this->_links[] = "<link rel=\"$rel\" type=\"$type\" href=\"$href\"/>";
	} // link( )

	public function metadata($name, $content) {
		$this->_metas[] = "<meta name=\"$name\" content=\"$keywords\" />";
	} // metadata( )

	public function output() {
		// open
		echo '<!DOCTYPE html>', "\n";
		echo '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">', "\n";
		echo '	<head>', "\n";

		// title
		if (!empty($this->_title))
			echo "\t\t<title>{$this->_title}</title>\n";

		// metadata tags
		foreach ($this->_metas as $m) {
			echo "\t\t$m\n";
		} // foreach( $m )

		// link tags
		foreach ($this->_links as $l) {
			echo "\t\t$l\n";
		} // foreach( $l )

		// embeded minified css
		if (!empty($this->_css))
			echo "\t\t<style type=\"text/css\">{$this->_css}</style>\n";

		// javascript tags
		foreach ($this->_jss as $j) {
			echo "\t\t$j\n";
		} // foreach( $j )

		// embeded minified javascript
		if (!empty($this->_js))
			echo "\t\t<sctript>{$this->_js}</style>\n";

		// close
		echo "\t</head>\n";
	} // echo( )
} // class

class BasicLinkBar {
	private $_tabs;
	private $_left = [];
	private $_center = [];
	private $_right = [];

	public function __construct($tabs = "\t\t\t\t\t\t\t") {
		$this->_tabs = $tabs;
	} // __construct( )

	public function left($content) {
		$this->_left[] = $content;
	} // left( )

	public function center($content) {
		$this->_center[] = $content;
	} // center( )

	public function right($content) {
		$this->_right[] = $content;
	} // right( )

	public function output() {
		echo "{$this->_tabs}<div class=\"link-bar\">\n";
		
		foreach($this->_left as $l) {
			echo "{$this->_tabs}\t<span class=\"left\">$l</span>\n";
		} // foreach( $l )

		foreach($this->_center as $c) {
			echo "{$this->_tabs}\t<span class=\"center\">$c</span>\n";
		} // foreach( $c )

		foreach($this->_right as $r) {
			echo "{$this->_tabs}\t<span class=\"right\">$r</span>\n";
		} // foreach( $r )

		echo "{$this->_tabs}</div>\n";
	} // output( )
} // class

class BasicNavigation {
	private $_cb;
	private $_menu;
	private $_tabs;

	public function __construct($menu, $tabs = "\t\t") {
		$this->_menu = $menu;
		$this->_tabs = $tabs;
		$this->_cb = new BasicContentBlock("white", "trb", $tabs);
	} // __construct( )

	public function output() {
		$this->_cb->open();
		echo "{$this->_tabs}\t\t\t\t<div class=\"menu\">\n";

		foreach($this->_menu as $section => $submenu) {
			echo "{$this->_tabs}\t\t\t\t<h3>$section</h3>\n";
			echo "{$this->_tabs}\t\t\t\t<p>\n";
			foreach($submenu as $name => $href) {
				echo "{$this->_tabs}\t\t\t\t\t<a href=\"$href\">$name</a>\n";
			} // foreach( $name => $href )
			echo "{$this->_tabs}\t\t\t\t</p>\n";
		} // foreach( $section => $submenu )

		echo "{$this->_tabs}\t\t\t\t</div>\n";
		$this->_cb->close();
	} // output( )
} // class


/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	GLOBAL FUNCTIONS
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

// _________________________________________________________________(db_connect)
function db_connect() {
	// CONNECT TO DATABASE
	$mysqli = new mysqli(\config\sql_host, \config\sql_username, \config\sql_password, \config\sql_database);

	// CHECK FOR CONNECTION FAILURE
	if ($mysqli->connect_error) {
		$error = 'Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error;
	 	email_error(__FILE__, __LINE__ - 1, $error);
	 	die("<p>There was an error while connecting to the database, and the site admin has been notified. Please try again later.</p>");
	} // if

	return $mysqli;
} // db_connect( void )

// ________________________________________________________________(email_error)
function email_error($file, $line, $_error) {
	// print error message if in development mode
	if (\config\isDev)
		echo "<p>ERROR (debug): File - $file (line $line)</p><p>Error Message: $_error</p>";

	// send email if webmaster email is configured
	if (\config\webmaster_email !== null) {
		// create email headers
		$headers = "MIME-Version: 1.0\n" ;
		$headers .= "Content-type: text/plain; charset=UTF-8\n";
		$headers .= "From: Error Dispatcher <noreply@dubrowgn.com>\n";
		$headers .= "X-Priority: 1 (Highest)\n";
		$headers .= "X-MSMail-Priority: High\n";
		$headers .= "Importance: High\n"; 

		// email the error details to the site admin (dbrown@dubrowgn.com)
		if (mail(\config\webmaster_email,
			"An error has occurred on DuBrowgn.com",
			"The following error has occurred on DuBrowgn.com:\n\nFile -\n$file (line $line)\n\nError -\n$_error",
			$headers))
			return true;
	} // if

	return false;
} // email_error( )

// ___________________________________________________________(get_execution_ms)
function get_execution_ms() {
	global $php_start_time;
	
	return number_format((microtime(true) - $php_start_time) * 1000, 2);
} // get_execution_ms( void )

// ________________________________________________________________(include_php)
function include_php($_url) {
	$url = rtrim($_SERVER['DOCUMENT_ROOT'], "/") . "/" . ltrim($_url, "/");

	if (!include($url))
		email_error(__FILE__, __LINE__, "Failed to open '$url' for inclusion.");
} // include_php( string )


/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	POST-INITIALIZATIONS
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

?>
