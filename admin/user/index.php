<?php

require('../_include/api.php');

// make sure the user is logged in
if (!auth::revalidate())
	url::redirect("../login.php");

// connect to database
$mysqli = db_connect();

// HEAD
$head = new AdminHead();
$head->title('Users | Site Administration - DuBrowgn.com');
$head->embedCssFile("styles.css");
$head->output();

// BODY
body_admin::open();

// CONTENT
$cb = new AdminContentBlock("blue", "ltb");
$cb->open();
$cb->h1("Users");

// fetch users from database and display in table format
$query = "SELECT id, username, hash FROM user ORDER BY id ASC";
if ($stmt = $mysqli->prepare($query)) {
	if (!$stmt->execute())
		email_error(__FILE__, __LINE__, $stmt->error . "\n\nSQL Query: $query");

	echo "{$const_tabs}<table style='min-width:30%'>\n";
	echo "{$const_tabs}\t<tr style='text-decoration:underline'><td /><td>User ID</td><td>Username</td></tr>\n";

	$stmt->bind_result($id, $username, $hash);
	while ($stmt->fetch()) {
		echo "{$const_tabs}\t<tr><td><a href='edit.php?id={$id}'>edit</a></td><td>{$id}</td><td>{$username}</td></tr>\n";
	} // while
	
	echo "{$const_tabs}</table>\n";

	$stmt->close();
} else
	email_error(__FILE__, __LINE__, $mysqli->error . "\n\nSQL Query: $query");

echo "{$const_tabs}<div class=\"hr-blue\"></div>";
echo "{$const_tabs}<p>\n";
echo "{$const_tabs}\t<a href='add.php'>Add User</a>\n";
echo "{$const_tabs}</p>\n";
$cb->close();

// FOOTER
AdminFooter::generic();

// close body
body_admin::close();

?>
