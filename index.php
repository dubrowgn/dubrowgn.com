<?php

require('_include/api.php');
$mysqli = db_connect();

// HEAD
$head = new BasicHead();
$head->title("News | The Latest News and Current Events - DuBrowgn.com");
$head->description("Get the latest scoop on DuBrowgn.com. Read up on trending topics including programming, security, the web, and other interests.");
$head->canonicalUrl("http://www.dubrowgn.com/");
$head->keywords('dubrowgn, news, web programming, web development, php, javascript, dustin brown');
$head->embedCssFile("styles.css");
$head->output();

// BODY
body::open();

// CONTENT
$const_limit = 5;
$start = (isset($_GET['start']) ? intval($_GET['start']) : 0 );

// FETCH / FORMAT / DUMP NEWS DATA FROM DATABASE
$query = "SELECT title, body, DATE_FORMAT(date,\"%M %e, %Y\") AS date FROM news ORDER BY id DESC LIMIT ?,?";
if ($stmt = $mysqli->prepare($query)) {
	$stmt->bind_param("ii", $start, $const_limit);
	if (!$stmt->execute())
		log::err($stmt->error . "\n\nSQL Query: $query");

	$stmt->bind_result($title, $body, $date);
	$cb = new BasicContentBlock("blue", "right");
	while ($stmt->fetch()) {
		$cb->open();
		$cb->h1($title, $date);
		echo preg_replace("/^/m", TABS, $body), "\n";
		$cb->close();
	} // while

	$stmt->close();
} else
	log::err($mysqli->error . "\n\nSQL Query: $query");

// FOOTER
// get the number of rows for table `news`
$query = "SELECT COUNT(id) FROM news";
if ($stmt = $mysqli->prepare($query)) {
	if (!$stmt->execute())
		log::err($stmt->error . "\n\nSQL Query: $query");

	$stmt->bind_result($rows);
	if (!$stmt->fetch())
		$rows = NULL;

	$stmt->close();
} else
	log::err($mysqli->error . "\n\nSQL Query: $query");

$footer = new BasicFooter();
// PREVIOUS
if ($start + $const_limit < $rows)
	$footer->left("<a href=\"./?start=" . ($start + $const_limit) . "\">&lt;&lt;-- OLDER</a>");
else
	$footer->left("&lt;&lt;-- OLDER");
// NEXT
if ($start > $const_limit)
	$footer->right("<a href=\"./?start=" . ($start - $const_limit) . "\">NEWER --&gt;&gt;</a>");
else if ($start <= $const_limit && $start > 0)
	$footer->right("<a href=\"./\">NEWER --&gt;&gt;</a>");
else
	$footer->right("NEWER --&gt;&gt;");
// SERVER TIME
$footer->center("Server Time - " . get_execution_ms() . "ms");
// LAST UPDATED
$footer->center("Updated - " . date("F j, Y", filemtime($_SERVER['SCRIPT_FILENAME'])));
$footer->output();

// close body
body::close();

// close sql connection
$mysqli->close();

?>
