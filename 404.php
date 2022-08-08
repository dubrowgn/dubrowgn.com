<?php

require('_include/api.php');

// HEAD
$head = new BasicHead();
$head->title('Page Missing! | The Requested Page Could Not Be Found - DuBrowgn.com');
$head->embedCssFile("styles.css");
$head->output();

// BODY
body::open();

// CONTENT
_404::echoContentBlock();

// FOOTER
BasicFooter::generic();

// close body
body::close();

?>

