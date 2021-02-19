<?php
/* ==================================================================================================================================================
Open Weather Map Onecall
===================================================================================================================================================== */
/* Imports ===== */
// Config
include('../../../../../../portfolio-config/global-gazetteer/config.php');
// Helpers
include('../helpers/helpers.php');
// URLs
include('../URLs/openWeatherMapURLs.php');

/* Get Received Data ===== */
$received_data = $_POST['data'];

/* Get Open Weather Map Onecall Data ===== */
$lat = $received_data['lat'];
$lon = $received_data['lon'];

$url = open_weather_map_onecall_URL($openweather_api_key, $lat, $lon);
$result = curl_request($url);
$decoded_result = json_decode($result, true);

/* Return Open Weather Map Onecall Data ===== */
json_return($decoded_result, "'Open Weather Map - Onecall' data successfully obtained", $execution_start_time);

?>