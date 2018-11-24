<?php
    /**
     * Add new User API
     * The received parameters:
     * clientData : {"name": "","email_address": "","password": "","telemovel": ""}
     */

    include("WS_config.php");

    //#1 - Accept POST references
    $inputJSON = file_get_contents('php://input');
    $clientData  = json_decode($inputJSON)->clientData;

    echo '{ "code" : 0, "user_id" : "123", "message" : "message sent!" }';

?>