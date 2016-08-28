<?php

$files = array(
	"components/buttons.html",
	"components/formatting.html",
	"components/grid.html",
	"components/messages.html",
	"components/tables.html",
	"components/tabs.html"
);

$header = "/*
* CSS UI v1.6 (Aug 2016)
* http://css-ui.com
*
* Copyright 2015, http://codeeverywhere.ca
* Licensed under the MIT license.
*/
";

file_put_contents("ui.min.css", $header);

foreach( $files as $filename )
{
	$data = file_get_contents($filename);
	$data = preg_replace('/\s+/', " ", $data);	
	preg_match("/\<style\>(.*)\<\/style\>/", $data, $css);
	$css = $css[1];
	file_put_contents("ui.min.css", $css, FILE_APPEND);
}

?>
