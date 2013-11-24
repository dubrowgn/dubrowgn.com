<?php

require('../_include/api.php');

// make sure the user is logged in
if (!auth::revalidate())
	url::redirect("../login.php");

// connect to database
$mysqli = db_connect();

// init variables
$error = "";
$title = isset($_POST['title']) ? $_POST['title'] : "";
$desc = isset($_POST['desc']) ? $_POST['desc'] : "";
$body = isset($_POST['body']) ? $_POST['body'] : "";

// insert user if posting data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$error = blog::create($mysqli, $title, $desc, $body);
	if (empty($error))
		url::redirect("./");
} // if

// HEAD
$head = new AdminHead();
$head->title('Add Blog Post | Site Administration - DuBrowgn.com');
$head->embedCssFile("styles.css");
$head->linkCss("//{$_SERVER['HTTP_HOST']}/lib/codemirror/codemirror.css");
$head->embedJsAsyncHandler("jsLoaded", 3, '$(function() { initPreviewEditor(document.input.title, document.input.body, document.getElementById("preview")); })');
$head->linkJs("//{$_SERVER['HTTP_HOST']}/lib/codemirror/htmlmixed-compiled-min.js", 'async onload="jsLoaded()"');
$head->linkJs("//{$_SERVER['HTTP_HOST']}/lib/jquery/jquery.min.js", 'async onload="jsLoaded()"');
$head->linkJs("//{$_SERVER['HTTP_HOST']}/admin/lib/init-preview-editor.js", 'async onload="jsLoaded()"');
$head->output();

// BODY
body_admin::open();

// CONTENT
$cb = new AdminContentBlock("blue", "ltb");
$cb->open();
$cb->h1("Add Blog Post");
?>
							<form name="input" action="add.php" method="post">
								<p class="error"><?php echo htmlspecialchars($error) ?></p>
								<p>
									<p>Title:<br />
									<input type="text" name="title" value="<?php echo htmlspecialchars($title) ?>" maxlength="50" style="width:330px" />
								</p>
								<p>
									Description:<br />
									<textarea name="desc" maxlength="160" style="width:330px" rows="5"><?php echo htmlspecialchars($desc) ?></textarea>
								</p>
								<p>
									Body:<br />
									<textarea name="body" maxlength="65535"><?php echo htmlspecialchars($body) ?></textarea>
								</p>
								<input type="submit" value="Submit" />
							</form>
							<div class="hr-blue"></div>
							<div id="preview"></div>
							<div class="hr-blue"></div>
							<p>
								<a href='./'>Cancel</a>
							</p>
<?php
$cb->close();

// FOOTER
AdminFooter::generic();

// close body
body_admin::close();

?>
