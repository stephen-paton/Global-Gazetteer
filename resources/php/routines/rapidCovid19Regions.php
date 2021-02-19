<?php
/* ==================================================================================================================================================
Rapid Covid 19 Regions
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

/* Get Rapid Covid 19 Regions Data ===== */
$iso_code = $received_data['isoCode'];

$url_array = rapid_api_covid_19_statistics_regions_URL_array($covid_19_statistics_api_host, $covid_19_statistics_api_key, $iso_code);
$curl = curl_init();
curl_setopt_array($curl, $url_array);
$result = curl_exec($curl);
curl_close($curl);
$decoded_result = json_decode($result, true);

/* Return Rapid Covid 19 Regions Data ===== */
json_return($decoded_result, "'Rapid - Covid 19 Regions' data successfully obtained", $execution_start_time);

?>