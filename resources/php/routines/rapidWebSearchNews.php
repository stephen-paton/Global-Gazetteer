<?php
/* ==================================================================================================================================================
Rapid Web Search News
===================================================================================================================================================== */
/* Imports ===== */
// Config
include('../../../../../../portfolio-config/global-gazetteer/config.php');
// Helpers
include('../helpers/helpers.php');
// URLs
include('../URLs/rapidURLArrays.php');

/* Get Received Data ===== */
$received_data = $_POST['data'];

/* Get Rapid Web Search News Data ===== */
$country_name = $received_data['countryName'];

$url_array = rapid_api_newscatcher_latest_headlines_URL_array($newscatcher_api_host, $newscatcher_api_key, $country_name);
$curl = curl_init();
curl_setopt_array($curl, $url_array);
$result = curl_exec($curl);
curl_close($curl);
$decoded_result = json_decode($result, true);

/* Return Rapid Web Search News Data ===== */
json_return($decoded_result, "'Rapid - Covid 19 Regions' data successfully obtained", $execution_start_time);

?>