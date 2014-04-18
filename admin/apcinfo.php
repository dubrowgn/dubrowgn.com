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
$cb = new AdminContentBlock("blue", "ltb");
$cb->open();
$cb->h1('APC Cache Information');

$info = apc_cache_info();
$cacheList = $info['cache_list'];
unset($info['cache_list']);

$cb->h2('User Info');
echo "<pre>";
print_r($info);
echo "</pre>";

$cb->h2('Cache List');
$pathLen = mb_strlen(dirname(__DIR__));
echo "<p><table style='width:100%'>";
echo 
"	<thead>
		<th>type</th>
		<th>device</th>
		<th>inode</th>
		<th>filename</th>
		<th>num_hits</th>
		<th>mtime</th>
		<th>creation_time</th>
		<th>deletion_time</th>
		<th>access_time</th>
		<th>ref_count</th>
		<th>mem_size</th>
	</thead>
";
foreach ($cacheList as &$item) {
echo
"	<tr>
		<td>{$item['type']}</td>
		<td>{$item['device']}</td>
		<td>{$item['inode']}</td>
		<td>" . mb_substr($item['filename'], $pathLen) . "</td>
		<td>{$item['num_hits']}</td>
		<td>{$item['mtime']}</td>
		<td>{$item['creation_time']}</td>
		<td>{$item['deletion_time']}</td>
		<td>{$item['access_time']}</td>
		<td>{$item['ref_count']}</td>
		<td>" . number_format($item['mem_size'] / 1024, 2) . "k</td>
	</tr>
";
} // foreach( )
echo "</table></p>";

$cb->close();

// FOOTER
AdminFooter::generic();

// close body
body_admin::close();



?>
