<?php
require_once("../oauth/OAuth.php");

$consumer = new OAuthConsumer("SuQkP9M8oFZPuhTDle8UZg", "dKGEYN93iMkyZAxFhXIRsODq65LXwbVJQyPthzQ4po", NULL);
$access_token = new OAuthConsumer("5531692-GqpoKtO53zRc7ahwhrJA8ijPSEYXIpPkMmAqc8EhIc", "W3vFsd4eqKKq4OZXeA9D8den7tsm3HSpKRPYTl1BwQ", 1);

$request = OAuthRequest::from_consumer_and_token($consumer, $access_token, "GET", "http://api.twitter.com/1/statuses/user_timeline.json", array('count' => 1));
$request->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, $access_token);

header('Content-type: application/json');
echo file_get_contents($request);
