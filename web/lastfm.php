<?php

header('Content-type: application/json');
echo file_get_contents(sprintf(
	'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=%s&limit=%s&api_key=%s&format=%s',
	'feredir',
	1,
	'941699acc72bfd756c1f72a8b8abef77',
	'json'
));
