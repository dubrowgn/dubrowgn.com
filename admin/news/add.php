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
$body = isset($_POST['body']) ? $_POST['body'] : "";

// insert user if posting data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$error = news::create($mysqli, $title, $body);
	if (empty($error))
		url::redirect("./");
} // if

// HEAD
$head = new AdminHead();
$head->title('Add News Post | Site Administration - DuBrowgn.com');
$head->embedCssFile("styles.css");
$head->linkCss("../lib/codemirror/codemirror.css");
$head->linkJs("../lib/codemirror/htmlmixed-compiled-min.js");
$head->embedCss(".CodeMirror { height: auto; width:1000px; line-height:1.25em; }");
$head->output();

// BODY
body_admin::open();

// CONTENT
$cb = new AdminContentBlock("blue", "ltb");
$cb->open();
$cb->h1("Add News Post");
?>
					<form name="input" action="add.php" method="post">
						<p class="error"><?php echo htmlspecialchars($error) ?></p>
						<p>
							Title:<br />
							<input type="text" name="title" value="<?php echo htmlspecialchars($title) ?>" maxlength="127" style="width:35%" />
						</p>
						<p>
							Body:<br />
							<textarea id="newsBody" name="body" maxlength="65535"><?php echo htmlspecialchars($body) ?></textarea>
						</p>
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
