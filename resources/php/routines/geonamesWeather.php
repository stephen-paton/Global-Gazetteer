<?php
/* ==================================================================================================================================================
Geonames Weather
===================================================================================================================================================== */
/* Imports ===== */
// Config
include('../../../../../../portfolio-config/global-gazetteer/config.php');
// Helpers
include('../helpers/helpers.php');
// URLs
include('../URLs/geonamesURLs.php');

/* Get Received Data ===== */
$received_data = $_POST['data'];

/* Get Geonames Weather Data ===== */
$north = $received_data['north'];
$south = $received_data['south'];
$east = $received_data['east'];
$west = $received_data['west'];

$url = geonames_weather($geonames_username, $north, $south, $east, $west);
$result = curl_request($url);
$decoded_result = json_decode($result, true);

/* Return Geonames Weather Data ===== */
json_return($decoded_result, "'Geonames - Weather' data successfully obtained", $execution_start_time);

?>