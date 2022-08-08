<?php

require('../_include/api.php');

// make sure the user is logged in
if (!auth::revalidate())
	url::redirect("../login.php");

// connect to database
$mysqli = db_connect();

// init variables
$error = "";
$username = isset($_POST['username']) ? $_POST['username'] : "";
$password = isset($_POST['password']) ? $_POST['password'] : "";

// insert user if posting data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$error = auth::create_user($mysqli, $username, $password);
	if (empty($error))
		url::redirect("./");
} // if

// HEAD
$head = new AdminHead();
$head->title('Add User | Site Administration - DuBrowgn.com');
$head->embedCssFile("styles.css");
$head->output();

// BODY
body_admin::open();

// CONTENT
$cb = new AdminContentBlock("blue", "right");
$cb->open();
$cb->h1("Add User");
?>
			<form name="input" action="add.php" method="post">
				<p class="error"><?php echo htmlspecialchars($error) ?></p>
				<p>
					User Name:<br />
					<input type="text" name="username" value="<?php echo htmlspecialchars($username) ?>" maxlength="255" />
				</p>
				<p>
					Password:<br />
					<input type="password" name="password" maxlength="255" />
				</p>
				<input type="submit" value="Submit" />
			</form>
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
