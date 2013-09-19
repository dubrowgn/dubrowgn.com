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
$username = isset($_POST['username']) ? $_POST['username'] : "";
$password = isset($_POST['password']) ? $_POST['password'] : "";

// edit user if posting data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$error = auth::change_password($mysqli, $id, $password);
	if (empty($error))
		url::redirect("./");
} // if

if (empty($id) || empty($username)) {
	if (isset($_GET['id']) && is_numeric($_GET['id'])) {
		$id = $_GET['id'];
		
		// get username from database
		$query = "SELECT username FROM user WHERE id = ?";
		if ($stmt = $mysqli->prepare($query)) {
			$stmt->bind_param("i", $id);
			if (!$stmt->execute())
				$error = $stmt->error;

			$stmt->bind_result($username);
			if (!$stmt->fetch())
				$error = "Invalid UserID";

			$stmt->close();
		} // if
		else {
			$error = $mysqli->error;
		} // else
	} // if
	else {
		$error = "Invalid UserID";
	} // else
} // if

// HEAD
$head = new AdminHead();
$head->title('Edit User | Site Administration - DuBrowgn.com');
$head->embedCssFile("styles.css");
$head->output();

// BODY
body_admin::open();

// CONTENT
$cb = new AdminContentBlock("blue", "ltb");
$cb->open();
$cb->h1("Edit User");
?>
					<form name="input" action="edit.php?id=<?php echo htmlspecialchars($id) ?>" method="post">
						<p class="error"><?php echo htmlspecialchars($error) ?></p>
						<p>
							Username:<br />
							<?php echo htmlspecialchars($username) ?>
						</p>
						<p>
							Password:<br />
							<input type="password" name="password" maxlength="255" />
						</p>
						<input type="hidden" name="id" value="<?php echo htmlspecialchars($id) ?>" />
						<input type="hidden" name="username" value="<?php echo htmlspecialchars($username) ?>" />
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
