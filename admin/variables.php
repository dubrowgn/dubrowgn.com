<?php

require('_include/api.php');

// make sure the user is logged in
if (!auth::revalidate())
	url::redirect("login.php");

// HEAD
$head = new AdminHead();
$head->title('Variables | Site Administration - DuBrowgn.com');
$head->embedCssFile("styles.css");
$head->output();

// BODY
body_admin::open();

// CONTENT
$cb = new AdminContentBlock("blue", "ltb");
$cb->open();
$cb->h1('Server Variables');

$cb->h2('$_COOKIE');
echo "<pre>";
print_r($_COOKIE);
echo "</pre>\n";

$cb->h2('$_SERVER');
echo "<pre>";
print_r($_SERVER);
echo "</pre>\n";

$cb->h2('$_SESSION');
echo "<pre>";
print_r($_SESSION);
echo "</pre>\n";

$cb->close();

// FOOTER
AdminFooter::generic();

// close body
body_admin::close();

?>
