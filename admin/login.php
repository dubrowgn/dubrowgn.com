<?php

require('_include/api.php');

// check if the user is already logged in
if (auth::revalidate())
	url::redirect(""); // index page
	
// connect to database
$mysqli = db_connect();

// init variables
$error = "";
$username = isset($_POST['username']) ? $_POST['username'] : "";
$password = isset($_POST['password']) ? $_POST['password'] : "";

// check if the user has submitted their details.
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$error = auth::login($mysqli, $username, $password);
	if (empty($error))
		url::redirect(""); // index page
} // if

// HEAD
$head = new AdminHead();
$head->title('Login | Site Administration - DuBrowgn.com');
$head->embedCssFile("styles.css");
$head->output();

// BODY
body::open(false);

// CONTENT
$cb = new AdminContentBlock("blue");
$cb->open();
$cb->h1("Login");

?>
			<form name="input" action="login.php" method="post">
				<p class="error"><?php echo htmlspecialchars($error) ?></p>
				<p>
					Username:<br />
					<input type="text" name="username" value="<?php echo htmlspecialchars($username) ?>" maxlength="255" />
				</p>
				<p>
					Password:<br />
					<input type="password" name="password" maxlength="255" />
				</p>
				<input type="submit" value="Login" />
			</form>
<?php
$cb->close();

// FOOTER
AdminFooter::generic();

?>
	<script type="text/javascript"> document.input.username.focus(); </script>
<?php

// close body
body::close();

?>

