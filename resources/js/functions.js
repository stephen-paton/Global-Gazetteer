/* =====================================================================================================
GLOBAL FUNCTIONS
======================================================================================================== */
// ===== Helper Functions =====
/* Capitalize First Letter =============================================================================
   Description: Takes a string and returns that string with the first letter capitalized e.g. apple returns Apple. */
function capitalizeFirstLetter(inputString) {

    let newString = inputString.charAt(0).toUpperCase() + inputString.slice(1);

    return newString;
  
}

/* Positive Or Negative ================================================================================
   Description: Returns the respective className for the covid span element, based on value of the input integer and 
   whether positive is true or false (true means that positive values are good and false means that negative values are good). */
function positiveOrNegative(integer, positive) {

    let spanClass = 'neutral';

    if (positive) {

        if (integer > 0) {

            spanClass = 'positive';

        } else if (integer < 0) {

            spanClass = 'negative';

        }

    } else {

        if (integer < 0) {

            spanClass = 'positive';

        } else if (integer > 0) {

            spanClass = 'negative';

        }

    }   

    return spanClass;

}

/* Debug Log ===========================================================================================
   Description: Uses to write console.log() messages that only run when debug mode is active. */
function debug_log(msg) {

    if (window['debug']) {

        console.log(msg);

    }

}

/* Number With Commas ==================================================================================
   Description: Takes number as input and returns as string with a comma at every 3rd digit e.g. 1000 returns 1,000. */
function numberWithCommas(number) {

    number = number.toString();

    const splitNumber = number.split(".");

    splitNumber[0] = splitNumber[0].toString().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");

    const numberWithCommas = splitNumber.join(".");

    return numberWithCommas;

}

/* Return Bounding Box From Country Name =============================================================== 
   Description: Returns an array containing N(y), S(y), E(x) and W(x) bounding box coordinates. */
function returnBoundingBoxFromCountryName(countryName) {

    let countriesInfo = countriesInfoFunctions.returnCountriesInfo();

    let features = countriesInfo['countryBorders']['features'];

    let countryBoundary;

    for (let i = 0; i < features.length; i++) {

        if (features[i]['properties']['name'] == countryName) {

            countryBoundary = coordinatesToMultipolylineArray(features[i]['geometry']['coordinates']);
            break;

        }

    }

    if (!(countryBoundary)) {

        console.error("returnBoundingBoxFromCountryName: Country not in countryBoundaries");
        return;

    }

    let maxNorth;
    let maxSouth;
    let maxEast;
    let maxWest;

    for (let i = 0; i < countryBoundary.length; i++) {

        let currentNorth = countryBoundary[i][0][0]; // lat = y
        let currentSouth = countryBoundary[i][0][0]; // lat = y
        let currentEast = countryBoundary[i][0][1]; // lon = x
        let currentWest = countryBoundary[i][0][1]; // lon = x

        for (let j = 1; j < countryBoundary[i].length; j++) {

            let currentX = countryBoundary[i][j][1];
            let currentY = countryBoundary[i][j][0];

            // North and South
            if (currentY > currentNorth) {

                currentNorth = currentY;

            } else if (currentY < currentSouth) {

                currentSouth = currentY;

            }

            // East and West
            if (currentX > currentEast) {

                currentEast = currentX;

            } else if (currentX < currentWest) {

                currentWest = currentX;

            }

        }

        if (i == 0) {

            maxNorth = currentNorth;
            maxSouth = currentSouth;
            maxEast = currentEast;
            maxWest = currentWest;

        } else {

            if (currentNorth > maxNorth) {

                maxNorth = currentNorth;

            }

            if (currentSouth < maxSouth) {

                maxSouth = currentSouth;

            }

            if (currentEast > maxEast) {

                maxEast = currentEast;

            }

            if (currentWest < maxWest) {

                maxWest = currentWest;

            }

        }

    }

    return {

        north: maxNorth,
        east: maxEast,
        south: maxSouth,
        west: maxWest

    }

}

/* Populate Search Datalist ============================================================================
   Description: Populates the Search Datalist for the Header's Search Form with Country names. */
function populateCountrySelect() {

    let countriesInfo = countriesInfoFunctions.returnCountriesInfo();

    let features = countriesInfo['countryBorders']['features'];

    // Setup alphabetized countries array
    const countryNames = [];

    features.forEach(feature => {

        const countryName = feature['properties']['name'];

        countryNames.push(countryName);

    });

    countryNames.sort();

    // populate coutriesList string with all countries from countryBorders as options, then update datalist once with countriesList string 
    let countriesList = "";

    const homeCountryName = countriesInfo['home']['countryBorder']['properties']['name'];

    countryNames.forEach(countryName => {

        if (countryName == homeCountryName) {

            countriesList += `<option value="${countryName}" selected>${countryName}</option>`; 

        } else {

            countriesList += `<option value="${countryName}">${countryName}</option>`;

        }

    });

    $countriesSelect = $('#countries');
    $countriesSelect.html(countriesList);

}

/* Is Inside ===========================================================================================
   Description: Expects a closed shape expressed as a lat/lon polylineArray. Determines if input lat/lon coords are inside. Returns true if so and false if not. */
function isInside(lat, lon, polylineArray) {

    let yPoint = lat;
    let xPoint = lon;

    let numberOfCrossings = 0;
    // Connects each point in the polylineArray with the subseqent point via a straight line 
    for (let i = 0; i < (polylineArray.length - 1); i++) {

        let y1 = polylineArray[i][0];
        let x1 = polylineArray[i][1];
        let y2 = polylineArray[i+1][0];
        let x2 = polylineArray[i+1][1];

        
        // Testing by drawing line straight up from point, and determining if it crosses current boundary line. Each crossing is added to tally.
        // An odd number of crossing means point is inside bounds, an even number of crossings means point is outside.
        if (!((x1 < xPoint) && (x2 < xPoint)) && // boundary coords aren't both to the left of the point
            !((x1 > xPoint) && (x2 > xPoint)) && // boundary coords aren't both to the right of the point
            !((y1 < yPoint) && (y2 < yPoint))) { // boundary coords aren't both below the point

            // If both points are above, crossing occurred.
            if ((y1 > yPoint) && (y2 > yPoint)) {

                numberOfCrossings += 1;

            // If both points arent above, determine if intersection point is. If so, crossing occurred.
            } else {

                let yIntersect = ((y2 - y1) / (x2 - x1)) * (xPoint - x1) + y1; // y = mx + c (straight line equation)

                if (yIntersect > yPoint) {

                    numberOfCrossings += 1;

                }

            }

        }

    }

    // If number of crossings is odd, then point is inside
    if (numberOfCrossings % 2 == 1) {

        return true;

    }

    return false;

}

/* Is Inside Country ===================================================================================
   Description: Takes an array containing multiple closed shape polylineArrays and determines if input lat/lon falls within any of them.
                If so returns true, else returns false. */
function isInsideCountry(lat, lon, multiPolylineArray) {

    let inside = false;

    // Loops through each boundary for the current country and determines if point is inside.
    // returns true for the first boundary that the point is found to be inside. Returns false if the point is not inside any.
    for (let i = 0; i < multiPolylineArray.length; i++) {

        if (isInside(lat, lon, multiPolylineArray[i])) {

            return true;

        }

    }

    return false;

}

/* Coordinates To MultipolylineArray =================================================================== 
   Description: Converts countryBorders lon/lat Coordinates to lat/lon arrayOfMultipolylineArrays */
function coordinatesToMultipolylineArray(coordinates) {

    let lengthArray = coordinates;
    let count = 0;

    while (lengthArray[0]) {

        lengthArray = lengthArray[0];
        count += 1;
    }

    let arrayOfMultipolylineArrays = [];

    // Multiple Coordinate Boundary Arrays
    if (count > 3) {

        for (let i = 0; i < coordinates.length; i++) {

            let coordinatesArray = coordinates[i][0];

            let polylineArray = [];

            for (let j = 0; j < coordinatesArray.length; j++) {

                polylineArray[j] = [];
                polylineArray[j][0] = coordinatesArray[j][1];
                polylineArray[j][1] = coordinatesArray[j][0];

            }

            arrayOfMultipolylineArrays[i] = polylineArray;

        }

    // Single Coordinate Boundary Array
    } else {

        let coordinatesArray = coordinates[0];

        let polylineArray = [];

        for (let j = 0; j < coordinatesArray.length; j++) {

            polylineArray[j] = [];
            polylineArray[j][0] = coordinatesArray[j][1];
            polylineArray[j][1] = coordinatesArray[j][0];

        }

        arrayOfMultipolylineArrays[0] = polylineArray;

    }

    return arrayOfMultipolylineArrays;

}

/* Return Country Name From Lat Lon ====================================================================
   Description: If lat/lon coordinates are inside any country boundary in countryBoundaries object, returns the name of the country matched.
                Else returns false. */
function returnCountryNameFromLatLon(lat, lon) {

    let countriesInfo = countriesInfoFunctions.returnCountriesInfo();

    let features = countriesInfo['countryBorders']['features'];

    let isInside = false;

    for (let i = 0; i < features.length; i++) {

        let coordinates = features[i]['geometry']['coordinates'];

        let multiPolylineArray = coordinatesToMultipolylineArray(coordinates);

        if (isInsideCountry(lat, lon, multiPolylineArray)) {

            let countryName = features[i]['properties']['name'];

            return countryName;

        }

    }

    return false;

}

/* Return ISO A2 From Country Name =====================================================================
   Description: Takes a country name and returns it's iso A2 code, if found, or false if not. */
function returnIsoA2FromCountryName(countryName) {

    let countriesInfo = countriesInfoFunctions.returnCountriesInfo();

    let features = countriesInfo['countryBorders']['features'];

    for (let i = 0; i < features.length; i++) {

        if (countryName == features[i]['properties']['name']) {

            let isoA2 = features[i]['properties']['iso_a2'];

            return isoA2;

        }

    }

    return false;

}

/* Return Lat Lon From ISO A2 ==========================================================================
   Description: Takes a country's iso A2 code and returns a lat/lon array of that country's location, from the 
                countryBorders object, or false if no lat/lon coordinates are found. */
function returnLatLonFromIsoA2(countryIsoA2) {

    let countriesInfo = countriesInfoFunctions.returnCountriesInfo();

    let restCountries = countriesInfo['restCountries'];

    for (let i = 0; i < restCountries.length; i++) {


        let restIsoA2 = restCountries[i]['alpha2Code'];

        if (restIsoA2 == countryIsoA2) {

            let latLon = restCountries[i]['latlng'];

            return latLon;

        }

    }

    return false;

}

/* =====================================================================================================
Countries Info Functions
======================================================================================================== */
let countriesInfoFunctions = function () {
    /* Update Countries Info ===============================================================================
       Description: Updates countriesInfo object in localStorage. */
    function updateCountriesInfo(name, jsonObject, type) {

        // Setup inputObject to add to CountriesInfo
        let inputObjectContent = jsonObject['data']['content'];
        let inputObjectTimestamp = jsonObject['data']['timeOfCreation'];

        let inputObject = {
            [name]: inputObjectContent,
            timeOfCreation: {
                [name]: inputObjectTimestamp
            }
        }

        if (type) {

            if ((type == 'home') || (type == 'current')) {

                inputObject = {

                    [type]: inputObject

                }

            } else {

                console.error('countriesInfoFunctions.updateCountriesInfo(): Invalid type specified');
                return false;

            }

        } 

        // if countriesInfo data isn't in localStorage, store jsonObject as countriesInfo
        if (!(returnCountriesInfo())) {

            localStorage.setItem('countriesInfo', JSON.stringify(inputObject));
        
        // if countriesInfo data is present in localStorage, merge jsonObject data with countriesInfo data and update countriesInfo data in localStorage
        } else {

            let countriesInfo = JSON.parse(localStorage.getItem('countriesInfo'));

            // If 'home' or 'current' specified, then save data under this heading in the countriesInfo object
            if (type) {

                if (countriesInfo[type]) {

                    delete countriesInfo[type][name];

                }

                _.merge(countriesInfo, inputObject);

                localStorage.setItem('countriesInfo', JSON.stringify(countriesInfo));


            // If no 'type' is specified, then save object under its own heading in the countriesInfo object
            } else {

                delete countriesInfo[name];

                _.merge(countriesInfo, inputObject);

                localStorage.setItem('countriesInfo', JSON.stringify(countriesInfo));

            }

        }

        return true;

    }

    /* Return Country Border ===============================================================================
       Description: Returns the countryBorder element in the countriesInfo object by filtering through the countryBorders element 
                    and finding the matching element. Returns the countryBorder object if a match is found and false if not. */
    function returnCountryBorder(type, countryName) {

        // ===== Input Validation =====
        // Validate 'type'
        if (!((type == 'home') || (type == 'current'))) {

            console.error('updateCountryBorder: Incorrect type specified');
            return false;

        }

        let countriesInfo = returnCountriesInfo();

        let features = countriesInfo['countryBorders']['features'];

        for (let i=0; i < features.length; i++) {

            if (features[i]['properties']['name'] == countryName) {

                let countryBorder = features[i];

                let timeOfCreation = moment().unix();

                let countryBorderObject = {
                    data: {
                        content: countryBorder,
                        timeOfCreation: timeOfCreation 
                    }
                }

                return countryBorderObject;

            }

        }

        console.error('returnCountryBorder: Country not found in countryBorders object');
        return false;

    }

    // ===== Exported Functions =====
    /* Return Countries Info ===========================================================================
    Description: Returns the countriesInfo object from localStorage as a JSON Object */
    function returnCountriesInfo() {

        return JSON.parse(localStorage.getItem('countriesInfo'));

    }

    /* Update Property ================================================================================= 
       Description: Carries out a PHP POST request and if successful, updates the relevant countriesInfo property with the
                    returned information. Returns true if successful and false if not. */
    async function updateProperty(propertyName, type, optionsObject) {

        let returnObject;

        let lat, lon;
        let north, south, east, west;
        let date;
        let countryName;
        let isoCode;

        try {

            switch (propertyName) {

                case 'restCountries':
                    returnObject = await request.phpRequest('restCountries');
                    break;
                case 'localPOI':
                    lat = optionsObject['lat'];
                    lon = optionsObject['lon'];
                    returnObject = await request.phpRequest('geonamesFindNearbyWikipedia', {lat: lat, lon: lon});
                    break;
                case 'countryPOI':
                    north = optionsObject['north'];
                    south = optionsObject['south'];
                    east = optionsObject['east'];
                    west = optionsObject['west'];
                    returnObject = await request.phpRequest('geonamesWikipediaBoundingBox', {north: north, south: south, east: east, west: west});
                    break;
                case 'currencies':
                    date = window['currentDate']
                    returnObject = await request.phpRequest('currencies', {date: date});
                    break;
                case 'countryBorders':
                    returnObject = await request.phpRequest('countryBorders');
                    break;
                case 'countryBorder':
                    countryName = optionsObject['countryName'];
                    returnObject = returnCountryBorder(type, countryName);
                    break;
                case 'countryWeather':
                    north = optionsObject['north'];
                    south = optionsObject['south'];
                    east = optionsObject['east'];
                    west = optionsObject['west'];
                    returnObject = await request.phpRequest('geonamesWeather', {north: north, south: south, east: east, west: west});
                    break;
                case 'localWeather':
                    lat = optionsObject['lat'];
                    lon = optionsObject['lon']; 
                    returnObject = await request.phpRequest('openWeatherMapOnecall', {lat: lat, lon: lon});
                    break;
                case 'covid':
                    isoCode = optionsObject['isoCode'];
                    returnObject = await request.phpRequest('rapidCovid19Regions', {isoCode: isoCode});
                    break;
                case 'news':
                    countryName = optionsObject['countryName'];
                    returnObject = await request.phpRequest('rapidWebSearchNews', {countryName: countryName});
                    break;
                default:
                    console.error('countriesInfoFunctions.updateProperty: Invalid propertyName specified');
                    return false;
    
            }

        } catch (err) {

            console.error(`The following error occurred: ${err['errorCode']} - ${err['errorMessage']}`);
            return false;

        }

        // updateCountriesInfo
        return updateCountriesInfo(propertyName, returnObject, type);

    }


    // ===== Exports =====
    return {

        returnCountriesInfo: returnCountriesInfo,
        updateProperty: updateProperty

    }

}();

/* =====================================================================================================
Loading Screen
======================================================================================================== */
let loadingScreen = function () {
    // ====== Exported Functions =====
    /* Close ===========================================================================================
       Description: Closes the Loading Screen. */
    function close() {

        let $loadingScreenContainer = $('.loadingScreenContainer');

        $loadingScreenContainer.trigger('close');

    }

    /* Update Status Message ===========================================================================
       Description: Update's the loading screen status message that is output to the user whilst the page is
                    loading. */
    function updateStatusMessage(message) {

        let $loadingStatusMessage = $('.loadingStatusMessage');

        $loadingStatusMessage.removeClass('animated bounceIn');

        $loadingStatusMessage.html(message);
        $loadingStatusMessage.addClass('animated bounceIn');

    }

    // ===== Exports =====
    return {
        close: close,
        updateStatusMessage: updateStatusMessage
    }

}();

/* =====================================================================================================
Map Functions 
========================================================================================================*/
let mapFunctions = function () {
    // ===== Exported Functions =====
    /* Update ==========================================================================================
       Description: Triggers the map to update the specified layer. */
    function update(layerName) {

        let $map = $('#map');
        $map.trigger('update', layerName);

    }

    /* Focus On:  ======================================================================================
       Description: Triggers the map to focus on the specified layer. */
    function focusOn(type, layerName) {

        let $map = $('#map');
        $map.trigger('focusOn', [type, layerName]);

    }

    /* Hide ============================================================================================
       Description: Triggers the map to hide the specified layer */
    function hide(layerName) {

        let $map = $('#map');
        $map.trigger('hide', layerName);

    }

    /* Show ============================================================================================
       Description: Triggers the map to show the specified layer */
    function show(layerName) {

        let $map = $('#map');

        $map.trigger('show', layerName);

    }

    // ===== Exports =====
    return {
        update: update,
        focusOn: focusOn,
        hide: hide,
        show: show
    }

}();

/* =====================================================================================================
Setup Functions
======================================================================================================== */
let setup = function () {
    // ===== Helper Functions =====
    /* Call APIs and Update Countries Info =================================================================
       Description: Calls all APIs in input list and updates countriesInfo object with successful returns. */
    async function callAPIsAndUpdateCountriesInfo(requestsList, type, overwrite = false) {

        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();

        let updateStatus = [];

        let currentDate = window['currentDate'];

        for (let i = 0; i < requestsList.length; i++) {

            let requestProperty;

            try {

                requestProperty = countriesInfo[type][requestsList[i]];

            } catch (e) {

                requestProperty = false;

            }

            if (requestsList[i] !== 'countryWeather') {

                if (requestProperty && (overwrite == false)) {

                    let propertyCreationDate = moment.unix(countriesInfo[type]['timeOfCreation'][requestsList[i]]).format('DD/MM/YYYY');
    
                    if (currentDate == propertyCreationDate) {
    
                        debug_log(`callAPIsAndUpdateCountriesInfo: ${requestsList[i]} data loaded from localStorage`);
                        updateStatus[i] = true;
                        continue;
    
                    }
    
                }

            }

            let countryName;
            let boundingBox;
            let lat, lon;
            let isoCode;

            switch (requestsList[i]) {

                // Bounding Box API Calls
                case 'countryPOI':
                case 'countryWeather':
                    countryName = countriesInfo[type]['countryBorder']['properties']['name'];
                    boundingBox = returnBoundingBoxFromCountryName(countryName);
                    updateStatus[i] = await countriesInfoFunctions.updateProperty(requestsList[i], type, boundingBox);
                    break;
                // Lat/Lon API Calls
                case 'localPOI':
                case 'localWeather':
                    lat = window[`${type}Lat`];
                    lon = window[`${type}Lon`];
                    updateStatus[i] = await countriesInfoFunctions.updateProperty(requestsList[i], type, {lat: lat, lon: lon});
                    break;
                case 'covid':
                    isoCode = countriesInfo[type]['countryBorder']['properties']['iso_a3'];
                    updateStatus[i] = await countriesInfoFunctions.updateProperty(requestsList[i], type, {isoCode: isoCode});
                    break;
                case 'news':
                    countryName = countriesInfo[type]['countryBorder']['properties']['name'];
                    updateStatus[i] = await countriesInfoFunctions.updateProperty(requestsList[i], type, {countryName: countryName});
                    break;

            }

        }

        let sectionsToUpdate = [];

        for (let i = 0; i < updateStatus.length; i++) {

            // Add section to sectionsToUpdate list (if update was successful)
            if (updateStatus[i]) {

                sectionsToUpdate.push(requestsList[i]);

            // Log API call failure (If update was not successful)
            } else {

                console.error(`Failed to load ${requestsList[i]} data`);

            }

        }

        return sectionsToUpdate;

    }

    /* Setup Footer and Map Sections =======================================================================
    Description: Creates footers and updates map layers for elements in input list. */
    function setupFooterAndMapSections(sectionsToUpdate, type) {

        for (let i = 0; i < sectionsToUpdate.length; i++) {

            // Update Footer and Map (if update was successful)
            switch (sectionsToUpdate[i]) {

                case 'countryPOI':
                    footer.addFooterSection(type, 'countryPOI');
                    mapFunctions.update(`${type}CountryPOI_FG`);
                    break;
                case 'localPOI':
                    footer.addFooterSection(type, 'localPOI');
                    mapFunctions.update(`${type}LocalPOI_FG`);
                    break;
                case 'countryWeather':
                    footer.addFooterSection(type, 'countryWeather');
                    mapFunctions.update(`${type}WeatherFG`);
                    break;
                case 'localWeather':
                    footer.addFooterSection(type, 'localWeather');
                    break;
                case 'covid':
                    footer.addFooterSection(type, 'covid');
                    mapFunctions.update(`${type}CovidFG`);
                    break;
                case 'news':
                    footer.addFooterSection(type, 'news');
                    break;

            }

        }

    }

    /* Update Home =========================================================================================
    Description: Update home footer sections and map layers. */
    async function updateHome(overwrite = false) {

        // Clear existing home footer sections 
        footer.clearFooter('home');

        // ===== Setup default home sections - about and exchange =====
        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();

        mapFunctions.update('homeCountryFG');
        mapFunctions.focusOn('homeCountryFG');

        footer.addFooterSection('home', 'about');
        footer.addFooterSection('home', 'exchange');

        footer.changeActiveSection('home', 'about');
        footer.close();
        footer.updateFooterInfoButton('home');

        // ===== Setup additional home location information =====
        let requestsList = ['countryPOI', 'localPOI', 'countryWeather', 'localWeather', 'covid', 'news'];

        let sectionsToUpdate = await callAPIsAndUpdateCountriesInfo(requestsList, 'home', overwrite);

        setupFooterAndMapSections(sectionsToUpdate, 'home');

    }

    // ===== Exported Functions =====
    /* Update Current ======================================================================================
    Description: Update home footer sections and map layers */
    async function updateCurrent(overwrite = false) {

        // Clear existing current footer sections 
        footer.clearFooter('current');

        // ===== Setup default current sections - about and exchange =====
        mapFunctions.update('currentCountryFG');

        footer.addFooterSection('current', 'about');
        footer.addFooterSection('current', 'exchange');

        // Fade in 'fly to current' map button
        $currentButton = $('.currentButton');
        $currentButton.fadeIn();

        // ===== Setup additional current location information =====
        let requestsList = ['countryPOI', 'countryWeather', 'covid'];

        let sectionsToUpdate = await callAPIsAndUpdateCountriesInfo(requestsList, 'current', overwrite);

        setupFooterAndMapSections(sectionsToUpdate, 'current');

    }

    /* Initialize App ======================================================================================
    Description: Establishes the user's starting location, the current date, the starting countriesInfo object and sets up the map and footer */ 
    async function initializeApp() {

        // ===== Establish starting countriesInfo object for localStorage =====
        loadingScreen.updateStatusMessage('Setting Up Location Information...');

        // Should contain REST, countryBorders and currencies data
        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();

        let request = ['restCountries', 'countryBorders', 'currencies'];    

        let updateStatus = [];

        for (let i = 0; i < request.length; i++) {

            updateStatus[i] = true;

            let countriesInfoProperty;

            try {

                countriesInfoProperty = countriesInfo[request[i]]; 

            } catch (err) {

                countriesInfoProperty = false;

            }


            if (!(countriesInfoProperty)) {

                updateStatus[i] = await countriesInfoFunctions.updateProperty(request[i]);

            } else if (request[i] !== 'countryBorders') {

                let currentDate = window['currentDate'];
                let propertyCreationDate = moment.unix(countriesInfo['timeOfCreation'][request[i]]).format('DD/MM/YYYY');

                if (!(currentDate == propertyCreationDate)) {

                    updateStatus[i] = await countriesInfoFunctions.updateProperty(request[i]);

                } else {

                    debug_log(`initializeApp: ${request[i]} data loaded from localStorage`);

                }

            } else {

                // inform that REST data has been loaded from localStorage (for dev purposes only)
                debug_log(`initializeApp: ${request[i]} data loaded from localStorage`);

            }

        }

        let countriesInfoObjectSetup = true;

        for (let i = 0; i < updateStatus.length; i++) {

            if (!(updateStatus[i])) {

                console.error(`initializeApp: Failed to load ${request[i]} data`);
                
                countriesInfoObjectSetup = false;

            }

        }

        if (!(countriesInfoObjectSetup)) {

            console.error('initializeApp: countriesInfo Object failed to initialize');

            return;

        }

        // ===== Use established countriesInfo Object to setup Search datalist and user's starting country =====
        countriesInfo = countriesInfoFunctions.returnCountriesInfo();

        // Trigger map to update countries
        mapFunctions.update('countriesFG');

        // ===== Determine User's Home Country =====
        loadingScreen.updateStatusMessage('Setting Up User Home Country...');
        let homeCountryBorderEstablished = false;

        // home countryBorder is established, so check that it is upto date for user's current location i.e. check if user is within home countryBoundary
        let homeCountryBorder;
        try {

            homeCountryBorder = countriesInfo['home']['countryBorder'];

        } catch (e) {

            homeCountryBorder = false;

        }

        if (homeCountryBorder) {

                let coordinates = homeCountryBorder['geometry']['coordinates'];

                let countryBounds = coordinatesToMultipolylineArray(coordinates);
                
                // if current lat lon coords aren't inside previous country
                if (!(isInsideCountry(window['homeLat'], window['homeLon'], countryBounds))) {

                    let countryName = returnCountryNameFromLatLon(window['homeLat'], window['homeLon']);

                    homeCountryBorderEstablished = countiesInfoFunctions.updateProperty('countryBorder', 'home', {countryName: countryName});

                // else, user is in the same country as before
                } else {

                    debug_log('initializeApp: home countryBorder loaded from localStorage');

                    homeCountryBorderEstablished = true;

                }

        // home countryBorder isn't established, so establish
        } else {

            let countryName = returnCountryNameFromLatLon(window['homeLat'], window['homeLon']);

            homeCountryBorderEstablished = countriesInfoFunctions.updateProperty('countryBorder', 'home', {countryName: countryName});

        }

        if (!(homeCountryBorderEstablished)) {

            debug_log('initialiseApp: User\'s country could not be established');
            return;

        }

        // ===== Setup User's Home Country Info and Map =====
        updateHome();

        // ===== Populate Country Select Element =====
        populateCountrySelect();

        // ===== Setup User's Current Country Info and Map =====
        let currentCountryBorder;

        try {

            currentCountryBorder = countriesInfo['current']['countryBorder'];

        } catch (e) {

            currentCountryBorder = false;

        }
        
        if (currentCountryBorder) {

                loadingScreen.updateStatusMessage('Setting Up Current Country...');

                let isoA2 = currentCountryBorder['properties']['iso_a2'];
                
                let latLon = returnLatLonFromIsoA2(isoA2);
                
                window['currentLat'] = latLon[0];
                window['currentLon'] = latLon[1];

                updateCurrent();

        }

        loadingScreen.close();

    }

    // ===== Exports =====
    return {
        updateCurrent: updateCurrent,
        initializeApp: initializeApp
    }

}();

