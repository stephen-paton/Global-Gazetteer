<?php
/* ==================================================================================================================================================
Country Borders
===================================================================================================================================================== */
/* Imports ===== */
// Config
include('../../../../../../portfolio-config/global-gazetteer/config.php');
// Helpers
include('../helpers/helpers.php');

/* Get Country Borders Data ===== */
$result = file_get_contents("../../json/countryBorders.geo.json");
$decoded_result = json_decode($result, true);

/* Return Country Borders Data ===== */
json_return($decoded_result, "'Country Borders' data successfully obtained", $execution_start_time);

?>