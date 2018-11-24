<?php
    /**
     * Add new User API
     * The received parameters:
     * pinCode : ""
     */

    include("WS_config.php");

    //#1 - Accept POST references
    $inputJSON = file_get_contents('php://input');
    $pinCode  = json_decode($inputJSON)->pinCode;

    echo '{ "code" : 0, "pin" : 337591, "user_id" : 224 }';

?>