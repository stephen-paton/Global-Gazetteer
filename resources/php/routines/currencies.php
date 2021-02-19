<?php
/* ==================================================================================================================================================
Currencies
===================================================================================================================================================== */
/* Imports ===== */
// Config
include('../../../../../../portfolio-config/global-gazetteer/config.php');
// Helpers
include('../helpers/helpers.php');
// URLs
include('../URLs/openExchangeRatesURLs.php');

/* Get Received Data ===== */
$received_data = $_POST["data"];

/* Get Currencies Data ===== */
$continue = true;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {

    $continue = false;

}

// Check if Currencies table exists
if ($continue) {

    $sql = "SELECT 1 FROM Currencies;";

    $exists = $conn->query($sql);

    if (!($exists)) {

        // Create Currencies table
        $sql = <<<SQL
        CREATE TABLE Currencies (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            countryCode VARCHAR(3) UNIQUE NOT NULL,
            exchangeRate DECIMAL(12, 6) NOT NULL,
            dateCreated DATE NOT NULL
        );
SQL;
        // Currencies table creation failed
        if (!($conn->query($sql))) {

            $continue = false;

        }

    }

}


// Check if Currencies table contains data
if ($continue) {

    $sql = "SELECT DATE_FORMAT(dateCreated, '%d/%m/%Y') FROM Currencies LIMIT 1";

    $query_result = $conn->query($sql);
    
    if ($query_result->num_rows > 0) {
        
        $date_created = $query_result->fetch_row()[0];

        $update_currencies_table = false;

        if (object_contains_property('date', $received_data)) {

            $current_date = $received_data['date'];

            // if currencies table is not upto date
            if (!($current_date === $date_created)) {

                $update_currencies_table = true;

            }

        }

    } else {

        $update_currencies_table = true;

    }

    // Update Currencies Table (if required)
    if ($update_currencies_table) {

        $url = open_exchange_rates_latest_URL($open_exchange_rates_id);
        $result = curl_request($url);
        $decoded_result = json_decode($result, true);

        // Clear Currencies table
        $sql = "DELETE FROM Currencies;";

        $conn->query($sql);

        $currencies = $decoded_result["rates"];
                
        foreach($currencies as $currency => $currency_value) {

            $sql = <<<SQL
            INSERT INTO Currencies (id, countryCode, exchangeRate, dateCreated)
            VALUES (default, ?, ?, DATE(NOW()));
SQL;

            $insert = $conn->prepare($sql);
            $insert->bind_param('sd', $currency, $currency_value);
            
            $successful = $insert->execute();

            if (!$successful) {

                $continue = false;
                break;

            }

        }

    }

}

// Get currency info from Currencies table
if ($continue) {

    $sql = <<<SQL
        SELECT countryCode, exchangeRate
        FROM Currencies;
SQL;

    $query_result = $conn->query($sql);

    if ($query_result->num_rows > 0) {

        $currencies = [];
        // Loop through Currency table results
        while ($row = $query_result->fetch_assoc()) {

            $country_code = $row['countryCode'];
            $exchange_rate = $row['exchangeRate'];

            $currencies[$country_code] = $exchange_rate;

        }

        $data['currencies'] = $currencies;

    }

}

/* Return Currencies Data ===== */
json_return($currencies, "'Currencies' data successfully obtained", $execution_start_time);
mysqli_close($conn);

?>