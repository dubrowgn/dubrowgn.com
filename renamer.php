<?php

require('_include/api.php');

// HEAD
$head = new BasicHead();
$head->title("Renamer | A simple Multi-File Renamer Utility - DuBrowgn.com");
$head->description("Renamer is a lightweight, mass file renaming utility based on Qt and C++. It is very simple yet robust, with its drag-n-drop interface and use of regular expressions.");
$head->canonicalUrl("http://www.dubrowgn.com/renamer.php");
$head->keywords('dubrowgn, programming, development, qt, c++, renamer, rename files, cross platform, regular expressions, regex');
$head->embedCssFile("styles.css");
$head->output();

// BODY
body::open();

// CONTENT
$cb = new BasicContentBlock("blue", "right");
$cb->open();
$cb->h1('What is Renamer?');
?>
			<p>Renamer is a lightweight, mass file renaming utility based on the Qt framework. It's designed to be very simple yet robust with it's drag-n-drop interface and use of <a href="http://www.regular-expressions.info/">regular expressions</a>. Binary executables for Linux and Windows are available, as well as Renamer's source code.</p>
			<h2>Main Features:</h2>
			<ul>
				<li>Cross-Platform</li>
				<li>Drag-n-Drop interface</li>
				<li>Regex search and replace</li>
				<li>Literal search and replace</li>
				<li>Renames files and folders</li>
			</ul>
			<p>Renamer is now available on <a href="https://github.com/dubrowgn/renamer">github</a>!</p>
			<div class="img-box">
				<img src="/media/renamer/img/renamer-1.3.png" alt="Renamer v1.3 running under Ubuntu Linux" title="Renamer v1.3 running under Ubuntu Linux"/>
				<p>Renamer v1.3 running under Ubuntu Linux</p>
			</div>
<?php
$cb->close();
$cb->open();
$cb->h1('Current Release');
?>
			<p><span class="leadin">Linux (x64):</span> <a href="/media/renamer/files/renamer-1.4.0 (linux x64).zip">renamer-1.4.0 (linux x64).zip</a> (21.1KB)</p>
			<p><span class="leadin">Windows (i686):</span> <a href="/media/renamer/files/renamer-1.4.0 (windows x64).zip">renamer-1.4.0 (windows x64).zip</a> (7.3MB)</p>
			<p><span class="leadin">Source Code:</span> <a href="/media/renamer/files/renamer-1.4.0 (source).zip">renamer-1.4.0 (source).zip</a> (199.8KB)</p>
			<p><span class="leadin">Note:</span>The linux build of Renamer now requires Qt 5.6 or greater be installed. On Debian/Mint/Ubuntu distros, you can install the libqt5gui5 package via apt-get.</p>
<?php
$cb->close();
$cb->open();
$cb->h1('Planned Changes / Fixes');
?>
			<ul>
				<li>Dynamic preview of the results of a rename as you type.</li>
				<li>Recursive adding of files in nested folders.</li>
				<li>Support for network protocols (e.g. smb, ftp, etc.)</li>
				<li>More robust error/status reporting system.</li>
			</ul>
<?php
$cb->close();
$cb->open();
$cb->h1('Change Log');
?>
			<h2>Renamer 1.4.0 <span class="subhead">(Feb / 10 / 2019)</span></h2>
			<ul>
				<li>Migrated to Qt 5</li>
				<li>Initial high DPI support</li>
				<li>Perl-style regular expressions</li>
				<li>Better regular expression error reporting</li>
			</ul>
			<h2>Renamer 1.3.2 <span class="subhead">(Apr / 24 / 2010)</span></h2>
			<ul>
				<li>Closed several memory leaks</li>
			</ul>
			<h2>Renamer 1.3.1 <span class="subhead">(Aug / 29 / 2009)</span></h2>
			<ul>
				<li>Bound the primary Enter/Return key to the Search and Replace function</li>
				<li>MinGW and Qt dependancies now statically compiled into the executable on Windows platforms</li>
			</ul>
			<h2>Renamer 1.3 <span class="subhead">(Mar / 08 / 2009)</span></h2>
			<ul>
				<li>Rebased Renamer to the Qt framework</li>
				<li>Unicode characters now properly supported</li>
				<li>Implemented basic status and error reporting</li>
			</ul>
			<h2>Renamer 1.2 <span class="subhead">(Aug / 05 / 2008)</span></h2>
			<ul>
				<li>Columns are now sortable</li>
				<li>Columns are capable of auto-sorting after a search and replace operation</li>
				<li>Replaced literal search and replace code for increased stability and more logical behavior</li>
				<li>Improved entity handling under Linux</li>
				<li>Fixed a crash bug during file list population where entities followed certain characters in a file name</li>
				<li>Improved performance when populating the file list</li>
			</ul>
			<h2>Renamer 1.1.4 <span class="subhead">(Jul / 27 / 2008)</span></h2>
			<ul>
				<li>Fixed an infinite loop crash bug during literal search and replace</li>
				<li>Improved entity handling under Windows</li>
			</ul>
			<h2>Renamer 1.1.2 <span class="subhead">(Jul / 20 / 2008)</span></h2>
			<ul>
				<li>Windows version available</li>
				<li>Fixed a crash bug during shutdown</li>
				<li>Literal search and replace now replaces all instances of the specified text</li>
			</ul>
			<h2>Renamer 1.1 <span class="subhead">(Jul / 02 / 2008)</span></h2>
			<ul>
				<li>Pressing "Clear List" no longer breaks the file list.</li>
				<li>Adding the same file to the file list twice no longer breaks the file list.</li>
				<li>Adding additional files to the file list no longer break the file list.</li>
				<li>The main window is no longer centered by default when executing the program.</li>
			</ul>
			<h2>Renamer 1.0 <span class="subhead">(Jun / 20 / 2008)</span></h2>
			<ul>
				<li>Original release version</li>
			</ul>
<?php
$cb->close();
$cb->open();
$cb->h1('Package Archive');
?>
			<h2>Linux <span class="subhead">(x64)</span></h2>
			<ul>
				<li><a href="/media/renamer/files/renamer-1.4.0 (linux x64).zip">renamer-1.4.0 (linux x64).zip</a> (21.1KB) - Feb / 10 / 2019</li>
				<li><a href="/media/renamer/files/Renamer [1.3.2 - linux64].zip">Renamer [1.3.2 - linux64].zip</a> (17.3KB) - Apr / 24 / 2010</li>
				<li><a href="/media/renamer/files/Renamer [1.3.1 - linux64].zip">Renamer [1.3.1 - linux64].zip</a> (21.3KB) - Aug / 29 / 2009</li>
				<li><a href="/media/renamer/files/Renamer [1.3 - linux64].zip">Renamer [1.3 - linux64].zip</a> (21.3KB) - Mar / 08 / 2009</li>
				<li><a href="/media/renamer/files/Renamer [1.2 - linux64].zip">Renamer [1.2 - linux64].zip</a> (6.5KB) - Nov / 26 / 2008</li>
			</ul>
			<h2>Linux <span class="subhead">(i686)</span></h2>
			<ul>
				<li><a href="/media/renamer/files/Renamer [1.3.2 - linux32].zip">Renamer [1.3.2 - linux32].zip</a> (17.6KB) - Apr / 24 / 2010</li>
				<li><a href="/media/renamer/files/Renamer [1.3.1 - linux32].zip">Renamer [1.3.1 - linux32].zip</a> (19.8KB) - Aug / 29 / 2009</li>
				<li><a href="/media/renamer/files/Renamer [1.3 - linux32].zip">Renamer [1.3 - linux32].zip</a> (19.8KB) - Mar / 08 / 2009</li>
				<li><a href="/media/renamer/files/Renamer [1.2 - linux32].zip">Renamer [1.2 - linux32].zip</a> (6.2KB) - Aug / 05 / 2008</li>
				<li><a href="/media/renamer/files/Renamer [1.1.4 - linux32].zip">Renamer [1.1.4 - linux32].zip</a> (6.0KB) - Jun / 27 / 2008</li>
				<li><a href="/media/renamer/files/Renamer [1.1.2 - linux32].zip">Renamer [1.1.2 - linux32].zip</a> (5.8KB) - Jul / 20 / 2008</li>
				<li><a href="/media/renamer/files/Renamer [1.1 - linux32].zip">Renamer [1.1 - linux32].zip</a> (5.8KB) - Jul / 02 / 2008</li>
				<li><a href="/media/renamer/files/Renamer [1.0 - linux32].zip">Renamer [1.0 - linux32].zip</a> (5.8KB) - Jun / 20 / 2008</li>
			</ul>
			<h2>Windows <span class="subhead">(x64)</span></h2>
			<ul>
				<li><a href="/media/renamer/files/renamer-1.4.0 (windows x64).zip">renamer-1.4.0 (windows x64).zip</a> (7.3MB) - Feb / 10 / 2019</li>
			</ul>
			<h2>Windows <span class="subhead">(i686)</span></h2>
			<ul>
				<li><a href="/media/renamer/files/Renamer [1.3.2 - win32].zip">Renamer [1.3.2 - win32].zip</a> (2.5MB) - Apr / 24 / 2010</li>
				<li><a href="/media/renamer/files/Renamer [1.3.1 - win32].zip">Renamer [1.3.1 - win32].zip</a> (2.4MB) - Aug / 29 / 2009</li>
				<li><a href="/media/renamer/files/Renamer [1.3 - win32].zip">Renamer [1.3 - win32].zip</a> (20.0KB) - Mar / 08 / 2009</li>
				<li><a href="/media/renamer/files/Renamer [1.2 - win32].zip">Renamer [1.2 - win32].zip</a> (6.0KB) - Aug / 05 / 2008</li>
				<li><a href="/media/renamer/files/Renamer [1.1.4 - win32].zip">Renamer [1.1.4 - win32].zip</a> (5.8KB) - Jul / 27 / 2008</li>
				<li><a href="/media/renamer/files/Renamer [1.1.2 - win32].zip">Renamer [1.1.2 - win32].zip</a> (5.6KB) - Jul / 20 / 2008</li>
			</ul>
			<h2>Source Code</h2>
			<ul>
				<li><a href="/media/renamer/files/renamer-1.4.0 (source).zip">renamer-1.4.0 (source).zip</a> (199.8KB) - Feb / 10 / 2019</li>
				<li><a href="/media/renamer/files/Renamer Source [1.3.2].zip">Renamer Source [1.3.2].zip</a> (6.3KB) - Apr / 24 / 2010</li>
				<li><a href="/media/renamer/files/Renamer Source [1.3.1].zip">Renamer Source [1.3.1].zip</a> (3.8KB) - Aug / 29 / 2009</li>
				<li><a href="/media/renamer/files/Renamer Source [1.3].zip">Renamer Source [1.3].zip</a> (3.8KB) - Mar / 08 / 2009</li>
				<li><a href="/media/renamer/files/Renamer Source [1.2].zip">Renamer Source [1.2].zip</a> (3.7KB) - Aug / 05 / 2008</li>
				<li><a href="/media/renamer/files/Renamer Source [1.1.4].zip">Renamer Source [1.1.4].zip</a> (3.6KB) - Jun / 27 / 2008</li>
				<li><a href="/media/renamer/files/Renamer Source [1.1.2].zip">Renamer Source [1.1.2].zip</a> (3.4KB) - Jul / 20 / 2008</li>
			</ul>
			<p>
				<span class="leadin">Note:</span>
				<ul>
					<li>The linux build of Renamer 1.4.0 requires Qt 5.6 or greater be installed. On Debian/Mint/Ubuntu distros, you can install the libqt5gui5 package via apt-get.</li>
					<li>The linux build of Renamer before 1.4.0 requires Qt 4 be installed. On Debian/Mint/Ubuntu distros, you can install the libqtgui4 package via apt-get.</li>
					<li>Renamer 1.2 and below were built using GTK instead of Qt. Windows users will need GTK+ runtime version 2.12.11 or later. Download the latest version from <a href="http://sourceforge.net/projects/gtk-win/">SourceForge</a>.</li>
				</ul>
			</p>
<?php
$cb->close();

// FOOTER
BasicFooter::generic();

// close body
body::close();

?>
