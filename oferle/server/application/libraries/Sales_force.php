<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sales_force {

        public function access_token()
        {                      

	   define("grant_type", "password");
	   define("client_id", "3MVG9Gmy2zmPB01ql_FYDk4WvpIbsZuZTsR7Rd3WB.iy8XwssLXER4XBa7dA_8u3cd6QdE603otcdZmR8lKYN");
	   define("client_secret", "DB2630E9F73FB228A21960BAEABFF443A7FC7DDFFCD1F9BA9E7D647605C4EA6F");
	   define("username", "dangitlin@gmail.com.dev");
	   define("password", "Junior32QXczYZQujggbteWJzBesE11h");
        	   

			            $curl = curl_init();
						curl_setopt_array($curl, array(
					    CURLOPT_RETURNTRANSFER => 1,
					    CURLOPT_URL => 'https://test.salesforce.com/services/oauth2/token',
					    CURLOPT_USERAGENT => 'Codular Sample cURL Request',
					    CURLOPT_POST => 1,
					    CURLOPT_POSTFIELDS => array(
					        "grant_type" => grant_type,
					        "client_id" =>  client_id,
					        "client_secret" => client_secret,
					        "username" => username,
						    "password" => password,
							)
						));
						 $resp = curl_exec($curl);
						 return $data=json_decode($resp);
        }
}