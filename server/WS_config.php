<?php
    /**
     * This file contains all main settings
     * needed to make the connection between 
     * Client APP and Server
     */

    //#1 - Server Base URL
    define('SERVICE_BASE_URL', 'https://salaonline.makeitdigital.pt');


    //#A - Generic Function to make a Server Call
    function SERVER_Request($ch, $url, $params){

        // Build Http query using params
        $query = http_build_query ($params);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);

        curl_setopt($ch, CURLOPT_BINARYTRANSFER, false);

        $response = curl_exec($ch);
        // send response as JSON
        return json_decode($response, true);
    }

?>