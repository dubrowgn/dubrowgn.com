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
$head->linkCss("/admin/lib/codemirror/codemirror.css");
$head->linkJs("/admin/lib/codemirror/htmlmixed-compiled-min.js");
$head->embedCss(".CodeMirror { height: auto; width:1000px; line-height:1.25em; }");
$head->output();

// BODY
body_admin::open();

// CONTENT
$cb = new AdminContentBlock("blue", "ltb");
$cb->open();
$cb->h1("Edit News Post");
?>
					<form name="input" action="edit.php?id=<?php echo htmlspecialchars($id) ?>" method="post">
						<p class="error"><?php echo htmlspecialchars($error) ?></p>
						<p>
							Title:<br />
							<input type="text" name="title" value="<?php echo htmlspecialchars($title) ?>" maxlength="127" style="width:35%" />
						</p>
						<p>
							Body:<br />
							<textarea id="newsBody" name="body" maxlength="65535"><?php echo htmlspecialchars($body) ?></textarea>
						</p>
						<input type="hidden" name="id" value="<?php echo htmlspecialchars($id) ?>" />
						<input type="submit" value="Submit" />
					</form>
					<script>
						var editor = CodeMirror.fromTextArea(document.getElementById("newsBody"), {
							lineNumbers: true,
							mode: "text/html",
							matchBrackets: true,
							indentWithTabs: true,
							indentUnit: 4
						});
					</script>
<?php

echo "{$const_tabs}<div class=\"hr-blue\"></div>";
echo "{$const_tabs}<p>\n";
echo "{$const_tabs}\t<a href='./'>Cancel</a>\n";
echo "{$const_tabs}</p>\n";
$cb->close();

// FOOTER
AdminFooter::generic();

// close body
body_admin::close();

?>
