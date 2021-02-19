<?php
/* ==================================================================================================================================================
Open Weather Map URLs
===================================================================================================================================================== */
/* Functions ===== */
/* Open Weather Map Onecall URL ================================================================================================================================= */
function open_weather_map_onecall_URL($api_key, $lat, $lon) {

    $api_key = urlencode($api_key);
    $lat = urlencode($lat);
    $lon = urlencode($lon);

    $url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' . $lat . '&lon=' . $lon . '&exclude=minutely&appid=' . $api_key;

    return $url;

}



?>