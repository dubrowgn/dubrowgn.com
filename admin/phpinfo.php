<?php

require('_include/api.php');

// make sure the user is logged in
if (!auth::revalidate())
	url::redirect("login.php");

phpinfo();

?>
