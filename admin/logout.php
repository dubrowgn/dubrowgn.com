<?php

require('_include/api.php');

auth::logout();
url::redirect("login.php");

?>

