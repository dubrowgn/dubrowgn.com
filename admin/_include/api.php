<?php
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	PRE-INITIALIZATIONS
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


// include basic api code
require($_SERVER['DOCUMENT_ROOT'] . '/_include/api.php');
require($_SERVER['DOCUMENT_ROOT'] . '/admin/_include/lib/password.php');

// start PHP session
session_start();


/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	STATIC CLASSES
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


// ______________________________________________________________________(admin)
class admin {
	public static function _() {
	} // _( )
} // staic class 'admin'

// _________________________________________________________________(body_admin)
class body_admin extends body {
	public static function echoNav() {
?>
		<div class="cb cb-black-white">
			<div class="bdr-tr"><div class="bdr-t"></div></div>
				<div class="bdr-r">
					<div class="content menu">
						<h3>Content</h3>
						<p>
							<a href="/admin/news/">News</a>
							<a href="/admin/blog/">Blog</a>
						</p>
						<h3>Management</h3>
						<p>
							<a href="/admin/user/">Users</a>
							<a href="https://www.google.com/analytics/web/">Stats</a>
						</p>
						<h3>Server</h3>
						<p>
							<a href="/admin/opcacheinfo.php">Op Cache Info</a>
							<a href="/admin/phpinfo.php">PHP Info</a>
							<a href="/admin/variables.php">Variables</a>
						</p>
						<h3>Session</h3>
						<p>
							<a href="/admin/logout.php">Logout</a>
						</p>
					</div>					
				</div>
			<div class="bdr-br"><div class="bdr-b"></div></div>
		</div>
<?php
	} // echoNav( void )
} // static class 'body_admin'

// _______________________________________________________________________(auth)
class auth {
	public static function create_user($mysqli, $username, $password) {
		// validate username
		if (empty($username))
			return "Username cannot be empty";
		if (strlen($username) > 255)
			return "Username cannot be longer than 255 characters";
		
		// validate password
		if (empty($password))
			return "Password cannot be empty";
		if (strlen($password) > 255)
			return "Password cannot be longer than 255 characters";
		
		// password_hash() returns false on failure
		$hash = password_hash($password, PASSWORD_DEFAULT);
		if (!$hash)
			return "Failed to hash password";
		
		// insert user into database
		$error = null;
		$query = "INSERT INTO user (username, hash) VALUES(?, ?)";
		if ($stmt = $mysqli->prepare($query)) {
			$stmt->bind_param("ss", $username, $hash);
			if (!$stmt->execute())
				$error = $stmt->error;
			$stmt->close();
		} // if
		else {
			$error = $mysqli->error;
		} // else
		
		// return any errors
		return $error;
	} // create_user( )
	
	public static function change_password($mysqli, $user_id, $password) {
		return "change_password() not implemented!";
	} // change_password( )
	
	public static function login($mysqli, $username, $password) {
		// validate username
		if (empty($username))
			return "Username cannot be empty";
		if (strlen($username) > 255)
			return "Username cannot be longer than 255 characters";
		
		// validate password
		if (empty($password))
			return "Password cannot be empty";
		if (strlen($password) > 255)
			return "Password cannot be longer than 255 characters";
			
		// get user from database
		$error = null;
		$query = "SELECT id, hash FROM user WHERE username = ? LIMIT 1";
		if ($stmt = $mysqli->prepare($query)) {
			$stmt->bind_param("s", $username);
			if (!$stmt->execute())
				$error = $stmt->error;

			$stmt->bind_result($id, $hash);
			if ($stmt->fetch() && password_verify($password, $hash)) {
				$_SESSION['user'] = array(
					'id' => $id,
					'name' => $username,
					'hash' => $hash
				);
			} // if
			else {
				$error = "Invalid username/password";
			} // else

			$stmt->close();
		} // if
		else {
			$error = $mysqli->error;
		} // else
		
		return $error;
	} // login( )
	
	public static function logout() {
		unset($_SESSION['user']);
	} // logout( )
	
	public static function revalidate() {
		return isset($_SESSION['user']);
	} // revalidate( )
} // staic class 'auth'

// _______________________________________________________________________(blog)
class blog {
	public static function create($mysqli, $title, $desc, $body) {
		// validate title
		if (empty($title))
			return "Title cannot be empty";
		if (strlen($title) > 70)
			return "Title cannot be longer than 70 characters";
		
		// validate description
		if (empty($desc))
			return "Description cannot be empty";
		if (strlen($desc) > 160)
			return "Description cannot be longer than 160 characters";

		// validate body
		if (empty($body))
			return "Body cannot be empty";
		if (strlen($body) > 65535)
			return "Body cannot be longer than 65,535 characters";
		
		// insert blog into database
		$error = null;
		$query = "INSERT INTO blog (title, description, body, date) VALUES(?, ?, ?, CURDATE())";
		if ($stmt = $mysqli->prepare($query)) {
			$stmt->bind_param("sss", htmlspecialchars($title), htmlspecialchars($desc), $body);
			if (!$stmt->execute())
				$error = $stmt->error;
			$stmt->close();
		} // if
		else {
			$error = $mysqli->error;
		} // else
		
		// return any errors
		return $error;
	} // create( )
	
	public static function update($mysqli, $id, $title, $desc, $body) {
		// validate id
		if (empty($id) || !is_numeric($id))
			return "Invalid blog ID";
		
		// validate title
		if (empty($title))
			return "Title cannot be empty";
		if (strlen($title) > 70)
			return "Title cannot be longer than 70 characters";
		
		// validate description
		if (empty($desc))
			return "Description cannot be empty";
		if (strlen($desc) > 160)
			return "Description cannot be longer than 160 characters";
		
		// validate body
		if (empty($body))
			return "Body cannot be empty";
		if (strlen($body) > 65535)
			return "Body cannot be longer than 65,535 characters";
		
		// update blog in database
		$error = null;
		$query = "UPDATE blog SET title = ?, description = ?, body = ? WHERE id = ?";
		if ($stmt = $mysqli->prepare($query)) {
			$stmt->bind_param("sssi", $title, $desc, $body, $id);
			if (!$stmt->execute())
				$error = $stmt->error;
			$stmt->close();
		} // if
		else {
			$error = $mysqli->error;
		} // else
		
		// return any errors
		return $error;
	} // update( )
} // static class 'blog'

// _______________________________________________________________________(news)
class news {
	public static function create($mysqli, $title, $body) {
		// validate title
		if (empty($title))
			return "Title cannot be empty";
		if (strlen($title) > 70)
			return "Title cannot be longer than 70 characters";
		
		// validate body
		if (empty($body))
			return "Body cannot be empty";
		if (strlen($body) > 65535)
			return "Body cannot be longer than 65,535 characters";
		
		// insert blog into database
		$error = null;
		$query = "INSERT INTO news (title, body, date) VALUES(?, ?, CURDATE())";
		if ($stmt = $mysqli->prepare($query)) {
			$stmt->bind_param("ss", htmlspecialchars($title), $body);
			if (!$stmt->execute())
				$error = $stmt->error;
			$stmt->close();
		} // if
		else {
			$error = $mysqli->error;
		} // else
		
		// return any errors
		return $error;
	} // create( )
	
	public static function update($mysqli, $id, $title, $body) {
		// validate id
		if (empty($id) || !is_numeric($id))
			return "Invalid news ID";
		
		// validate title
		if (empty($title))
			return "Title cannot be empty";
		if (strlen($title) > 70)
			return "Title cannot be longer than 70 characters";
		
		// validate body
		if (empty($body))
			return "Body cannot be empty";
		if (strlen($body) > 65535)
			return "Body cannot be longer than 65,535 characters";
		
		// update blog in database
		$error = null;
		$query = "UPDATE news SET title = ?, body = ? WHERE id = ?";
		if ($stmt = $mysqli->prepare($query)) {
			$stmt->bind_param("ssi", $title, $body, $id);
			if (!$stmt->execute())
				$error = $stmt->error;
			$stmt->close();
		} // if
		else {
			$error = $mysqli->error;
		} // else
		
		// return any errors
		return $error;
	} // update( )
} // static class 'news'


/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	CLASSES
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


class AdminContentBlock extends BasicContentBlock { } // class

class AdminFooter extends BasicFooter { } // class

class AdminHead extends BasicHead { } // class

class AdminLinkBar extends BasicLinkBar { } // class

class AdminNavigation extends BasicNavigation { } // class


/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	GLOBAL FUNCTIONS
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	POST-INITIALIZATIONS
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

?>
