<?php
/* ==================================================================================================================================================
Rest Countries
===================================================================================================================================================== */
/* Imports ===== */
// Config
include('../../../../../../portfolio-config/global-gazetteer/config.php');
// URLs
include('../URLs/restCountriesURLs.php');
// Helpers
include('../helpers/helpers.php');

/* Get REST Countries Data ===== */
$url = rest_countries_all_URL();
$result = curl_request($url);
$decoded_result = json_decode($result, true);

/* Return REST Countries Data ===== */
json_return($decoded_result, "REST Countries data successfully obtained", $execution_start_time);

?>