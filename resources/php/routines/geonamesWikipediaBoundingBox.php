<?php
/* ==================================================================================================================================================
Geonames Wikipedia Bounding Box
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

/* Get Geonames Wikipedia Bounding Box Data ===== */
$north = $received_data['north'];
$south = $received_data['south'];
$east = $received_data['east'];
$west = $received_data['west'];

$url = geonames_wikipedia_bounding_box_URL($geonames_username, $north, $south, $east, $west);
$result = curl_request($url);
$decoded_result = json_decode($result, true);

/* Return Geonames Wikipedia Bounding Box Data ===== */
json_return($decoded_result, "'Geonames - Wikipedia Bounding Box' data successfully obtained", $execution_start_time);

?>