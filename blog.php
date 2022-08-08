<?php

require('_include/api.php');
$mysqli = db_connect();

// HEAD
$head = new BasicHead();
$head->embedCssFile("styles.css");

if (isset($_GET['index'])) {
	// generate the rest of the head tag
	$head->title("Blog | Index of Existing Blog Posts - DuBrowgn.com");
	$head->description("Index of blog posts on DuBrowgn.com. Find fascinating blog posts about programming and other topics by date or by title.");
	$head->canonicalUrl("http://www.dubrowgn.com/blog.php?index");
	$head->keywords('dubrowgn, blog, dustin brown, programming, proof of concept, experiment, index');
	$head->output();

	// BODY
	body::open();

	// start value passed in GET request?
	$get_index = intval($_GET['index']);

	$cb = new BasicContentBlock("blue", "ltb");
	$cb->open();
	$cb->h1("Blog Index");

	// OUTPUT BLOG INDEX PAGE (TOP 40)
	$limit = 40;
	$Y = ""; // year

	// FETCH / FORMAT / DUMP BLOG ENTRIES FROM DATABASE
	$query = "SELECT id, title, description, DATE_FORMAT(date,\"%M %e\") AS date, DATE_FORMAT(date,\"%Y\") AS year FROM blog ORDER BY id DESC LIMIT ?,?";
	if ($stmt = $mysqli->prepare($query)) {
		$stmt->bind_param("ii", $get_index, $limit);
		if (!$stmt->execute())
			log::err($stmt->error . "\n\nSQL Query: $query");

		$stmt->bind_result($id, $title, $desc, $date, $year);
		while ($stmt->fetch()) {
			if ($Y != $year) {
				if ($Y)
					// close last list
					echo "{$const_tabs}</ul>\n";
				$Y = $year;
				echo "$const_tabs<h2>$Y</h2>\n{$const_tabs}<ul>\n";
			} // if
			echo "$const_tabs\t<li><a href=\"./blog.php?id={$id}\">$title</a> ({$date})</li>\n";
		} // while

		if ($Y)
			// close last list
			echo "$const_tabs</ul>\n";

		$stmt->close();
	} else
		log::err($mysqli->error . "\n\nSQL Query: $query");

	$cb->close();
} // if
else {
	// `id` passed in GET request?
	$get_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

	// RETRIEVE TARGET BLOG DATA

	// generate SQL for getting target blog post from database
	$query = "SELECT id, title, description, body, DATE_FORMAT(date,\"%M %e, %Y\") AS date FROM blog " . ($get_id > 0 ? "WHERE id = ?" : "ORDER BY id DESC LIMIT 1");

	// fetch target (t) blog post from database
	if ($stmt = $mysqli->prepare($query)) {
		if ($get_id > 0)
			$stmt->bind_param("i", $get_id);
		if (!$stmt->execute())
			log::err($stmt->error . "\n\nSQL Query: $query");

		$stmt->bind_result($t_id, $t_title, $t_desc, $t_body, $t_date);

		if ($stmt->fetch())
			$get_id = $t_id;

		$stmt->close();
	} else
		log::err($mysqli->error . "\n\nSQL Query: $query");

	// generate the rest of the head tag
	$head->title("Blog | " . htmlspecialchars($t_title) . " - DuBrowgn.com");
	$head->description(htmlspecialchars($t_desc));
	$head->canonicalUrl("http://www.dubrowgn.com/blog.php?id=$t_id");
	$head->keywords('dubrowgn, blog, dustin brown, FIXME');
	$head->output();

	// BODY
	body::open();

	// RETRIEVE	 LINK-BAR DATA

	// get title from previous (p) post
	$query = "SELECT id, title FROM blog WHERE id < ? ORDER BY id DESC LIMIT 1";
	if ($stmt = $mysqli->prepare($query)) {
		$stmt->bind_param("i", $get_id);
		if (!$stmt->execute())
			log::err($stmt->error . "\n\nSQL Query: $query");

		$stmt->bind_result($p_id, $p_title);
		$stmt->fetch();
		$stmt->close();
	} else
		log::err($mysqli->error . "\n\nSQL Query: $query");

	// get title from next post
	$query = "SELECT id, title FROM blog WHERE id > ? ORDER BY id ASC LIMIT 1";
	if ($stmt = $mysqli->prepare($query)) {
		$stmt->bind_param("i", $get_id);
		if (!$stmt->execute())
			log::err($stmt->error . "\n\nSQL Query: $query");

		$stmt->bind_result($n_id, $n_title);
		$stmt->fetch();
		$stmt->close();
	} else
		log::err($mysqli->error . "\n\nSQL Query: $query");

	// OUTPUT LINK-BAR
	$cb = new BasicContentBlock("white", "ltrb");
	$cb->open();
	$lb = new BasicLinkBar();

	// previous blog post link
	if (isset($p_id) && $p_id > 0)
		$lb->left("<a href=\"./blog.php?id={$p_id}\">&lt;&lt;-- {$p_title}</a>");
	else
		$lb->left("&lt;&lt;-- Already Viewing Oldest Post");

	// blog index link
	$lb->center("<a href=\"./blog.php?index\">Blog Index</a>");

	// next blog post link
	if (isset($n_id) && $n_id > 0) {
		$lb->right("<a href=\"./blog.php?id={$n_id}\">{$n_title} --&gt;&gt;</a>");
	} else
		$lb->right("Already Viewing Latest Post --&gt;&gt;");

	$lb->output();
	$cb->close();

	// OUTPUT TARGET BLOG POST
	$cb = new BasicContentBlock("blue", "ltb");
	$cb->open();

	if (isset($t_id) && $t_id > 0) {
		// h1
		$cb->h1($t_title, $t_date);

		// content
		echo preg_replace("/^/m", $const_tabs, $t_body) . "\n";
	} // if
	else {
		$cb->h1("This Blog Post Does Not Exist!", "Invalid Blog ID");
		_404::echoContent();
	} // else
	$cb->close();
} // else

// FOOTER
BasicFooter::generic();

// close body
body::close();

// close sql connection
$mysqli->close();

?>
