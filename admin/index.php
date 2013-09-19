<?php

require('_include/api.php');

// make sure the user is logged in
if (!auth::revalidate())
	url::redirect("login.php");

// HEAD
$head = new AdminHead();
$head->title('Landing Page | Site Administration - DuBrowgn.com');
$head->embedCssFile("styles.css");
$head->output();

// BODY
body_admin::open();

// CONTENT
$cb = new AdminContentBlock("blue", "ltb");
$cb->open();
$cb->h1("Welcome");
?>
						<p>Choose what you would like to manage from the list on the left.</p>
<?php
$cb->close();

// FOOTER
AdminFooter::generic();

// close body
body_admin::close();

?>
