<?php
/* ==================================================================================================================================================
Rapid URL Arrays
===================================================================================================================================================== */
/* Functions ===== */
/* Rapid API Newscatcher Latest Headlines URL Array =================================================================================================== */
function rapid_api_newscatcher_latest_headlines_URL_array($api_host, $api_key, $country_name) {

    $country_name = urlencode($country_name);

    $url_array = [
        CURLOPT_URL => "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=" . $country_name . "&pageNumber=1&pageSize=10&autoCorrect=true",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            $api_host,
            $api_key
        ]
    ];

    return $url_array;

}

/* Rapid API Covid 19 Statistics URL Array ==================================================================================================================== */
function rapid_api_covid_19_statistics_regions_URL_array($api_host, $api_key, $iso_code) {

    $iso_code = urlencode($iso_code);

    $url_array = [
        CURLOPT_URL => "https://covid-19-statistics.p.rapidapi.com/reports?iso=" . $iso_code,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            $api_host,
            $api_key
        ]
    ];

    return $url_array;

}

?>