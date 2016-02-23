<?php
function do_post_request($url, $data, $optional_headers = null){
 $params = array('http' => array(
			  'method' => 'POST',
			  'content' => $data
		   ));
 if ($optional_headers !== null) {
	$params['http']['header'] = $optional_headers;
 }
 $ctx = stream_context_create($params);
 $fp = @fopen($url, 'rb', false, $ctx);
 if (!$fp) {
	throw new Exception("Problem with $url, $php_errormsg");
 }
 $response = @stream_get_contents($fp);
 if ($response === false) {
	throw new Exception("Problem reading data from $url, $php_errormsg");
 }
 return $response;
}

function createSign(){
	$token = $_POST["token"];
	$time = mktime();
	$appId = 90026;
	$appKey = "ku4aJxfftAWAGheHtukK5";
	
	$sign = array(
	  'token' => $token,  
	  'time' => $time,
	  'appId' => 90026
	);
	ksort($sign);
	$signStr = "";
	foreach($sign as $key => $value){
		$signStr .= $key ."=" . $value;
	}
	$signStr = md5($signStr.$appKey);
	
	$post_data = array(  
	  'token' => $token,  
	  'time' => $time,
	  'appId' => 90026,
	  'sign' => $signStr,
	);
	$postdata = http_build_query($post_data);
	//echo json_encode($postdata);
	echo do_post_request("http://api.egret-labs.org/v2/user/getInfo",$postdata);
} 

header('content-type:application:json;charset=utf8');  
header('Access-Control-Allow-Origin:*');  
header('Access-Control-Allow-Methods:POST');  
header('Access-Control-Allow-Headers:x-requested-with,content-type');  

createSign();
?>