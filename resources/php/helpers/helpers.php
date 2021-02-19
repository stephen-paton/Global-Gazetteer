<?php
/* ==================================================================================================================================================
Helpers
===================================================================================================================================================== */
/* Functions ===== */
/* Object Contains Variable ===========================================================================
   Description: Checks that the variable is in the object and if not, throws an exception. */
function object_contains_property($prop, $obj) {

    if (!$obj[$prop]) {

        return false;

    }

    return true;

}

/* CURL Request ========================================================================================
   Description: Carries out curl request and returns result. */
function curl_request($url) {

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

    $result = curl_exec($ch);

    curl_close($ch);

    return $result;

}

/* JSON Return =========================================================================================
   Description: Returns successful JSON to request.js */
function json_return($json_object, $description, $execution_start_time) {

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = $description;
    $output['status']['returnedIn'] = (microtime(true) - $execution_start_time) / 1000 . " ms";
    $output['data']['content'] = $json_object;

    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output);

}

/* JSON Reject =========================================================================================
   Description: Returns unsuccessful JSON to request.js */
   function json_reject($error_code, $error_name, $description, $execution_start_time) {

    $output['status']['code'] = $error_code;
    $output['status']['name'] = $error_name;
    $output['status']['description'] = $description;
    $output['status']['returnedIn'] = (microtime(true) - $execution_start_time) / 1000 . " ms";

    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output);    

}

?>