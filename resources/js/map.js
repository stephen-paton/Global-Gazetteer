/* =====================================================================================================
MAP - INITIALIZATION
======================================================================================================== */
(function() {
    /* =================================================================================================
    Leaflet Map - Setup
    ==================================================================================================== */
    loadingScreen.updateStatusMessage('Setting Up Map...');

    // ===== Leafletjs Map Setup =====
    let southWest = L.latLng(-90, -180),
        northEast = L.latLng(90, 180),
        bounds = L.latLngBounds(southWest, northEast);


    let map = L.map('map', {
        attributionControl: false,
        maxZoom: 15,
        minZoom: 2,
        center: bounds.getCenter(),
        zoom: 3,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=7ca12293-0cfc-43e4-8b36-0986cc7aaa99', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.control.attribution({
    position: 'bottomleft'
    }).addTo(map);

    // ===== Map featureGroups Setup =====
    // Create Map FeatureGroups
    let homeCountryMarker = L.marker(); // Home Country Marker (Part of homeCountryFG)
    let homeCountryFG = L.featureGroup(); // Home Icon and Boundary
    let currentCountryMarker = L.marker(); // Current Country Marker (Part of currentCountryFG)
    let currentCountryFG = L.featureGroup(); // Current Icon and Boundary
    let countriesFG = L.featureGroup(); // Country Flags and About Info
    let homeCountryPOI_FG = L.featureGroup(); // Home Country POI and wikipedia summary
    let currentCountryPOI_FG = L.featureGroup(); // Current Country POI and wikipedia summary
    let homeLocalPOI_FG = L.featureGroup(); // Home Local POI and wikipedia summary
    let currentLocalPOI_FG = L.featureGroup(); // Current local POI and wikipeida summary
    let homeWeatherFG = L.featureGroup(); // Home Weather
    let currentWeatherFG = L.featureGroup(); // Current Weather
    let homeCovidFG = L.featureGroup(); // Home Covid
    let currentCovidFG = L.featureGroup(); // Current Covid

    // Add Map FeatureGroups to Map
    homeCountryFG.addTo(map);
    currentCountryFG.addTo(map);
    countriesFG.addTo(map);
    homeCountryPOI_FG.addTo(map);
    currentCountryPOI_FG.addTo(map);
    homeLocalPOI_FG.addTo(map);
    currentLocalPOI_FG.addTo(map);
    homeWeatherFG.addTo(map);
    currentWeatherFG.addTo(map);
    homeCovidFG.addTo(map);
    currentCovidFG.addTo(map);

    /* =================================================================================================
    MAP - MAIN
    ==================================================================================================== */
    $(document).ready(function () {

        let $map = $('#map');

        /* =============================================================================================
        Leaflet Map - Functions
        ================================================================================================ */
        // ===== Update Feature Groups =====
        /* Update Country FG ===========================================================================
           Description: Updates country feature group of relevant type (home or current). Adds a marker on the selected country flag
                        and a border around the selected country. */
        function updateCountryFG(type) {

            let marker = (type == 'home') ? homeCountryMarker : currentCountryMarker;
            let featureGroup = (type == 'home') ? homeCountryFG : currentCountryFG;

            featureGroup.clearLayers();

            let countriesInfo = countriesInfoFunctions.returnCountriesInfo();

            let coordinates = countriesInfo[type]['countryBorder']['geometry']['coordinates'];

            let multiPolylineCountryBoundary = coordinatesToMultipolylineArray(coordinates);
            
            let color = (type == 'home') ? '#212D40' : '#E58F65';

            let boundary = L.polyline([multiPolylineCountryBoundary], {color: color}).addTo(featureGroup);

            featureGroup.addLayer(boundary);

            let markerImage = `resources/images/markers/${type}.png`;

            let markerIcon = L.icon({
                iconUrl: markerImage,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -20]
            });

            let lat = (type == 'home') ? window['homeLat'] : window['currentLat'];
            let lon = (type == 'home') ? window['homeLon'] : window['currentLon'];

            let position = [lat, lon];

            marker = L.marker(position, {icon: markerIcon});

            if ((type == 'home') && (window['defaultLocation'])) {


                marker.bindPopup('Default Home: United Kingdom');

            } else {

                let country = countriesInfo[type]['countryBorder']['properties']['name'];

                marker.bindPopup(`${capitalizeFirstLetter(type)}: ${country}`);

            }

            // Open popup on mouseover
            marker.on('mouseover', function () {
                marker.openPopup();
            });

            featureGroup.addLayer(marker);

            marker._icon.classList.add('homeMarker'); 

            if (type == 'home') {

                homeCountryMarker = marker;
                homeCountryFG = featureGroup;

            } else {

                currentCountryMarker = marker;
                currentCountryFG = featureGroup;

            }

        }

        /* Update Countries FG =========================================================================
           Description: Updates countries feature group. Adds flag markers for each country to the map. */
        function updateCountriesFG () {

            countriesFG.clearLayers();

            let countriesInfo = countriesInfoFunctions.returnCountriesInfo();

            let restCountries = countriesInfo['restCountries'];

            let features = countriesInfo['countryBorders']['features'];

            for (let i = 0; i < restCountries.length; i++) {

                let restIsoA2 = restCountries[i]['alpha2Code'];

                for (let j = 0; j < features.length; j++) {

                    let featuresIsoA2 = features[j]['properties']['iso_a2'];
                    let flagImage = `resources/images/flags/${featuresIsoA2.toLowerCase()}.png`;

                    if (featuresIsoA2 == restIsoA2) {

                        let flagIcon = L.icon({
                            iconUrl: flagImage,
                            iconSize: [25, 25],
                            iconAnchor: [12.5, 12.5],
                            popupAnchor: [0, 0]
                        });

                        let flagPosition = restCountries[i]['latlng'];

                        let flag = L.marker(flagPosition, {icon: flagIcon});

                        let name = features[j]['properties']['name'];
                        let region = restCountries[i]['region'];
                        let subregion = restCountries[i]['subregion'];
                        let capital = restCountries[i]['capital'];
                        let population = restCountries[i]['population'];

                        let popupContent = `
                        <div class="popupContentContainer">
                            <h3 class="sectionHeader"><img class="tableImage" src=${flagImage}> ${name}</h3>
                            <div class="popupTableContainer">
                                <table class="aboutTable fullWidth">
                                    <tr>
                                        <td>Region:</td>
                                        <td>${region}</td>
                                    </tr>
                                    <tr>
                                        <td>Subregion:</td>
                                        <td>${subregion}</td>
                                    </tr>
                                    <tr>
                                        <td>Capital:</td>
                                        <td>${capital}</td>
                                    </tr>
                                    <tr>
                                        <td>Population:</td>
                                        <td>${numberWithCommas(population)}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                                `;

                        flag.bindPopup(popupContent);

                        // Open popup on mouseover
                        flag.on('mouseover', function () {
                            flag.openPopup();
                        });

                        // Make Active Country on Click
                        flag.on('click', function (e) {

                            let countriesInfo = countriesInfoFunctions.returnCountriesInfo();

                            let homeCountryBorder;

                            try {

                                homeCountryBorder = countriesInfo['home']['countryBorder'];

                            } catch (err) {

                                homeCountryBorder = false;

                            }

                            // Check if selected country is 'home' country. If so, return.
                            if (homeCountryBorder) {

                                let homeCountryName = homeCountryBorder['properties']['name'];

                                if (homeCountryName == name) {

                                    return;

                                }

                            }

                            let currentCountryBorder;

                            try {

                                currentCountryBorder = countriesInfo['current']['countryBorder'];

                            } catch (err) {

                                currentCountryBorder = false;

                            }

                            // Check if selected country is 'current' country. If so, return. 
                            if (currentCountryBorder) {

                                    let currentCountryName = currentCountryBorder['properties']['name'];

                                    if (currentCountryName == name) {

                                        return;

                                    }

                            }

                            // Pass countryName and lat/lon to 'search'
                            let latLon = map.mouseEventToLatLng(e.originalEvent);
                            
                            let lat = latLon['lat'];
                            let lon = latLon['lng'];

                            $('#countries').trigger('search', [name, lat, lon]);
                        
                        });

                        countriesFG.addLayer(flag);

                        flag._icon.classList.add('flagMarker');                        

                    }

                }

            }

        }

        /* Update Country POI FG =======================================================================
           Description: Updates country POI feature group of relevant type (home or current). Adds numbered markers 
                        for country POIs. */
        function updateCountryPOI_FG (type) {

            let featureGroup = (type == 'home') ? homeCountryPOI_FG : currentCountryPOI_FG;

            featureGroup.clearLayers();

            let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
            let countryPOI = countriesInfo[type]['countryPOI']['geonames'];

            let numberOfArticles = Math.min(countryPOI.length, 10); 
        
            for (let i = 0; i < numberOfArticles; i++) {

                let title = countryPOI[i]['title'];
                let summary = countryPOI[i]['summary'];
                let wikiURL = 'https://';
                wikiURL += countryPOI[i]['wikipediaUrl'];
                let thumbnail = countryPOI[i]['thumbnailImg'];
                let imageRow = (thumbnail == undefined) ? "" : `<img src="${thumbnail}"></img>`;

                let popupContent = `
                    <div class="popupContentContainer ${type}">
                        <h3 class="sectionHeader">${title}</h3>
                        <div class="infoBlock">
                            ${imageRow}
                            <p class="summary">${summary}</p>
                            <button type="button" class="linkButton" onclick="window.open('${wikiURL}')">Read On</button>
                        </div>
                    </div>
                `;

                let markerImage = `resources/images/markers/${type}${i + 1}.png`;

                let markerIcon = L.icon({
                    iconUrl: markerImage,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -20]
                });

                let markerLat = countryPOI[i]['lat'];
                let markerLon = countryPOI[i]['lng'];

                let markerPosition = [markerLat, markerLon];

                let marker = L.marker(markerPosition, {icon: markerIcon});

                marker.bindPopup(popupContent);

                // Open popup on mouseover
                marker.on('mouseover', function () {
                    marker.openPopup();
                });

                featureGroup.addLayer(marker);
                mapFunctions.hide(`${type}CountryPOI_FG`);

                if (type == 'home') {

                    homeCountryPOI_FG = featureGroup;

                } else if (type == 'current') {

                    currentCountryPOI_FG = featureGroup;

                }

            }

        }

        /* Update Local POI FG =========================================================================
           Description: Updates local POI feature group of relevant type (home or current). Adds numbered markers 
                        for local POIs. */
        function updateLocalPOI_FG (type) {

            let featureGroup = (type == 'home') ? homeLocalPOI_FG : currentLocalPOI_FG;

            featureGroup.clearLayers();

            let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
            let localPOI = countriesInfo[type]['localPOI']['geonames'];
        
            for (let i = 0; i < localPOI.length; i++) {

                let title = localPOI[i]['title'];
                let summary = localPOI[i]['summary'];
                let wikiURL = 'https://';
                wikiURL += localPOI[i]['wikipediaUrl'];
                let thumbnail = localPOI[i]['thumbnailImg'];
                let imageRow = (thumbnail == undefined) ? "" : `<img src="${thumbnail}"></img>`;

                let popupContent = `
                    <div class="popupContentContainer ${type}">
                        <h3 class="sectionHeader">${title}</h3>
                        <div class="infoBlock">
                            ${imageRow}
                            <p class="summary">${summary}</p>
                            <button type="button" class="linkButton" onclick="window.open('${wikiURL}')">Read On</button>
                        </div>
                    </div>
                `;

                let markerImage = `resources/images/markers/${type}${i + 1}.png`;

                let markerIcon = L.icon({
                    iconUrl: markerImage,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -20]
                });

                let markerLat = localPOI[i]['lat'];
                let markerLon = localPOI[i]['lng'];

                let markerPosition = [markerLat, markerLon];

                let marker = L.marker(markerPosition, {icon: markerIcon});

                marker.bindPopup(popupContent);

                // Open popup on mouseover
                marker.on('mouseover', function () {
                    marker.openPopup();
                });

                featureGroup.addLayer(marker);
                mapFunctions.hide(`${type}CountryPOI_FG`);

                if (type == 'home') {

                    homeLocalPOI_FG = featureGroup;

                } else if (type == 'current') {

                    currentLocalPOI_FG = featureGroup;

                }

            }

        }

        /* Update Weather FG ===========================================================================
           Description: Updates weather feature group of relevant type (home or current). Adds weather markers
                        to the map. */
        function updateWeatherFG(type) {

            let featureGroup = (type == 'home') ? homeWeatherFG : currentWeatherFG;

            featureGroup.clearLayers();

            let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
            let countryWeather = countriesInfo[type]['countryWeather']['weatherObservations'];
        
            for (let i = 0; i < countryWeather.length; i++) {

                let stationName = countryWeather[i]['stationName'];
                let clouds = countryWeather[i]['clouds'];
                let weatherCondition = countryWeather[i]['weatherCondition'];
                let humidity = countryWeather[i]['humidity'];
                let temperature = countryWeather[i]['temperature'];
                let windDirection = countryWeather[i]['windDirection'];
                let windSpeed = countryWeather[i]['windSpeed'];

                let weatherIcon;

                function cloudImage() {

                    switch (clouds) {

                        case 'n/a':
                        case 'clear sky':
                        case 'no clouds detected':
                        case 'nil significant cloud':
                        case 'vertical visibility':
                            weatherIcon = 'Clear';
                            return;
                        case 'few clouds':
                        case 'scattered clouds':
                        case 'broken clouds':
                            weatherIcon = 'Broken';
                            return;
                        case 'overcast':
                        case 'clouds and visibility OK':
                            weatherIcon = 'Cloudy';
                            return;
                        default:
                            weatherIcon = 'Clear';
                            return;

                    }

                }
                
                switch (weatherCondition) {

                    case 'drizzle':
                    case 'showers':
                    case 'partial':
                    case 'hail':
                    case 'small hail/snow pellets':
                        weatherIcon = 'Showers';
                        break;
                    case 'rain':
                    case 'unknown precipitation':
                        weatherIcon = 'Rain';
                        break;
                    case 'snow':
                    case 'snow grains':
                    case 'ice crystals':
                    case 'ice pellets':
                        weatherIcon = 'Snow';
                        break;
                    case 'mist':
                    case 'fog':
                    case 'smoke':
                    case 'volcanic ash':
                        weatherIcon = 'Fog';
                        break;
                    case 'tornado/waterspout':
                        weatherIcon = 'Tornado';
                        break;
                    case 'thunderstorm':
                        weatherIcon = 'Thunder';
                        break;
                    case 'n/a':
                    default:
                        cloudImage();
                        break;

                }

                let popupContent = `
                    <div class="popupContentContainer ${type}">
                        <h3><img class="tableImage" src=resources/images/markers/${type}${weatherIcon}.png> ${stationName}</h3>
                        <div class="tableContainer">
                            <table class="countryWeatherTable fullWidth">
                                <tr>
                                    <td>Clouds:</td>
                                    <td>${clouds}</td>
                                </tr>
                                <tr>
                                    <td>Weather Condition:</td>
                                    <td>${weatherCondition}</td>
                                </tr>
                                <tr>
                                    <td>Humidity:</td>
                                    <td>${humidity}</td>
                                </tr>
                                <tr>
                                    <td>Temperature:</td>
                                    <td>${temperature}&#176;C</td>
                                </tr>
                                <tr>
                                    <td>Wind Direction:</td>
                                    <td>${windDirection}&#176;</td>
                                </tr>
                                <tr>
                                    <td>Wind Speed:</td>
                                    <td>${windSpeed} knots</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                `;

                let markerImage = `resources/images/markers/${type}${weatherIcon}.png`;

                let markerIcon = L.icon({
                    iconUrl: markerImage,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15],
                    popupAnchor: [0, 0]
                });

                let markerLat = countryWeather[i]['lat'];
                let markerLon = countryWeather[i]['lng'];

                let markerPosition = [markerLat, markerLon];

                let marker = L.marker(markerPosition, {icon: markerIcon});

                marker.bindPopup(popupContent);

                // Open popup on mouseover
                marker.on('mouseover', function () {
                    marker.openPopup();
                });

                featureGroup.addLayer(marker);
                mapFunctions.hide(`${type}WeatherFG`);

                if (type == 'home') {

                    homeWeatherFG = featureGroup;

                } else if (type == 'current') {

                    currentWeatherFG = featureGroup;

                }

            }

        }

        /* Update Covig FG =============================================================================
           Description: Updates covid feature group of relevant type (home or current). Adds covid markers
                        to the map. */
        function updateCovidFG(type) {

            let featureGroup = (type == 'home') ? homeCovidFG : currentCovidFG;

            featureGroup.clearLayers();

            let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
            let covid = countriesInfo[type]['covid']['data'];

            for (let i = 0; i < covid.length; i++) {

                let markerLat = parseFloat(covid[i]['region']['lat']);
                let markerLon = parseFloat(covid[i]['region']['long']);

                if (isNaN(markerLat) || isNaN(markerLon)) {

                    continue;

                }

                let province = covid[i]['region']['province']; 
                let name = covid[i]['region']['name'];
                name = (province == "") ? name : `${name} - ${province}`; 
                let activeCases = covid[i]['active'];
                let activeDifference = covid[i]['active_diff'];
                let confirmedCases = covid[i]['confirmed'];
                let confirmedDifference = covid[i]['confirmed_diff'];
                let recoveries = covid[i]['recovered'];
                let recoveriesDifference = covid[i]['recovered_diff'];
                let deaths = covid[i]['deaths'];
                let deathsDifference = covid[i]['deaths_diff'];
                let fatalityRate = covid[i]['fatality_rate'];
                let datetime = new Date(covid[i]['last_update']);
                let dateUpdated = moment(datetime).format('DD/MM/YYYY');
                let timeUpdated = moment(datetime).format('HH:mm:ss');

                let popupContent = `
                    <div class="popupContentContainer ${type}">
                        <h3><img class="tableImage" src="resources/images/markers/${type}Covid.png"> ${name}</h3>
                        <div class="tableContainer">
                            <table class="covidTable fullWidth">
                                <tr>
                                    <td>Active Cases:</td>
                                    <td>${activeCases} <span class="${positiveOrNegative(activeDifference, false)}">(${numberWithCommas(activeDifference)})</span></td>
                                </tr>
                                <tr>
                                    <td>Confirmed Cases:</td>
                                    <td>${confirmedCases} <span class="${positiveOrNegative(confirmedDifference, false)}">(${numberWithCommas(confirmedDifference)})</span></td>
                                </tr>
                                <tr>
                                    <td>Recoveries:</td>
                                    <td>${recoveries} <span class="${positiveOrNegative(recoveriesDifference, true)}">(${numberWithCommas(recoveriesDifference)})</span></td>
                                </tr>
                                <tr>
                                    <td>Deaths:</td>
                                    <td>${deaths} <span class="${positiveOrNegative(deathsDifference, false)}">(${numberWithCommas(deathsDifference)})</span></td>
                                </tr>
                                <tr>
                                    <td>Fatality Rate:</td>
                                    <td>${fatalityRate}</td>
                                </tr>
                                <tr>
                                    <td>Date Updated:</td>
                                    <td>${dateUpdated}</td>
                                </tr>
                                <tr>
                                    <td>Time Updated:</td>
                                    <td>${timeUpdated}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                `;

                let markerImage = `resources/images/markers/${type}Covid.png`;

                let markerIcon = L.icon({
                    iconUrl: markerImage,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15],
                    popupAnchor: [0, 0]
                });

                let markerPosition = [markerLat, markerLon];

                let marker = L.marker(markerPosition, {icon: markerIcon});

                marker.bindPopup(popupContent);

                // Open popup on mouseover
                marker.on('mouseover', function () {
                    marker.openPopup();
                });

                featureGroup.addLayer(marker);
                mapFunctions.hide(`${type}CovidFG`);

                if (type == 'home') {

                    homeCovidFG = featureGroup;

                } else if (type == 'current') {

                    currentCovidFG = featureGroup;

                }

            }

        }

        /* =============================================================================================
        Leaflet Map - Events
        ================================================================================================ */
        /* Update Event ================================================================================
           Description: Updates relevant feature group.
                        to the map. */ 
        $map.on('update', function (e, featureGroupName) {

            switch (featureGroupName) {

                case 'homeCountryFG':
                    updateCountryFG('home');
                    return;
                case 'currentCountryFG':
                    updateCountryFG('current');
                    return;
                case 'countriesFG':
                    updateCountriesFG();
                    return;
                case 'homeCountryPOI_FG':
                    updateCountryPOI_FG('home');
                    return;
                case 'currentCountryPOI_FG':
                    updateCountryPOI_FG('current');
                    return;
                case 'homeLocalPOI_FG':
                    updateLocalPOI_FG('home');
                    return;
                case 'homeWeatherFG':
                    updateWeatherFG('home');
                    return;
                case 'currentWeatherFG':
                    updateWeatherFG('current');
                    return;
                case 'homeCovidFG':
                    updateCovidFG('home');
                    return;
                case 'currentCovidFG':
                    updateCovidFG('current');
                    return;
                default:
                    console.trace('map update event: Invalid featureGroup specified');
                    return;

            }

        });

        /* Focus On Event ==============================================================================
           Description: Focus on relevant feature group. */
        $map.on('focusOn', function (e, featureGroupName) {

            let featureGroup;

            switch (featureGroupName) {

                case 'homeCountryFG':
                    featureGroup = homeCountryFG;
                    break;
                case 'currentCountryFG':
                    featureGroup = currentCountryFG;
                    break;
                case 'homeCountryPOI_FG':
                    featureGroup = homeCountryPOI_FG;
                    break;
                case 'currentCountryPOI_FG':
                    featureGroup = currentCountryPOI_FG;
                    break;
                case 'homeLocalPOI_FG':
                    featureGroup = homeLocalPOI_FG;
                    break;
                case 'currentLocalPOI_FG':
                    featureGroup = currentLocalPOI_FG;
                    break;
                case 'homeWeatherFG':
                    featureGroup = homeWeatherFG;
                    break;
                case 'currentWeatherFG':
                    featureGroup = currentWeatherFG;
                    break;
                case 'homeCovidFG':
                    featureGroup = homeCovidFG;
                    break;
                case 'currentCovidFG':
                    featureGroup = currentCovidFG;
                    break;
                default:
                    debug_log('$map focusOn Event: Invalid type specified');
                    return;

            }

            if (map.hasLayer(featureGroup)) {

                map.flyToBounds(featureGroup);
            
            }   

        });


        // ===== Map Button Events =====
        /* Home Button Click Event =====================================================================
           Description: Focuses on 'home' and sets footer to 'home' */
        let $homeButton = $('.homeButton');
        
        $homeButton.click(function () {

            mapFunctions.focusOn('homeCountryFG'); 
            
            footer.changeActiveSection('home', 'about');

        });

        /* Current Button Click Event ================================================================== 
           Description: Focuses on 'current' and sets footer to 'current' */
        let $currentButton = $('.currentButton');
                    
        $currentButton.click(function () {

            mapFunctions.focusOn('currentCountryFG'); 

            footer.changeActiveSection('current', 'about');

        });


        // ===== Hide Event =====
        // ===== Helper Functions =====
        /* Hide Marker Function =================================================================================
           Description: Hides the specified marker. */
        function hideMarker(markerName) {

            let marker = (markerName == 'homeCountryMarker') ? homeCountryMarker : currentCountryMarker;
            let featureGroup = (markerName == 'homeCountryMarker') ? homeCountryFG : currentCountryFG;
            
            if (featureGroup.hasLayer(marker)) {

                featureGroup.removeLayer(marker);

            }

        }

        /* Hide Feature Group Function ==========================================================================
           Description: Hides the specified feature group. */
        function hideFG(featureGroupName) {

            let featureGroup;

            switch (featureGroupName) {

                case 'homeCountryFG':
                    featureGroup = homeCountryFG;
                    break;
                case 'currentCountryFG':
                    featureGroup = currentCountryFG;
                    break;
                case 'homeCountryPOI_FG':
                    featureGroup = homeCountryPOI_FG;
                    break;
                case 'currentCountryPOI_FG':
                    featureGroup = currentCountryPOI_FG;
                    break;
                case 'homeLocalPOI_FG':
                    featureGroup = homeLocalPOI_FG;
                    break;
                case 'currentLocalPOI_FG':
                    featureGroup = currentLocalPOI_FG;
                    break;
                case 'homeWeatherFG':
                    featureGroup = homeWeatherFG;
                    break;
                case 'currentWeatherFG':
                    featureGroup = currentWeatherFG;
                    break;
                case 'homeCovidFG':
                    featureGroup = homeCovidFG;
                    break;
                case 'currentCovidFG':
                    featureGroup = currentCovidFG;
                    break;

            }

            if (map.hasLayer(featureGroup)) {

                map.removeLayer(featureGroup);

            }

        } 

        /* Hide Event ==================================================================================
           Description: Hides the selected map layer. */
        $map.on('hide', function (e, layerName) {

            let featureGroup;

            switch (layerName) {

                case 'homeCountryMarker':
                case 'currentCountryMarker':
                    hideMarker(layerName);
                    return;
                case 'homeCountryFG':
                case 'currentCountryFG':
                case 'homeCountryPOI_FG':
                case 'currentCountryPOI_FG':
                case 'homeLocalPOI_FG':
                case 'currentLocalPOI_FG':
                case 'homeWeatherFG':
                case 'currentWeatherFG':
                case 'homeCovidFG':
                case 'currentCovidFG':
                    hideFG(layerName);
                    return;
                default:
                    console.trace('$map hide event: Invalid layerName specified');
                    return;

            }

        });

        // ===== Show Event =====
        // ===== Helper Functions =====
        /* Show Marker Function ========================================================================
           Description: Shows the specified marker. */
        function showMarker(markerName) {

            let marker = (markerName == 'homeCountryMarker') ? homeCountryMarker : currentCountryMarker;
            let featureGroup = (markerName == 'homeCountryMarker') ? homeCountryFG : currentCountryFG;

            if (!(featureGroup.hasLayer(marker))) {

                featureGroup.addLayer(marker);

            }

        }

        /* Show Feature Group ==========================================================================
           Description: Shows the specified feature group. */
        function showFG(featureGroupName) {

            let featureGroup;

            switch (featureGroupName) {

                case 'homeCountryFG':
                    featureGroup = homeCountryFG;
                    break;
                case 'currentCountryFG':
                    featureGroup = currentCountryFG;
                    break;
                case 'homeCountryPOI_FG':
                    featureGroup = homeCountryPOI_FG;
                    break;
                case 'currentCountryPOI_FG':
                    featureGroup = currentCountryPOI_FG;
                    break;
                case 'homeLocalPOI_FG':
                    featureGroup = homeLocalPOI_FG;
                    break;
                case 'currentLocalPOI_FG':
                    featureGroup = currentLocalPOI_FG;
                    break;
                case 'homeWeatherFG':
                    featureGroup = homeWeatherFG;
                    break;
                case 'currentWeatherFG':
                    featureGroup = currentWeatherFG;
                    break;
                case 'homeCovidFG':
                    featureGroup = homeCovidFG;
                    break;
                case 'currentCovidFG':
                    featureGroup = currentCovidFG;
                    break;

            }

            if (!(map.hasLayer(featureGroup))) {

                map.addLayer(featureGroup);

            }

        } 

        /* Show Event ==================================================================================
           Description: Shows the selected map layer. */
        $map.on('show', function (e, layerName) {

            let featureGroup;

            switch (layerName) {

                case 'homeCountryMarker':
                case 'currentCountryMarker':
                    showMarker(layerName);
                    return;
                case 'homeCountryFG':
                case 'currentCountryFG':
                case 'homeCountryPOI_FG':
                case 'currentCountryPOI_FG':
                case 'homeLocalPOI_FG':
                case 'currentLocalPOI_FG':
                case 'homeWeatherFG':
                case 'currentWeatherFG':
                case 'homeCovidFG':
                case 'currentCovidFG':
                    showFG(layerName);
                    return;
                default:
                    debug_log('$map show event: Invalid layerName specified');
                    return;

            }

        });

        // ===== Map Marker Events (Bound to map to reduce number of event handlers) =====
        /* Close Footer Events ========================================================================== */
        // Close footer on map marker hover (not flags)
        $map.on('click mouseover', '.leaflet-marker-icon', function () {

            // Stop flag/home markers from closing footer (clicking on these triggers search, which should open footer)
            if ($(this).has('.flagMarker, .homeMarker')) {

                return;
            }

            // Close footer
            footer.toggle(false);

        });

        // Close footer on map click (not markers)
        $map.on('click', function (event) {

            if ($(event.target).is('#map')) {

                footer.toggle(false);

            }

        });

        // ===== Other Events =====
        // Resize App When Map Gets Focus (to address an iOS specific safari bug)
        $map.focus(function () {

            setTimeout(function () {
                
                $(window).trigger('orientationchange');

            }, 300); 

        });

    });

})();




