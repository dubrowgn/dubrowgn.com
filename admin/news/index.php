<?php

require('../_include/api.php');

// make sure the user is logged in
if (!auth::revalidate())
	url::redirect("../login.php");

// connect to database
$mysqli = db_connect();

// HEAD
$head = new AdminHead();
$head->title('News | Site Administration - DuBrowgn.com');
$head->embedCssFile("styles.css");
$head->output();

// BODY
body_admin::open();

// CONTENT
$cb = new AdminContentBlock("blue", "ltb");
$cb->open();
$cb->h1("News Posts");

// fetch users from database and display in table format
$query = "SELECT id, title, date FROM news ORDER BY id DESC";
if ($stmt = $mysqli->prepare($query)) {
	$stmt->execute();

	echo "{$const_tabs}<table style='min-width:50%'>\n";
	echo "{$const_tabs}\t<tr style='text-decoration:underline'><td /><td>News ID</td><td>Title</td><td>Date</td></tr>\n";

	$stmt->bind_result($id, $title, $date);
	while ($stmt->fetch()) {
		echo "{$const_tabs}\t<tr><td><a href='edit.php?id={$id}'>edit</a></td><td>{$id}</td><td>{$title}</td><td>{$date}</td></tr>\n";
	} // while
	
	echo "{$const_tabs}</table>\n";

	$stmt->close();
} // if

echo "{$const_tabs}<div class=\"hr-blue\"></div>";
echo "{$const_tabs}<p>\n";
echo "{$const_tabs}\t<a href='add.php'>Add News Post</a>\n";
echo "{$const_tabs}</p>\n";
$cb->close();

// FOOTER
AdminFooter::generic();

// close body
body_admin::close();

?>
