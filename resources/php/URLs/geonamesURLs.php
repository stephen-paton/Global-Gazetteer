<?php
/* ==================================================================================================================================================
Geonames URLs 
===================================================================================================================================================== */
/* Functions ===== */
/* Geonames Country Info URL ================================================================================================================================= */
function geonames_country_info_URL($username, $lat, $lon) {

    $username = urlencode($username);
    $lat = urlencode($lat);
    $lon = urlencode($lon);

    $url = 'http://api.geonames.org/countryInfoJSON?formatted=truelat=' . $lat . '&lng=' . $lon . '&username=' . $username;

    return $url;

}

/* Geonames Wikipedia Search URL ============================================================================================================================= */
function geonames_wikipedia_search_URL($username, $country_name, $country_code) {

    $username = urlencode($username);
    $country_name = urlencode($country_name);
    $country_code = urlencode($country_code);

    $url = 'http://api.geonames.org/wikipediaSearchJSON?q=' . $country_name . '&countryCode=' . $country_code . '&lang=en&username=' . $username;

    return $url;

}

/* Geonames Find Nearby Wikipedia URL ======================================================================================================================== */
function geonames_find_nearby_wikipedia_URL($username, $lat, $lon) {

    $username = urlencode('stephen.c.paton');
    $lat = urlencode($lat);
    $lon = urlencode($lon);
    
    $url = 'http://api.geonames.org/findNearbyWikipediaJSON?lat=' . $lat . '&lng=' . $lon . '&maxRows=10&username=' . $username;

    return $url;

}

/* Geonames Wikipedia Bounding Box URL =========================================================================================================================== */
function geonames_wikipedia_bounding_box_URL($username, $north, $south, $east, $west) {

    $username = urlencode($username);
    $north = urlencode($north);
    $south = urlencode($south);
    $east = urlencode($east);
    $west = urlencode($west);
    

    $url = 'http://api.geonames.org/wikipediaBoundingBoxJSON?north=' . $north . '&south=' . $south . '&east=' . $east . '&west=' . $west . '&maxRows=10&username=' . $username;

    return $url;

}

/* Geonames Weather URL ====================================================================================================================================== */
function geonames_weather($username, $north, $south, $east, $west) {

    $username = urlencode($username);
    $north = urlencode($north);
    $south = urlencode($south);
    $east = urlencode($east);
    $west = urlencode($west);

    $url = 'http://api.geonames.org/weatherJSON?north=' . $north . '&south=' . $south . '&east=' . $east . '&west=' . $west . '&username=' . $username;

    return $url;

}

?>