<?php
require_once("../oauth/OAuth.php");

$consumer = new OAuthConsumer("zkMNib2boP9JliCYd4Vc", "eslyMTm4gwBtQO1NKltnZwtAHqO2S2GMpIVDJoF2", NULL);
$access_token = new OAuthConsumer("yqrShwzoKXCSnSjjra3g", "uUIM4NcEDgpvs0929IlA10URqG3J56PmhfN0G81k", 1);

$request = OAuthRequest::from_consumer_and_token($consumer, $access_token, "GET", "http://gomiso.com/api/oauth/v1/checkins.json", array("user_id"=> "136487", "count" => 1));
$request->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, $access_token);

header('Content-type: application/json');
echo file_get_contents($request);
