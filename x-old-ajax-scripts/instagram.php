<?php

define('USER_ID', 80434);
define('ACCESS_TOKEN', '80434.a919d97.833b68d98bf9420b9d8e777f2e11d19d');

$recent_photos_url = sprintf(
	'https://api.instagram.com/v1/users/%s/media/recent/?access_token=%s',
	USER_ID,
	ACCESS_TOKEN
);

header('Content-type: application/json');
echo file_get_contents($recent_photos_url);
