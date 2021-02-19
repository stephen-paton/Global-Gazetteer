<?php
/* ==================================================================================================================================================
Geonames Find Nearby Wikipedia
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

/* Get Geonames Find Nearby Wikipedia Data ===== */
$lat = $received_data['lat'];
$lon = $received_data['lon'];

$url = geonames_find_nearby_wikipedia_URL($geonames_username, $lat, $lon);
$result = curl_request($url);
$decoded_result = json_decode($result, true);

/* Return Geonames Find Nearby Wikipedia Data ===== */
json_return($decoded_result, "'Geonames - Find Nearby Wikipedia' data successfully obtained", $execution_start_time);

?>