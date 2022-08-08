<?php

require('_include/api.php');

// make sure the user is logged in
if (!auth::revalidate())
	url::redirect("login.php");

// HEAD
$head = new AdminHead();
$head->title('APC Cache Information | Site Administration - DuBrowgn.com');
$head->embedCssFile("styles.css");
$head->output();

// BODY
body_admin::open();

// CONTENT
$cb = new AdminContentBlock("blue", "right");
$cb->open();
$cb->h1('Op Cache Information');

$info = opcache_get_status();
$scripts = $info['scripts'];
unset($info['scripts']);

$cb->h2('User Info');
echo "<pre>";
print_r($info);
echo "</pre>\n";

$cb->h2('Cache List');
$pathLen = mb_strlen(dirname(__DIR__));
echo "			<p><table>\n";
echo
"				<thead>
					<th>path</th>
					<th>hits</th>
					<th>memory</th>
					<th>last used</th>
				</thead>
";
foreach ($scripts as &$item) {
echo
"				<tr>
					<td>" . mb_substr($item['full_path'], $pathLen) . "</td>
					<td>{$item['hits']}</td>
					<td>" . number_format($item['memory_consumption'] / 1024, 2) . " KiB</td>
					<td>{$item['last_used']}</td>
				</tr>
";
} // foreach( )
echo "			</table></p>\n";

$cb->close();

// FOOTER
AdminFooter::generic();

// close body
body_admin::close();

?>
