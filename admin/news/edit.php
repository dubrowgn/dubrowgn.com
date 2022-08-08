<?php

require('../_include/api.php');

// make sure the user is logged in
if (!auth::revalidate())
	url::redirect("../login.php");

// connect to database
$mysqli = db_connect();

// init variables
$error = "";
$id = isset($_POST['id']) ? $_POST['id'] : "";
$title = isset($_POST['title']) ? $_POST['title'] : "";
$body = isset($_POST['body']) ? $_POST['body'] : "";

// edit user if posting data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$error = news::update($mysqli, $id, $title, $body);
	if (empty($error))
		url::redirect("./");
} // if

if (empty($id) || empty($title) || empty($body)) {
	if (isset($_GET['id']) && is_numeric($_GET['id'])) {
		$id = $_GET['id'];
		
		// get title, body from database
		$query = "SELECT title, body FROM news WHERE id = ?";
		if ($stmt = $mysqli->prepare($query)) {
			$stmt->bind_param("i", $id);
			if (!$stmt->execute())
				$error = $stmt->error;

			$stmt->bind_result($title, $body);
			if (!$stmt->fetch())
				$error = "Invalid news ID";

			$stmt->close();
		} // if
		else {
			$error = $mysqli->error;
		} // else
	} // if
	else {
		$error = "Invalid news ID";
	} // else
} // if

// HEAD
$head = new AdminHead();
$head->title('Edit News Post | Site Administration - DuBrowgn.com');
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
$cb = new AdminContentBlock("blue", "right");
$cb->open();
$cb->h1("Edit News Post");
?>
			<form name="input" action="edit.php?id=<?php echo htmlspecialchars($id) ?>" method="post">
				<p class="error"><?php echo htmlspecialchars($error) ?></p>
				<p>
					Title:<br />
					<input type="text" name="title" value="<?php echo htmlspecialchars($title) ?>" maxlength="70" style="width:330px" />
				</p>
				<p>
					Body:<br />
					<textarea name="body" maxlength="65535"><?php echo htmlspecialchars($body) ?></textarea>
				</p>
				<input type="hidden" name="id" value="<?php echo htmlspecialchars($id) ?>" />
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
